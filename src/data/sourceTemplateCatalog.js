/**
 * Source template catalog for Modelli sorgente istituzionali
 * 10 template read-only, no external dependencies
 */
const SOURCE_TEMPLATE_CATALOG = [
  {
    id: "curricolo-verticale-istituto",
    title: "Curricolo verticale d'Istituto",
    category: "Curricolo",
    path: "templates/documenti-istituzionali/curricolo-verticale-istituto.md",
    description: "Modello sorgente per il curricolo verticale dell'Istituto, dalla scuola dell'infanzia alla secondaria di I grado. Include finalità, profilo studente, competenze, traguardi, continuità verticale e inclusione."
  },
  {
    id: "curricolo-ordine-scolastico",
    title: "Curricolo per ordine scolastico",
    category: "Curricolo",
    path: "templates/documenti-istituzionali/curricolo-ordine-scolastico.md",
    description: "Modello sorgente per il curricolo di un singolo ordine scolastico (infanzia, primaria, secondaria). Include competenze, traguardi, obiettivi, metodologie e valutazione."
  },
  {
    id: "curricolo-disciplina-campo",
    title: "Curricolo per disciplina/campo",
    category: "Curricolo",
    path: "templates/documenti-istituzionali/curricolo-disciplina-campo.md",
    description: "Modello sorgente per il curricolo di una disciplina o campo disciplinare. Include finalità, traguardi, obiettivi, nuclei tematici, metodologie e collegamenti interdisciplinari."
  },
  {
    id: "documento-finale-dipartimento",
    title: "Documento finale di dipartimento",
    category: "Documento dipartimento",
    path: "templates/documenti-istituzionale/documento-finale-dipartimento.md",
    description: "Modello sorgente per raccogliere decisioni e proposte condivise da un dipartimento disciplinare. Include ordine del giorno, sintesi lavori, decisioni e azioni successive."
  },
  {
    id: "documento-gruppo-lavoro",
    title: "Documento prodotto dal gruppo di lavoro",
    category: "Documento gruppo",
    path: "templates/documenti-istituzionali/documento-gruppo-lavoro.md",
    description: "Modello sorgente per documentare il lavoro di un gruppo di lavoro tematico. Include mandato, ambito, attività svolte, proposte e questioni aperte."
  },
  {
    id: "documento-revisione-aggiornamento",
    title: "Documento di revisione e aggiornamento curricolare",
    category: "Revisione",
    path: "templates/documenti-istituzionali/documento-revisione-aggiornamento.md",
    description: "Modello sorgente per descrivere modifiche, motivazioni e modalità di aggiornamento del curricolo. Include parti modificate, sintesi modifiche e verifiche richieste."
  },
  {
    id: "documento-approvato-validato",
    title: "Documento approvato/validato",
    category: "Documento ufficiale",
    path: "templates/documenti-istituzionali/documento-approvato-validato.md",
    description: "Modello sorgente per documenti ufficiali dell'Istituto con validazione registrata. Include organo competente, data/atto e condizioni di validità."
  },
  {
    id: "quadro-competenze-traguardi-obiettivi",
    title: "Quadro competenze, traguardi e obiettivi",
    category: "Quadro sintetico",
    path: "templates/documenti-istituzionali/quadro-competenze-traguardi-obiettivi.md",
    description: "Modello sorgente per sintesi strutturata di competenze, traguardi e obiettivi. Include progressione verticale e indicatori osservabili."
  },
  {
    id: "quadro-valutazione-rubriche",
    title: "Quadro valutazione e rubriche",
    category: "Valutazione",
    path: "templates/documenti-istituzionali/quadro-valutazione-rubriche.md",
    description: "Modello sorgente per definire criteri e strumenti di valutazione. Include livelli, descrittori, evidenze osservabili e adattamenti per BES."
  },
  {
    id: "allegato-educazione-civica-digitale-orientamento-inclusione",
    title: "Allegato educazione civica/digitale/orientamento/inclusione",
    category: "Allegato",
    path: "templates/documenti-istituzionali/allegato-educazione-civica-digitale-orientamento-inclusione.md",
    description: "Modello sorgente per completare documenti curricolari con approfondimenti specifici. Include attività, valutazione, inclusione e collegamenti interdisciplinari."
  }
];

// Export per uso in altri moduli
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SOURCE_TEMPLATE_CATALOG };
}