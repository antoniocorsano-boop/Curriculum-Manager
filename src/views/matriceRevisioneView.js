/**
 * Matrice revisione view - read-only revision control matrix
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
        <strong>Attenzione:</strong> nessun export DOCX/PDF è disponibile. Serve validazione umana antes di qualsiasi uso.
      </div>

      <div class="notice">
        <strong>Dati personali:</strong> non inserire dati personali, dati identificativi, nomi reali di studenti, famiglie, docenti o istituzioni.
      </div>

      <div class="revision-matrix">
        ${catalog.map(renderRevisionMatrixRow).join("")}
      </div>
    </div>
  `;
}

function renderRevisionMatrixRow(item) {
  const checksList = (item.requiredChecks || []).map(c => `<li>${_esc(c)}</li>`).join("");

  return `
    <article class="revision-matrix-card">
      <h3>${_esc(item.documentTitle)}</h3>
      <div class="template-meta">
        <span class="badge">${_esc(item.category)}</span>
        <span class="badge warn">DA REVISIONARE — READ-ONLY</span>
      </div>
      <div class="row"><strong>Area revisione</strong>${_esc(item.revisionArea)}</div>
      <div class="row"><strong>Controlli richiesti</strong>
        <ul class="revision-check-list">${checksList}</ul>
      </div>
      <div class="notice warn">
        <strong>Note:</strong> Export non disponibile. Validazione umana richiesta. Dati personali: non ammessi.
      </div>
    </article>
  `;
}