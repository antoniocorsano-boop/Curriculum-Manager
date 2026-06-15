/**
 * Document Output Center - local status panel only.
 * No backend, no OAuth, no remote sync, no programmatic PDF/DOCX export.
 */

const DOCUMENT_OUTPUT_STATE_KEY = "curriculumManager.documentOutputState";

function _esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function loadDocumentOutputStateMap() {
  try {
    return JSON.parse(localStorage.getItem(DOCUMENT_OUTPUT_STATE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveDocumentOutputStateMap(map) {
  localStorage.setItem(DOCUMENT_OUTPUT_STATE_KEY, JSON.stringify(map));
}

function getDocumentOutputRecord(documentId) {
  const map = loadDocumentOutputStateMap();
  return map[documentId] || { documentId };
}

function updateDocumentOutputRecord(documentId, patch) {
  const map = loadDocumentOutputStateMap();
  map[documentId] = {
    ...(map[documentId] || { documentId }),
    ...patch,
    documentId
  };
  saveDocumentOutputStateMap(map);
  return map[documentId];
}

function getDocumentDraftLastSavedIso(documentId) {
  const draft = window.EDITABLE_DOCUMENT_STATE?.loadEditableDraft?.(documentId);
  return draft?.updatedAt || null;
}

function markDocumentOutputOpened(documentId) {
  const record = getDocumentOutputRecord(documentId);
  updateDocumentOutputRecord(documentId, {
    lastOpenedAt: new Date().toISOString(),
    outputState: record.outputState || "draft_unmodified"
  });
}

function markDocumentDraftChanged(documentId) {
  const record = getDocumentOutputRecord(documentId);
  if (!record.completedManually && !record.needsReview) {
    updateDocumentOutputRecord(documentId, {
      outputState: "draft_modified_local"
    });
  }
}

function markDocumentDraftSaved(documentId) {
  updateDocumentOutputRecord(documentId, {
    lastSavedAt: getDocumentDraftLastSavedIso(documentId) || new Date().toISOString(),
    outputState: "saved_local",
    needsReview: false,
    completedManually: false
  });
}

function resetDocumentOutputState(documentId) {
  const map = loadDocumentOutputStateMap();
  delete map[documentId];
  saveDocumentOutputStateMap(map);
}

function markDocumentNeedsReview(documentId) {
  updateDocumentOutputRecord(documentId, {
    needsReview: true,
    completedManually: false,
    lastMarkedForReviewAt: new Date().toISOString(),
    outputState: "needs_review"
  });
  renderDocumentOutputCenterView();
}

function markDocumentCompletedManually(documentId) {
  updateDocumentOutputRecord(documentId, {
    needsReview: false,
    completedManually: true,
    lastMarkedCompletedAt: new Date().toISOString(),
    outputState: "completed_manually"
  });
  renderDocumentOutputCenterView();
}

function resetSingleDocumentOutput(documentId) {
  if (!confirm("Rimuovere solo bozza e stato locali di questo documento?")) return;
  window.EDITABLE_DOCUMENT_STATE?.clearEditableDraft?.(documentId);
  resetDocumentOutputState(documentId);
  renderDocumentOutputCenterView();
}

function getDocumentOutputStatus(documentId) {
  const record = getDocumentOutputRecord(documentId);
  const lastSavedAt = getDocumentDraftLastSavedIso(documentId) || record.lastSavedAt || null;

  if (record.completedManually) {
    return {
      key: "completed_manually",
      label: "Completato manualmente dall'utente",
      badgeClass: "ok",
      detail: "Non equivale ad approvazione istituzionale"
    };
  }

  if (record.needsReview) {
    return {
      key: "needs_review",
      label: "Da rivedere",
      badgeClass: "warn",
      detail: "Richiede revisione umana"
    };
  }

  if (record.outputState === "draft_modified_local") {
    return {
      key: "draft_modified_local",
      label: "Bozza modificata localmente",
      badgeClass: "warn",
      detail: "Modifiche non salvate su questo dispositivo"
    };
  }

  if (lastSavedAt) {
    return {
      key: "ready_for_print",
      label: "Pronto per stampa locale",
      badgeClass: "ok",
      detail: `Salvato su questo dispositivo: ${formatDocumentOutputDate(lastSavedAt)}`
    };
  }

  return {
    key: "draft_unmodified",
    label: "Bozza non modificata",
    badgeClass: "",
    detail: record.lastOpenedAt ? "Puoi continuare la bozza locale" : "Nessuna bozza locale salvata"
  };
}

function getDocumentOutputSummary() {
  const docs = window.INSTITUTIONAL_DOCUMENTS_CATALOG || [];
  return docs.reduce((summary, doc) => {
    const status = getDocumentOutputStatus(doc.id);
    const record = getDocumentOutputRecord(doc.id);
    if (record.lastOpenedAt || getDocumentDraftLastSavedIso(doc.id)) summary.started += 1;
    if (getDocumentDraftLastSavedIso(doc.id) || record.lastSavedAt) summary.saved += 1;
    if (status.key === "ready_for_print") summary.ready += 1;
    if (status.key === "needs_review") summary.review += 1;
    if (status.key === "completed_manually") summary.completed += 1;
    return summary;
  }, { started: 0, saved: 0, ready: 0, review: 0, completed: 0 });
}

function formatDocumentOutputDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function openDocumentFromOutputCenter(documentId) {
  showView("documentiIstituzionali");
  requestAnimationFrame(() => showDocumentDetail(documentId));
}

function printDocumentDraftFromOutputCenter(documentId) {
  openDocumentFromOutputCenter(documentId);
  setTimeout(() => window.print(), 200);
}

function copyDocumentOutputSummary(documentId) {
  const doc = (window.INSTITUTIONAL_DOCUMENTS_CATALOG || []).find(item => item.id === documentId);
  const status = getDocumentOutputStatus(documentId);
  const text = [
    `Documento: ${doc?.title || documentId}`,
    `Stato output locale: ${status.label}`,
    status.detail,
    "Bozza locale. Revisione umana richiesta. Nessun invio automatico."
  ].join("\n");

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function renderDocumentOutputCenterView() {
  const el = document.getElementById("documentOutputCenter");
  if (!el) return;

  const docs = window.INSTITUTIONAL_DOCUMENTS_CATALOG || [];
  const summary = getDocumentOutputSummary();

  el.innerHTML = `
    <div class="card">
      <h2>Centro output documenti</h2>
      <p class="simple-help">Controlla bozze e stati locali dei documenti istituzionali.</p>
      <div class="notice warn">
        <strong>Output locale:</strong> bozza locale, revisione umana richiesta, nessun invio automatico, nessuna sincronizzazione remota. Non equivale ad approvazione istituzionale.
      </div>
      <div class="output-summary-grid">
        <div class="output-summary-item"><strong>${summary.started}</strong><span>Documenti iniziati</span></div>
        <div class="output-summary-item"><strong>${summary.saved}</strong><span>Bozze salvate</span></div>
        <div class="output-summary-item"><strong>${summary.ready}</strong><span>Pronti per stampa</span></div>
        <div class="output-summary-item"><strong>${summary.review}</strong><span>Da rivedere</span></div>
        <div class="output-summary-item"><strong>${summary.completed}</strong><span>Completati manualmente</span></div>
      </div>
    </div>

    <div class="document-output-list">
      ${docs.map(renderDocumentOutputCard).join("")}
    </div>
  `;
}

function renderDocumentOutputCard(doc) {
  const status = getDocumentOutputStatus(doc.id);
  const badgeClass = status.badgeClass ? ` ${status.badgeClass}` : "";

  return `
    <article class="card document-output-card">
      <div class="template-meta">
        <span class="badge">${_esc(doc.category)}</span>
        <span class="badge${badgeClass}">${_esc(status.label)}</span>
        <span class="badge warn">Solo su questo dispositivo</span>
      </div>
      <h3>${_esc(doc.title)}</h3>
      <p>${_esc(status.detail)}</p>
      <p class="simple-help">Documento di lavoro: non approvato, non protocollato, non inviato.</p>
      <div class="toolbar no-print">
        <button type="button" class="action" onclick="openDocumentFromOutputCenter('${_esc(doc.id)}')">Apri documento</button>
        <button type="button" class="action secondary" onclick="printDocumentDraftFromOutputCenter('${_esc(doc.id)}')">Stampa bozza</button>
        <button type="button" class="action secondary" onclick="copyDocumentOutputSummary('${_esc(doc.id)}')">Copia riepilogo</button>
        <button type="button" class="action secondary" onclick="markDocumentNeedsReview('${_esc(doc.id)}')">Segna da rivedere</button>
        <button type="button" class="action secondary" onclick="markDocumentCompletedManually('${_esc(doc.id)}')">Completato manualmente</button>
        <button type="button" class="action secondary" onclick="resetSingleDocumentOutput('${_esc(doc.id)}')">Reset locale</button>
      </div>
    </article>
  `;
}

if (typeof window !== "undefined") {
  window.DOCUMENT_OUTPUT_CENTER_STATE = {
    markDocumentOutputOpened,
    markDocumentDraftChanged,
    markDocumentDraftSaved,
    resetDocumentOutputState,
    getDocumentOutputStatus
  };
}
