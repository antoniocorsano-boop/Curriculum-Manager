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

function renderDocumentiIstituzionaliView() {
  const catalog = window.INSTITUTIONAL_DOCUMENTS_CATALOG || [];
  const el = document.getElementById("documentiIstituzionali");

  el.innerHTML = `
    <div class="card">
      <h2>Documenti istituzionali</h2>
      <p class="simple-help">Catalogo read-only dei documenti istituzionali collegati ai template sorgente.</p>

      <div class="notice warn">
        <strong>Attenzione:</strong> nessun documento viene creato in questa vista. Questo è solo un catalogo informativo.
      </div>

      <div class="notice">
        <strong>Dati personali:</strong> non inserire dati personali, dati identificativi, nomi reali di studenti, famiglie, docenti o istituzioni senza verifica e procedure autorizzate.
      </div>

      <div class="notice">
        <strong>Validazione umana:</strong> ogni documento compilato richiede validazione umana prima di essere considerato bozza, revisionato, validato o approvato.
      </div>

      <div class="notice warn">
        <strong>Limitazione tecnica:</strong> nessun export DOCX/PDF è disponibile in questa vista. I template sono file Markdown sorgente da aprire e compilare manualmente.
      </div>

      <div class="institutional-document-grid">
        ${catalog.map(renderDocumentCard).join("")}
      </div>
    </div>
  `;
}

function renderDocumentCard(doc) {
  return `
    <article class="institutional-document-card">
      <h3>${_esc(doc.title)}</h3>
      <div class="template-meta">
        <span class="badge">${_esc(doc.category)}</span>
        <span class="badge warn">CATALOGO READ-ONLY — NON UFFICIALE</span>
      </div>
      <p>${_esc(doc.description)}</p>
      <div class="template-sections">
        <strong>Template sorgente:</strong>
        <span class="path-pill" title="${_esc(doc.sourceTemplatePath)}">${_esc(doc.sourceTemplatePath)}</span>
      </div>
      <div class="notice">
        <strong>Note:</strong> Export non disponibile in questa vista. Richiede validazione umana.
      </div>
    </article>
  `;
}