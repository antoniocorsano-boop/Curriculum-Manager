# MGR-100B — ACTIVITY_STATE_VIEW_BINDING_FIX_AND_GUARDRAIL_EXTENSION

## Summary

MGR-100B fixes the runtime binding regression found by MGR-099A and extends the activity state guardrail so the same class of regression is blocked in future changes.

The issue was isolated to the read-only "Stati attività" view:

- `activityStateFixtureCatalog.js` is loaded as a classic browser script.
- The fixture exists as a lexical global in the browser context.
- The view reads `window.activityStateFixtureCatalog`.
- Before this fix, `window.activityStateFixtureCatalog` was `undefined`.
- Result: title/subtitle rendered, but activity cards did not render (`cardCount: 0`).

## Scope

- Minimal runtime binding fix for the activity state fixture/view.
- Guardrail extension to validate fixture/view binding.
- No new feature.
- No new route or view.
- No navigation changes.
- No storage, autosave, API, backend, cloud, ownership/subentro, real data, DOCX/PDF export behavior, or module conversion.

## Files changed

- `src/data/activityStateFixtureCatalog.js`
- `scripts/guardrails/activityStateFixture.guardrail.js`
- `docs/03_execution/MGR-100B.md`
- `report/CONTROLLO_MGR100B_ACTIVITY_STATE_VIEW_BINDING_FIX_GUARDRAIL.txt`
- `REPO-MOVELOG.md`

## Fix applied

### `src/data/activityStateFixtureCatalog.js`

Added explicit browser global exposure:

```js
window.activityStateFixtureCatalog = activityStateFixtureCatalog;
```

Rationale:

- Other project catalogs expose their global catalog on `window` (for example `window.INSTITUTIONAL_DOCUMENTS_CATALOG`, `window.REVISION_MATRIX_CATALOG`, `window.WIKI_CATALOG`).
- The activity state view already expects `window.activityStateFixtureCatalog`.
- This is the minimal fix aligned with the existing browser global catalog pattern.
- No fixture data, state labels, activity records, or read-only semantics were changed.

## Guardrail extension

### `scripts/guardrails/activityStateFixture.guardrail.js`

The existing fixture guardrail now validates both the fixture and the activity state view.

New checks:

- Fixture must expose `window.activityStateFixtureCatalog`.
- View must read `window.activityStateFixtureCatalog`.
- View must render `activityStateCatalog.activities`.
- View must not render operative `button`, `input`, or `form` controls.
- Activity fixture must contain at least one activity card.
- Forbidden terms are checked in both fixture and activity state view.
- Syntax checks cover both fixture and view.

Purpose:

- Fails if the view again depends on a binding that the fixture does not guarantee.
- Blocks future regressions where the fixture exists but is not exposed to the view through the expected browser global.
- Keeps the guardrail Node-only and dependency-free.

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

- Sidebar entry "Stati attività" reachable.
- `activityStateReadOnly` section active.
- Title visible.
- Subtitle visible.
- 9 activity cards rendered.
- No operative input/form/button/CTA in the activity section.
- No blocking console events.
- No network failures.
- No unexpected network URLs outside `http://localhost:5173/`.
- No `localStorage` writes.
- No `sessionStorage` writes.
- No `indexedDB` access.
- No DOCX/PDF download/export observed.

## Boundary scan

Searched modified files for:

```text
fetch
XMLHttpRequest
localStorage
sessionStorage
indexedDB
OAuth
cloud
backend
api
autosave
save
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

- Runtime changes contain no behavioral forbidden matches.
- Docs/report/movelog matches, if any, are only boundary-negative terms, forbidden-term lists, or historical control references.
- No storage/API/backend/cloud/autosave behavior introduced.

## Classification

`POST_BINDING_FIX_SMOKE_PASS`

## Next increment recommendation

Recommended: `MGR-101A — ACTIVITY_STATE_VIEW_POST_BINDING_FIX_SMOKE_AUDIT`

Rationale:

- Runtime fix and guardrail are in place.
- Local smoke passes with `cardCount: 9`.
- A follow-up smoke audit after this runtime fix is the lowest-risk next step before a broader demo-flow audit.

## Verdict

`MGR_100B_BRANCH_READY_FOR_PR`
