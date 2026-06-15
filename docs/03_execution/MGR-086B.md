# MGR-086B — ACTIVITY_STATE_DOMAIN_CONTRACT

## Summary

Contratto di dominio per gli stati futuri delle attività della mappa di completamento del Curriculum di Istituto.

Definisce tassonomia degli stati, boundary, relazione con mappa/documenti/revisione/output, limiti privacy e prerequisiti prima di qualunque implementazione runtime.

Questo documento è puramente documentale: nessun codice, nessuna modifica runtime, nessuno storage, nessun backend.

## Files changed

* `docs/02_system/ACTIVITY-STATE-DOMAIN-CONTRACT.md`
* `docs/03_execution/MGR-086B.md`
* `report/CONTROLLO_MGR086B_ACTIVITY_STATE_DOMAIN_CONTRACT.txt`
* `REPO-MOVELOG.md`

## Scope

Docs/contract only.

No runtime files changed.

## Decision

Viene introdotto nel repo un contratto di dominio per stati attività futuri, senza implementazione.

Il contratto definisce 9 stati prudenti, vieta wording conformistico, ribadisce che la validazione è sempre umana/collegiale e stabilisce prerequisiti separati per storage, autosave, privacy, ownership/subentro e UI copy.

## Boundaries

* Non implementa UI.
* Non modifica runtime.
* Non introduce backend/API/OAuth/cloud/sync.
* Non introduce DOCX/PDF programmatico.
* Non introduce salvataggio/autosave/storage.
* Non introduce ownership/subentro/profilo reale.
* Non promette validazione automatica o conformità normativa.

## Validation

* `git diff --check`: passed.
* No changes to `src/**`.
* No changes to `index.html`.
* No changes to `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
* Nessun dato personale/studente reale.
* Nessuna contaminazione `e86064b`.

## Future slices dipendenti

* MGR-087A: activity data contract (storage/autosave/privacy)
* MGR-087B: activity ownership/subentro contract
* MGR-088: activity state UI (solo dopo contratti separati)

Expected post-merge verdict:

`MGR_086B_CLOSED_MERGED_REMOTE`
