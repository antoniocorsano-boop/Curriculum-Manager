# MGR-099A — ACTIVITY_STATE_VIEW_POST_POLISH_SMOKE_AUDIT

## Summary

Docs-only / audit-only post-polish smoke audit for the read-only "Stati attività" view after MGR-098A.

MGR-098A merged into `main` with commit `7608c54bd5a572324d751e661630514e92e8c101`. This audit verifies whether the copy/accessibility polish is stable in a local HTTP demo without changing runtime files.

## Scope

- Docs/report only.
- No runtime changes.
- No `src/**` modifications.
- No `index.html`, `package.json`, fixture, view, sidebar, app, or styles changes.
- No storage, autosave, API, backend, cloud, ownership/subentro, DOCX/PDF behavior, or real personal/student data introduced.

## Files inspected

- `src/views/activityStateReadOnlyView.js`
- `src/styles.css`
- `src/data/activityStateFixtureCatalog.js`
- `scripts/guardrails/activityStateFixture.guardrail.js`
- `src/app.js`
- `src/components/sidebar.js`
- `index.html`
- `docs/03_execution/MGR-098A.md`

## Technical validation results

- `git diff --check`: passed
- `node --check src/views/activityStateReadOnlyView.js`: passed
- `node --check src/app.js`: passed
- `node --check src/components/sidebar.js`: passed
- `node scripts/guardrails/activityStateFixture.guardrail.js`: passed

## Local HTTP smoke

Server:

```bash
python -m http.server 5173
```

URL:

```text
http://localhost:5173
```

Chrome headless CDP checks:

- `http://localhost:5173/` reachable.
- Sidebar navigation reachable.
- Clicking "Stati attività" activates the `activityStateReadOnly` section.
- Navigation to other sections remains functional:
  - `modelliSorgente`
  - `documentiIstituzionali`
  - `documentOutputCenter`
  - `matriceRevisione`
  - `completionMap`
  - `wiki`
- Title "Stati attività" visible when section is active.
- Polished subtitle visible when section is active:
  - example data;
  - orientation/read-only use;
  - no replacement of human, collegial, or institutional checks.
- No blocking console events.
- No network failures.
- No unexpected network URLs outside `http://localhost:5173/`.
- No `localStorage` writes.
- No `sessionStorage` writes.
- No `indexedDB` access.
- No download/export DOCX/PDF network behavior observed.

## Smoke classification

`POST_POLISH_SMOKE_BLOCKED_RUNTIME_FIX_REQUIRED`

Reason:

- The section activates correctly and the polished title/subtitle are visible.
- However, Chrome CDP reported `cardCount: 0` inside the active `activityStateReadOnly` section.
- The fixture script is loaded over HTTP and the global lexical catalog is present in the page context, but the view reads `window.activityStateFixtureCatalog`.
- In the tested browser context, `window.activityStateFixtureCatalog` is `undefined`, so the card list is not rendered.
- This is a runtime view/catalog binding issue that requires a runtime patch.
- MGR-099A scope forbids runtime changes, so the audit is blocked rather than patched.

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

- No runtime files were modified in MGR-099A.
- Matches in docs/report/movelog are only boundary-negative terms, forbidden-term lists, or historical control references.
- No behavioral forbidden matches introduced by this audit.

## Gap / next action

Required follow-up before the post-polish smoke can pass:

- A runtime-safe activity state view catalog lookup is needed so the view can read the static fixture consistently in browser runtime.
- The fix must preserve read-only behavior, fixture immutability, no storage, no API/backend/cloud, and no ownership/subentro behavior.

Recommended next increment:

`MGR-100B — ACTIVITY_STATE_VIEW_GUARDRAIL_EXTENSION`

Rationale:

- The smoke found a view/catalog binding regression risk that is not covered by the existing fixture-only guardrail.
- A guardrail extension should block this class of view/sidebar/copy/runtime-mount regressions before the next demo-flow readiness audit.

## Verdict

`STOP_RUNTIME_FIX_REQUIRED`
