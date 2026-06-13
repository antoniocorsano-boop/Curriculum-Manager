# MGR-031 — Collegamento controllato catalogo sorgente e flusso documenti

Verdict locale: `MGR_031_COLLEGAMENTO_CONTROLLATO_IMPLEMENTATO_LOCALMENTE`

## Baseline HEAD

* **HEAD locale:** `35259a229da32c7f9d1ebf31cd659410d2d8ddb7`
* **origin/main:** `35259a229da32c7f9d1ebf31cd659410d2d8ddb7`
* **Sync:** true

## Scopo

Collegare in modo controllato la sezione `Modelli sorgente` al flusso `Documenti istituzionali`, senza generare documenti, senza export e senza modificare il motore DOCX/PDF. Il collegamento è solo UX/orientativo: spiegare il workflow, distinguere le due sezioni, aggiungere una CTA sicura.

## File modificati/creati

* `APRI_MANAGER_CURRICOLO_ISTITUTO.html` — aggiunto box "Come usare questi modelli", nota relazione tra sezioni, CTA verso Documenti istituzionali
* `report/MGR_031_COLLEGAMENTO_CONTROLLATO_CATALOGO_SORGENTE_FLUSSO_DOCUMENTI.md` — presente documento
* `report/CONTROLLO_MGR031_COLLEGAMENTO_CONTROLLATO_CATALOGO_SORGENTE_FLUSSO_DOCUMENTI.txt` — controllo esito

## Comportamento introdotto

* Box "Come usare questi modelli" con 5 passi numerati
* Nota visibile: `Modelli sorgente = base Markdown non ufficiale. Documenti istituzionali = area di lavoro/export per documenti verificati.`
* Pulsante CTA `Vai a Documenti istituzionali` che cambia vista verso `documentiIstituzionali`
* Le 10 card template rimangono invariate

## Comportamento esplicitamente non introdotto

* Nessuna generazione automatica di documenti
* Nessun export DOCX/PDF
* Nessuna compilazione guidata
* Nessun parsing Markdown runtime
* Nessuna modifica a `state.modelliDocumentoIstituzionale`
* Nessuna modifica a `exportDocument`
* Nessuna modifica a backend/API/deploy/CDN/librerie esterne
* Nessuna nuova dipendenza
* Nessun salvataggio dati personali
* Nessuna dichiarazione compliance normativa

## Rischi mitigati

* **Confusione tra sezioni:** nota esplicita che distingue `Modelli sorgente` da `Documenti istituzionali`
* **Export prematuro:** CTA punta solo a cambio vista, non a export
* **Documento percepito come ufficiale:** stato `NON UFFICIALE` mantenuto in ogni card
* **Regressione:** modifiche isolate a `renderModelliSorgenteIstituzionali()`, nessun tocco ad altre funzioni

## Limiti residui

* Collegamento solo UX: non crea documenti automaticamente
* CTA è un cambio vista statico, non un wizard
* Dipendenza da MGR-030B/MGR-030C per la sezione base
* Gate visuale LibreOffice/Word non integrato

## Controlli eseguiti

* `git diff --check`: pass
* `git diff --name-only`: solo file ammessi
* Scan testuali: tutti i pattern obbligatori presenti nell'HTML
* Verifica `exportDocument` non modificato: pass
* Verifica `state.modelliDocumentoIstituzionale` non modificato: pass
* Verifica nessun DOCX/PDF nuovo generato: pass
