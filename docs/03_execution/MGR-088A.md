# MGR-088A — ACTIVITY_STATE_UI_COPY_CONTRACT

## Summary

Contratto di copy/UI per mostrare in futuro gli stati attività nella mappa di completamento del Curriculum di Istituto.

Definisce tono ammesso/vietato, etichette, microcopy, CTA, indicatori visuali, messaggi di prudenza e requisiti prima di qualunque UI runtime.

Questo documento è puramente documentale: nessun codice, nessuna modifica runtime, nessuna UI reale, nessuno storage.

## Files changed

* `docs/02_system/ACTIVITY-STATE-UI-COPY-CONTRACT.md`
* `docs/03_execution/MGR-088A.md`
* `report/CONTROLLO_MGR088A_ACTIVITY_STATE_UI_COPY_CONTRACT.txt`
* `REPO-MOVELOG.md`

## Scope

Docs/contract only.

No runtime files changed.

## Decision

Viene introdotto nel repo un contratto separato per il copy/UI degli stati attività, senza implementazione.

Il contratto vieta wording certificativo/conformistico, definisce copy ammesso per 9 stati, regole CTA, indicatori visuali prudenti e messaggi di prudenza obbligatori.

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

* MGR-089A: activity storage technical contract
* MGR-089B: activity state read-only fixture prototype contract
* MGR-089D: activity ownership/subentro contract (da rimandare)

Expected post-merge verdict:

`MGR_088A_CLOSED_MERGED_REMOTE`
