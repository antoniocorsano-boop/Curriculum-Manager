/**
 * Documenti istituzionali view - read-only catalog
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

/**
 * Documenti istituzionali view - work document collection
 * Pattern: User need → gruppo → documento → azione → output
 */

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
        <button type="button" class="action secondary" style="font-size:12px">Apri scheda</button>
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
  if (doc.id === "curricolo-verticale-istituto") {
    return {
      phase: "Documento guida",
      purpose: "Orientare l'intero percorso di aggiornamento curricolare.",
      checks: "Coerenza tra profilo dello studente, competenze, traguardi, obiettivi, valutazione, inclusione e orientamento.",
      output: "Quadro di riferimento per tutte le revisioni successive."
    };
  }

  if (doc.id.includes("dipartimento") || doc.id.includes("gruppo")) {
    return {
      phase: "Preparazione lavoro nei gruppi",
      purpose: "Preparare materiali condivisi prima del confronto collegiale.",
      checks: "Mandato, ambito, decisioni, proposte, documenti citati e punti ancora aperti.",
      output: "Bozza di lavoro da portare al gruppo o al dipartimento."
    };
  }

  if (doc.id.includes("revisione") || doc.id.includes("approvato")) {
    return {
      phase: "Output da consolidare",
      purpose: "Raccogliere l'esito della revisione e tracciare la validazione.",
      checks: "Motivazioni, parti modificate, organo competente, data/atto e condizioni di validità.",
      output: "Documento consolidato per verifica umana e archiviazione."
    };
  }

  return {
    phase: "Fase di revisione",
    purpose: "Portare nel confronto il quadro disciplinare o trasversale da rivedere.",
    checks: "Progressione verticale, competenze, traguardi, obiettivi, metodologie, valutazione e collegamenti interdisciplinari.",
    output: "Materiale di confronto per aggiornare il curricolo."
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
          <strong>Output prepara:</strong><br>
          ${_esc(meta.output)}
        </div>
      </div>

      <div class="card" style="margin-top:14px; box-shadow:none; padding:12px">
        <h3 style="font-size:16px; margin-top:0">Riferimenti del documento</h3>
        <div class="template-meta">
          <span class="badge">${_esc(doc.category)}</span>
          <span class="badge secondary">${doc.exportAvailable ? "Export disponibile" : "Export non disponibile"}</span>
        </div>
        ${doc.sourceTemplatePath ? `<div style="margin-top:10px"><strong>Template sorgente:</strong><br><span class="path-pill" title="${_esc(doc.sourceTemplatePath)}">${_esc(doc.sourceTemplatePath)}</span></div>` : ""}
      </div>

      <div class="notice warn">
        <strong>Stato:</strong> bozza / da confermare nel gruppo
      </div>
    </div>
  `;

  const backButton = document.getElementById("backToDocumentListButton");
  if (backButton) backButton.addEventListener("click", backToDocumentList);

  const matrixButton = document.getElementById("openLinkedMatrixButton");
  if (matrixButton) matrixButton.addEventListener("click", () => showView("matriceRevisione"));

  requestAnimationFrame(() => detailEl.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function backToDocumentList() {
  const detailEl = document.getElementById("documentDetail");
  if (detailEl) detailEl.style.display = "none";
  document.querySelectorAll(".institutional-document-card, .institutional-document-guide-card").forEach(card => {
    card.style.display = "";
  });
}
