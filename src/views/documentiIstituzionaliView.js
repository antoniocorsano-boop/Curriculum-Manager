/**
 * Documenti istituzionali view - read-only catalog with structured content
 * No export, no DOCX/PDF generation
 */

function _esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function renderDocumentiIstituzionaliView() {
  const catalog = window.INSTITUTIONAL_DOCUMENTS_CATALOG || [];
  const el = document.getElementById("documentiIstituzionali");

  const guideDoc = catalog.find(d => d.id === "curricolo-verticale-istituto");
  const revisionDocs = catalog.filter(d => ["curricolo-ordine-scolastico", "curricolo-disciplina-campo", "quadro-competenze-traguardi-obiettivi"].includes(d.id));
  const groupDocs = catalog.filter(d => ["documento-finale-dipartimento", "documento-gruppo-lavoro"].includes(d.id));
  const outputDocs = catalog.filter(d => ["documento-revisione-aggiornamento", "documento-approvato-validato", "quadro-valutazione-rubriche", "allegato-educazione-civica-digitale-orientamento-inclusione"].includes(d.id));

  el.innerHTML = `
    <div class="card">
      <h2>Documenti di lavoro</h2>
      <p class="simple-help">Apri la scheda per capire cosa serve preparare.</p>

      <div class="notice" style="margin-bottom:16px">
        <strong>Nota:</strong> ogni documento è una bozza di lavoro fino alla validazione del gruppo.
      </div>

      ${guideDoc ? `
        <div class="card institutional-document-guide-card" data-document-id="${_esc(guideDoc.id)}" style="border-left:4px solid var(--primary); margin-bottom:20px">
          <h3 style="margin-top:0">Documento guida del percorso</h3>
          <p style="font-size:13px">${_esc(guideDoc.title)} - ${_esc(guideDoc.description.substring(0, 100))}...</p>
          <button type="button" class="action" data-document-detail-trigger data-document-id="${_esc(guideDoc.id)}">Apri scheda guida</button>
        </div>
      ` : ""}

      ${groupDocs.length ? `
        <h3 style="margin-top:20px">Documenti per la revisione</h3>
        <p style="font-size:13px; color:var(--muted)">Per preparare il lavoro nei gruppi.</p>
        <div class="institutional-document-grid" style="margin-bottom:20px">
          ${groupDocs.map(renderDocumentCard).join("")}
        </div>
      ` : ""}

      ${revisionDocs.length ? `
        <h3>Documenti del gruppo</h3>
        <p style="font-size:13px; color:var(--muted)">Materiali da portare al confronto.</p>
        <div class="institutional-document-grid" style="margin-bottom:20px">
          ${revisionDocs.map(renderDocumentCard).join("")}
        </div>
      ` : ""}

      ${outputDocs.length ? `
        <h3>Output da preparare</h3>
        <p style="font-size:13px; color:var(--muted)">Contributono alla bozza finale.</p>
        <div class="institutional-document-grid">
          ${outputDocs.map(renderDocumentCard).join("")}
        </div>
      ` : ""}

      <div id="documentDetail" style="display:none"></div>
    </div>
  `;

  bindDocumentDetailEvents();
}

function renderDocumentCard(doc) {
  return `
    <article class="institutional-document-card" data-document-id="${_esc(doc.id)}" style="cursor:pointer">
      <h3>${_esc(doc.title)}</h3>
      <div class="template-meta">
        <span class="badge">${_esc(doc.category)}</span>
        <span class="badge secondary" style="margin-left:6px">Documento di lavoro</span>
      </div>
      <p style="font-size:13px">${_esc(doc.description)}</p>
      <div style="margin-top:8px">
        <button type="button" class="action secondary" style="font-size:12px">Leggi contenuto</button>
      </div>
    </article>
  `;
}

function bindDocumentDetailEvents() {
  document.querySelectorAll(".institutional-document-card").forEach(card => {
    card.addEventListener("click", () => {
      const documentId = card.dataset.documentId;
      if (documentId) showDocumentDetail(documentId);
    });
  });

  document.querySelectorAll(".institutional-document-guide-card [data-document-detail-trigger]").forEach(button => {
    button.addEventListener("click", () => {
      const documentId = button.dataset.documentId;
      if (documentId) showDocumentDetail(documentId);
    });
  });
}

function getDocumentDetailMeta(doc) {
  const content = window.DOCUMENT_CONTENT_CATALOG?.[doc.id] || {};
  return {
    phase: content.phase || "Fase di revisione",
    purpose: content.purpose || "Portare nel confronto il materiale da rivedere.",
    checks: content.checks?.join(", ") || "Progressione verticale, competenze, traguardi, obiettivi.",
    output: content.output || "Materiale di confronto per aggiornare il curricolo.",
    sections: content.sections || []
  };
}

function showDocumentDetail(docId) {
  const doc = window.INSTITUTIONAL_DOCUMENTS_CATALOG.find(d => d.id === docId);
  if (!doc) return;

  const meta = getDocumentDetailMeta(doc);
  const detailEl = document.getElementById("documentDetail");
  if (!detailEl) return;

  const cards = Array.from(document.querySelectorAll(".institutional-document-card, .institutional-document-guide-card"));
  cards.forEach(card => {
    card.style.display = "none";
  });

  detailEl.style.display = "block";

  const sectionsHtml = meta.sections.length > 0
    ? `<div class="card" style="margin-top:14px; box-shadow:none; padding:12px">
        <h3 style="font-size:16px; margin-top:0">Struttura di lavoro da completare</h3>
        ${meta.sections.map(s => `
          <div style="margin-bottom:8px">
            <strong>${_esc(s.title)}</strong>: <span style="color:var(--muted)">${_esc(s.description)}</span>
          </div>
        `).join("")}
      </div>`
    : `<div class="notice" style="margin-top:14px">Nessuna struttura disponibile. Usa il template sorgente.</div>`;

  const addNoteHtml = `<button type="button" id="addDocumentNoteButton" class="action secondary" style="margin-top:14px; font-size:12px">Aggiungi osservazione</button>`;

  detailEl.innerHTML = `
    <div class="card">
      <div class="toolbar no-print" style="margin-top:0">
        <button type="button" id="backToDocumentListButton" class="action secondary">Torna ai documenti</button>
        <button type="button" id="openLinkedMatrixButton" class="action secondary">Apri matrice collegata</button>
      </div>

      <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start; border-bottom:1px solid var(--line); padding-bottom:12px; margin-bottom:14px">
        <div>
          <span class="badge warn">${_esc(meta.phase)}</span>
          <h2 style="margin-top:8px">${_esc(doc.title)}</h2>
          <p style="margin:0; color:var(--muted)">${_esc(doc.description)}</p>
        </div>
        <span class="badge ${doc.requiresHumanValidation ? "warn" : "ok"}">${_esc(doc.status || "Catalogo read-only")}</span>
      </div>

      <div class="grid cols-2">
        <div class="notice" style="margin:0">
          <strong>Perché l'ho aperta?</strong><br>
          ${_esc(meta.purpose)}
        </div>
        <div class="notice warn" style="margin:0">
          <strong>A quale fase serve?</strong><br>
          ${_esc(meta.phase)}
        </div>
        <div class="notice" style="margin:0">
          <strong>Cosa devo controllare?</strong><br>
          ${_esc(meta.checks)}
        </div>
        <div class="notice warn" style="margin:0">
          <strong>Output atteso</strong><br>
          ${_esc(meta.output)}
        </div>
      </div>

      ${sectionsHtml}

      <div class="notice warn">
        <strong>Stato:</strong> bozza / da confermare nel gruppo
      </div>
      ${addNoteHtml}
    </div>
  `;

  const backButton = document.getElementById("backToDocumentListButton");
  if (backButton) backButton.addEventListener("click", backToDocumentList);

  const matrixButton = document.getElementById("openLinkedMatrixButton");
  if (matrixButton) matrixButton.addEventListener("click", () => showView("matriceRevisione"));

  const addNoteButton = document.getElementById("addDocumentNoteButton");
  if (addNoteButton) addNoteButton.addEventListener("click", () => {
    showView("matriceRevisione");
    setTimeout(() => {
      const noteDoc = document.getElementById(`draftNote-${_esc(docId)}`);
      if (noteDoc) noteDoc.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  });

  requestAnimationFrame(() => detailEl.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function backToDocumentList() {
  const detailEl = document.getElementById("documentDetail");
  if (detailEl) detailEl.style.display = "none";
  document.querySelectorAll(".institutional-document-card, .institutional-document-guide-card").forEach(card => {
    card.style.display = "";
  });
}
