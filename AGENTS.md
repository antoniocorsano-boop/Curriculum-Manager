# Curriculum Manager — Agent Operating Instructions

## Current status

Curriculum Manager is a local-only HTML/CSS/JavaScript application for school curriculum document work.

The previous demo-ready phase is closed. The current phase is not another isolated feature. The current phase is document governance.

Active governing plan:

- `docs/02_system/DOCUMENT-GOVERNANCE-IMPLEMENTATION-PLAN.md`
- `KILO-CODE-INSTRUCTIONS.md`
- `.github/copilot-instructions.md`

## Product direction

The app must evolve from separate document utilities into a coherent local-only governance flow:

> Sources -> Impacts -> Activities -> Drafts -> Human review -> Consolidated version -> Local archive.

The app may organize work, show gaps, support local drafting, produce local evidence, and guide human review.

The app must not claim that it verifies legal compliance, institutional approval, or normative correctness.

## Required next slice

The next slice is:

`MGR-109A — Remote reconciliation audit`

Mode: audit-only.

Goal: reconcile the local/remote state and determine whether previous `MGR-108B` work exists on the correct repo/branch before further implementation.

Do not implement new source catalogs, impact matrix, UI views, sidebar changes, routes, storage behavior, export behavior, or runtime changes before MGR-109A and MGR-109B are complete.

## Required slice order

Follow this order unless a later explicit contract updates it:

1. MGR-109A — Remote reconciliation audit
2. MGR-109B — Document governance domain contract
3. MGR-110A — Normative sources catalog
4. MGR-110B — Document impact matrix catalog
5. MGR-111A — Sources and impacts read-only view
6. MGR-112A — Completion map as operating center
7. MGR-113A — Document context panel
8. MGR-114A — Unified document governance state contract
9. MGR-115A — Local document revision report

## Permanent boundaries

Do not add or change these unless a dedicated future contract explicitly authorizes it:

- backend
- API calls
- cloud sync
- authentication
- external AI runtime
- real student data
- automatic legal/normative compliance claims
- institutional approval claims
- programmatic DOCX/PDF export
- broad refactors unrelated to the current slice

Keep the app local-only and browser-based.

## Runtime discipline

When a slice touches UI/runtime files, keep the change minimal and local to the slice.

Do not change:

- `APRI_MANAGER_CURRICOLO_ISTITUTO.html` unless explicitly authorized;
- export behavior unless the slice is about export;
- localStorage keys unless the slice is about state/storage;
- routes/sidebar unless the slice is about navigation;
- source data semantics unless the slice is about that data contract.

## Documentation discipline

Every slice should leave traceability in:

- `docs/03_execution/`
- `REPO-MOVELOG.md`
- `report/` when an audit/control report is produced

Use clear verdicts. Stop when the slice is complete. Do not continue into the next slice without explicit instruction.

## Stop conditions

Stop and report instead of editing if the requested work would:

- skip the required slice order;
- implement UI before required audit/contract/data slices;
- add backend/API/cloud/auth;
- introduce real student data;
- claim automatic compliance or official approval;
- add DOCX/PDF programmatic export without gate;
- perform broad cleanup beyond the current slice;
- merge or overwrite uncertain work before remote reconciliation.
