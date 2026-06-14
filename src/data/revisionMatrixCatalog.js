/**
 * Revision matrix catalog - read-only data for institutional documents
 * 10 document types with revision control points
 * No runtime fetching, no external dependencies
 */

const REVISION_MATRIX_CATALOG = [
  {
    id: "curricolo-verticale-istituto",
    documentTitle: "Curricolo verticale d'Istituto",
    category: "Curricolo",
    revisionArea: "Coerenza verticale e traguardi",
    requiredChecks: [
      "Coerenza tra ordini/classi",
      "Presenza di traguardi e obiettivi",
      "Validazione collegiale"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "curricolo-ordine-scolastico",
    documentTitle: "Curricolo per ordine scolastico",
    category: "Curricolo",
    revisionArea: "Competenze e obiettivi specifici",
    requiredChecks: [
      "Competenze chiave definite",
      "Obiettivi allineati a Indicazioni Nazionali",
      "Metodologie verificate"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "curricolo-disciplina-campo",
    documentTitle: "Curricolo per disciplina/campo di esperienza",
    category: "Curricolo",
    revisionArea: "Nuclei tematici e progressione",
    requiredChecks: [
      "Nuclei tematici completi",
      "Collegamenti interdisciplinari",
      "Valutazione allineata"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "documento-finale-dipartimento",
    documentTitle: "Documento finale di dipartimento",
    category: "Documento dipartimento",
    revisionArea: "Decisioni e proposte condivise",
    requiredChecks: [
      "Ordine del giorno chiaro",
      "Decisioni registrate",
      "Azioni successive assegnate"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "documento-gruppo-lavoro",
    documentTitle: "Documento prodotto da gruppo di lavoro",
    category: "Documento gruppo",
    revisionArea: "Mandato e lavoro svolto",
    requiredChecks: [
      "Mandato definito",
      "Attività documentate",
      "Proposte verificate"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "documento-revisione-aggiornamento",
    documentTitle: "Documento di revisione e aggiornamento curricolare",
    category: "Revisione",
    revisionArea: "Modifiche e motivazioni",
    requiredChecks: [
      "Motivazione chiara",
      "Parti modificate indicate",
      "Verifiche richieste documentate"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "documento-approvato-validato",
    documentTitle: "Documento approvato/validato",
    category: "Documento ufficiale",
    revisionArea: "Validazione e stato",
    requiredChecks: [
      "Organo competente indicato",
      "Data/atto verificato",
      "Distribuzione documentata"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "quadro-competenze-traguardi-obiettivi",
    documentTitle: "Quadro competenze/traguardi/obiettivi",
    category: "Quadro sintetico",
    revisionArea: "Sintesi e coerenza",
    requiredChecks: [
      "Competenze allineate al curricolo",
      "Traguardi progressivi",
      "Indicatori verificabili"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "quadro-valutazione-rubriche",
    documentTitle: "Quadro valutazione/rubriche",
    category: "Valutazione",
    revisionArea: "Criteri e strumenti",
    requiredChecks: [
      "Criteri chiari",
      "Livelli definiti",
      "Evidenze osservabili"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  },
  {
    id: "allegato-educazione-civica-digitale-orientamento-inclusione",
    documentTitle: "Allegato educazione civica/digitale/orientamento/inclusione",
    category: "Allegato",
    revisionArea: "Completeness and inclusion",
    requiredChecks: [
      "Attività inclusive",
      "Collegamenti interdisciplinari",
      "Adattamenti BES documentati"
    ],
    humanValidationRequired: true,
    personalDataAllowed: false,
    exportAvailable: false,
    status: "DA REVISIONARE — READ-ONLY",
    notes: "Scheda informativa. Non crea documenti e non avvia export."
  }
];

// Export for global access
if (typeof window !== "undefined") {
  window.REVISION_MATRIX_CATALOG = REVISION_MATRIX_CATALOG;
}