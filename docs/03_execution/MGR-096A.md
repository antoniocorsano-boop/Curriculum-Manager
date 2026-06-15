# MGR-096A — ACTIVITY_STATE_DEDICATED_VIEW_SMOKE_AUDIT

## Summary

Post-merge smoke audit for the dedicated read-only "Stati attività" view introduced in MGR-095A.

This audit documents manual and technical verification that the view is reachable, readable, read-only, and free of side effects. No runtime code changes are made.

## Scope

Docs/audit only.
No runtime changes.
No fixture changes.
No UI changes.

## Files inspected

* `src/views/activityStateReadOnlyView.js`
* `src/data/activityStateFixtureCatalog.js`
* `scripts/guardrails/activityStateFixture.guardrail.js`
* `src/app.js`
* `src/components/sidebar.js`
* `index.html`
* `src/styles.css`

## Technical validation results

* `git diff --check`: passed
* `node --check src/views/activityStateReadOnlyView.js`: passed
* `node --check src/app.js`: passed
* `node --check src/components/sidebar.js`: passed
* `node scripts/guardrails/activityStateFixture.guardrail.js`: passed

## Smoke audit findings

### Reachability

* Sidebar includes “Stati attività” entry mapped to `activityStateReadOnly`.
* `index.html` defines `<section id="activityStateReadOnly" class="view"></section>`.
* `src/app.js` registers `activityStateReadOnly: renderActivityStateReadOnlyView` in the renderers map.
* Navigation buttons use shared `showView()` logic; selecting the sidebar entry should activate the view.

Expected behavior:
* Clicking “Stati attività” activates the section and calls `renderActivityStateReadOnlyView()`.
* The view renders cards from the static fixture catalog.

### Read-only verification

* View uses `window.activityStateFixtureCatalog` in read mode only.
* No form inputs, no text fields, no editable controls found in the view template.
* No save/submit/approve/certify/take-ownership buttons present.
* No mutation of `activityStateFixtureCatalog` data.

### No storage / no API

* View file does not reference `localStorage`, `sessionStorage`, `indexedDB`, `fetch`, `XMLHttpRequest`, `OAuth`, `backend`, `api`, `cloud`, `autosave`, `save`.
* `index.html` loads static JS catalog/view files only.
* No export/download logic for DOCX/PDF in the view.
* No subentro/ownership handling.

### Copy / registry risk

* Title: “Stati attività”.
* Subtitle/prudence notice explicitly states example data, read-only, no automatic validation or official registry semantics.
* No wording such as “certificato”, “conforme”, “validato dal sistema”, “registro ufficiale”, “approvato automaticamente”, “salvato automaticamente” used as positive state wording.

### Navigation

* Existing sidebar entries remain unchanged aside from the new activity state entry.
* Other views (`modelliSorgente`, `documentiIstituzionali`, `documentOutputCenter`, `matriceRevisione`, `completionMap`, `wiki`) are still present and routable via `showView()`.

### Reload behavior

* Because the view is static and client-side only, reloading the page should not persist or alter any state.
* No storage or network sync is invoked on render.

## Boundary scan

Scan performed on:

* `src/views/activityStateReadOnlyView.js`
* `src/app.js`
* `src/components/sidebar.js`
* `index.html`
* `src/styles.css`
* `docs/03_execution/MGR-096A.md`
* `report/CONTROLLO_MGR096A_ACTIVITY_STATE_DEDICATED_VIEW_SMOKE_AUDIT.txt`

Matches found:
* `docs/03_execution/MGR-096A.md` contains boundary-negative references to forbidden terms as part of the documented scan requirements. These are allowed as boundary negatives.
* No matches in runtime files that indicate implemented behavior.

## Issues / gaps

* None identified at audit time.
* No runtime bug requiring patch was observed in inspected code.

## Next increment recommendation

Recommended: `MGR-097C — ACTIVITY_STATE_VIEW_READY_FOR_DEMO_AUDIT`

Rationale:
* Smoke audit shows the view is reachable and read-only.
* No blocking copy, storage, or boundary issues were found.
* A demo readiness audit is the natural next step before any additional UI polish.

## Verdict

`MGR_096A_BRANCH_READY_FOR_PR`
