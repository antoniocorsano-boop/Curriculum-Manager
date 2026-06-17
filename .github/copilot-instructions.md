# Copilot / VS Code Instructions — Curriculum Manager

## Active governing plan

Before suggesting or applying code changes, read:

- `docs/02_system/DOCUMENT-GOVERNANCE-IMPLEMENTATION-PLAN.md`
- `AGENTS.md`

The active product direction is:

> Sources -> Impacts -> Activities -> Drafts -> Human review -> Consolidated version -> Local archive.

## Mandatory behavior

Follow the implementation plan in slice order.

Do not skip directly to UI or runtime implementation when the plan requires audit, contract, or data-only slices first.

If the user asks for something that conflicts with the plan, stop and explain the conflict before editing files.

## Current next slice

The next slice is:

`MGR-109A — Remote reconciliation audit`

Do not implement sources/impacts UI before MGR-109A and MGR-109B are complete.

## Hard boundaries

Do not add:

- backend
- API calls
- cloud sync
- authentication
- external AI runtime
- real student data
- automatic legal/normative compliance claims
- institutional approval claims
- programmatic DOCX/PDF export without a dedicated gate

Keep the app local-only HTML/CSS/JavaScript unless a future explicit contract changes that boundary.

## File discipline

Each slice must be small and named.

Every slice should update:

- `docs/03_execution/`
- `REPO-MOVELOG.md`
- `report/` when an audit/control output is produced

Do not perform broad refactors unless the current slice explicitly authorizes them.
