# MGR-054: File Protocol Script Boot Hotfix

## Root Cause
1. `let SOURCE_TEMPLATE_CATALOG = []` in modelliSorgenteView.js dichiarava variabile locale
2. `const SOURCE_TEMPLATE_CATALOG = [...]` in sourceTemplateCatalog.js dichiarava globale
3. Doppia dichiarazione causava SyntaxError
4. `initSourceTemplateCatalog` non esisteva più - era doppiamente definita

## Fix Applicato
- Rimosso `let SOURCE_TEMPLATE_CATALOG = []` e `initSourceTemplateCatalog()` da modelliSorgenteView.js
- Aggiunte funzioni `esc` e `jsAttr` localmente in modelliSorgenteView.js
- Rimosse chiamata a `initSourceTemplateCatalog` da app.js
- Catalog caricato come globale via `<script>` tag in index.html

## Validazione
- file:// protocol compatibile
- Nessun server necessario
- Nessun modulo ES
- Funzioni necessarie inline