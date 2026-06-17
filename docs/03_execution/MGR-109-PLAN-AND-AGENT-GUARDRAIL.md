# MGR-109 — DOCUMENT_GOVERNANCE_IMPLEMENTATION_PLAN_AND_AGENT_GUARDRAIL

## Verdict

`MGR_109_PLAN_AND_AGENT_GUARDRAIL_CLOSED_REMOTE`

## Mode

Docs-only / plan-only / agent-guardrail-only.

## Purpose

Record the next coherent implementation path for Curriculum Manager and make it visible to local coding agents, VS Code, Kilo Code, Copilot-style assistants, and human maintainers.

## Why this slice exists

The project has reached a functional local-only demo, but recent implementation has grown through separate surfaces:

- source materials
- institutional documents
- output center
- revision matrix
- completion map
- activity state view
- wiki

The next product step must not be another isolated feature. It must organize the app around document governance:

> Sources -> Impacts -> Activities -> Drafts -> Human review -> Consolidated version -> Local archive.

## Files introduced or updated

- `docs/02_system/DOCUMENT-GOVERNANCE-IMPLEMENTATION-PLAN.md`
- `docs/03_execution/MGR-109-PLAN-AND-AGENT-GUARDRAIL.md`
- `.github/copilot-instructions.md`
- `KILO-CODE-INSTRUCTIONS.md`
- `AGENTS.md`
- `REPO-MOVELOG.md`

## Non-goals

This slice does not implement:

- new UI
- new routes
- new data catalogs
- new localStorage state
- export changes
- backend/API/cloud/auth
- DOCX/PDF generation
- AI runtime behavior
- normative interpretation automation

## Agent rule established

All agents must follow `docs/02_system/DOCUMENT-GOVERNANCE-IMPLEMENTATION-PLAN.md` before making future changes.

If a requested implementation conflicts with the plan, the agent must stop and report the conflict instead of editing files.

## Required next slice

The next implementation step is not a UI change.

The next slice is:

`MGR-109A — Remote reconciliation audit`

It must verify the actual remote/local state, including whether any previous `MGR-108B` work exists on the correct repo/branch.

## Validation

Manual validation for this slice is documentary:

- plan file present;
- agent guidance present;
- no runtime source file changes required;
- future slice order defined;
- stop conditions defined.

## Closure note

This slice deliberately freezes the direction before more code is written. The project should now proceed in small, named, traceable slices only.
