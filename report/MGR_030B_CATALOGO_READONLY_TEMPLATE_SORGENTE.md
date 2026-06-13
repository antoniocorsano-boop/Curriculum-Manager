# MGR-030B — Catalogo read-only template sorgente nel Manager

Verdict locale: `MGR_030B_CATALOGO_READONLY_TEMPLATE_SORGENTE_IMPLEMENTATO_LOCALMENTE`

## Baseline HEAD

* **HEAD locale:** `8f9a31cf539e94187472f275ddeeeefc5c2c16ee`
* **origin/main:** `8f9a31cf539e94187472f275ddeeeefc5c2c16ee`
* **Sync:** true

## Scopo

Aggiungere nel Manager una sezione read-only `Modelli sorgente` che mostra i 10 template Markdown istituzionali presenti in `templates/documenti-istituzionali/`, senza modificare export, backend, seed-data o logiche di generazione DOCX/PDF.

## File modificati/creati

* `APRI_MANAGER_CURRICOLO_ISTITUTO.html` — aggiunta voce sidebar, sezione view, catalogo statico, renderer dedicato
* `report/MGR_030B_CATALOGO_READONLY_TEMPLATE_SORGENTE.md` — presente documento
* `report/CONTROLLO_MGR030B_CATALOGO_READONLY_TEMPLATE_SORGENTE.txt` — controllo esito

## Comportamento introdotto

* Nuova voce nella sidebar: `Modelli sorgente`
* Nuova vista read-only con:
  * titolo: `Modelli sorgente istituzionali`
  * sottotitolo: `Template Markdown non ufficiali, da validare prima dell'uso`
  * 10 card statiche, una per ogni template
  * per ogni card: titolo, categoria, percorso file, descrizione, stato `TEMPLATE SORGENTE — NON UFFICIALE`, avviso `Richiede validazione umana`
  * pulsante read-only `Copia percorso` (nessun export)
  * disclaimer visibili: dati personali, validazione umana, nessun DOCX/PDF, AgID prudenziale

## Comportamento esplicitamente non introdotto

* Nessun export DOCX/PDF da questa sezione
* Nessuna compilazione guidata
* Nessun parsing Markdown runtime
* Nessuna modifica a `state.modelliDocumentoIstituzionale`
* Nessuna modifica a `exportDocument`
* Nessuna modifica a backend/API/deploy/CDN/librerie esterne
* Nessuna nuova dipendenza
* Nessun salvataggio dati personali
* Nessuna dichiarazione compliance normativa

## Lista dei 10 template esposti

1. `templates/documenti-istituzionali/curricolo-verticale-istituto.md`
2. `templates/documenti-istituzionali/curricolo-ordine-scolastico.md`
3. `templates/documenti-istituzionali/curricolo-disciplina-campo.md`
4. `templates/documenti-istituzionali/documento-finale-dipartimento.md`
5. `templates/documenti-istituzionali/documento-gruppo-lavoro.md`
6. `templates/documenti-istituzionali/documento-revisione-aggiornamento.md`
7. `templates/documenti-istituzionali/documento-approvato-validato.md`
8. `templates/documenti-istituzionali/quadro-competenze-traguardi-obiettivi.md`
9. `templates/documenti-istituzionali/quadro-valutazione-rubriche.md`
10. `templates/documenti-istituzionali/allegato-educazione-civica-digitale-orientamento-inclusione.md`

## Rischi mitigati

* **Export prematuro:** nessun pulsante export nella nuova sezione
* **Parsing Markdown:** catalogo statico, nessun parsing runtime
* **Dati personali:** disclaimer visibile e nota esplicita
* **Documento percepito come ufficiale:** stato `NON UFFICIALE` in ogni card
* **Regressione:** modifiche isolate a sidebar e nuova view, nessun tocco a funzioni esistenti

## Limiti residui

* Vista read-only statica: non carica contenuto dinamico dai file Markdown
* Nessuna compilazione assistita: l'utente deve aprire manualmente i file
* Dipendenza da MGR-029B/MGR-029C-FIX per i contenuti dei template
* Gate visuale LibreOffice/Word non integrato

## Controlli eseguiti

* `git diff --check`: pass
* `git diff --name-only`: solo file ammessi
* Scan testuali: tutti i pattern obbligatori presenti nell'HTML
* Verifica `exportDocument` non modificato: pass
* Verifica `state.modelliDocumentoIstituzionale` non modificato: pass
* Verifica nessun DOCX/PDF nuovo generato: pass
