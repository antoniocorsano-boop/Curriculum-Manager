# Curriculum Manager — Agent Operating Instructions

## Repo canonico vs distribuzione ZIP

- **Questo repo** (`C:\Users\anton\Curriculum Manager`) è il **sorgente di sviluppo**: multi-file, struttura `src/`, non va aperto direttamente come app utente da questa cartella
- **Pacchetto distribuzione**: generato separatamente come ZIP auto-contenuto (es. `C:\Users\anton\CurMan`) con singolo file HTML + cartelle documenti
- **Non modificare mai il ZIP estratto come sorgente** — il file vero è questo repo
- **Non eseguire `git init` dentro cartelle estratte da ZIP** — non sono repo canonici

## Architecture

Pure client-side HTML/CSS/JS. No backend, API, build step, framework, or external dependencies.

### Entry points
- `APRI_MANAGER_CURRICOLO_ISTITUTO.html` (main), `index.html` (alternative)
- Open via `file://` — no server required

### Current structure

```
Curriculum Manager/
├── APRI_MANAGER_CURRICOLO_ISTITUTO.html   # Main entry
├── index.html                              # Alternative entry
├── src/
│   ├── app.js                              # Router & init
│   ├── styles.css                          # CSS with :root custom properties
│   ├── components/                         # Shared UI
│   │   ├── layout.js, sidebar.js, noticeBox.js
│   ├── utils/                              # Shared utilities (MGR-078A)
│   │   ├── html.js, storage.js, dom.js, components.js
│   ├── data/                               # Data catalogs (JS constants, 10 files)
│   └── views/                              # Application views (5 files)
│       ├── modelliSorgenteView.js           # Institutional templates
│       ├── documentiIstituzionaliView.js    # Documents with local drafts
│       ├── matriceRevisioneView.js          # Revision matrix with export
│       ├── wikiView.js                      # Integrated wiki/help
│       └── documentOutputCenterView.js      # Local output state (no auto export)
├── templates/documenti-istituzionali/       # Markdown templates (~11 files)
├── report/                                  # Control reports per version
└── docs/                                    # Documentation & MGR execution docs
```

### Persistence
- **localStorage**: user profile (`curriculumManager.*`), document drafts, output state
- **No remote saving** — everything local to the browser

### Current product flow
```
Sources → Documents (local drafts) → Revision matrix (MD/JSON export) → Browser print/PDF
```
Additional views: Wiki/guide, Output Center (local status only, no automatic export)

### Supported export
- **Print/PDF**: `window.print()` via browser
- **Word .doc**: HTML-compatible Word file
- **DOCX**: minimal native DOCX (WordprocessingML) — residual gate: test on Word/LibreOffice before distribution
- **Markdown/JSON**: data export from revision matrix
- **Session backup**: full JSON for restore on another PC

**Not supported**: advanced programmatic DOCX/PDF, digital signature, protocol registration, legal conservation, remote sync, automatic sending

### Testing
- **Manual only**: open HTML in browser, verify visually
- Runtime check scripts in `report/` (run in browser console)
- Demo script: `DEMO-SCRIPT.md`
- Verify on Chrome, Firefox, Safari, Edge
- Check: localStorage persistence, local file links (`file://`), exports work

### Permanent constraints
- No backend/API/deploy/dependencies
- No changes to the monolith without explicit authorization
- No programmatic DOCX/PDF export without dedicated gate
- Read-only semantics except for explicit draft/edit mode slices
- Keep local HTML/CSS/JS architecture

## Current phase

The previous demo-ready phase is closed. The current phase is **document governance**.

Active governing plan:
- `docs/02_system/DOCUMENT-GOVERNANCE-IMPLEMENTATION-PLAN.md`
- `.github/copilot-instructions.md` (if present)

## Product direction

The app must evolve from separate document utilities into a coherent local-only governance flow:

> Sources → Impacts → Activities → Drafts → Human review → Consolidated version → Local archive.

The app may organize work, show gaps, support local drafting, produce local evidence, and guide human review.

The app must not claim that it verifies legal compliance, institutional approval, or normative correctness.

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
- backend, API calls, cloud sync, authentication, external AI runtime
- real student data
- automatic legal/normative compliance claims
- institutional approval claims
- programmatic DOCX/PDF export
- broad refactors unrelated to the current slice

Keep the app local-only and browser-based.

## Runtime discipline

When a slice touches UI/runtime files, keep the change minimal and local to the slice.

Do not change:
- `APRI_MANAGER_CURRICOLO_ISTITUTO.html` unless explicitly authorized
- export behavior unless the slice is about export
- localStorage keys unless the slice is about state/storage
- routes/sidebar unless the slice is about navigation
- source data semantics unless the slice is about that data contract

## Documentation discipline

Every slice should leave traceability in:
- `docs/03_execution/`
- `REPO-MOVELOG.md`
- `report/` when an audit/control report is produced

Use clear verdicts. Stop when the slice is complete. Do not continue into the next slice without explicit instruction.

## Stop conditions

Stop and report instead of editing if the requested work would:
- skip the required slice order
- implement UI before required audit/contract/data slices
- add backend/API/cloud/auth
- introduce real student data
- claim automatic compliance or official approval
- add DOCX/PDF programmatic export without gate
- perform broad cleanup beyond the current slice
- merge or overwrite uncertain work before remote reconciliation

## Stale / da rimuovere

- `C:\Users\anton\CurMan` contains an extracted ZIP of the v3.3 distribution package. It is not a Git repo. Do not `git init` there. All modifications belong in this canonical repo.
