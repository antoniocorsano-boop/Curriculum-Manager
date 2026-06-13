# MGR-028A - Hardening profilo DOCX interno

## Baseline

- Repo: `C:\Users\anton\Curriculum Manager`
- Branch: `main`
- HEAD locale atteso: `6bd0f3facf1cfe0c424c2ba943219fb0653587f2`
- `origin/main`: `6bd0f3facf1cfe0c424c2ba943219fb0653587f2`
- Slice precedente: MGR-027 chiuso remoto con gate umano Word/LibreOffice residuo.

## Scelta tecnica

La ricerca tecnica conferma che la soluzione piu robusta per DOCX affidabili e usare generatori OpenXML consolidati, come Open XML SDK lato .NET o `docx` + `JSZip` lato JavaScript/browser. In MGR-028A non sono state introdotte nuove librerie, CDN o dipendenze vendorizzate per rispettare lo scope della slice.

Il writer interno resta quindi una soluzione minima e prudente: produce un profilo DOCX data-driven basato su OPC/ZIP e WordprocessingML, senza derivare da `buildPrintableHtml()` e senza includere HTML/CSS nel `word/document.xml`.

Una futura slice potra valutare `docx` + `JSZip` vendorizzati se il progetto vuole una base DOCX piu professionale prima della release scuola.

## Patch applicata

- Packaging ZIP:
  - aggiunto writer DEFLATE raw minimale con blocchi stored interni al metodo ZIP 8;
  - mantenuti CRC, compressed size e uncompressed size nei local header e nella central directory;
  - esclusi data descriptor e streaming;
  - mantenuti nomi entry stabili.
- Reader ZIP interno:
  - supporto a entry metodo 0 e metodo 8 per import dei pacchetti generati dal Manager.
- Relationships DOCX:
  - rimossi `headerReference` e `footerReference` non necessari dal `document.xml`;
  - rimossi `header1.xml` e `footer1.xml` dal pacchetto DOCX;
  - mantenuta la relazione solo a `styles.xml`;
  - intestazione e footer istituzionali restano come testo nel corpo documento.
- Tabelle WordprocessingML:
  - ogni tabella contiene `w:tblPr`;
  - ogni tabella contiene `w:tblGrid`;
  - ogni colonna contiene `w:gridCol w:w="..."` con larghezza non zero;
  - ogni cella contiene `w:tcPr` e almeno un `w:p`;
  - righe e celle vengono normalizzate sul numero di colonne dell'intestazione;
  - larghezze tabellari in twips, con layout fisso.
- Branch export:
  - per `mode === "docx"` l'export passa direttamente da `createDocxBlob(scope)`;
  - `buildPrintableHtml(scope)` resta usato solo per Word-compatible `.doc`, stampa/PDF e fallback HTML.

## Modelli verificati

- Report complessivo del curricolo d'istituto
- Documento prodotto dal gruppo di lavoro
- Documento finale di dipartimento
- Documento approvato / validato

## Validatore MGR-028A

Script: `report/verifiche_mgr028a/mgr028a-validate.js`

Output:

```json
{
  "verdict": "MGR028A_VALIDATION_OK",
  "results": [
    {
      "file": "Report_complessivo_del_curricolo_istituto.docx",
      "entries": 7,
      "tables": 7,
      "cells": 340,
      "centralDirectory": true,
      "eocd": true
    },
    {
      "file": "Documento_prodotto_dal_gruppo_di_lavoro.docx",
      "entries": 7,
      "tables": 7,
      "cells": 340,
      "centralDirectory": true,
      "eocd": true
    },
    {
      "file": "Documento_finale_di_dipartimento.docx",
      "entries": 7,
      "tables": 7,
      "cells": 340,
      "centralDirectory": true,
      "eocd": true
    },
    {
      "file": "Documento_approvato_validato.docx",
      "entries": 7,
      "tables": 7,
      "cells": 340,
      "centralDirectory": true,
      "eocd": true
    }
  ]
}
```

## Controlli coperti

- Entry OPC minime presenti:
  - `[Content_Types].xml`
  - `_rels/.rels`
  - `word/document.xml`
  - `word/styles.xml`
  - `docProps/core.xml`
  - `docProps/app.xml`
- Central directory ed EOCD presenti.
- Local file header presenti.
- Nessun data descriptor.
- `word/document.xml` senza doctype/html/head/style/CSS/classi HTML.
- `w:document`, `w:body`, `w:p`, `w:r`, `w:t`, `w:sectPr` presenti.
- Titoli reali presenti e titolo generico `Documento curricolo` assente.
- Firme e sezioni numerate presenti.
- Nessun `undefined`, `null` o `[object Object]`.
- Stili usati dal documento definiti in `styles.xml`.
- Branch DOCX separato dalla pipeline HTML.

## Limiti residui

- Il writer interno non sostituisce una libreria OpenXML completa.
- Non e stata introdotta la coppia `docx` + `JSZip` in questa slice.
- MGR-028B resta necessario: apertura reale in Microsoft Word e, se disponibile, LibreOffice Writer, con verifica di layout, assenza di riparazioni e salvataggio applicativo.

## Verdict

`MGR_028A_DOCX_PROFILE_HARDENED_READY_FOR_WORD_TEST`
