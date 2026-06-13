# MGR-035D — Documenti istituzionali view read-only no export

Verdi: `MGR_035D_DOCUMENTI_ISTITUZIONALI_VIEW_READONLY_IMPLEMENTATO_LOCALMENTE`

## Baseline

- **HEAD prima:** `3b6f5505aeb648b38ff66d4eecfea903f64c5768`
- **HEAD dopo:** in lavorazione
- **origin/main:** `3b6f5505aeb648b38ff66d4eecfea903f64c5768`

## File creati

- `src/data/institutionalDocumentsCatalog.js` - catalogo 10 documenti (read-only)
- `src/views/documentiIstituzionaliView.js` - view catalogo documenti

## File modificati

- `index.html` - aggiunta sezione view + script
- `src/app.js` - router per documentiIstituzionali
- `src/components/sidebar.js` - voce Documenti istituzionali
- `src/styles.css` - stili institutional-document-grid

## Implementazione

### institutionalDocumentsCatalog.js
- Array statico 10 documenti
- Campi: id, title, category, description, status, sourceTemplatePath, requiresHumanValidation, exportAvailable: false

### documentiIstituzionaliView.js
- `renderDocumentiIstituzionaliView()` - rendering catalogo
- 10 card read-only
- Notice: nessun documento creato, nessun export DOCX/PDF

## Validazioni eseguite

- ✅ catalogo read-only present
- ✅ Documenti istituzionali view present
- ✅ sidebar navigation present
- ✅ 10 documenti esposti
- ✅ nessun pulsante export/DOCX/PDF/genera/compila
- ✅ monolite non modificato
- ✅ exportDocument non modificato
- ✅ state.modelliDocumentoIstituzionale non modificato
- ✅ nessun DOCX/PDF generato
- ✅ nessun export eseguito
- ✅ nessuna dipendenza introdotta
- ✅ nessun backend/API/deploy

## Comportamento atteso

- Sidebar con 2 voci: Modelli sorgente ↔ Documenti istituzionali
- Click navigabile tra le due viste
- 10 card per ciascuna vista
- Nessun pulsante export/DOCX/PDF/genera/compila