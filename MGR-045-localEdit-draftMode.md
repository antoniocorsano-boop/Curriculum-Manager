# MGR-045: Local Edit Draft Mode

## Implementazione
- **File:** `src/views/matriceRevisioneView.js`

## Funzionalità Aggiunte
1. **Bozza locale** - Textarea per note in ogni riga della matrice
2. **Persistenza** - localStorage con chiave `cmDraftNotes`
3. **Reset** - Pulsante "Reset bozze locali" nella toolbar

## Dettagli Tecnici
- Textarea inline con `onchange="saveDraftNote()"`
- Nessuna richiesta dati personali
- Avviso "non ufficiale" nel label
- Cataloghi originali invariati

## Vincoli Rispettati
- ✅ Nessun backend/API
- ✅ Nessun login
- ✅ Nessun export DOCX/PDF
- ✅ Monolite intatto