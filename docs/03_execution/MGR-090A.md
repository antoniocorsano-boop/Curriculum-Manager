# MGR-090A — ACTIVITY_STATE_READONLY_FIXTURE_PROTOTYPE_CONTRACT

## Summary

Contratto per il primo prototipo read-only degli stati attività nella mappa di completamento del Curriculum di Istituto.

Definisce significato di activity state, boundary read-only, state categories ammesse, relazione con contratti esistenti, human validation boundary, storage prohibition, future implementation gates e criteri di accettazione.

Questo documento è puramente documentale: nessun codice, nessuna modifica runtime, nessuna fixture JS/JSON reale, nessuno storage.

## Files changed

* `docs/02_system/ACTIVITY-STATE-READONLY-FIXTURE-PROTOTYPE-CONTRACT.md`
* `docs/03_execution/MGR-090A.md`
* `report/CONTROLLO_MGR090A_ACTIVITY_STATE_READONLY_FIXTURE_PROTOTYPE_CONTRACT.txt`
* `REPO-MOVELOG.md`

## Scope

Docs/contract only.

No runtime files changed.

## Decision

Viene introdotto nel repo un contratto separato per il prototipo read-only degli stati attività, senza implementazione.

Il contratto vieta storage, autosave, backend/API/cloud/sync, ownership/subentro, wording certificativo/conformistico, e ribadisce che la validazione resta umana/collegiale/istituzionale.

## Boundaries

* Non implementa fixture JS/JSON runtime.
* Non modifica src/**.
* Non modifica index.html.
* Non introduce localStorage/sessionStorage/IndexedDB runtime.
* Non introduce autosave.
* Non introduce backend/API/OAuth/cloud/sync.
* Non introduce DOCX/PDF programmatico.
* Non introduce ownership/subentro/profilo reale.
* Non promette validazione automatica o conformità normativa.

## Validation

* `git diff --check`: passed.
* No changes to `src/**`.
* No changes to `index.html`.
* No changes to `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
* Nessun dato personale/studente reale.
* Nessuna contaminazione `e86064b`.

## Future slices dipendenti (raccomandazione)

 Raccomandato: `MGR-090B — ACTIVITY_STATE_READONLY_FIXTURE_UI_CONTRACT` o successiva slice runtime dedicata, solo dopo contratti ownership/subentro/storage approvati.

Alternative:
* `MGR-090C — ACTIVITY_STATE_STATIC_GUARDRAIL` (solo se serve validare staticamente assenza di storage/API/wording vietato).
* `MGR-090D — ACTIVITY_OWNERSHIP_SUBENTRO_CONTRACT` (da rimandare salvo motivazione forte).

Expected post-merge verdict:

`MGR_090A_CLOSED_MERGED_REMOTE`
