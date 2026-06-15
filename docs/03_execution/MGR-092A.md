# MGR-092A — ACTIVITY_STATE_READONLY_FIXTURE_DATA_MODEL

## Summary

Introduce a static read-only fixture data model for future activity-state visualization in the Curriculum of Institute completion map.

No UI mount, no import in `index.html`, no runtime side effects.

## Files changed

* `src/data/activityStateFixtureCatalog.js`
* `docs/03_execution/MGR-092A.md`
* `report/CONTROLLO_MGR092A_ACTIVITY_STATE_READONLY_FIXTURE_DATA_MODEL.txt`

## Scope

Data-model / fixture contract only.

No runtime changes.

No UI changes.

No storage/autosave/API/backend/cloud.

## Decision

A minimal fixture catalog is added to represent the 9 activity states from the contract chain.

All records are synthetic examples, explicitly marked `exampleData: true`, `readonly: true`, `containsPersonalData: false`, `containsStudentData: false`, `storageEnabled: false`.

The file is **not** imported by `index.html`, `src/app.js`, views, or components.

## Boundaries

* No mount in UI.
* No navigation added.
* No state persistence.
* No autosave.
* No backend/API/OAuth/cloud/sync.
* No DOCX/PDF programmatic behavior.
* No real personal/student data.
* No ownership/subentro runtime.

## Validation

* `git diff --check`: passed.
* `node --check src/data/activityStateFixtureCatalog.js`: passed.
* No changes to `src/**` except allowed fixture catalog.
* No changes to `index.html`.
* Boundary scan passed.

## Future slices

Recommended: `MGR-093A — ACTIVITY_STATE_READONLY_FIXTURE_STATIC_GUARDRAIL`.

Rationale:

Before mounting UI, add a static guardrail that ensures no storage/API/dati reali/copy vietata leaks into future runtime slices.

Expected verdict:

`MGR_092A_BRANCH_READY_FOR_PR`
