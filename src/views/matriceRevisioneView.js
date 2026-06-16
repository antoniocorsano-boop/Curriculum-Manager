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
        <h2>Lavoro di revisione</h2>
        <p class="simple-help">Preparazione del confronto collegiale. Raccogli osservazioni operative prima del confronto.</p>

        <div class="notice warn" style="margin-bottom:12px">
          <strong>Attenzione:</strong> questa sezione non approva documenti. Serve a preparare bozze per il confronto collegiale. Le annotazioni sono locali e non costituiscono validazione formale.
        </div>

        <div class="notice" style="margin-bottom:12px">
          <strong>Nota:</strong> ogni annotazione è una bozza di lavoro fino alla validazione del gruppo.
        </div>

        <div class="toolbar no-print">
          <button type="button" class="action secondary" onclick="window.print()">Prepara per il confronto</button>
          <button type="button" class="action secondary" onclick="resetAllDraftNotes()" style="margin-left:8px">Reset annotazioni</button>
          <button type="button" class="action secondary" onclick="exportRevisionMatrixJSON()" style="margin-left:8px">Scarica copia dati</button>
          <button type="button" class="action secondary" onclick="exportRevisionMatrixMarkdown()" style="margin-left:8px">Scarica bozza testuale</button>
          <button type="button" class="action secondary" onclick="toggleWorkflow()" style="margin-left:8px">Mostra percorso</button>
        </div>

        <div class="card" id="workflowSection" style="display:none; margin-top:12px">
          <h3>Percorso guidato Curriculum Manager</h3>
          <p class="simple-help">Workflow consigliato per la revisione documentale.</p>
          <div id="workflowMap"></div>
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
   if (!confirm("Resettare tutte le annotazioni locali?")) return;
   localStorage.removeItem("cmDraftNotes");
   renderMatriceRevisioneView();
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
      <div class="row"><strong>Cosa stiamo rivedendo</strong>${_esc(item.revisionArea)}</div>
      <div class="row"><strong>Da controllare</strong>
        <ul class="revision-check-list">${checksList}</ul>
      </div>
      <div class="row"><strong>Quanto è urgente</strong><span class="badge">${priorityLabel}</span></div>
      <div class="row"><strong>Cosa fare ora</strong>${_esc(item.requiredChecks?.[0] || "Nessuna")}</div>
      <div class="row"><strong>Annotazione di lavoro</strong>
        <textarea id="draftNote-${_esc(item.id)}" class="draft-note-input" data-id="${_esc(item.id)}" placeholder="Aggiungi osservazione..." style="width:100%;height:60px;font-size:12px;margin-top:4px" onchange="saveDraftNote('${_esc(item.id)}', this.value)">${_esc(draftNote)}</textarea>
      </div>
    </article>
  `;
}

function renderWorkflowMap() {
  const catalog = window.WORKFLOW_PROCESS_CATALOG || [];
  const el = document.getElementById("workflowMap");

  const nodes = catalog.map((step, idx) => {
    const statusClass = step.status === "COMPLETATO" ? "ok" : step.status === "FUTURA" ? "" : "warn";
    return `
      <div class="workflow-node" style="margin-bottom:12px; padding:10px; border-left:4px solid var(--${step.status === "COMPLETATO" ? "ok" : step.status === "FUTURA" ? "muted" : "primary"})">
        <strong style="display:block; margin-bottom:4px">${idx + 1}. ${_esc(step.title)}</strong>
        <p style="margin:0 0 6px; font-size:13px; color:var(--muted)">${_esc(step.description)}</p>
        <span class="badge ${statusClass}">${_esc(step.status)}</span>
        ${step.primaryAction ? `<button type="button" class="action secondary" style="margin-left:8px; font-size:11px" onclick="showView('${step.primaryAction}')">Vai</button>` : ""}
      </div>
    `;
  }).join("");
  
  el.innerHTML = `<div style="display:flex; flex-wrap:wrap; gap:14px">${nodes}</div>`;
}

function toggleWorkflow() {
  const section = document.getElementById("workflowSection");
  const isHidden = section.style.display === "none";
  section.style.display = isHidden ? "block" : "none";
  if (isHidden) renderWorkflowMap();
}