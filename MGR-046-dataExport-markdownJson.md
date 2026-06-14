# MGR-046: Data Export Markdown JSON

## Implementazione
- **File:** `src/views/matriceRevisioneView.js`

## Funzionalità Aggiunte
1. **Esporta JSON** - download `matrice-revisione-bozza.json` con catalogo + note locali
2. **Esporta Markdown** - download `matrice-revisione-bozza.md` con formato leggibile
3. **Blob client-side** - nessun server, nessun DOCX/PDF generato

## Dettagli Export
- JSON: include tutti i campi catalogo + draftNote opzionale
- Markdown: header con titolo, categoria, area revisione, stati, controlli, bozze locali
- File naming chiaro: "bozza" per indicare non ufficialità

## Vincoli Rispettati
- ✅ Nessun backend/API
- ✅ Nessun DOCX/PDF programmatico
- ✅ Monolite intatto
- ✅ LocalStorage con chiave `cmDraftNotes` invariata