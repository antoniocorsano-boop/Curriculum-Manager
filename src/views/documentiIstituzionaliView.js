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
        <div class="card" style="border-left:4px solid var(--primary); margin-bottom:20px">
          <h3 style="margin-top:0">Documento guida del percorso</h3>
          <p style="font-size:13px">${_esc(guideDoc.title)} - ${guideDoc.description.substring(0, 100)}...</p>
          <button type="button" class="action" onclick="showDocumentDetail('${guideDoc.id}')">Apri scheda guida</button>
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
}

function renderDocumentCard(doc) {
  return `
    <article class="institutional-document-card" onclick="showDocumentDetail('${doc.id}')" style="cursor:pointer">
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

function showDocumentDetail(docId) {
  const doc = window.INSTITUTIONAL_DOCUMENTS_CATALOG.find(d => d.id === docId);
  if (!doc) return;

  // Hide all document sections
  document.querySelectorAll(".institutional-document-grid").forEach(g => g.style.display = "none");
  const detailEl = document.getElementById("documentDetail");
  detailEl.style.display = "block";
  
  const phaseText = doc.id.includes("dipartimento") || doc.id.includes("gruppo") ? "Preparazione lavoro nei gruppi" :
                   doc.id.includes("revisione") || doc.id.includes("approvato") ? "Output da consolidare" : "Fase di revisione";

  detailEl.innerHTML = `
    <div class="card">
      <div style="display:flex; gap:8px; margin-bottom:12px">
        <button type="button" class="action secondary" onclick="backToDocumentList()">Torna ai documenti</button>
        <button type="button" class="action secondary" onclick="showView('matriceRevisione')">Apri matrice collegata</button>
      </div>
      <h2>${_esc(doc.title)}</h2>
      <p>${_esc(doc.description)}</p>
      <div style="margin:12px 0; padding:12px; background:var(--panel); border-left:3px solid var(--primary)">
        <strong>Perché l'ho aperta?</strong> Per preparare il lavoro del gruppo.<br>
        <strong>A quale fase serve?</strong> ${phaseText}.<br>
        <strong>Cosa devo controllare?</strong> Coerenza con il documento guida.<br>
        <strong>Output prepara:</strong> Bozza per discussione.
      </div>
      <div class="notice warn">
        <strong>Stato:</strong> bozza / da confermare nel gruppo
      </div>
    </div>
  `;
}

function backToDocumentList() {
  document.getElementById("documentDetail").style.display = "none";
  document.querySelectorAll(".institutional-document-grid").forEach(g => g.style.display = "grid");
}