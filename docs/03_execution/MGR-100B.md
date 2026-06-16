# MGR-100B-v2 — ACTIVITY_STATE_VIEW_BINDING_FIX_AND_GUARDRAIL_EXTENSION_REBASELESS_REAPPLY

## Summary

MGR-100B-v2 is the replacement branch for MGR-100B after PR #28 was opened against an older `main` and became `CONFLICTING`.

This branch was created from current `origin/main`, after MGR-100C-a and MGR-100C-b, and reapplies only the MGR-100B binding fix plus guardrail extension.

No merge, rebase, reset, stash, restore, clean, or force push was used for this replacement branch.

## Baseline

Current `origin/main` baseline includes:

- `b9aaf69` — MGR-100C-b
- `775a479` — MGR-100C-a
- `91e2f1c` — MGR-099A

The replacement branch is based on current `origin/main`:

```text
feat/mgr-100b-v2-activity-state-view-binding-fix-guardrail
```

## Problem fixed

MGR-099A found:

- `activityStateFixtureCatalog.js` loaded via HTTP.
- The catalog existed as a lexical browser global.
- The view expected `window.activityStateFixtureCatalog`.
- `window.activityStateFixtureCatalog` was `undefined`.
- Result: title/subtitle rendered, but activity cards did not render (`cardCount: 0`).

## Runtime fix

`src/data/activityStateFixtureCatalog.js` now explicitly exposes the fixture:

```js
window.activityStateFixtureCatalog = activityStateFixtureCatalog;
```

This is the minimal fix aligned with the existing project pattern where browser catalogs are exposed on `window`.

No fixture data, states, copy, routes, sidebar, app shell, styles, or view behavior were changed.

## Guardrail extension

`scripts/guardrails/activityStateFixture.guardrail.js` now validates both the fixture and the activity state view.

Checks added:

- fixture exposes `window.activityStateFixtureCatalog`;
- view reads `window.activityStateFixtureCatalog`;
- view renders from `activityStateCatalog.activities`;
- view does not render operative `button`, `input`, or `form` controls;
- fixture contains at least one activity card;
- syntax checks cover fixture and view;
- forbidden terms are checked in fixture and view.

Purpose:

- Prevent the same binding regression from returning.
- Keep the guardrail Node-only and dependency-free.
- Avoid guardrail-only fixes that would leave the demo broken.

## Files changed

- `src/data/activityStateFixtureCatalog.js`
- `scripts/guardrails/activityStateFixture.guardrail.js`
- `docs/03_execution/MGR-100B.md`
- `report/CONTROLLO_MGR100B_ACTIVITY_STATE_VIEW_BINDING_FIX_GUARDRAIL.txt`
- `REPO-MOVELOG.md`

## Technical validation results

Passed:

- `git diff --check`
- `node --check src/data/activityStateFixtureCatalog.js`
- `node --check src/views/activityStateReadOnlyView.js`
- `node --check src/app.js`
- `node --check src/components/sidebar.js`
- `node scripts/guardrails/activityStateFixture.guardrail.js`

## Local HTTP smoke

Server:

```bash
python -m http.server 5173
```

URL:

```text
http://localhost:5173
```

Chrome headless CDP result:

```json
{
  "active": true,
  "title": "Stati attività",
  "intro": "Dati di esempio a uso orientativo, in sola lettura. La vista aiuta a interpretare gli stati del Curriculum di Istituto durante la demo, senza sostituire le verifiche umane, collegiali o istituzionali.",
  "cardCount": 9,
  "interactiveCount": 0,
  "catalogWindow": "object",
  "storageWrites": [],
  "indexedDBAccessed": false
}
```

Additional smoke checks:

- sidebar entry "Stati attività" reachable;
- `activityStateReadOnly` section active;
- title visible;
- subtitle visible;
- 9 activity cards rendered;
- no operative input/form/button/CTA in the activity section;
- navigation to Matrice Revisione and Output Center still works;
- no blocking console events;
- no network failures;
- no unexpected network URLs outside `http://localhost:5173/`;
- no `localStorage` writes;
- no `sessionStorage` writes;
- no `indexedDB` access;
- no DOCX/PDF download/export observed.

## Boundary scan

Searched modified files for:

```text
fetch
XMLHttpRequest
sessionStorage
indexedDB
OAuth
cloud
backend
api
autosave
DOCX
PDF
subentro
ownership
presa in carico
studenti reali
dati sanitari
token
secret
api key
certificato
conforme
validato dal sistema
registro ufficiale
approvato automaticamente
salvato automaticamente
```

Classification:

- runtime changes contain no behavioral forbidden matches;
- docs/report/guardrail/movelog matches are boundary-negative terms, forbidden-term lists, or historical control references;
- no storage/API/backend/cloud/autosave behavior introduced.

## Classification

`POST_BINDING_FIX_SMOKE_PASS`

## Next increment recommendation

Recommended: `MGR-101A — ACTIVITY_STATE_VIEW_POST_BINDING_FIX_SMOKE_AUDIT`

Rationale:

- The binding fix and guardrail are in place.
- Local smoke passes with `cardCount: 9`.
- A focused post-binding-fix smoke audit is the lowest-risk next step.

## Verdict

`MGR_100B_V2_BRANCH_READY_FOR_PR`
