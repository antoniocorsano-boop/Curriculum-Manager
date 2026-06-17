# Document Governance Implementation Plan

## Purpose

This document is the governing implementation plan for the next Curriculum Manager cycle.

Curriculum Manager must evolve from a set of separate document utilities into a local-only document governance system for school curriculum work.

The product direction is:

> Sources -> Impacts -> Activities -> Drafts -> Human review -> Consolidated version -> Local archive.

The application may help organize, draft, review, and export evidence. It must not claim legal compliance, institutional approval, or automatic validation.

## Current product diagnosis

The remote app already has useful pieces:

- source materials
- institutional documents
- output center
- revision matrix
- completion map
- activity state view
- wiki
- local drafts and local export

The remaining gap is not one missing screen. The gap is the absence of a governing layer that connects:

- normative or institutional sources
- impacted documents
- impacted document sections
- required revision actions
- evidence needed for human validation
- local draft/output state

## Non-negotiable boundaries

All future implementation slices in this cycle must preserve these boundaries unless a later explicit contract changes them.

- Local-only HTML/CSS/JavaScript application.
- No backend.
- No API calls.
- No cloud sync.
- No authentication.
- No external AI runtime.
- No real student data.
- No institutional approval claim.
- No automatic legal/normative compliance claim.
- No programmatic DOCX/PDF generation without a dedicated gate.
- Browser print/export may remain allowed when explicitly scoped.
- Human validation remains mandatory for institutional use.

## Agent operating rule

Agents working from VS Code, Kilo Code, Copilot, Claude Code, Codex, or similar tools must follow this plan in slice order.

An agent must not skip from a later implementation idea directly into code.

If a requested change conflicts with this plan, the agent must stop and report the conflict before editing files.

## Required slice order

### MGR-109A — Remote reconciliation audit

Mode: audit-only.

Goal: reconcile the remote repository state before further implementation.

Tasks:

1. Verify the active remote repository.
2. Verify current branch and tracking branch.
3. Fetch and prune remotes.
4. Search all refs for any previous MGR-108B work.
5. Decide whether MGR-108B is present, absent, duplicated, or on the wrong branch.
6. Produce a report before any runtime change.

Suggested local commands:

```bash
git remote -v
git branch -vv
git fetch --all --prune
git log --oneline --decorate --all --grep="MGR-108B"
git branch -r | grep -i "108b"
git status --short --branch
```

Allowed files:

- docs/03_execution/MGR-109A.md
- report/CONTROLLO_MGR109A_REMOTE_RECONCILIATION.txt
- REPO-MOVELOG.md

Forbidden:

- src/**
- index.html
- runtime UI changes
- data model changes
- export changes
- storage changes

Exit verdict:

`MGR_109A_REMOTE_RECONCILIATION_CLOSED_SELECTION_MADE`

### MGR-109B — Document governance domain contract

Mode: docs-only / contract-only.

Goal: define the domain model before implementation.

Required concepts:

- normative source
- institutional source
- document
- document section
- impact
- revision activity
- evidence
- local draft
- local output
- human review
- institutional validation
- consolidated version
- superseded document

Allowed files:

- docs/02_system/DOCUMENT-GOVERNANCE-DOMAIN-CONTRACT.md
- docs/03_execution/MGR-109B.md
- report/CONTROLLO_MGR109B_DOCUMENT_GOVERNANCE_DOMAIN.txt
- REPO-MOVELOG.md

Forbidden:

- src/**
- index.html
- storage changes
- UI changes

Exit verdict:

`MGR_109B_DOCUMENT_GOVERNANCE_DOMAIN_CONTRACT_CLOSED`

### MGR-110A — Normative sources catalog

Mode: data-only / read-only.

Goal: introduce a static local catalog of sources.

Expected file:

- src/data/normativeSourcesCatalog.js

The catalog must include conservative metadata only:

- id
- title
- sourceType
- status
- date or dateStatus
- domains
- humanValidationRequired
- officialValidationClaim false
- notes

Forbidden:

- network fetch
- external links as runtime dependency
- automatic interpretation
- compliance scoring
- UI route changes unless explicitly scoped

Exit verdict:

`MGR_110A_NORMATIVE_SOURCES_CATALOG_CLOSED`

### MGR-110B — Document impact matrix catalog

Mode: data-only / read-only.

Goal: connect sources to impacted documents and document sections.

Expected file:

- src/data/documentImpactMatrixCatalog.js

The matrix must express:

- sourceId
- documentId
- impactedSections
- actionType
- priority
- status
- evidenceRequired
- humanValidationRequired

Forbidden:

- automatic updates to documents
- automatic rewriting
- hidden localStorage writes
- UI changes unless explicitly scoped

Exit verdict:

`MGR_110B_DOCUMENT_IMPACT_MATRIX_CATALOG_CLOSED`

### MGR-111A — Sources and impacts read-only view

Mode: UI read-only.

Goal: add the first human-readable view for sources and impacts.

Likely files:

- src/views/fontiImpattiView.js
- src/app.js
- src/components/sidebar.js
- index.html
- src/styles.css

The view must show:

- sources
- impacted documents
- impacted sections
- required action
- human validation status

Forbidden:

- save buttons
- approval buttons
- automatic compliance claims
- external data loading
- cloud/API/backend behavior

Exit verdict:

`MGR_111A_SOURCES_IMPACTS_READONLY_VIEW_CLOSED`

### MGR-112A — Completion map as operating center

Mode: UI workflow alignment.

Goal: make the completion map the operating center of the curriculum work path.

Required effect:

- The map becomes the logical entry point.
- Cards expose source/document/revision context.
- Navigation points users to the next relevant view.

Forbidden:

- unrelated visual redesign
- changing document data semantics without contract
- introducing action/approval claims

Exit verdict:

`MGR_112A_COMPLETION_MAP_OPERATING_CENTER_CLOSED`

### MGR-113A — Document context panel

Mode: UI enhancement.

Goal: when a document is opened, show why it exists and what impacts it.

The panel should show:

- linked sources
- impacted sections
- missing evidence
- next human action
- draft/output status

Forbidden:

- auto-editing document body
- hidden generated content
- compliance scoring

Exit verdict:

`MGR_113A_DOCUMENT_CONTEXT_PANEL_CLOSED`

### MGR-114A — Unified document governance state contract

Mode: contract-first.

Goal: reduce fragmented local state before further runtime changes.

Must reconcile current state areas:

- local document drafts
- output center state
- revision notes
- impact status
- evidence status

No runtime unification should happen before the contract is accepted.

Exit verdict:

`MGR_114A_DOCUMENT_GOVERNANCE_STATE_CONTRACT_CLOSED`

### MGR-115A — Local document revision report

Mode: local export / browser-only.

Goal: produce a local report useful for curriculum groups and departments.

Report should include:

- considered sources
- impacted documents
- sections to revise
- changed local drafts
- revision notes
- items ready for discussion
- items not validated

Allowed exports:

- Markdown
- JSON
- browser print if explicitly scoped

Forbidden:

- programmatic DOCX/PDF
- backend/cloud export
- automatic approval

Exit verdict:

`MGR_115A_LOCAL_DOCUMENT_REVISION_REPORT_CLOSED`

## Stop conditions

Stop immediately and report if any future slice attempts to:

- bypass MGR-109A reconciliation;
- implement UI before domain/data contracts;
- claim that the app verifies normative compliance;
- add backend/API/cloud/auth;
- introduce real student data;
- generate official institutional documents without human review language;
- add DOCX/PDF programmatic export without a dedicated gate;
- perform broad refactors not required by the current slice.

## Acceptance rule

A slice is acceptable only when it is small, named, documented, and validated.

Every slice should leave a trace in:

- docs/03_execution/
- report/ when there is an audit or control output
- REPO-MOVELOG.md

Runtime changes must include a manual smoke path when UI behavior is affected.
