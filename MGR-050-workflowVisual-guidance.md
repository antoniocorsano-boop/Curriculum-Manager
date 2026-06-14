# MGR-050: Workflow Visual Guidance Light

## Implementazione
- **File:** `src/data/workflowProcessCatalog.js`, `src/views/matriceRevisioneView.js`

## Rappresentazione Visuale
- 8 step del workflow in workflowProcessCatalog.js
- Ogni nodo: titolo, descrizione, stato
- Pulsante "Vai" per navigare alla vista correlata
- Toggle in toolbar della matrice revisione

## Workflow Steps
1. Orientamento nel percorso (COMPLETATO)
2. Consultazione documenti (ATTIVA)
3. Dettaglio documento (ATTIVA)
4. Revisione matrice (ATTIVA)
5. Note decisioni locali (ATTIVA)
6. Pacchetto stampa (ATTIVA)
7. Esportazione dati (ATTIVA)
8. Aggiornamento istituzionale (FUTURA)

## Vincoli Rispettati
- ✅ Nessuna libreria esterna
- ✅ Nessun backend/API
- ✅ Nessun monolite modificato
- ✅ HTML/CSS/JS puro