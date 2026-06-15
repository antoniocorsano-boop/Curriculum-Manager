# MGR-094A — ACTIVITY_STATE_FIXTURE_UI_MOUNT_SELECTION_AUDIT

## Summary

Audit-only increment that defines how and where the read-only activity-state fixture can be introduced in the UI, without implementing runtime behavior.

This audit evaluates candidate mount locations, access constraints, and interaction rules so that any future runtime slice starts from an explicit, contract-bound placement decision.

## Scope

Docs/audit only.
No runtime changes.
No fixture modification.
No storage/API/backend/cloud/autosave.

## Audit inputs reviewed

* `docs/02_system/ACTIVITY-STATE-DOMAIN-CONTRACT.md`
* `docs/02_system/ACTIVITY-DATA-STORAGE-PRIVACY-CONTRACT.md`
* `docs/02_system/ACTIVITY-STATE-UI-COPY-CONTRACT.md`
* `docs/02_system/ACTIVITY-STORAGE-TECHNICAL-CONTRACT.md`
* `docs/02_system/ACTIVITY-STATE-READONLY-FIXTURE-PROTOTYPE-CONTRACT.md`
* `docs/03_execution/MGR-092A.md`
* `src/data/activityStateFixtureCatalog.js`
* `scripts/guardrails/activityStateFixture.guardrail.js`
* completion map UI files (read-only inspection)

## Audit findings

### Current surfaces

Verified existing surfaces include:
* Home dashboard
* Sidebar navigation entries
* Source templates / institutional documents views
* Revision matrix view
* Output center view
* Completion map view (read-only static area)

### Requirements for mount

* read-only only
* no editing/state transitions from the fixture view
* no new routing unless it is a simple, reversible view addition
* no modification to `index.html` imports
* no `src/app.js` route changes unless absolutely necessary
* no storage, no autosave, no API interaction
* must preserve navigation to existing views (Link/CMD/Sidebar)

### Candidate mounts (high level)

1. **Inline section within completion map view**
   * Keeps activity states adjacent to their domain context
   * Risk: potential coupling with existing view data
   * Decision: conservative by default; do not auto-compose into existing view string literals

2. **Sidebar entry pointing to dedicated read-only states view**
   * Lowest coupling
   * No existing sidebar entry appears to represent activity states yet
   * Risk: discoverability depends on placement clarity
   * Decision: safest path if contractual audit concludes that UI coupling is too high

3. **Flyout/panel from completion map when user requests details**
   * Useful if states should remain tied to areas but stay read-only
   * Risk: introduces panel state logic even if data remains static
   * Decision: still premature without explicit UI-state contract

### Recommended path

Preferred: **candidate 2** (dedicated read-only view triggered by explicit user action), subject to:
* ensuring no storage/save/autosave behavior is introduced
* ensuring view copy matches `ACTIVITY-STATE-UI-COPY-CONTRACT.md`
* ensuring route/view setup remains minimal and reversible

### Non-goals for this slice

* implementing the view
* mounting the fixture in source
* changing route guards
* adding navigation CTA or breadcrumbs beyond minimal placement audit

## Boundaries confirmed

* No `src/**` changes
* No `index.html` changes
* No `src/app.js` changes
* No `src/components/**` changes
* No `src/views/**` changes
* No storage/API/backend/cloud/autosave
* No data mutation
* No real personal/student data exposure
* No ownership/subentro runtime

## Relationship with existing contracts

* MGR-086B domain contract: fixture states are the same taxonomy
* MGR-087A privacy contract: no personal data is stored or emitted
* MGR-088A copy contract: any labels must conform to approved copy
* MGR-089A storage contract: default remains no persistence
* MGR-090A prototype contract: view remains read-only and informational
* MGR-091 closure audit: no contradictions found
* MGR-092A fixture data model: static data model is sufficient for first mount
* MGR-093A guardrail: static guardrail validates the fixture remains safe

## Validation

* `git diff --check` passed for guardrails/documentation files in earlier slices
* No forbidden keywords introduced in docs/report here
* Fixture guardrail remains applicable and unchanged

## Future slices

If mount is approved:
* dedicated runtime slice for selected mount option
* smoke test for copy and absence of storage/side effects

## Verdict

`MGR_094A_BRANCH_READY_FOR_PR`
