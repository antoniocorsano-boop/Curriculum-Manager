# MGR-026 - Validazione export istituzionali

Data controllo: 2026-06-13

## Obiettivo

Validare e consolidare gli export istituzionali in formato stampa/PDF, Word-compatible `.doc` e DOCX nativo per i modelli documentali minimi.

## Causa residua individuata

La pipeline DOCX era gia stata separata da `buildPrintableHtml()` e portata su modello dati / WordprocessingML. Il residuo da presidiare era il rischio di fallback del titolo a `Documento curricolo` nei DOCX istituzionali, invece del titolo reale del modello.

Durante il controllo e emersa anche una piccola incoerenza nella funzione `safeText`: diverse chiamate passavano un fallback esplicito, ma la funzione non lo usava. Questo poteva produrre testo generico nei metadati DOCX quando un valore era vuoto.

## Patch applicata

- Confermata la pipeline DOCX data-driven / WordprocessingML.
- Corretto `safeText(value, fallback)` per rispettare il fallback esplicito.
- Nessun backend, API, auth, deploy, CDN, libreria esterna o nuova funzionalita introdotta.

## Modelli verificati

1. Report complessivo del curricolo d'istituto
2. Documento prodotto dal gruppo di lavoro
3. Documento finale di dipartimento
4. Documento approvato / validato

## Output validatore

Comando:

```bash
node "C:\Users\anton\AppData\Local\Temp\kilo\mgr026-validate.js"
```

Esito finale:

```text
MGR026_VALIDATION_OK
Report complessivo del curricolo d’istituto: ok
Documento prodotto dal gruppo di lavoro: ok
Documento finale di dipartimento: ok
Documento approvato / validato: ok
Generated verification files in C:\Users\anton\Curriculum Manager\report\verifiche_mgr026
```

Il validatore ha confermato per i DOCX:

- pacchetto ZIP valido con `[Content_Types].xml`, relazioni e `word/document.xml`;
- `word/document.xml` con `<w:document>`, `<w:body>`, tabelle e titolo reale del modello;
- assenza di `<!doctype html>`, `:root{`, `@media`, `<style`, `undefined`, `null`, `[object Object]`;
- header e footer WordprocessingML presenti.

## Test browser manuale assistito

Eseguito su `APRI_MANAGER_CURRICOLO_ISTITUTO.html` locale tramite Edge headless/CDP.

Passi:

1. apertura pagina locale;
2. apertura sezione `Documenti istituzionali`;
3. verifica render delle card istituzionali;
4. click dei pulsanti `DOCX`, `Word .doc` e `Stampa/PDF` per i 4 modelli minimi.

Esito:

- le card dei 4 modelli minimi sono presenti;
- per ciascun modello sono presenti i pulsanti `Stampa/PDF`, `Word .doc`, `DOCX`;
- DOCX generati con MIME `application/vnd.openxmlformats-officedocument.wordprocessingml.document` e firma ZIP `50 4b 03 04`;
- Word-compatible `.doc` generati come HTML compatibile Word;
- stampa/PDF contiene titolo reale, intestazione istituzionale, tabelle, firme e nessun token tecnico.

## Verdetto

MGR-026 passa la validazione automatica e il controllo browser assistito sugli export istituzionali minimi. Resta solo l'eventuale gate manuale umano di apertura dei file in Microsoft Word/LibreOffice per controllo visivo finale.
