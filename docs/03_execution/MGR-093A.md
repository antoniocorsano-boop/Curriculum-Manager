# MGR-093A — ACTIVITY_STATE_READONLY_FIXTURE_STATIC_GUARDRAIL

## Summary

Aggiunge un guardrail statico/test leggero sulla fixture `activityStateFixtureCatalog.js` per verificare che rimanga read-only, statica, senza storage, senza API/backend/cloud, senza dati personali/studenti e senza copy vietato.

Non monta UI, non modifica `index.html`, non modifica `src/app.js`, non introduce runtime behavior.

## Files changed

* `scripts/guardrails/activityStateFixture.guardrail.js`
* `docs/03_execution/MGR-093A.md`
* `report/CONTROLLO_MGR093A_ACTIVITY_STATE_READONLY_FIXTURE_STATIC_GUARDRAIL.txt`

## Scope

Static test / guardrail only.

No runtime changes.

No UI changes.

## Guardrail summary

`scripts/guardrails/activityStateFixture.guardrail.js` validates:

- all 9 contract states are covered and no unexpected states are present;
- each activity record has all required fields;
- fixture-level flags: `readonly: true`, `exampleData: true`, `storageEnabled: false`;
- per-activity flags: same boolean flags are true/false as required;
- `evidenceRefs` is always an array;
- `activityId` uniqueness;
- no forbidden operational terms in any string value.

Run:

```bash
node scripts/guardrails/activityStateFixture.guardrail.js
```

## Boundary

Confirmed:
* no UI mount
* no navigation added
* no state persistence
* no autosave
* no backend/API/OAuth/cloud/sync
* no DOCX/PDF programmatic behavior
* no real personal/student data
* no ownership/subentro runtime

## Validation

* `git diff --check`: passed
* `node --check scripts/guardrails/activityStateFixture.guardrail.js`: passed
* guardrail run: passed
* no changes to `index.html`, `src/app.js`, `src/views/**`, `src/components/**`

## Future slices

Recommended: `MGR-094A — ACTIVITY_STATE_FIXTURE_UI_MOUNT_SELECTION_AUDIT`

Rationale: guardrail in place; next step is deciding where to mount the read-only fixture UI without runtime.

Expected verdict:

`MGR_093A_BRANCH_READY_FOR_PR`
