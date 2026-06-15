# MGR-089A — ACTIVITY_STORAGE_TECHNICAL_CONTRACT

## Summary

Contratto tecnico separato per eventuale storage locale futuro degli stati attività della mappa di completamento del Curriculum di Istituto.

Definisce opzioni storage future ammesse e vietate, struttura concettuale, namespace/key strategy, versionamento, migrazioni, reset/cancellazione, import/export, backup, error handling, limiti di dimensione, comportamento offline, relazione con privacy/copy/domain contracts e prerequisiti prima di qualunque implementazione runtime.

Questo documento è puramente documentale: nessun codice, nessuna modifica runtime, nessuno storage reale, nessuna autosave.

## Files changed

* `docs/02_system/ACTIVITY-STORAGE-TECHNICAL-CONTRACT.md`
* `docs/03_execution/MGR-089A.md`
* `report/CONTROLLO_MGR089A_ACTIVITY_STORAGE_TECHNICAL_CONTRACT.txt`
* `REPO-MOVELOG.md`

## Scope

Docs/contract only.

No runtime files changed.

## Decision

Viene introdotto nel repo un contratto tecnico separato per storage futuro degli stati attività, senza implementazione.

Il contratto vieta sync/cloud/senza contratto separato, vieta autosave implicito, vieta storage di dati personali/studenti, definisce opzioni future ammesse (`none`, `memory-only`, `localStorage`, `IndexedDB`, `local file export/import`) e vieta `cloud/sync` senza nuovo contratto.

## Boundaries

* Non implementa storage.
* Non modifica runtime.
* Non introduce localStorage/sessionStorage/IndexedDB runtime.
* Non introduce autosave.
* Non introduce backend/API/OAuth/cloud/sync.
* Non introduce DOCX/PDF programmatico.
* Non introduce ownership/subentro.
* Non introduce dati personali/studenti reali.

## Validation

* `git diff --check`: passed.
* No changes to `src/**`.
* No changes to `index.html`.
* No changes to `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
* Boundary scan atteso: tutti i match sono boundary negativi/opzioni future/dati vietati.
* Nessun dato personale/studente reale.
* Nessuna contaminazione `e86064b`.

## Future slices dipendenti (raccomandazione)

 Raccomandato: `MGR-090B — ACTIVITY_STORAGE_TECHNICAL_CLOSURE_AUDIT`.

Motivo: i tre contratti foundational (domain, privacy, copy, storage technical) sono ora coerenti. Un audit-only di closure consoliderebbe i confini e i prerequisiti prima di qualunque prototipo o fixture read-only.

Alternative valide:
* `MGR-090A — ACTIVITY_STATE_READONLY_FIXTURE_PROTOTYPE_CONTRACT` (solo se contratti sono stabili e pronti per fixture statica).
* `MGR-090C — ACTIVITY_STATE_STATIC_GUARDRAIL` (solo se serve validare staticamente assenza di storage/API/wording vietato).
* `MGR-090D — ACTIVITY_OWNERSHIP_SUBENTRO_CONTRACT` (da rimandare salvo motivazione forte).

Expected post-merge verdict:

`MGR_089A_CLOSED_MERGED_REMOTE`
