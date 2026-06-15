# MGR-100C-b — MATRICE_REVISIONE_RESET_DRAFT_NOTES_BUGFIX

## Contesto
Il pulsante "Reset annotazioni" nella Matrice Revisione chiama `resetAllDraftNotes()` che non era definita. Questo causava un errore runtime.

## Fix
Aggiunta funzione `resetAllDraftNotes()` che:
- Richiede conferma all'utente
- Rimuove la chiave `cmDraftNotes` da localStorage
- Ri-renderizza la vista Matrice Revisione

## Accettazione
- `resetAllDraftNotes()` esiste e funziona
- Il pulsante reset non genera più errore runtime
- Il reset cancella solo le draft notes della Matrice Revisione
- Chiave localStorage interessata: `cmDraftNotes`
- Nessuna modifica a sidebar/output center/activity state