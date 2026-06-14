/**
 * Editable document draft model - local draft storage for Curriculum Manager documents
 * NO runtime fetch - all data static references only
 * file:// compatible - localStorage only
 */

const DRAFT_STORAGE_KEY = "curriculumManager.editableDrafts";

function getEditableDraftKey(documentId) {
  return `${DRAFT_STORAGE_KEY}.${documentId}`;
}

function loadEditableDraft(documentId) {
  try {
    const key = getEditableDraftKey(documentId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveEditableDraft(documentId, draftData) {
  try {
    const key = getEditableDraftKey(documentId);
    const dataToSave = {
      ...draftData,
      updatedAt: new Date().toISOString(),
      version: "bozza"
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
    return true;
  } catch {
    return false;
  }
}

function clearEditableDraft(documentId) {
  try {
    const key = getEditableDraftKey(documentId);
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function createEditableDocumentFromCatalog(documentId, catalogDoc, sourceMapEntry) {
  const sections = (catalogDoc.sections || []).map((s, i) => ({
    sectionId: s.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    heading: s.title,
    body: "",
    placeholder: s.description || "",
    order: i + 1,
    linkedRevisionArea: s.title,
    outputRole: "contenuto modificabile"
  }));

  return {
    documentId: documentId,
    title: catalogDoc.title || "Documento senza titolo",
    sourceId: sourceMapEntry ? sourceMapEntry.sourceId : null,
    sections: sections,
    version: "bozza",
    localDraftKey: getEditableDraftKey(documentId),
    updatedAt: null,
    isModified: false
  };
}

function getDraftStatus(documentId) {
  const draft = loadEditableDraft(documentId);
  if (!draft) return "nessuna-bozza";
  if (!draft.updatedAt) return "bozza-non-salvata";
  return "bozza-salvata";
}

function getDraftLastSaved(documentId) {
  const draft = loadEditableDraft(documentId);
  return draft && draft.updatedAt ? new Date(draft.updatedAt) : null;
}

// Export for global access
if (typeof window !== "undefined") {
  window.EDITABLE_DOCUMENT_STATE = {
    DRAFT_STORAGE_KEY,
    loadEditableDraft,
    saveEditableDraft,
    clearEditableDraft,
    createEditableDocumentFromCatalog,
    getEditableDraftKey,
    getDraftStatus,
    getDraftLastSaved
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DRAFT_STORAGE_KEY,
    loadEditableDraft,
    saveEditableDraft,
    clearEditableDraft,
    createEditableDocumentFromCatalog,
    getEditableDraftKey,
    getDraftStatus,
    getDraftLastSaved
  };
}