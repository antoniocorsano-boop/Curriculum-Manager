# REPO-MOVELOG

## MGR-103A (2026-06-16) — POST_OUTPUT_CENTER_BLOCK_CLOSURE_AND_NEXT_SELECTION_AUDIT
- Chiusura post-audit Output Center completata
- Baseline confermata: f0a2fcc (PR #31/MGR-100C-c), 35d03e3 (PR #30/MGR-101A), 8613a07 (PR #29/MGR-100B)
- Worktree pulita creata da origin/main
- Output Center verificato: exportDocumentOutputCenterJSON, exportDocumentOutputCenterMarkdown, resetAllDocumentOutputs
- Toolbar Output Center funzionante
- LocalStorage limitato al perimetro dichiarato
- Nessun rischio residuo significativo
- Prossimo incremento selezionato: MGR-104B — APP_WIDE_NAVIGATION_SMOKE_AUDIT

## MGR-102A (2026-06-16) — OUTPUT_CENTER_EXPORT_RESET_POST_FIX_SMOKE_AUDIT
- Smoke audit post-fix Output Center completato in modalità audit-only/docs-only
- Baseline confermata da origin/main: f0a2fcc (PR #31/MGR-100C-c), 35d03e3 (PR #30/MGR-101A), 8613a07 (PR #29/MGR-100B)
- Nessuna modifica a runtime in questa slice
- Verificata presenza exportDocumentOutputCenterJSON, exportDocumentOutputCenterMarkdown, resetAllDocumentOutputs
- Toolbar Output Center visibile e funzionante
- Nessun riferimento a backend/API/cloud/DOCX/PDF

## MGR-101A (2026-06-16) — ACTIVITY_STATE_VIEW_POST_BINDING_FIX_SMOKE_AUDIT
- Smoke audit post-merge su origin/main completato in modalità audit-only/docs-only
- Baseline confermata da origin/main: 8613a07 (PR #29/MGR-100B), b9aaf69 (MGR-100C-b), 775a479 (MGR-100C-a), 91e2f1c (MGR-099A)
- Worktree pulita creata da origin/main, nessun vecchio branch usato
- Validazioni tecniche passate: node --check su tutti i file, guardrail eseguito
- cardCount confermato: 9
- interactiveCount: 0
- catalogWindow: object
- Nessun modifica a runtime (src/**), index.html, sidebar, Matrice Revisione, Output Center
- Nessun localStorage/sessionStorage/indexedDB/DOCX/PDF nel view activity state
- Classificazione: POST_BINDING_FIX_SMOKE_PASS
- Prossimo incremento selezionato: MGR-100C-c — OUTPUT_CENTER_EXPORT_RESET_HOTFIX

## MGR-100B-v2 (2026-06-16)
- ACTIVITY_STATE_VIEW_BINDING_FIX_AND_GUARDRAIL_EXTENSION_REBASELESS_REAPPLY completato
- Replacement branch creata da origin/main corrente dopo MGR-100C-a/MGR-100C-b, senza usare PR #28
- Nessun merge/rebase/reset/stash/restore/clean e nessun force push
- Root cause confermata: view legge window.activityStateFixtureCatalog ma PR #28 non era su main corrente e la fixture non esponeva quel binding
- Fix minimo applicato: window.activityStateFixtureCatalog = activityStateFixtureCatalog nella fixture
- Nessuna modifica a dati/stati fixture, copy, route, sidebar, index.html, styles, Output Center o Matrice Revisione
- Guardrail esteso per verificare fixture/view binding, rendering di activityStateCatalog.activities, assenza di controlli operativi e forbidden terms su fixture/view
- Smoke HTTP locale passato via http://localhost:5173: activityStateReadOnly active, titolo/sottotitolo visibili, cardCount 9, interactiveCount 0, catalogWindow object
- Navigazione smoke verificata: Stati attività, Matrice Revisione, Output Center
- Nessun evento console bloccante, nessun network failure, nessuna unexpected network, nessuna scrittura localStorage/sessionStorage, nessun accesso indexedDB
- Classificazione: POST_BINDING_FIX_SMOKE_PASS
- Prossimo incremento selezionato: MGR-101A — ACTIVITY_STATE_VIEW_POST_BINDING_FIX_SMOKE_AUDIT
- File: src/data/activityStateFixtureCatalog.js, scripts/guardrails/activityStateFixture.guardrail.js, docs/03_execution/MGR-100B.md, report/CONTROLLO_MGR100B_ACTIVITY_STATE_VIEW_BINDING_FIX_GUARDRAIL.txt

## MGR-100C-b (2026-06-15) - MATRICE_REVISIONE_RESET_DRAFT_NOTES_BUGFIX
- Fix runtime: aggiunta funzione `resetAllDraftNotes()` mancante nella Matrice Revisione
- Chiave localStorage interessata: `cmDraftNotes`
- Conferma prima del reset, ri-render della vista dopo
- Nessun nuovo storage/API/cloud/DOCX/PDF

## MGR-100C-a (2026-06-15) - NAVIGATION_SIDEBAR_FALLBACK_HOTFIX
- Fix navigazione: aggiunto fallback statico completo in index.html
- 7 voci di navigazione nel fallback (Materiali, Documenti, Output, Revisione, Mappa, Stati attività, Wiki)
- sidebar.js genera dinamicamente le stesse 7 voci
- Nessun cambiamento a matrice revisione o output center
- Nessun nuovo storage/API/cloud/Autosave/DOCX/PDF
- Smoke richiesto su http://localhost:5173

## MGR-099A (2026-06-15)
- ACTIVITY_STATE_VIEW_POST_POLISH_SMOKE_AUDIT completato in modalità docs-only/audit-only
- Baseline confermata da origin/main dopo merge MGR-098A: 7608c54bd5a572324d751e661630514e92e8c101
- Smoke HTTP locale completato via http://localhost:5173 con Chrome headless CDP
- Vista raggiungibile, sezione activityStateReadOnly attivabile, titolo e sottotitolo polish visibili
- Navigazione verso altre sezioni verificata: modelliSorgente, documentiIstituzionali, documentOutputCenter, matriceRevisione, completionMap, wiki
- Nessun evento console bloccante, nessun network failure, nessuna unexpected network, nessuna scrittura localStorage/sessionStorage, nessun accesso indexedDB
- Gap bloccante: cardCount 0 nella sezione activityStateReadOnly; la view legge window.activityStateFixtureCatalog mentre il catalogo esiste come globale lessicale, non come window property
- Classificazione: POST_POLISH_SMOKE_BLOCKED_RUNTIME_FIX_REQUIRED
- Stop code: STOP_RUNTIME_FIX_REQUIRED
- Prossimo incremento selezionato: MGR-100B — ACTIVITY_STATE_VIEW_GUARDRAIL_EXTENSION
- File: docs/03_execution/MGR-099A.md, report/CONTROLLO_MGR099A_ACTIVITY_STATE_VIEW_POST_POLISH_SMOKE_AUDIT.txt

## MGR-098A (2026-06-15)
- ACTIVITY_STATE_VIEW_COPY_AND_ACCESSIBILITY_POLISH completato
- Microcopy della vista Stati attività migliorato: dati di esempio, uso orientativo, sola lettura, nessuna verifica automatica
- Copy card reso più leggibile per docenti: riferimenti presenti, verifica umana richiesta/completata, nota read-only senza dato reale o scrittura
- Accessibilità leggera rafforzata con aria-label legenda, role=list/listitem e maggiore leggibilità CSS
- Nessuna nuova feature, route, storage, autosave, API, backend, cloud, DOCX/PDF o modifica fixture
- Smoke locale completato via http://localhost:5173: vista raggiungibile, sottotitolo visibile, zero controlli interattivi nella sezione, nessun evento console bloccante, nessuna scrittura storage, nessuna network inattesa
- Prossimo incremento selezionato: MGR-099A — ACTIVITY_STATE_VIEW_POST_POLISH_SMOKE_AUDIT
- File: src/views/activityStateReadOnlyView.js, src/styles.css, docs/03_execution/MGR-098A.md, report/CONTROLLO_MGR098A_ACTIVITY_STATE_VIEW_COPY_ACCESSIBILITY_POLISH.txt