# MGR-040: Print Button Client-Side

## Implementazione
- **Scope:** pulsante "Stampa / Salva in PDF" nella view matriceRevisione
- **Metodo:** `window.print()` client-side
- **CSS:** uso della classe `.no-print` esistente per nascondere il pulsante nella stampa

## Modifica Applicata
File: `src/views/matriceRevisioneView.js`
- Aggiunta toolbar con bottone secondario "Stampa / Salva in PDF"
- Mantenuto wording "export DOCX non disponibile" (nessun riferimento a generazione PDF programmatica)
- Semantica read-only preservata

## Verifiche
- ✅ Nessun DOCX generato
- ✅ Nessun backend/API aggiunto
- ✅ Nessuna dipendenza
- ✅ Monolite intatto
- ✅ Cataloghi invariati

## Smoke Test Manuale
- App navigabile
- Pulsante presente nella view matriceRevisione
- `window.print()` aziona dialog di stampa browser

## Verdetto
**MGR_040_PRINT_BUTTON_CLIENT_SIDE_READY**