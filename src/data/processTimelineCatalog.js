/**
 * Process timeline catalog - operational phases for curriculum update
 * Based on "Avvio dei lavori per l'aggiornamento del Curricolo Verticale - TIME LINE"
 * No backend, no auth
 */

const PROCESS_TIMELINE_CATALOG = [
  {
    id: "avvio",
    title: "Avvio e rilettura del curricolo",
    objective: "Capire lo stato attuale del curricolo e individuare aree di intervento.",
    activity: "Rileggere il curricolo verticale esistente e confrontarlo con gli obiettivi formativi.",
    documents: ["curricolo-verticale-istituto"],
    output: "Quadro delle aree da rivedere",
    action: "modelliSorgente",
    status: "DA_AVVIARE"
  },
  {
    id: "quadro-comune",
    title: "Quadro comune e costituzione gruppi",
    objective: "Definire riferimenti condivisi e organizzare i gruppi di lavoro.",
    activity: "Partecipare all'assemblea di avvio e alla costituzione dei gruppi disciplinari.",
    documents: ["documento-finale-dipartimento", "quadro-competenze-traguardi-obiettivi"],
    output: "Quadro comune e organigramma gruppi",
    action: "documentiIstituzionali",
    status: "DA_AVVIARE"
  },
  {
    id: "revisione-gruppi",
    title: "Revisione nei gruppi",
    objective: "Redigere proposte di modifica specifiche per ogni disciplina.",
    activity: "Lavorare nei gruppi per aggiornare i documenti curricolari.",
    documents: ["documento-gruppo-lavoro", "curricolo-disciplina-campo"],
    output: "Proposte di modifica da ogni gruppo",
    action: "matriceRevisione",
    status: "DA_AVVIARE"
  },
  {
    id: "consolidamento",
    title: "Consolidamento delle proposte",
    objective: "Raccogliere e verificare le proposte dei gruppi.",
    activity: "Sistemare le proposte in un unico documento e verificare coerenza.",
    documents: ["documento-revisione-aggiornamento", "quadro-competenze-traguardi-obiettivi"],
    output: "Documento consolidato",
    action: "matriceRevisione",
    status: "DA_AVVIARE"
  },
  {
    id: "riallineamento",
    title: "Riallineamento e completamento",
    objective: "Allineare il documento alle decisioni istituzionali.",
    activity: "Rivedere l'intero curricolo per coerenza e completezza.",
    documents: ["curricolo-verticale-istituto", "allegato-educazione-civica-digitale-orientamento-inclusione"],
    output: "Curricolo aggiornato",
    action: "documentiIstituzionali",
    status: "DA_AVVIARE"
  },
  {
    id: "preparazione-output",
    title: "Preparazione output",
    objective: "Produrre le versioni finali per la validazione.",
    activity: "Esportare i documenti in formati utilizzabili e stilare nota di accompagnamento.",
    documents: ["documento-approvato-validato"],
    output: "Pacchetto documenti per validazione",
    action: "matriceRevisione",
    status: "DA_AVVIARE"
  }
];

if (typeof window !== "undefined") {
  window.PROCESS_TIMELINE_CATALOG = PROCESS_TIMELINE_CATALOG;
}