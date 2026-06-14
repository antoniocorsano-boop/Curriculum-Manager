/**
 * Matrice revisione view - read-only revision control matrix
 * Local draft notes support via localStorage
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

function renderMatriceRevisioneView() {
   const catalog = window.REVISION_MATRIX_CATALOG || [];
   const el = document.getElementById("matriceRevisione");

   el.innerHTML = `
     <div class="card">
       <h2>Matrice revisione</h2>
       <p class="simple-help">Controllo read-only dei documenti istituzionali.</p>

       <div class="notice">
         <strong>Nota:</strong> la matrice è informativa. Nessun documento viene creato in questa vista.
       </div>

       <div class="notice warn">
         <strong>Attenzione:</strong> nessun export DOCX è disponibile. Stampa/PDF tramite browser. Validazione umana prima di qualsiasi uso.
       </div>

       <div class="notice">
         <strong>Dati personali:</strong> non inserire dati personali, dati identificativi, nomi reali di studenti, famiglie, docenti o istituzioni.
       </div>

       <div class="toolbar no-print">
         <button type="button" class="action secondary" onclick="window.print()">Stampa / Salva in PDF</button>
         <button type="button" class="action secondary" onclick="resetAllDraftNotes()" style="margin-left:8px">Reset bozze locali</button>
       </div>

       <div class="revision-matrix">
         ${catalog.map(renderRevisionMatrixRow).join("")}
       </div>
     </div>
   `;
 }

function loadDraftNote(itemId) {
  try {
    const drafts = JSON.parse(localStorage.getItem("cmDraftNotes") || "{}");
    return drafts[itemId] || "";
  } catch { return ""; }
}

function saveDraftNote(itemId, note) {
  try {
    const drafts = JSON.parse(localStorage.getItem("cmDraftNotes") || "{}");
    drafts[itemId] = note;
    localStorage.setItem("cmDraftNotes", JSON.stringify(drafts));
  } catch {}
}

function resetAllDraftNotes() {
  localStorage.removeItem("cmDraftNotes");
  renderMatriceRevisioneView();
}

function renderRevisionMatrixRow(item) {
  const checksList = (item.requiredChecks || []).map(c => `<li>${_esc(c)}</li>`).join("");
  const priorityLabel = "Media";
  const statusBadge = item.humanValidationRequired ? "badge warn" : "badge ok";
  const draftNote = loadDraftNote(item.id);

  return `
    <article class="revision-matrix-card">
      <h3>${_esc(item.documentTitle)}</h3>
      <div class="template-meta">
        <span class="badge">${_esc(item.category)}</span>
        <span class="${statusBadge}">${_esc(item.status)}</span>
      </div>
      <div class="row"><strong>Area revisione</strong>${_esc(item.revisionArea)}</div>
      <div class="row"><strong>Controlli richiesti</strong>
        <ul class="revision-check-list">${checksList}</ul>
      </div>
      <div class="row"><strong>Criticità / Priorità</strong><span class="badge">${priorityLabel}</span></div>
      <div class="row"><strong>Prossima azione</strong>${_esc(item.requiredChecks?.[0] || "Nessuna")}</div>
      <div class="row"><strong>Bozza locale (non ufficiale)</strong>
        <textarea class="draft-note-input" data-id="${item.id}" placeholder="Aggiungi nota locale..." style="width:100%;height:60px;font-size:12px;margin-top:4px" onchange="saveDraftNote('${item.id}', this.value)">${_esc(draftNote)}</textarea>
      </div>
      <div class="notice warn">
        <strong>Note:</strong> Export non disponibile. Validazione umana richiesta. Dati personali: non ammessi.
      </div>
    </article>
  `;
}