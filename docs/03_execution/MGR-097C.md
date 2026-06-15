# MGR-097C — ACTIVITY_STATE_VIEW_READY_FOR_DEMO_AUDIT

## Summary

Demo-readiness audit for the dedicated read-only "Stati attività" view, following the clean smoke audit documented in MGR-096A.

This audit evaluates whether the view is presentable in a controlled demo without introducing runtime changes or additional features.

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
* `docs/03_execution/MGR-095A.md`
* `docs/03_execution/MGR-096A.md`

## Technical validation results

* `git diff --check`: passed
* `node --check src/views/activityStateReadOnlyView.js`: passed
* `node --check src/app.js`: passed
* `node --check src/components/sidebar.js`: passed
* `node scripts/guardrails/activityStateFixture.guardrail.js`: passed

## Demo readiness assessment

### Accessibility / navigation

* Sidebar includes clear entry "Stati attività".
* Entry is reachable via keyboard and mouse using shared navigation logic.
* Active state styling is consistent with other sidebar entries.

### Title / subtitle clarity

* Title: "Stati attività" — clear and domain-appropriate.
* Subtitle: explains that this is example data, read-only, and not an official registry or automatic validation.
* Assessment: understandable for a non-technical user, with one minor wording note.

### Read-only perception

* No input fields, forms, or editable controls are present.
* No save/approve/certify/take-ownership buttons.
* Footer notice reinforces that no data is saved or automatically validated.
* Prudence note on each card reinforces read-only nature.

### Copy / registry risk

* No wording such as "certificato", "conforme", "validato dal sistema", "registro ufficiale", "approvato automaticamente", "salvato automaticamente" is used as positive state wording.
* The view explicitly disclaims official registry or automatic validation semantics.

### Data exposure

* Only static example data from `activityStateFixtureCatalog.js` is shown.
* All records are marked `exampleData: true`, `containsPersonalData: false`, `containsStudentData: false`.
* No real personal or student data is present.

### Consistency with completion map

* Activity states align with the domain contract (MGR-086B) and UI copy contract (MGR-088A).
* The view is thematically consistent with the rest of the Curriculum Manager without implying formal approval or certification.

## Classification

**DEMO_READY_WITH_MINOR_NOTES**

Reason:
* The view is functionally ready for a controlled demo.
* One minor copy note: the subtitle phrase "Veste informativa di example data" is slightly awkward in Italian and could be polished for a smoother user experience. This does not block demo usage.

## Issues / gaps

* Minor: subtitle wording could be polished (non-blocking for demo).
* No runtime fixes required.
* No storage/API/backend/cloud issues found.

## Next increment recommendation

Recommended: `MGR-098A — ACTIVITY_STATE_VIEW_COPY_AND_ACCESSIBILITY_POLISH`

Rationale:
* The view is demo-ready with only minor copy polish needed.
* Polishing the subtitle and any small accessibility clarifications is the lowest-risk next step before a full demo flow audit.

Alternative (if polish is deemed unnecessary):
* `MGR-098C — CURRICULUM_MANAGER_DEMO_FLOW_READINESS_AUDIT` could be selected if the team accepts the current copy as-is.

## Verdict

`MGR_097C_BRANCH_READY_FOR_PR`
