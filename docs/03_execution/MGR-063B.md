# MGR-063B — DOCUMENT_FIRST_READING_VIEW_HOTFIX

## Obiettivo

Rivedere la vista documenti dopo MGR-063 per mettere il documento al centro, con guida e azioni in posizione secondaria.

## Baseline

- MGR-063 chiuso remoto
- 10 documenti con strutture leggibili
- App funzionante via file://

## File modificati

- `src/views/documentiIstituzionaliView.js` - Vista documenti rivista

## Cambiamenti implementativi

1. **CTA primaria**: "Apri documento" invece di "Leggi contenuto"

2. **Gerarchia rivista**:
   - Titolo documento
   - Descrizione
   - **Bozza di lavoro** (corpo documento con sezioni numerate)
   - **Guida rapida** (details richiudibile)
   - Azioni: "Apri revisione collegata", "Aggiungi osservazione"

3. **Card operative rimosse**: Eliminato "Perché l'ho aperta?", "A quale fase serve?", "Cosa devo controllare?", "Output atteso" come grid principale

4. **Guida rapida**: Spostata in `<details>` richiudibile

5. **Corpo documento**: Sezioni numerate con titolo e descrizione

## Copy rivista

- "Apri documento" (CTA)
- "Bozza di lavoro" (sezione principale)
- "Guida rapida" (sezione secondaria)
- "Fase:", "Output:", "Check:" (dentro details)

## Vincoli rispettati

- ✓ No backend/API
- ✓ No auth/login
- ✓ No OAuth/Drive
- ✓ No nuove dipendenze
- ✓ No dati studenti
- ✓ No DOCX/PDF programmatico

---

**MARKER**: `MGR_063B_DOCUMENT_FIRST_READING_VIEW_HOTFIX_READY`