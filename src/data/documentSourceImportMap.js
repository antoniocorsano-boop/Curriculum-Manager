/**
 * Document source import map - static mapping of SchoolDocs documents to Curriculum Manager
 * NO runtime fetch - all paths are references only
 * file:// compatible
 */

const DOCUMENT_SOURCE_IMPORT_MAP = [
  {
    sourceId: "tecnologia-uda-base",
    title: "UDA Tecnologia base",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/uda-template.md",
    sourceType: "UDA",
    sourceStatus: "imported_candidate",
    targetDocumentId: "curricolo-disciplina-campo",
    targetDocumentTitle: "Curricolo per disciplina/campo di esperienza",
    targetEditableType: "UDA",
    processPhase: "Preparazione lavoro nei gruppi",
    revisionArea: "Nuclei tematici e progressione",
    outputRole: "Materiale di confronto per aggiornare il curricolo",
    importPriority: "high",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "contesto-e-motivazione": "Finalità",
      "dati-generali": "Dati generali",
      "competenze-attese": "Competenze chiave",
      "obiettivi-di-apprendimento": "Obiettivi",
      "faso-operative-delluda": "Nuclei tematici"
    }
  },
  {
    sourceId: "tecnologia-rubrica-base",
    title: "Rubrica valutazione Tecnologia",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/rubrica-valutazione-tecnologia.md",
    sourceType: "rubric",
    sourceStatus: "imported_candidate",
    targetDocumentId: "quadro-valutazione-rubriche",
    targetDocumentTitle: "Quadro valutazione/rubriche",
    targetEditableType: "rubric",
    processPhase: "Output da consolidare",
    revisionArea: "Criteri e strumenti",
    outputRole: "Strumento di valutazione per il curricolo",
    importPriority: "high",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "dati-generali": "Criteri",
      "livelli-descrittivi": "Livelli",
      "ambiti-valutativi": "Evidenze",
      "descrittori-per-ambito-e-livello": "Adattamenti BES"
    }
  },
  {
    sourceId: "tecnologia-griglia-base",
    title: "Griglia osservazione competenze Tecnologia",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/griglia-osservazione-competenze.md",
    sourceType: "observation_grid",
    sourceStatus: "imported_candidate",
    targetDocumentId: "quadro-valutazione-rubriche",
    targetDocumentTitle: "Quadro valutazione/rubriche",
    targetEditableType: "observation_grid",
    processPhase: "Preparazione lavoro nei gruppi",
    revisionArea: "Sintesi e coerenza",
    outputRole: "Quadro sintetico per revisione",
    importPriority: "high",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "indicatori-osservabili": "Competenze",
      "griglia-osservativa": "Traguardi",
      "note-del-docente": "Obiettivi",
      "indicatori": "Indicatori"
    }
  },
  {
    sourceId: "tecnologia-programmazione-prima",
    title: "Programmazione annuale Tecnologia - Classe prima",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/programmazione-annuale-classe-prima.md",
    sourceType: "annual_plan",
    sourceStatus: "imported_candidate",
    targetDocumentId: "curricolo-ordine-scolastico",
    targetDocumentTitle: "Curricolo per ordine scolastico",
    targetEditableType: "annual_plan",
    processPhase: "Preparazione lavoro nei gruppi",
    revisionArea: "Competenze e obiettivi specifici",
    outputRole: "Materiale di confronto per aggiornare il curricolo",
    importPriority: "high",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "finalita-formative": "Competenze chiave",
      "profilo-iniziale-atteso": "Traguardi specifici",
      "competenze-attese-a-fine-anno": "Obiettivi",
      "contenuti-annuali-per-macro-periodi": "Metodologie"
    }
  },
  {
    sourceId: "tecnologia-programmazione-seconda",
    title: "Programmazione annuale Tecnologia - Classe seconda",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/programmazione-annuale-classe-seconda.md",
    sourceType: "annual_plan",
    sourceStatus: "imported_candidate",
    targetDocumentId: "curricolo-ordine-scolastico",
    targetDocumentTitle: "Curricolo per ordine scolastico",
    targetEditableType: "annual_plan",
    processPhase: "Preparazione lavoro nei gruppi",
    revisionArea: "Competenze e obiettivi specifici",
    outputRole: "Materiale di confronto per aggiornare il curricolo",
    importPriority: "high",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "finalita-formative": "Competenze chiave",
      "profilo-iniziale-atteso": "Traguardi specifici",
      "competenze-attese-a-fine-anno": "Obiettivi",
      "contenuti-annuali-per-macro-periodi": "Metodologie"
    }
  },
  {
    sourceId: "tecnologia-programmazione-terza",
    title: "Programmazione annuale Tecnologia - Classe terza",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/programmazione-annuale-classe-terza.md",
    sourceType: "annual_plan",
    sourceStatus: "imported_candidate",
    targetDocumentId: "curricolo-ordine-scolastico",
    targetDocumentTitle: "Curricolo per ordine scolastico",
    targetEditableType: "annual_plan",
    processPhase: "Preparazione lavoro nei gruppi",
    revisionArea: "Competenze e obiettivi specifici",
    outputRole: "Materiale di confronto per aggiornare il curricolo",
    importPriority: "high",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "finalita-formative": "Competenze chiave",
      "profilo-iniziale-atteso": "Traguardi specifici",
      "competenze-attese-a-fine-anno": "Obiettivi",
      "contenuti-annuali-per-macro-periodi": "Metodologie"
    }
  },
  {
    sourceId: "tecnologia-verbale-template",
    title: "Verbale dipartimento Tecnologia - Template",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/verbale-dipartimento-template.md",
    sourceType: "meeting_minutes",
    sourceStatus: "imported_candidate",
    targetDocumentId: "documento-finale-dipartimento",
    targetDocumentTitle: "Documento finale di dipartimento",
    targetEditableType: "meeting_minutes",
    processPhase: "Preparazione lavoro nei gruppi",
    revisionArea: "Decisioni e proposte condivise",
    outputRole: "Bozza di lavoro da portare al gruppo o al dipartimento",
    importPriority: "medium",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "intestazione": "Dati generali",
      "dati-della-riunione": "Ordine del giorno",
      "punti-discussi": "Sintesi lavori",
      "decisioni-e-proposte": "Decisioni",
      "azioni-subsequenti": "Azioni successive"
    }
  },
  {
    sourceId: "tecnologia-schede-revisione",
    title: "Schede revisione curricolo/UDA Tecnologia",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/schede-revisione-curricolo-uda.md",
    sourceType: "review_sheet",
    sourceStatus: "imported_candidate",
    targetDocumentId: "documento-revisione-aggiornamento",
    targetDocumentTitle: "Documento di revisione e aggiornamento curricolare",
    targetEditableType: "review_sheet",
    processPhase: "Output da consolidare",
    revisionArea: "Modifiche e motivazioni",
    outputRole: "Documento consolidato per verifica umana",
    importPriority: "medium",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "campi-da-compilare": "Dati generali",
      "revisione": "Motivazione",
      "modifiche-richieste": "Parti modificate",
      "esito": "Verifiche richieste"
    }
  },
  {
    sourceId: "tecnologia-schede-revisione-curricolo",
    title: "Scheda revisione curricolo Tecnologia",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/scheda-revisione-curricolo.md",
    sourceType: "review_sheet",
    sourceStatus: "imported_candidate",
    targetDocumentId: "documento-revisione-aggiornamento",
    targetDocumentTitle: "Documento di revisione e aggiornamento curricolare",
    targetEditableType: "review_sheet",
    processPhase: "Output da consolidare",
    revisionArea: "Modifiche e motivazioni",
    outputRole: "Documento consolidato per verifica umana",
    importPriority: "low",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "documento-revisionato": "Dati generali",
      "criticita": "Motivazione",
      "modifiche-richieste": "Parti modificate"
    }
  },
  {
    sourceId: "tecnologia-guida-kit",
    title: "Guida operativa kit docente Tecnologia",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/guida-operativa.md",
    sourceType: "operational_guide",
    sourceStatus: "local_static",
    targetDocumentId: "curricolo-verticale-istituto",
    targetDocumentTitle: "Curricolo verticale d'Istituto",
    targetEditableType: "guide_reference",
    processPhase: "Orientamento nel percorso",
    revisionArea: "Coerenza verticale e traguardi",
    outputRole: "Quadro di riferimento per tutte le revisioni successive",
    importPriority: "reference",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {
      "panoramica": "Premessa",
      "percorso-consigliato-per-il-docente": "Riferimenti prudenziali",
      "esigenza-docente-documento-da-usare": "Finalità formative"
    }
  },
  {
    sourceId: "tecnologia-mappa-documenti",
    title: "Mappa documenti kit docente Tecnologia",
    sourceRepo: "SchoolDocs",
    sourcePath: "kb/discipline/tecnologia/kit-docente/mappa-documenti.md",
    sourceType: "documents_map",
    sourceStatus: "missing",
    targetDocumentId: null,
    targetDocumentTitle: null,
    targetEditableType: "reference_map",
    processPhase: "Orientamento nel percorso",
    revisionArea: "Coerenza verticale e traguardi",
    outputRole: "Quadro di riferimento per tutte le revisioni successive",
    importPriority: "reference",
    humanValidationRequired: true,
    isOfficial: false,
    sectionMapping: {}
  }
];

// Export for global access
if (typeof window !== "undefined") {
  window.DOCUMENT_SOURCE_IMPORT_MAP = DOCUMENT_SOURCE_IMPORT_MAP;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DOCUMENT_SOURCE_IMPORT_MAP };
}