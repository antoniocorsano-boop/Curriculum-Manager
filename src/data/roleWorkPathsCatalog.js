/**
 * Role work paths catalog - guided paths for different roles
 * No backend, no auth, client-side only
 */

const ROLE_WORK_PATHS_CATALOG = [
  {
    id: "docente",
    title: "Docente",
    objective: "Preparare e aggiornare il curriculum individuale",
    activities: [
      "Consultare modelli sorgente",
      "Verificare template disciplina",
      "Redigire osservazioni per la valutazione"
    ],
    actions: ["modelliSorgente", "documentiIstituzionali"],
    output: "Bozza curriculum aggiornata"
  },
  {
    id: "coordinatore",
    title: "Coordinatore dipartimento",
    objective: "Coordinare la revisione documentale del dipartimento",
    activities: [
      "Gestire documento finale dipartimento",
      "Verificare coerenza tra discipline",
      "Pianificare revisione semestrale"
    ],
    actions: ["documentiIstituzionali", "matriceRevisione"],
    output: "Documento dipartimento validato"
  },
  {
    id: "gruppo",
    title: "Gruppo curricolo",
    objective: "Svolgere lavori tematici sul curriculum",
    activities: [
      "Aprire documento gruppo lavoro",
      "Documentare attività svolte",
      "Formulare proposte per il dipartimento"
    ],
    actions: ["documentiIstituzionali", "matriceRevisione"],
    output: "Proposta gruppo lavoro"
  },
  {
    id: "staff",
    title: "Funzione strumentale / staff",
    objective: "Supportare la gestione documentale dell'istituto",
    activities: [
      "Archiviare revisioni",
      "Supportare esportazione dati",
      "Aggiornare template di riferimento"
    ],
    actions: ["modelliSorgente", "matriceRevisione"],
    output: "Archivio documenti aggiornato"
  }
];

if (typeof window !== "undefined") {
  window.ROLE_WORK_PATHS_CATALOG = ROLE_WORK_PATHS_CATALOG;
}