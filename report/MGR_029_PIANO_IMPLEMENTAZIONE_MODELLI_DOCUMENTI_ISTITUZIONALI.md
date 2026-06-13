# MGR-029 — Piano implementazione modelli documenti istituzionali curricolari

Verdict operativo: `MGR_029_IMPLEMENTAZIONE_TEMPLATE_SORGENTE_AVVIATA`

## Scopo della slice

Produrre i template sorgente Markdown per i 10 modelli documentali istituzionali curricolari previsti da MGR-029, in coerenza con il contratto di requisiti MGR-029A e con i limiti operativi emersi da MGR-029B.

## Limiti da MGR-029B

- Nessun DOCX generato.
- Nessun PDF generato.
- Nessuna modifica al motore DOCX/export.
- Nessuna modifica a `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
- Nessuna modifica a backend, API, autenticazione, deploy, CDN, librerie esterne.
- Nessun dato reale.
- Nessun dato personale o identificativo.
- Validazione umana obbligatoria.
- AgID citata solo come riferimento prudenziale.
- Gate visuale LibreOffice/Word resta esterno.

## Elenco dei 10 modelli

1. `curricolo-verticale-istituto.md`
2. `curricolo-ordine-scolastico.md`
3. `curricolo-disciplina-campo.md`
4. `documento-finale-dipartimento.md`
5. `documento-gruppo-lavoro.md`
6. `documento-revisione-aggiornamento.md`
7. `documento-approvato-validato.md`
8. `quadro-competenze-traguardi-obiettivi.md`
9. `quadro-valutazione-rubriche.md`
10. `allegato-educazione-civica-digitale-orientamento-inclusione.md`

## Matrice documento → sezioni minime → placeholder → validazione

| Documento | Sezioni minime | Placeholder principali | Validazione umana |
|---|---|---|---|
| Curricolo verticale d’Istituto | Dati generali, Premessa, Riferimenti, Finalità, Profilo studente, Competenze chiave, Traguardi, Continuità verticale, Criteri valutazione, Inclusione, Educazione civica/digitale/orientamento | [DA COMPILARE: ...] in ogni sezione di contenuto | Referente curricolo, collegio docenti |
| Curricolo per ordine scolastico | Dati generali, Scopo, Caratteristiche ordine, Competenze attese, Traguardi, Obiettivi, Metodologie, Valutazione, Inclusione, Collegamento verticale | [DA COMPILARE: ...] in ogni sezione di contenuto | Coordinatori, referente |
| Curricolo per disciplina/campo | Dati generali, Disciplina, Finalità, Traguardi, Obiettivi, Nuclei tematici, Metodologie, Valutazione, Collegamenti interdisciplinari, Inclusione | [DA COMPILARE: ...] in ogni sezione di contenuto | Dipartimento, referente |
| Documento finale di dipartimento | Dati generali, Partecipanti/ruoli, Ordine del giorno, Sintesi lavori, Decisioni/proposte, Materiali, Azioni successive | [DA COMPILARE: ...] nelle sezioni di contenuto | Dipartimento, dirigente |
| Documento prodotto dal gruppo di lavoro | Dati generali, Mandato, Ambito, Attività svolte, Proposte, Questioni aperte, Allegati/riferimenti | [DA COMPILARE: ...] in ogni sezione di contenuto | Dipartimento, referente |
| Documento di revisione e aggiornamento | Dati generali, Documento oggetto, Motivazione, Parti modificate, Sintesi modifiche, Impatti, Verifiche richieste | [DA COMPILARE: ...] nelle sezioni di contenuto | Referente, organo competente |
| Documento approvato/validato | Dati generali, Documento approvato, Organo competente, Data/atto, Sintesi contenuto, Condizioni validità, Distribuzione | [DA COMPILARE: ...] nelle sezioni di contenuto | Organo competente |
| Quadro competenze/traguardi/obiettivi | Dati generali, Area/disciplina, Competenze, Traguardi, Obiettivi, Progressione verticale, Indicatori osservabili, Note coerenza | [DA COMPILARE: ...] in ogni sezione di contenuto | Dipartimento, coordinatori |
| Quadro valutazione/rubriche | Dati generali, Ambito, Criteri, Livelli, Descrittori, Evidenze osservabili, Uso rubrica, Inclusione/adattamenti | [DA COMPILARE: ...] in ogni sezione di contenuto | Dipartimento, coordinatori |
| Allegato educazione civica/digitale/orientamento/inclusione | Dati generali, Tipo allegato, Collegamento curricolo, Finalità, Competenze/obiettivi, Attività, Valutazione, Inclusione, Collegamenti interdisciplinari | [DA COMPILARE: ...] in ogni sezione di contenuto | Referente, coordinatori |

## Regola dati personali

I template non devono contenere dati personali, dati identificativi, nomi reali di studenti, docenti, famiglie, classi reali o istituzioni reali. Ogni compilazione con dati reali richiede validazione umana e trattamento conforme alle procedure dell’istituto.

## Disclaimer obbligatorio

Documento sorgente/modello non ufficiale. La compilazione finale, la verifica normativa, la coerenza con PTOF, curricolo d’Istituto, delibere collegiali, regolamenti interni e procedure privacy restano a carico dell’istituzione scolastica e dei responsabili competenti.

## Nota AgID

Il riferimento alle Linee guida AgID ha valore prudenziale per leggibilità, accessibilità e chiarezza documentale; non costituisce certificazione di conformità.

## Nota gate visuale

La verifica visuale in LibreOffice Writer o Microsoft Word resta gate esterno e non viene eseguita in questa slice.

## Non-goals

- nessun DOCX;
- nessun PDF;
- nessun export;
- nessuna modifica al Manager;
- nessuna modifica UI;
- nessuna modifica backend/API/deploy;
- nessuna libreria esterna.
