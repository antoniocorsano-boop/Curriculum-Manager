# MGR-055: File Protocol Frame Self Load Hotfix

## Analisi
Nessun iframe/frame/object in index.html o JS. L'errore potrebbe derivare da:
- Cache browser/service worker
- Estensioni browser
- CSP pregressa

## Fix Applicato
- Aggiunto controllo file:// safety in app.js
- Rimosso CSP che potrebbe interferire

## Note
Il problema potrebbe richiedere clear cache o apertura in incognito.