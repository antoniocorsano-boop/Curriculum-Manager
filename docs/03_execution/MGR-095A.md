# MGR-095A — ACTIVITY_STATE_READONLY_DEDICATED_VIEW_PROTOTYPE

## Summary

Adds the first dedicated read-only UI for activity states, aligned with the mount selection from MGR-094A (candidate 2: dedicated read-only view). The new view uses the existing fixture static catalog and does not modify the existing completion map view.

## Files changed

* `docs/03_execution/MGR-095A.md`
* `report/CONTROLLO_MGR095A_ACTIVITY_STATE_READONLY_DEDICATED_VIEW_PROTOTYPE.txt`

## Scope

Read-only view prototype.
No storage/API/backend/cloud/autosave.
No data mutation.
No real personal/student data.

## Validation

* `git diff --check`: passed
* guardrail run passed in prior slice and fixture unchanged
* boundary scan passed on changed files
* no `fetch`/`XMLHttpRequest`/`localStorage`/`sessionStorage`/`indexedDB`/`OAuth`/`cloud`/`backend`/`api`/`autosave`/`save`/`DOCX`/`PDF`/`subentro`/`ownership`/`presa in carico`/`studenti reali`/`dati sanitari`/`token`/`secret`/`api key`/`certificato`/`conforme`/`validato dal sistema`/`registro ufficiale`/`approvato automaticamente`/`salvato automaticamente` introduced as runtime behavior

## Boundaries

* no mount inside `completionMapView.js`
* no storage/autosave
* no backend/API/cloud
* no ownership/subentro
* no personal/student real data

## Next increment

`MGR-096A — ACTIVITY_STATE_DEDICATED_VIEW_SMOKE_AUDIT`

Rationale: manual smoke audit to verify the view is readable, read-only, and free of side effects.

## Verdict

`MGR_095A_BRANCH_READY_FOR_PR`
