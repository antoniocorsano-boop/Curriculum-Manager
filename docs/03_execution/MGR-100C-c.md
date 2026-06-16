# MGR-100C-c — OUTPUT_CENTER_EXPORT_RESET_HOTFIX

## Summary

Hotfix per aggiungere funzioni mancanti nel Document Output Center: `exportDocumentOutputCenterJSON()`, `exportDocumentOutputCenterMarkdown()` e `resetAllDocumentOutputs()`.

## Baseline

Current `origin/main` baseline includes:
- `35d03e3` — MGR-101A merge (PR #30)
- `8613a07` — MGR-100B / PR #29
- `b9aaf69` — MGR-100C-b
- `775a479` — MGR-100C-a

## Hotfix implementation

Aggiunte tre funzioni in `src/views/documentOutputCenterView.js`:

### `exportDocumentOutputCenterJSON()`
- Esporta stato output in JSON
- Browser-only: Blob + URL.createObjectURL + download
- File: `output-center-stato.json`

### `exportDocumentOutputCenterMarkdown()`
- Esporta stato output in Markdown
- Browser-only: Blob + URL.createObjectURL + download
- File: `output-center-stato.md`

### `resetAllDocumentOutputs()`
- Resetta tutti gli stati e le bozze locali dell'Output Center
- Conferma esplicita prima del reset
- Rimuove solo `curriculumManager.documentOutputState` e bozze documenti
- Non tocca Matrice Revisione, sidebar, Activity State

### Toolbar aggiunta
- Due pulsanti export (JSON, Markdown)
- Pulsante reset tutti
- Copy prudente: "Dati di esempio a uso orientativo, in sola lettura. Non equivale ad approvazione istituzionale."

## Chiavi localStorage interessate

- `curriculumManager.documentOutputState` — stato output documenti
- `curriculumManager.documentDrafts.<documentId>` — bozze documenti (solo per reset)

## Export generati

JSON e Markdown contengono:
- Informazioni documento base (title, category)
- Stato output locale
- Timestamp (lastOpenedAt, lastSavedAt, ecc.)

Nessun dato personale o sensibile.

## Technical validations

Passed:
- `git diff --check`
- `node --check src/views/documentOutputCenterView.js`
- `node --check src/app.js`

## Boundaries

Nessun termine vietato trovato.
Nessun backend/API/cloud/DOCX/PDF.
Nessun dato reale.

## Files changed

- `src/views/documentOutputCenterView.js` (hotfix)
- `docs/03_execution/MGR-100C-c.md` (docs)
- `report/CONTROLLO_MGR100C_C_OUTPUT_CENTER_EXPORT_RESET_HOTFIX.txt` (report)
- `REPO-MOVELOG.md` (movelog)

## Next increment

Selected: `MGR-102A — OUTPUT_CENTER_EXPORT_RESET_POST_FIX_SMOKE_AUDIT`

Rationale:
- Hotfix completato
- Smoke post-fix necessario per confermare