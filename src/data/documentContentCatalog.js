/**
 * Document content catalog - structured work content for documents
 * Data-driven, no fetch, file:// compatible
 */

const DOCUMENT_CONTENT_CATALOG = {
  "curricolo-verticale-istituto": {
    id: "curricolo-verticale-istituto",
    title: "Curricolo verticale d'Istituto",
    phase: "Orientamento nel percorso",
    purpose: "Orientare l'intero percorso di aggiornamento curricolare.",
    sections: [
      { title: "Premessa", description: "Principi guida del curricolo verticale" },
      { title: "Riferimenti prudenziali", description: "Normativa di riferimento" },
      { title: "Finalità formative", description: "Sintesi dei principi formativi" },
      { title: "Profilo studente generale", description: "Competenze e abilità in uscita" },
      { title: "Competenze chiave", description: "Elenco competenze Europee/Nazionali" },
      { title: "Traguardi per ordine", description: "Traguardi specifici per ordine scolastico" },
      { title: "Continuità verticale", description: "Raccordi tra ordini scolastici" },
      { title: "Valutazione generale", description: "Criteri comuni di valutazione" },
      { title: "Inclusione generale", description: "Principali accorgimenti" },
      { title: "Civica e orientamento", description: "Collegamenti trasversali" }
    ],
    checks: [
      "Coerenza tra ordini/classi",
      "Presenza di traguardi e obiettivi",
      "Validazione collegiale"
    ],
    output: "Quadro di riferimento per tutte le revisioni successive"
  },
  "curricolo-ordine-scolastico": {
    id: "curricolo-ordine-scolastico",
    title: "Curricolo per ordine scolastico",
    phase: "Preparazione lavoro nei gruppi",
    purpose: "Allineare la disciplina all'ordine scolastico.",
    sections: [
      { title: "Dati generali", description: "Istituto, anno, ordine, versione" },
      { title: "Competenze chiave", description: "Competenze dell'ordine" },
      { title: "Traguardi specifici", description: "Traguardi dell'ordine" },
      { title: "Obiettivi", description: "Obiettivi allineati a Indicazioni Nazionali" },
      { title: "Metodologie", description: "Metodologie didattiche dell'ordine" },
      { title: "Valutazione", description: "Criteri di valutazione specifici" }
    ],
    checks: [
      "Competenze chiave definite",
      "Obiettivi allineati a Indicazioni Nazionali",
      "Metodologie verificate"
    ],
    output: "Materiale di confronto per aggiornare il curricolo"
  },
  "curricolo-disciplina-campo": {
    id: "curricolo-disciplina-campo",
    title: "Curricolo per disciplina/campo di esperienza",
    phase: "Preparazione lavoro nei gruppi",
    purpose: "Portare nel confronto il quadro disciplinare da rivedere.",
    sections: [
      { title: "Dati generali", description: "Istituto, anno, disciplina, ordine" },
      { title: "Disciplina/Campo", description: "Descrizione della disciplina" },
      { title: "Finalità", description: "Obiettivi specifici della disciplina" },
      { title: "Traguardi", description: "Traguardi di apprendimento specifici" },
      { title: "Obiettivi", description: "Obiettivi per nuclei o ambiti" },
      { title: "Nuclei tematici", description: "Elenco nuclei fondanti" },
      { title: "Metodologie", description: "Criteri metodologici disciplinari" },
      { title: "Valutazione", description: "Criteri di valutazione specifici" },
      { title: "Collegamenti interdisciplinari", description: "Riferimenti a altre discipline" },
      { title: "Inclusione", description: "Accorgimenti per l'inclusione" }
    ],
    checks: [
      "Nuclei tematici completi",
      "Collegamenti interdisciplinari",
      "Valutazione allineata"
    ],
    output: "Materiale di confronto per aggiornare il curricolo"
  },
  "documento-finale-dipartimento": {
    id: "documento-finale-dipartimento",
    title: "Documento finale di dipartimento",
    phase: "Preparazione lavoro nei gruppi",
    purpose: "Preparare materiali condivisi prima del confronto collegiale.",
    sections: [
      { title: "Dati generali", description: "Istituto, anno, dipartimento" },
      { title: "Ordine del giorno", description: "Argomenti affrontati" },
      { title: "Sintesi lavori", description: "Riepilogo attività svolte" },
      { title: "Decisioni", description: "Conclusioni del dipartimento" },
      { title: "Azioni successive", description: "Prossimi passi" }
    ],
    checks: [
      "Ordine del giorno chiaro",
      "Decisioni registrate",
      "Azioni successive assegnate"
    ],
    output: "Bozza di lavoro da portare al gruppo o al dipartimento"
  },
  "documento-gruppo-lavoro": {
    id: "documento-gruppo-lavoro",
    title: "Documento prodotto da gruppo di lavoro",
    phase: "Preparazione lavoro nei gruppi",
    purpose: "Documentare il lavoro di un gruppo tematico.",
    sections: [
      { title: "Dati generali", description: "Istituto, anno, gruppo" },
      { title: "Mandato del gruppo", description: "Cosa viene richiesto al gruppo" },
      { title: "Ambito di lavoro", description: "Tema trattato dal gruppo" },
      { title: "Attività svolte", description: "Cronologia attività" },
      { title: "Proposte", description: "Risultati del lavoro" },
      { title: "Questioni aperte", description: "Temi non risolti" },
      { title: "Allegati", description: "Riferimenti e materiali consultati" }
    ],
    checks: [
      "Mandato definito",
      "Attività documentate",
      "Proposte verificate"
    ],
    output: "Proposta gruppo lavoro"
  },
  "documento-revisione-aggiornamento": {
    id: "documento-revisione-aggiornamento",
    title: "Documento di revisione e aggiornamento curricolare",
    phase: "Output da consolidare",
    purpose: "Raccogliere l'esito della revisione.",
    sections: [
      { title: "Dati generali", description: "Istituto, anno, documento revisato" },
      { title: "Motivazione", description: "Ragioni della revisione" },
      { title: "Parti modificate", description: "Sezioni aggiornate" },
      { title: "Verifiche richieste", description: "Controlli da effettuare" }
    ],
    checks: [
      "Motivazione chiara",
      "Parti modificate indicate",
      "Verifiche richieste documentate"
    ],
    output: "Documento consolidato per verifica umana"
  },
  "documento-approvato-validato": {
    id: "documento-approvato-validato",
    title: "Documento approvato/validato",
    phase: "Output da consolidare",
    purpose: "Tracciare documenti ufficiali convalidati.",
    sections: [
      { title: "Dati generali", description: "Organo, data/atto, validità" },
      { title: "Documento", description: "Testo ufficiale approvato" },
      { title: "Distribuzione", description: "Destinatari del documento" }
    ],
    checks: [
      "Organo competente indicato",
      "Data/atto verificato",
      "Distribuzione documentata"
    ],
    output: "Documento ufficiale per archiviazione"
  },
  "quadro-competenze-traguardi-obiettivi": {
    id: "quadro-competenze-traguardi-obiettivi",
    title: "Quadro competenze/traguardi/obiettivi",
    phase: "Preparazione lavoro nei gruppi",
    purpose: "Sintesi strutturata per il confronto.",
    sections: [
      { title: "Competenze", description: "Elenco competenze chiave" },
      { title: "Traguardi", description: "Progressione verticale" },
      { title: "Obiettivi", description: "Obiettivi specifici" },
      { title: "Indicatori", description: "Evidenze osservabili" }
    ],
    checks: [
      "Competenze allineate al curricolo",
      "Traguardi progressivi",
      "Indicatori verificabili"
    ],
    output: "Quadro sintetico per revisione"
  },
  "quadro-valutazione-rubriche": {
    id: "quadro-valutazione-rubriche",
    title: "Quadro valutazione/rubriche",
    phase: "Output da consolidare",
    purpose: "Definire criteri di valutazione.",
    sections: [
      { title: "Criteri", description: "Principi della valutazione" },
      { title: "Livelli", description: "Descrittori per livelli" },
      { title: "Evidenze", description: "Evidenze osservabili" },
      { title: "Adattamenti BES", description: "Accorgimenti inclusione" }
    ],
    checks: [
      "Criteri chiari",
      "Livelli definiti",
      "Evidenze osservabili"
    ],
    output: "Strumento di valutazione per il curricolo"
  },
  "allegato-educazione-civica-digitale-orientamento-inclusione": {
    id: "allegato-educazione-civica-digitale-orientamento-inclusione",
    title: "Allegato educazione civica/digitale/orientamento/inclusione",
    phase: "Preparazione lavoro nei gruppi",
    purpose: "Completa i documenti curricolari con approfondimenti specifici.",
    sections: [
      { title: "Attività inclusive", description: "Accorgimenti per inclusione" },
      { title: "Collegamenti interdisciplinari", description: "Riferimenti a discipline" },
      { title: "Adattamenti BES", description: "Adattamenti per bisogni speciali" }
    ],
    checks: [
      "Attività inclusive",
      "Collegamenti interdisciplinari",
      "Adattamenti BES documentati"
    ],
    output: "Allegato per il pacchetto curricolare"
  }
};

if (typeof window !== "undefined") {
  window.DOCUMENT_CONTENT_CATALOG = DOCUMENT_CONTENT_CATALOG;
}