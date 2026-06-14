/**
 * Documenti istituzionali view - editable draft support for work documents
 * No export, no DOCX/PDF generation
 * localStorage only - no backend
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
      <p class="simple-help">Apri un documento per consultarne il contenuto o struttura di lavoro.</p>

      <div class="notice" style="margin-bottom:16px">
        <strong>Nota:</strong> ogni documento è una bozza di lavoro fino alla validazione del gruppo.
      </div>

      ${guideDoc ? `
        <div class="card institutional-document-guide-card" data-document-id="${_esc(guideDoc.id)}" style="border-left:4px solid var(--primary); margin-bottom:20px">
          <h3 style="margin-top:0">Documento guida del percorso</h3>
          <p style="font-size:13px">${_esc(guideDoc.title)} - ${_esc(guideDoc.description.substring(0, 100))}...</p>
          <button type="button" class="action" data-document-detail-trigger data-document-id="${_esc(guideDoc.id)}">Apri documento</button>
        </div>
      ` : ""}

      ${groupDocs.length ? `
        <h3 style="margin-top:20px">Documenti di revisione</h3>
        <p style="font-size:13px; color:var(--muted)">Per la revisione documentale.</p>
        <div class="institutional-document-grid" style="margin-bottom:20px">
          ${groupDocs.map(renderDocumentCard).join("")}
        </div>
      ` : ""}

      ${revisionDocs.length ? `
        <h3>Documenti di gruppo</h3>
        <p style="font-size:13px; color:var(--muted)">Materiale di lavoro condiviso.</p>
        <div class="institutional-document-grid" style="margin-bottom:20px">
          ${revisionDocs.map(renderDocumentCard).join("")}
        </div>
      ` : ""}

      ${outputDocs.length ? `
        <h3>Output documentale</h3>
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
        <button type="button" class="action" style="font-size:12px">Apri documento</button>
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

   const sourceMap = window.DOCUMENT_SOURCE_IMPORT_MAP?.find(m => m.targetDocumentId === docId) || null;
   const draftState = window.EDITABLE_DOCUMENT_STATE;

   let editableSections = [];
   if (meta.sections.length > 0) {
     const savedDraft = draftState ? draftState.loadEditableDraft(docId) : null;
     editableSections = meta.sections.map((s, i) => ({
       sectionId: `section-${i + 1}`,
       heading: s.title,
       body: savedDraft && savedDraft.sections ? savedDraft.sections[i]?.body || "" : "",
       placeholder: s.description || "Inserisci contenuto...",
       order: i + 1,
       linkedRevisionArea: s.title,
       outputRole: "contenuto modificabile"
     }));
   }

   const draftStatus = draftState ? draftState.getDraftStatus(docId) : "nessuna-bozza";
   const lastSaved = draftState ? draftState.getDraftLastSaved(docId) : null;
   const statusText = draftStatus === "bozza-salvata" 
     ? `Salvato su questo dispositivo: ${lastSaved ? lastSaved.toLocaleDateString() + " " + lastSaved.toLocaleTimeString() : ""}`
     : draftStatus === "bozza-non-salvata" 
     ? "Modifiche non salvate" 
     : "Bozza non ancora salvata";

   const documentBodyHtml = `
     <div class="card editable-document-section" style="margin-bottom:16px; padding:16px">
       <h3 style="font-size:18px; margin-top:0; color:var(--primary)">Bozza modificabile</h3>
       ${editableSections.length > 0
         ? `<div style="font-size:14px; line-height:1.5">
             ${editableSections.map((s) => `
               <div style="margin-bottom:16px">
                 <label style="display:block; font-weight:600; margin-bottom:6px">${_esc(s.order)}. ${_esc(s.heading)}</label>
                 <textarea 
                   data-section="${_esc(s.sectionId)}" 
                   data-doc="${_esc(docId)}"
                   placeholder="${_esc(s.placeholder)}"
                   class="editable-draft-textarea"
                   style="width:100%; min-height:80px; font-size:13px; padding:8px; border:1px solid var(--line); border-radius:4px; resize:vertical">${_esc(s.body)}</textarea>
               </div>
             `).join("")}
           </div>`
         : `<p style="color:var(--muted)">Nessuna struttura disponibile. Usa il template sorgente.</p>`
       }
       <div style="margin-top:12px; font-size:12px; color:var(--muted)">
         ${_esc(statusText)}
       </div>
     </div>
   `;

   const guideHtml = `
     <details class="card" style="margin-top:16px; padding:12px">
       <summary style="cursor:pointer; font-weight:600; margin-bottom:8px">Guida rapida</summary>
       <div style="font-size:13px; line-height:1.4">
         <div style="margin-bottom:8px"><strong>Fase:</strong> ${_esc(meta.phase)}</div>
         <div style="margin-bottom:8px"><strong>Output:</strong> ${_esc(meta.output)}</div>
         <div style="margin-bottom:8px"><strong>Check:</strong> ${_esc(meta.checks)}</div>
       </div>
     </details>
   `;

   detailEl.innerHTML = `
     <div class="card">
       <div class="toolbar no-print" style="margin-top:0">
         <button type="button" id="backToDocumentListButton" class="action secondary">Torna ai documenti</button>
       </div>

       <div style="border-bottom:1px solid var(--line); padding-bottom:12px; margin-bottom:14px">
         <span class="badge warn">${_esc(meta.phase)}</span>
         <span class="badge ${doc.requiresHumanValidation ? "warn" : "ok"}">${_esc(doc.status || "Catalogo read-only")}</span>
         ${sourceMap ? `<span class="badge" style="margin-left:6px; background:var(--primary)">Fonte: SchoolDocs</span>` : ""}
         <h2 style="margin-top:8px">${_esc(doc.title)}</h2>
         <p style="margin:0; color:var(--muted)">${_esc(doc.description)}</p>
       </div>

       ${documentBodyHtml}

       ${guideHtml}

       <div class="toolbar" style="margin-top:16px; gap:8px; flex-wrap:wrap">
         <button type="button" id="saveDraftButton" class="action">Salva bozza</button>
         <button type="button" id="resetDraftButton" class="action secondary">Ripristina bozza iniziale</button>
         <button type="button" id="prepareForRevisionButton" class="action secondary" style="display:none">Pronto per revisione</button>
         <button type="button" id="openLinkedMatrixButton" class="action secondary">Apri revisione collegata</button>
         <button type="button" id="addDocumentNoteButton" class="action secondary">Aggiungi osservazione</button>
       </div>
     </div>
   `;

   const backButton = document.getElementById("backToDocumentListButton");
   if (backButton) backButton.addEventListener("click", backToDocumentList);

   const saveDraftButton = document.getElementById("saveDraftButton");
   if (saveDraftButton) saveDraftButton.addEventListener("click", () => saveEditableDocumentDraft(docId));

   const resetDraftButton = document.getElementById("resetDraftButton");
   if (resetDraftButton) resetDraftButton.addEventListener("click", () => resetEditableDocumentDraft(docId));

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

 function saveEditableDocumentDraft(docId) {
   const textareas = document.querySelectorAll(`textarea[data-doc="${docId}"]`);
   const sections = Array.from(textareas).map(ta => ({
     sectionId: ta.dataset.section,
     body: ta.value
   }));

   const draftData = {
     documentId: docId,
     sections: sections,
     version: "bozza"
   };

   if (window.EDITABLE_DOCUMENT_STATE && window.EDITABLE_DOCUMENT_STATE.saveEditableDraft) {
     window.EDITABLE_DOCUMENT_STATE.saveEditableDraft(docId, draftData);
   }

   const statusEl = document.querySelector(".editable-document-section div:last-child");
   if (statusEl) {
     statusEl.textContent = `Salvato su questo dispositivo: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
   }
 }

 function resetEditableDocumentDraft(docId) {
   const textareas = document.querySelectorAll(`textarea[data-doc="${docId}"]`);
   textareas.forEach(ta => ta.value = "");

   if (window.EDITABLE_DOCUMENT_STATE && window.EDITABLE_DOCUMENT_STATE.clearEditableDraft) {
     window.EDITABLE_DOCUMENT_STATE.clearEditableDraft(docId);
   }

   const statusEl = document.querySelector(".editable-document-section div:last-child");
   if (statusEl) {
     statusEl.textContent = "Bozza ripristinata. Modifiche non salvate.";
   }
 }

function backToDocumentList() {
  const detailEl = document.getElementById("documentDetail");
  if (detailEl) detailEl.style.display = "none";
  document.querySelectorAll(".institutional-document-card, .institutional-document-guide-card").forEach(card => {
    card.style.display = "";
  });
}
