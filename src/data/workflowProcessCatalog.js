/**
 * Workflow process catalog - guided user journey for Curriculum Manager
 * Data-driven visualization, no external dependencies
 */

const WORKFLOW_PROCESS_CATALOG = [
  {
    id: "orientamento",
    title: "Orientamento nel percorso",
    description: "Consultare la documentazione di base e leggere le avvertenze sui dati e la validazione.",
    status: "COMPLETATO",
    primaryAction: "modelliSorgente",
    secondaryAction: null
  },
  {
    id: "consultazione",
    title: "Consultazione documenti",
    description: "Esplorare i modelli sorgente e i documenti istituzionali disponibili.",
    status: "ATTIVA",
    primaryAction: "documentiIstituzionali",
    secondaryAction: "modelliSorgente"
  },
  {
    id: "dettaglio",
    title: "Dettaglio documento",
    description: "Aprire il dettaglio di un documento per capirne struttura e scopo.",
    status: "ATTIVA",
    primaryAction: "documentiIstituzionali",
    secondaryAction: null
  },
  {
    id: "revisione",
    title: "Revisione matrice",
    description: "Verificare i controlli richiesti per ogni documento nella matrice di revisione.",
    status: "ATTIVA",
    primaryAction: "matriceRevisione",
    secondaryAction: null
  },
  {
    id: "note",
    title: "Note decisioni locali",
    description: "Annotare osservazioni e decisioni non formali nelle textarea dedicate.",
    status: "ATTIVA",
    primaryAction: "matriceRevisione",
    secondaryAction: null
  },
  {
    id: "stampa",
    title: "Pacchetto stampa",
    description: "Generare un PDF locale tramite stampa del browser.",
    status: "ATTIVA",
    primaryAction: "matriceRevisione",
    secondaryAction: null
  },
  {
    id: "esportazione",
    title: "Esportazione dati",
    description: "Scaricare JSON o Markdown per archiviazione o lavoro successivo.",
    status: "ATTIVA",
    primaryAction: "matriceRevisione",
    secondaryAction: null
  },
  {
    id: "aggiornamento",
    title: "Aggiornamento istituzionale",
    description: "Rivedere periodicamente i documenti previsti dal piano di aggiornamento.",
    status: "FUTURA",
    primaryAction: "matriceRevisione",
    secondaryAction: null
  }
];

if (typeof window !== "undefined") {
  window.WORKFLOW_PROCESS_CATALOG = WORKFLOW_PROCESS_CATALOG;
}