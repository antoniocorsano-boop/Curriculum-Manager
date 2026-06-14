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
        <strong>Attenzione:</strong> nessun export DOCX è disponibile. Stampa/PDF tramite browser. Esportazione JSON/MD delle bozze locali. Validazione umana prima di qualsiasi uso.
      </div>

       <div class="notice">
         <strong>Dati personali:</strong> non inserire dati personali, dati identificativi, nomi reali di studenti, famiglie, docenti o istituzioni.
       </div>

<div class="toolbar no-print">
          <button type="button" class="action secondary" onclick="window.print()">Stampa / Salva in PDF</button>
          <button type="button" class="action secondary" onclick="resetAllDraftNotes()" style="margin-left:8px">Reset bozze locali</button>
          <button type="button" class="action secondary" onclick="exportRevisionMatrixJSON()" style="margin-left:8px">Esporta JSON</button>
          <button type="button" class="action secondary" onclick="exportRevisionMatrixMarkdown()" style="margin-left:8px">Esporta Markdown</button>
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

/* Export functions - client-side only, no DOCX/PDF generation */
function exportRevisionMatrixJSON() {
  const catalog = window.REVISION_MATRIX_CATALOG || [];
  const drafts = JSON.parse(localStorage.getItem("cmDraftNotes") || "{}");
  const data = catalog.map(item => ({
    ...item,
    draftNote: drafts[item.id] || undefined
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "matrice-revisione-bozza.json";
  a.click();
  URL.revokeObjectURL(url);
}

function exportRevisionMatrixMarkdown() {
  const catalog = window.REVISION_MATRIX_CATALOG || [];
  const drafts = JSON.parse(localStorage.getItem("cmDraftNotes") || "{}");
  let md = "# Matrice Revisione - Bozza Locale\n\n";
  catalog.forEach(item => {
    md += `## ${item.documentTitle}\n`;
    md += `**Categoria:** ${item.category}\n\n`;
    md += `**Area revisione:** ${item.revisionArea}\n\n`;
    md += `**Stato:** ${item.status}\n\n`;
    if (item.requiredChecks?.length) {
      md += `**Controlli richiesti:**\n`;
      item.requiredChecks.forEach(c => md += `- ${c}\n`);
      md += "\n";
    }
    if (drafts[item.id]) {
      md += `**Bozza locale:**\n${drafts[item.id]}\n\n`;
    }
    md += "---\n\n";
  });
  const blob = new Blob([md], {type: "text/markdown"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "matrice-revisione-bozza.md";
  a.click();
  URL.revokeObjectURL(url);
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