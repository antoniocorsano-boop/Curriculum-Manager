# MGR-035B — Estrazione app standard HTML/JS Step 1

Verdi: `MGR_035B_STANDARD_HTML_JS_STEP1_IMPLEMENTED_LOCALLY`

## Baseline

- **HEAD prima:** `82ff76316b293b36cfdaf68ef334d57e0e201448`
- **HEAD dopo:** in lavorazione
- **origin/main:** `82ff76316b293b36cfdaf68ef334d57e0e201448`

## File creati

- `index.html` - entry point minimale con nav/sidebar
- `src/styles.css` - stili CSS estratti
- `src/app.js` - router base + utility vanilla
- `src/data/sourceTemplateCatalog.js` - catalogo 10 template statici
- `src/views/modelliSorgenteView.js` - view Modelli sorgente (read-only)

## File NON modificati

- `APRI_MANAGER_CURRICOLO_ISTITUTO.html` - monolite intatto
- `templates/documenti-istituzionali/*.md` - template sorgente intatti

## Implementazione minima

### index.html
- Header con titolo
- Sidebar nav con voce "Modelli sorgente"
- Section view container
- Script includes nell'ordine: catalog, view, app

### src/styles.css
- Variabili CSS (`:root`)
- Reset globale
- Layout grid
- Componenti: card, badge, notice, toolbar, button
- `.institutional-template-grid` e `.institutional-template-card`
- Responsive media query

### src/app.js
- Funzione `esc()` per escaping HTML
- Funzione `jsAttr()` per attributi JS
- Router `showView()` / `renderView()`
- Event handler DOMContentLoaded con init catalog

### src/views/modelliSorgenteView.js
- `renderModelliSorgenteView()` - rendering completo
- `renderTemplateCard(t)` - card singola
- `copyPath()` - handler copia percorso
- Disclaimer: dati personali, validazione umana, nessun DOCX/PDF

## Verifiche eseguite

### git diff --check
- PASS

### git diff --name-only
- Solo file ammessi

### Pattern scan
- ✅ index.html contiene "src/app.js"
- ✅ src/app.js contiene "Modelli sorgente"
- ✅ modelliSorgenteView.js contiene "Modelli sorgente istituzionali"
- ✅ modelliSorgenteView.js contiene "non genera DOCX"
- ✅ modelliSorgenteView.js contiene "Come usare questi modelli"
- ✅ sourceTemplateCatalog.js contiene "templates/documenti-istituzionali"
- ✅ modelliSorgenteView.js contiene "TEMPLATE SORGENTE"

### DOCX/PDF generati
- Nessuno nuovo (solo pregressi esistenti)

## Smoke test locale

Aprire `index.html` e verificare:

- [x] App si apre nel browser
- [x] Nav/sidebar visibile
- [x] "Modelli sorgente" visibile nel nav
- [x] 10 card template visibili
- [x] Disclaimer "TEMPLATE SORGENTE — NON UFFICIALE" visibile
- [x] Nessun pulsante export/DOCX/PDF
- [x] Nessun errore JS console

## Limiti slice Step 1

- Solo la sezione "Modelli sorgente" è implementata
- Nessun export DOCX/PDF
- Nessun salvataggio locale
- Nessun localStorage
- Nessun IndexedDB
- Nessuna logica di stato complessa
- Nessun collegamento a Documenti istituzionali