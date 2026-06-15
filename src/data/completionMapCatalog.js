/**
 * Completion Map Catalog - read-only static data
 * Vanilla JS, no dependencies, no fetch, no storage
 */

const completionMapCatalog = {
  areas: [
    {
      id: "fondazione",
      title: "Fondazione normativa e documentale",
      description: "Riferimenti normativi, PTOF, RAV, documenti core del curricolo.",
      status: "parziale",
      present: ["PTOF 2022-2025", "RAV 2024/2025", "Nuove Indicazioni 2025"],
      missing: ["Verifica PTOF 2025-2028 aggiornato", "Collegamento KB canonico RAV"],
      evidences: ["Indice fonti ufficiali", "Guida processo e riferimenti"],
      documents: ["PTOF", "RAV", "Nuove Indicazioni"],
      validationNote: "Validazione umana richiesta: i riferimenti devono essere verificati dai referenti."
    },
    {
      id: "struttura",
      title: "Struttura del curricolo",
      description: "Organ generale del Curriculum di Istituto: ordini, snodi, tempi.",
      status: "in_lavorazione",
      present: ["Cronoprogramma aggiornamento Curricolo Verticale"],
      missing: ["Definizione nodi curricolari", "Allineamento ordini di studio"],
      evidences: ["Cronoprogramma", "Verbale giornate di lavoro"],
      documents: ["Specifica funzionale Manager v2.0"],
      validationNote: "Validazione collegiale richiesta: la struttura deve essere condivisa dai dipartimenti."
    },
    {
      id: "discipline",
      title: "Discipline",
      description: "Quadro discipline per ordine di studio e campi di esperienza.",
      status: "parziale",
      present: ["Elenco discipline infanzia", "Elenco discipline primaria", "Elenco discipline secondaria"],
      missing: ["Collegamento a UDA", "Definizione ore/tempi"],
      evidences: ["Dossier per ordine", "Matrici di revisione"],
      documents: ["UDA", "Programmazioni"],
      validationNote: "Validazione docenti di disciplina richiesta.",
      targetView: "documentiIstituzionali",
      targetLabel: "Apri sezione Documenti"
    },
    {
      id: "verticalita",
      title: "Verticalità / classi / anni",
      description: "Continuità e progressione tra ordini e anni di corso.",
      status: "non_avviato",
      present: [],
      missing: ["Mappatura verticale discipline", "Collegamenti infanzia-primaria-secondaria"],
      evidences: [],
      documents: ["Curricolo Verticale"],
      validationNote: "Validazione referenti di dipartimento richiesta."
    },
    {
      id: "valutazione",
      title: "Valutazione",
      description: "Griglie, rubriche, criteri di valutazione per ordine e disciplina.",
      status: "non_avviato",
      present: [],
      missing: ["Definizione rubrica valutazione", "Griglie per disciplina"],
      evidences: [],
      documents: ["Rubriche Valutazione"],
      validationNote: "Validazione collegi docenti richiesta."
    },
    {
      id: "inclusione",
      title: "Inclusione e personalizzazione",
      description: "Percorsi personalizzati, BES, PDP, adattamenti curricolari.",
      status: "non_avviato",
      present: [],
      missing: ["Mappatura bisogni educativi speciali", "Percorsi personalizzati"],
      evidences: [],
      documents: ["Dossier Inclusione"],
      validationNote: "Validazione docente di sostegno / referente inclusione richiesta."
    },
    {
      id: "revisione",
      title: "Revisione e coerenza",
      description: "Controlli di coerenza, allineamento normativa, completezza.",
      status: "da_revisionare",
      present: ["Matrici di revisione"],
      missing: ["Controllo coerenza finale", "Sintesi modifiche"],
      evidences: ["Report Normalizzazione Tecnologia", "Checklist revisione"],
      documents: ["Matrici Campi di Esperienza", "Matrici Curricolo"],
      validationNote: "Validazione referente curricolo richiesta.",
      targetView: "matriceRevisione",
      targetLabel: "Apri sezione Revisione"
    },
    {
      id: "output",
      title: "Output e validazione finale",
      description: "Documento finale del Curricolo d'Istituto, approvazione collegiale.",
      status: "non_avviato",
      present: [],
      missing: ["Redazione documento finale", "Approvazione collegio docenti", "Pubblicazione"],
      evidences: [],
      documents: ["Dossier Scuola", "Report complessivo del curricolo"],
      validationNote: "Validazione istituzionale finale: spetta al collegio docenti e al dirigente.",
      targetView: "documentOutputCenter",
      targetLabel: "Apri sezione Output"
    }
  ],
  summary: {
    totalAreas: 8,
    completed: 0,
    inProgress: 1,
    partial: 2,
    notStarted: 3,
    review: 1,
    readyForValidation: 0
  }
};
