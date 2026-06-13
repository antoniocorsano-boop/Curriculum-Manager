/**
 * Institutional documents catalog - read-only static data
 * 10 document types linked to source templates
 * No runtime fetching, no external dependencies
 */

const INSTITUTIONAL_DOCUMENTS_CATALOG = [
  {
    id: "curricolo-verticale-istituto",
    title: "Curricolo verticale d'Istituto",
    category: "Curricolo",
    description: "Documento che sintetizza il curricolo verticale dell'Istituto, dalla scuola dell'infanzia alla secondaria di I grado. Include finalità, profilo studente, competenze, traguardi, continuità verticale e inclusione.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/curricolo-verticale-istituto.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "curricolo-ordine-scolastico",
    title: "Curricolo per ordine scolastico",
    category: "Curricolo",
    description: "Documento per il curricolo di un singolo ordine scolastico (infanzia, primaria, secondaria). Include competenze, traguardi, obiettivi, metodologie e valutazione.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/curricolo-ordine-scolastico.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "curricolo-disciplina-campo",
    title: "Curricolo per disciplina/campo di esperienza",
    category: "Curricolo",
    description: "Documento per il curricolo di una disciplina o campo disciplinare. Include finalità, traguardi, obiettivi, nuclei tematici, metodologie e collegamenti interdisciplinari.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/curricolo-disciplina-campo.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "documento-finale-dipartimento",
    title: "Documento finale di dipartimento",
    category: "Documento dipartimento",
    description: "Documento che raccoglie decisioni e proposte condivise da un dipartimento disciplinare. Include ordine del giorno, sintesi lavori, decisioni e azioni successive.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/documento-finale-dipartimento.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "documento-gruppo-lavoro",
    title: "Documento prodotto da gruppo di lavoro",
    category: "Documento gruppo",
    description: "Documento che descrive il lavoro di un gruppo di lavoro tematico. Include mandato, ambito, attività svolte, proposte e questioni aperte.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/documento-gruppo-lavoro.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "documento-revisione-aggiornamento",
    title: "Documento di revisione e aggiornamento curricolare",
    category: "Revisione",
    description: "Documento che descrive modifiche, motivazioni e modalità di aggiornamento del curricolo. Include parti modificate, sintesi modifiche e verifiche richieste.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/documento-revisione-aggiornamento.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "documento-approvato-validato",
    title: "Documento approvato/validato",
    category: "Documento ufficiale",
    description: "Documento ufficiale dell'Istituto con validazione registrata. Include organo competente, data/atto e condizioni di validità.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/documento-approvato-validato.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "quadro-competenze-traguardi-obiettivi",
    title: "Quadro competenze/traguardi/obiettivi",
    category: "Quadro sintetico",
    description: "Documento che sintetizza competenze, traguardi e obiettivi. Include progressione verticale e indicatori osservabili.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/quadro-competenze-traguardi-obiettivi.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "quadro-valutazione-rubriche",
    title: "Quadro valutazione/rubriche",
    category: "Valutazione",
    description: "Documento che definisce criteri e strumenti di valutazione. Include livelli, descrittori, evidenze osservabili e adattamenti per BES.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/quadro-valutazione-rubriche.md",
    requiresHumanValidation: true,
    exportAvailable: false
  },
  {
    id: "allegato-educazione-civica-digitale-orientamento-inclusione",
    title: "Allegato educazione civica/digitale/orientamento/inclusione",
    category: "Allegato",
    description: "Documento che completa i documenti curricolari con approfondimenti specifici. Include attività, valutazione, inclusione e collegamenti interdisciplinari.",
    status: "CATALOGO READ-ONLY — NON UFFICIALE",
    sourceTemplatePath: "templates/documenti-istituzionali/allegato-educazione-civica-digitale-orientamento-inclusione.md",
    requiresHumanValidation: true,
    exportAvailable: false
  }
];

// Export for global access
if (typeof window !== "undefined") {
  window.INSTITUTIONAL_DOCUMENTS_CATALOG = INSTITUTIONAL_DOCUMENTS_CATALOG;
}