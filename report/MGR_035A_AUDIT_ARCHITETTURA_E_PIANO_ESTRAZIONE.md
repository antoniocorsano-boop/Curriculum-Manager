# MGR-035A — Audit architettura e piano estrazione

Verdi: `MGR_035A_READY_FOR_STANDARD_HTML_JS_EXTRACTION`

## Baseline HEAD

- **HEAD locale:** `82ff76316b293b36cfdaf68ef334d57e0e201448`
- **origin/main:** `82ff76316b293b36cfdaf68ef334d57e0e201448`
- **Sync:** true

## Working tree status

- **Stato:** pulito (nessun commit in sospeso)
- **Branch:** main

## Mappa del monolite

### Struttura HTML (righe 206-294)

```text
<header>
  - toolbar con pulsanti export multipli
  - bottoni: Salva ora, Esporta sessione, Esporta backup, Importa, Stampa/PDF, Word, DOCX, ZIP...

<nav id="sidebar">
  - Sezione "Governo": Dashboard, Guida, Impostazioni Istituto, Fonti, Documenti...
  - Sezione "Livelli": Infanzia, Primaria, Secondaria
  - Sezione "Sezioni specifiche": Tecnologia, Strumenti

<main>
  - 13 section.view: dashboard, guida, istituto, fonti, documenti, documentiIstituzionali...
```

### CSS inline (righe 7-182)

- Variabili CSS custom (`:root`)
- Reset globale (`*`)
- Layout grid sidebar/main
- Componenti: card, grid, metric, badge, table-wrap, table, modal
- Responsive: media query 1100px, 820px, 700px
- Stampa: @media print
- Versioni: v2.5 matrix editor, v2.6 document registry, v2.7 guide section, v2.8 workflow, v2.9 link fix, v3.0 delivery/email, v3.1 locale/autosave/portability, v3.2 sessione lavoro, v3.3 ambiti/ruoli, MGR-025 institutional templates

### JS inline (righe 295-2187)

#### Stato globale
```javascript
const STORAGE_KEY = "manager_curricolo_istituto_v3_6"
const FILE_DB_NAME = "manager_curricolo_istituto_v3_6_files"
const FILE_STORE = "files"
let state = loadInitialState()
let dirty = false
let modalContext = null
// ... altre variabili di stato
```

#### Seed data (script#seed-data, riga 294)
JSON con schemaVersion, managerVersion, istituto, fontiObbligatorie, ordiniScuola, discipline, documenti, matriciRevisione, decisioni, workflow, guidaProcesso, modelliDocumentoIstituzionale, regoleDocumentaliIstituzionali

#### Router/renderer
- `renderView(id)` - router principale
- `showView(id)` - navigazione sidebar
- `nav button[data-view]` - handler click

#### Renderer sezioni
- `renderDashboard()`
- `renderGuida()`
- `renderIstituto()`
- `renderFonti()`
- `renderDocumenti()`
- `renderDocumentiIstituzionali()`
- `renderModelliSorgenteIstituzionali()`
- `renderMatrice()`
- `renderWorkflow()`
- `renderSessione()`
- `renderGruppi()`
- `renderDecisioni()`
- `renderOrdine(orderId)`
- `renderDiscipline()`
- `renderTecnologia()`
- `renderStrumenti()`

#### Export
- `exportDocument(scope, mode)` - router export
- `buildPrintableHtml(scope)` - HTML per stampa
- `buildDocxDocumentXml(scope)` - DOCX WordprocessingML
- `createDocxBlob(scope)` - generazione DOCX
- `exportInstitutionalTemplates()` / `importInstitutionalTemplates()`
- `exportAttachmentsZip()` / `exportCompleteAttachmentPackage()`
- `exportPortableSession()` / `importJson()`

#### Utility
- `esc()`, `jsAttr()`, `safeId()`, `byId()`
- `normalizeLocalHref()`, `openInternalLink()`, `openExternalLink()`
- `setDirty()`, `saveNow()`, `toast()`, `formatTime()`
- `formData()`, `requiredMissing()`, `showErrors()`
- `field()`, `textField()`, `checkField()`, `selectField()`, `formWrap()`
- `downloadBlob()`, `toCsv()`, `downloadCsv()`
- `buildZipBlob()`, `readStoredZipEntries()` - ZIP nativo browser
- `openFileDb()`, `putStoredFile()`, `getStoredFile()` - IndexedDB

### Dipendenze implicite

1. **Ordine DOM/script**: il JS parte da `document.getElementById("seed-data")`
2. **LocalStorage**: chiave `STORAGE_KEY`
3. **IndexedDB**: per allegati file (FILE_DB_NAME, FILE_STORE)
4. **IndexedDB upgrade**: onupgradeneeded crea objectStore
5. **Blob/URL**: per download/export
6. **DecompressionStream**: per leggere ZIP (browser con supporto)

## Proposta architettura target

```text
index.html
src/styles.css
src/app.js
src/data/seedData.js
src/data/sourceTemplateCatalog.js      # catalogo statico 10 template
src/views/dashboardView.js
src/views/documentiIstituzionaliView.js
src/views/modelliSorgenteIstituzionaliView.js
src/components/cards.js
src/utils/dom.js
src/utils/storage.js
src/utils/export.js
src/utils/zip.js
```

## Ordine di estrazione consigliato

1. **src/data/sourceTemplateCatalog.js** - catalogo 10 template (dati statici, read-only)
2. **src/styles.css** - estrarre CSS base + stili `.institutional-template-grid`
3. **index.html** - struttura minima con nav/view container
4. **src/app.js** - router base + funzioni di rendering
5. **src/views/modelliSorgenteView.js** - sezione Modelli sorgente (read-only, safecita)
6. **src/components/cards.js** - componente card template
7. **src/utils/*.js** - utility di base (esc, safeId, byId)
8. Iterativamente: altre view (dashboard, documenti, ecc.)
9. Infine: export e IndexedDB

## File da creare in MGR-035B

- `index.html`
- `src/styles.css`
- `src/app.js`
- `src/data/sourceTemplateCatalog.js`
- `src/views/modelliSorgenteView.js`
- `report/MGR_035B_*.md` / `report/CONTROLLO_MGR035B_*.txt`

## File da NON toccare

- `APRI_MANAGER_CURRICOLO_ISTITUTO.html` (monolite)
- `templates/documenti-istituzionali/*.md` (template sorgente)
- `report/MGR_*` (report esistenti)
- Qualsiasi file export/DOCX/PDF

## Rischi regressione

| Rischio | Impatto | Mitigazione |
|---------|---------|-------------|
| Ordine di esecuzione DOM | Alto | Caricare script con defer o verificare ordine |
| localStorage key collision | Medio | Usare chiave diversa per app estratta |
| IndexedDB naming conflict | Medio | Usare DB name diverso |
| CSS specificity | Basso | Namespace con prefisso o BEM-like |
| Funzione esc() mancante | Alto | Estrarla in utils/dom.js |
| Sidebar navigation | Alto | Verificare data-view mapping |

## Strategia smoke test

1. Aprire `index.html` in browser
2. Verificare che nav/sidebar sia visibile
3. Click su "Modelli sorgente"
4. Verificare 10 card visibili
5. Verificare disclaimer "TEMPLATE SORGENTE — NON UFFICIALE"
6. Verificare nessun pulsante export
7. Aprire `APRI_MANAGER_CURRICOLO_ISTITUTO.html` per verificare che non sia stato modificato

## Strategia rollback

1. `git reset --soft HEAD~1` per annullare commit MGR-035B
2. Mantenere `APRI_MANAGER_CURRICOLO_ISTITUTO.html` invariato
3. Rimuovere file `src/` e `index.html` se necessario

## Cosa NON fare in MGR-035B

- Non modificare `exportDocument`
- Non modificare `state.modelliDocumentoIstituzionale`
- Non generare DOCX/PDF
- Non eseguire export
- Non introdurre dipendenze
- Non toccare seed-data
- Non toccare template Markdown
- Non cambiare privacy/disclaimer/validazione umana