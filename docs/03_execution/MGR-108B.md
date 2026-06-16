# MGR-108B — DEMO_RISK_RUNTIME_FIX_REVISION_AND_DOCUMENT_BUTTONS

## Summary

Fix runtime per problemi demo-facing identificati in MGR-108A.

## Riferimento

MGR-108A — audit-only con verdicto `MGR_108A_CLOSED_DEMO_RISK_IDENTIFIED`.

## Problemi osservati in demo

1. **Matrice Revisione non chiara**: il messaggio "Annota osservazioni..." non chiarisce che non si tratta di approvazione.
2. **Pulsante "Aggiungi osservazione" non funziona**: il textarea non aveva `id` per lo scroll.
3. **Pulsanti approvazione ambigui**: "Segna da rivedere" e "Completato manualmente" potrebbero far credere a approvazione istituzionale.

## File modificati

- `src/views/matriceRevisioneView.js`
- `src/views/documentiIstituzionaliView.js`

## Modifiche applicate

### matriceRevisioneView.js

1. Aggiunto notice warn introduttivo:
   "Questa sezione non approva documenti. Serve a preparare bozze per il confronto collegiale. Le annotazioni sono locali e non costituiscono validazione formale."

2. Aggiunto `id="draftNote-${_esc(item.id)}"` al textarea per far funzionare lo scroll del pulsante "Aggiungi osservazione".

### documentiIstituzionaliView.js

1. Rinominato pulsanti:
   - "Segna da rivedere" → "Prepara per confronto"
   - "Completato manualmente" → "Annota per revisione"
   - "Aggiungi osservazione" → "Aggiungi alle note"

2. Aggiunto notice warn in testata:
   "Ogni documento è una bozza di lavoro fino alla validazione del gruppo."

## Conferme

- Nessun backend/cloud/API introdotto
- Nessuna approvazione istituzionale reale
- Comportamento local-only preservato
- Nessun nuovo export DOCX/PDF

## Validazioni

```bash
git diff --check — PASS
node --check src/views/matriceRevisioneView.js — PASS
node --check src/views/documentiIstituzionaliView.js — PASS
```

## Rischi residui

Nessun BLOCKER. App demo-ready.

## Verdict

`MGR_108B_CLOSED_LOCAL_READY_FOR_SYNC`