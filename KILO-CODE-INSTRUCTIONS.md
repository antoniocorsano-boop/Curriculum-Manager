# Kilo Code Instructions — Curriculum Manager

## Required reading order

Before editing files in this repository, review:

1. `AGENTS.md`
2. `docs/02_system/DOCUMENT-GOVERNANCE-IMPLEMENTATION-PLAN.md`
3. the active `docs/03_execution/MGR-*.md` slice file, when present
4. `REPO-MOVELOG.md`

## Product direction

Curriculum Manager must move toward a local-only document governance flow:

Sources -> Impacts -> Activities -> Drafts -> Human review -> Consolidated version -> Local archive.

It must not become a collection of unrelated screens or generators.

## Mandatory next slice

The next slice is `MGR-109A — Remote reconciliation audit`.

Do not start implementation of sources, impact matrix, UI views, sidebar changes, routes, storage, or export behavior before that audit is complete.

## Slice discipline

For each slice:

1. declare the slice name and mode;
2. inspect only relevant files;
3. modify only allowed files;
4. preserve all hard boundaries;
5. run available validation;
6. write or update the execution report;
7. update `REPO-MOVELOG.md`;
8. stop with a clear verdict.

## Hard stop conditions

Stop and report instead of editing if the requested work would add or change:

- backend, API, cloud sync, or authentication;
- external AI runtime;
- real student data;
- automatic compliance claims;
- institutional approval claims;
- programmatic DOCX/PDF generation without a dedicated gate;
- broad refactors;
- UI changes before required contract/data slices;
- storage changes before the governance state contract.

## MGR-109A checklist

For the next work session, execute only the remote reconciliation audit.

Allowed outputs:

- `docs/03_execution/MGR-109A.md`
- `report/CONTROLLO_MGR109A_REMOTE_RECONCILIATION.txt`
- `REPO-MOVELOG.md`

Required checks:

- verify remote URL and branch tracking;
- fetch and prune remotes;
- search all refs for `MGR-108B`;
- determine whether that work is present, absent, duplicated, or on the wrong branch;
- do not modify runtime files.

Expected verdict:

`MGR_109A_REMOTE_RECONCILIATION_CLOSED_SELECTION_MADE`
