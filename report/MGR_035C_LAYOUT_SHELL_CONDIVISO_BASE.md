# MGR-035C — Layout shell condiviso base app standard

Verdi: `MGR_035C_LAYOUT_SHELL_CONDIVISO_BASE_IMPLEMENTATO_LOCALMENTE`

## Baseline

- **HEAD prima:** `6888afa8c5f895815488936a0da7740a5e0ee058`
- **HEAD dopo:** in lavorazione
- **origin/main:** `6888afa8c5f895815488936a0da7740a5e0ee058`

## File creati

- `src/components/layout.js` - componente layout condiviso
- `src/components/sidebar.js` - componente sidebar navigabile
- `src/components/noticeBox.js` - componente notice/alert

## File modificati

- `index.html` - integrazione script components
- `src/app.js` - integrazione renderSidebar

## Implementazione

### src/components/layout.js
- `renderLayout({ navigationHtml, contentHtml })` - layout shell base
- `renderHeader({ title, subtitle })` - header opzionale

### src/components/sidebar.js
- `renderSidebar({ activeView })` - sidebar navigazione
- Pronto per future viste aggiuntive

### src/components/noticeBox.js
- `renderNoticeBox({ type, title, content })` - notice con titolo
- `renderNoticeBoxRaw({ type, html })` - notice con HTML grezzo

## Validazioni eseguite

- ✅ layout component present
- ✅ sidebar component present
- ✅ noticeBox component present
- ✅ app.js uses shared shell (renderLayout/renderSidebar)
- ✅ Modelli sorgente ancora visibile
- ✅ 10 card ancora visibili
- ✅ disclaimer/no personal data/human validation/no DOCX note preserved
- ✅ monolite non modificato (solo index.html e src/app.js modificati)
- ✅ nessun export/DOCX/PDF
- ✅ nessuna dipendenza introdotta

## Comportamento atteso

- Layout con sidebar visibile
- Voce "Modelli sorgente" attiva
- 10 card template mostrate
- Notice/disclaimer leggibili
- Nessun pulsante export/DOCX/PDF/genera documento