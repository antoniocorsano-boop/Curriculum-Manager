# MGR-036 — Export Gate QA Contract

Verdi: `MGR_036_EXPORT_GATE_QA_CONTRACT_CREATED`

## 1. Stato corrente

- **Nuova app standard:** read-only con 3 viste funzionanti
- **Viste implementate:** Modelli sorgente, Documenti istituzionali, Matrice revisione
- **Nessun export implementato**
- **Monolite:** intatto
- **Nessun DOCX/PDF generato**
- **Dipendenze:** nessuna introdotta

## 2. Principio guida

**L'export non è una funzione tecnica da aggiungere automaticamente.**

È una funzione istituzionale ad alto rischio che richiede:
- gate visuale
- validazione umana
- controllo dei dati
- verifica che il documento non venga perceito come ufficiale senza validazione

## 3. Gate obbligatori prima di implementare export

| Gate | Descrizione |
|------|-------------|
| **GATE 1** | Scope documentale autorizzato: solo i 10 documenti tipizzati |
| **GATE 2** | Assenza dati personali/studenti nel contenuto esportato |
| **GATE 3** | Disclaimer e stato "non ufficiale" presenti in ogni documento |
| **GATE 4** | Validazione umana obbligatoria prima dell'uso |
| **GATE 5** | Test visuale LibreOffice Writer |
| **GATE 6** | Test visuale Microsoft Word |
| **GATE 7** | Test stampa/PDF manuale |
| **GATE 8** | Nessuna rottura della nuova app read-only |
| **GATE 9** | Nessuna modifica non controllata al monolite |
| **GATE 10** | Rollback chiaro definito prima dell'implementazione |

## 4. Criteri visuali minimi

- Margini: 2.54cm standard |
- Titoli: gerarchia H1/H2/H3 chiara |
- Sezioni: numerate, non tagliate |
- Font: leggibile, non minore a 10pt |
- Tabelle: intestazioni visibili, dati allineati |
- Interruzioni pagina: testate |
- Header/footer: se presenti, non sovrapposti |
- Placeholder: visibili in formato "DA COMPILARE" |
- Disclaimer: "Modello non ufficiale, validazione umana richiesta" |
- Nessun testo tagliato o clipping |
- Nessun contenuto inventato |
- Nessun dato personale |
- Compatibilità LibreOffice: verificata |
- Compatibilità Microsoft Word: verificata |
- Stampa/PDF manuale: leggibile |

## 5. Documenti esportabili e non esportabili

| Documento | Esportabile | Condizione |
|-----------|-------------|------------|
| Curricolo verticale d'Istituto | Solo dopo validazione umana | Richiede compilazione esplicita |
| Curricolo per ordine scolastico | Solo dopo validazione umana | Richiede compilazione esplicita |
| Curricolo per disciplina/campo | Solo dopo validazione umana | Richiede compilazione esplicita |
| Documento finale di dipartimento | Solo dopo validazione umana | Richiede decisioni collegiali |
| Documento prodotto da gruppo di lavoro | Solo dopo validazione umana | Richiede firma referente |
| Documento di revisione e aggiornamento | Solo dopo validazione umana | Richiede motivazione formale |
| Documento approvato/validato | Solo dopo validazione umana | Richiede atto ufficiale |
| Quadro competenze/traguardi/obiettivi | Solo dopo validazione umana | Richiede coerenza curricolare |
| Quadro valutazione/rubriche | Solo dopo validazione umana | Richiede verifica didattica |
| Allegato educazione civica/digitale | Solo dopo validazione umana | Richiede collegamento curricolare |

## 6. Rischi da bloccare

| Rischio | Gravità | Esempio | Mitigazione | Gate collegato |
|---------|---------|---------|-----------|--------------|
| Documento percepito come ufficiale | Alta | Export senza disclaimer | Disclaimer "NON UFFICIALE" in ogni pagina | GATE 3 |
| Export con dati personali | Alta | Nome studente/docente in documento | Controllo pre-export su stringhe sensibili | GATE 2 |
| Layout rotto in Word | Media | Tabella che si rompe | Test LibreOffice/Word obbligatorio | GATE 5,6 |
| Layout rotto in LibreOffice | Media | Font che non visualizza | Test LibreOffice/Word obbligatorio | GATE 5,6 |
| Perdita disclaimer | Alta | Export senza avviso | Template con disclaimer fissato | GATE 3 |
| Export da dati incompleti | Media | Campi vuoti come "DA COMPILARE" | Validazione pre-export | GATE 1 |
| Modifica non controllata del monolite | Alta | Rottura funzionalità esistente | Non modificare mai il monolite | GATE 9 |
| Regressione nelle view read-only | Media | Vista che non si apre più | Test navigazione post-change | GATE 8 |
| Introduzione dipendenze non volute | Media | Librerie esterne in index.html | Nessuna <script src CDN> | Tutti |

## 7. Cosa è vietato nella prossima implementazione export

- **No** export automatico senza anteprima |
- **No** export da dati personali |
- **No** export senza disclaimer "non ufficiale" |
- **No** export senza stato "bozza/non ufficiale" |
- **No** modifica massiva del monolite |
- **No** dipendenze esterne non valutate |
- **No** salvataggio dati in remoto |
- **No** invio rete/API durante export |
- **No** generazione silenziosa DOCX/PDF |
- **No** sovrascrittura di file esistenti |

## 8. Slice futura consigliata

**MGR-037 — SMOKE_QA_APP_STANDARD_READONLY**

Prima di ogni export, eseguire smoke test manuale completo su:
- navigazione tra le 3 viste
- assenza di pulsanti vietati
- responsive
- copy prudente su disclaimer

**Solo dopo GATE 5-6 superati:**
- MGR-038 — EXPORT_VISUAL_GATE_PROTOCOL (implementazione controllata)