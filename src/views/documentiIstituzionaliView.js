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
      <h2>Documenti di lavoro</h2>
      <p class="simple-help">Apri la scheda per capire cosa serve preparare.</p>

      <div class="notice" style="margin-bottom:12px">
        <strong>Nota:</strong> ogni documento è una bozza di lavoro fino alla validazione del gruppo.
      </div>

      <div class="institutional-document-grid" id="documentList">
        ${catalog.map(renderDocumentCard).join("")}
      </div>
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

  document.getElementById("documentList").style.display = "none";
  const detailEl = document.getElementById("documentDetail");
  detailEl.style.display = "block";
  detailEl.innerHTML = `
    <div class="card">
      <button type="button" class="action secondary" onclick="backToDocumentList()" style="margin-bottom:12px">Torna ai documenti</button>
      <h2>${_esc(doc.title)}</h2>
      <p>${_esc(doc.description)}</p>
      <div style="margin:12px 0; padding:10px; background:var(--panel); border-left:3px solid var(--primary)">
        <strong>A cosa serve:</strong> ${doc.description}<br>
        <strong>Quando usarlo:</strong> in fase di revisione e consolidamento<br>
        <strong>Cosa produce:</strong> bozza per confronto e validazione
      </div>
      <div class="notice warn">
        <strong>Stato:</strong> bozza / da confermare nel gruppo
      </div>
    </div>
  `;
}

function backToDocumentList() {
  document.getElementById("documentDetail").style.display = "none";
  document.getElementById("documentList").style.display = "grid";
}