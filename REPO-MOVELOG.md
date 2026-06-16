# REPO-MOVELOG

## MGR-102A (2026-06-16) — OUTPUT_CENTER_EXPORT_RESET_POST_FIX_SMOKE_AUDIT
- Smoke audit post-fix completato in modalità audit-only/docs-only
- Baseline confermata da origin/main: f0a2fcc (PR #31/MGR-100C-c), 35d03e3 (PR #30/MGR-101A), 8613a07 (PR #29/MGR-100B)
- Worktree pulita creata da origin/main, nessun vecchio branch usato
- Funzioni verifycate: exportDocumentOutputCenterJSON, exportDocumentOutputCenterMarkdown, resetAllDocumentOutputs
- Toolbar Output Center visibile con pulsanti export e reset
- Nessuna modifica a runtime in questa slice
- Classificazione: POST_FIX_SMOKE_PASS

## MGR-100C-c (2026-06-16) — OUTPUT_CENTER_EXPORT_RESET_HOTFIX
- Hotfix completato: aggiunte funzioni mancanti nell'Output Center
- Funzioni aggiunte: exportDocumentOutputCenterJSON(), exportDocumentOutputCenterMarkdown(), resetAllDocumentOutputs()
- Toolbar aggiunta nella vista Output Center con pulsanti export JSON, export Markdown, reset tutti
- Export locali browser-only (Blob + download), nessun backend/cloud/DOCX/PDF
- Reset limitato a: curriculumManager.documentOutputState e bozze documenti
- Nessun impatto su Matrice Revisione, sidebar, Activity State
- Validazioni tecniche passate: git diff --check, node --check
- Prossimo incremento: MGR-102A — OUTPUT_CENTER_EXPORT_RESET_POST_FIX_SMOKE_AUDIT

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

## MGR-090A (2026-06-15)
- ACTIVITY_STATE_READONLY_FIXTURE_PROTOTYPE_CONTRACT definito in modalità docs/contract-only
- Contratto per primo prototipo read-only stati attività: superficie visiva statica/semi-statica, senza persistenza, senza interazioni di salvataggio
- activity state definito come indicatore di avanzamento, non come giudizio di conformità/validazione/certificazione/completamento ufficiale/registro ufficiale/valutazione nominativa
- 9 state categories ammesse e confinate: not_started, orientation_available, in_progress, evidence_present, needs_review, ready_for_human_validation, human_validated, blocked, not_applicable
- human_validated: non impostabile da CTA/interazione nel prototipo; transizione riservata a contratto ownership/subentro separato
- Wording certificativo/conformistico/autoritario/definitivo/registriale vietato
- Prototipo può mostrare: label stato, descrizione prudente, riferimento a evidenza/documento, indicatore visivo non certificativo, nota di prudenza fissa
- Prototipo non deve implicare: conformità, approvazione istituzionale, certificazione, completamento ufficiale, registro ufficiale, salvataggio invisibile, registro scolastico ufficiale
- Storage prohibition per questa slice: nessun localStorage/sessionStorage/IndexedDB/autosave/fetch/API/backend/cloud/sync
- Relazione con MGR-086B/087A/088A/089A chiarita: rispetta domain, privacy, copy, storage technical contracts
- Future implementation gates definiti: slice runtime dedicata, contratti ownership/subentro/storage/audit trail approvati, smoke test, test parole vietate, WCAG, privacy/reset, documentazione utente, rollback plan
- File: docs/02_system/ACTIVITY-STATE-READONLY-FIXTURE-PROTOTYPE-CONTRACT.md, docs/03_execution/MGR-090A.md, report/CONTROLLO_MGR090A_ACTIVITY_STATE_READONLY_FIXTURE_PROTOTYPE_CONTRACT.txt

## MGR-089A (2026-06-15)
- ACTIVITY_STORAGE_TECHNICAL_CONTRACT definito in modalità docs/contract-only
- Opzioni storage future definite senza implementazione: none, memory-only, localStorage, IndexedDB, local file export/import
- cloud/sync vietato finché non esiste contratto separato
- Struttura concettuale futura definita: storageVersion, activities, activityId, state, updatedAt, updatedByRole, evidenceRefs, validationRequired, validationStatus, validationNote, blockedReason, metadata, resetAt
- Namespace/key strategy, versionamento, migrazioni, reset/cancellazione, import/export, backup, error handling, limiti dimensione, comportamento offline definiti
- Relazione con MGR-086B/087A/088A chiarita
- Dati vietati: nomi studenti reali, codici fiscali, dati sanitari, BES/DSA/PEI/PDP nominativi, valutazioni nominative, credenziali, token, API key, allegati reali, documenti firmati, registro ufficiale, log non anonimizzati
- Prerequisiti prima di storage runtime definiti: nuova slice, test, smoke audit, rollback plan, documentazione utente privacy/reset
- File: docs/02_system/ACTIVITY-STORAGE-TECHNICAL-CONTRACT.md, docs/03_execution/MGR-089A.md, report/CONTROLLO_MGR089A_ACTIVITY_STORAGE_TECHNICAL_CONTRACT.txt
- Report controllo: MGR_089A_CLOSED_MERGED_REMOTE
- Raccomandazione prossimo incremento: MGR-090B — ACTIVITY_STORAGE_TECHNICAL_CLOSURE_AUDIT

## MGR-088A (2026-06-15)
- ACTIVITY_STATE_UI_COPY_CONTRACT definito in modalità docs/contract-only
- Copy ammesso/vietato per 9 stati: not_started, orientation_available, in_progress, evidence_present, needs_review, ready_for_human_validation, human_validated, blocked, not_applicable
- Categorie dati future: activityId, state, stateUpdatedAt, stateUpdatedByRole, evidenceRefs, validationRequired, validationStatus, validationNote, blockedReason, localDraftMetadata, resetMarker
- Dati vietati in questa fase: nomi studenti reali, codici fiscali, dati sanitari, BES/DSA/PEI nominativi, valutazioni nominative, credenziali, token, chiavi API, dati sincronizzati cloud, allegati reali, documenti firmati, registro ufficiale
- Regole di minimizzazione, reset/cancellazione, esportazione futura subordinata a contratto separato
- Divieti: sync/cloud/backend, salvataggio implicito, autosave non visibile, logging dati personali/studenti, tracking utente non anonimizzata
- Informativa UI futura e audit trail concettuale definiti
- Prerequisiti runtime definiti: storage tecnico, UI copy/privacy, reset/export, audit trail, ownership/subentro, smoke test, scan privacy
- Confini: nessun runtime, nessun salvataggio, nessun backend/API/cloud, nessuna ownership/subentro, nessun dato personale/studente reale
- File: docs/02_system/ACTIVITY-DATA-STORAGE-PRIVACY-CONTRACT.md, docs/03_execution/MGR-087A.md, report/CONTROLLO_MGR087A_ACTIVITY_DATA_STORAGE_PRIVACY_CONTRACT.txt

## MGR-086B (2026-06-15)
- ACTIVITY_STATE_DOMAIN_CONTRACT definito in modalità docs/contract-only
- Stati futuri definiti: not_started, orientation_available, in_progress, evidence_present, needs_review, ready_for_human_validation, human_validated, blocked, not_applicable
- Stati vietati e wording vietato: compliant, normativamente valido, approvato automaticamente, certificato, conforme al ministero, completato ufficialmente
- Differenza chiara: avanzamento ≠ evidenza ≠ revisione ≠ validazione umana
- Validazione sempre umana/collegiale, non automatica
- Struttura dati concettuale documentata: activityId, state, evidenceRefs, lastUpdatedAt, updatedByRole, requiresHumanValidation, validationNote, blockedReason, sourceView, targetOutput
- Prerequisiti runtime definiti: storage/autosave, privacy, ownership/subentro, UI copy, smoke audit
- Confini: nessun runtime, nessun salvataggio, nessun backend/API/cloud, nessuna ownership/subentro
- File: docs/02_system/ACTIVITY-STATE-DOMAIN-CONTRACT.md, docs/03_execution/MGR-086B.md, report/CONTROLLO_MGR086B_ACTIVITY_STATE_DOMAIN_CONTRACT.txt

## MGR-084B (2026-06-15)
- COMPLETION_MAP_READONLY_CARD_LINKS implementata come link read-only dalle card della Mappa a viste esistenti
- Card "Discipline" → "Apri sezione Documenti" (documentiIstituzionali)
- Card "Revisione e coerenza" → "Apri sezione Revisione" (matriceRevisione)
- Card "Output e validazione finale" → "Apri sezione Output" (documentOutputCenter)
- Solo aree con vista esistente coerente ricevono link; le altre restano senza link
- Click link usa showView() esistente, senza nuovo router/storage/stato
- Stili .cm-link-btn aggiunti
- Confini: nessun salvataggio/autosave/storage/backend/cloud/DOCX/PDF/ownership/subentro/profilo reale
- File: src/data/completionMapCatalog.js, src/views/completionMapView.js, src/app.js, src/styles.css
- Output: docs/03_execution/MGR-084B.md, report/CONTROLLO_MGR084B_COMPLETION_MAP_READONLY_CARD_LINKS.txt

## MGR-082 (2026-06-15)
- COMPLETION_MAP_READONLY_UI implementata come prima superficie UI read-only
- Mappa globale completamento Curriculum di Istituto: 8 aree, stati, sintesi, evidenze, documenti collegati
- Voce sidebar "Mappa", vista completionMap, dati statici locali
- Nessun autosave, localStorage, sessionStorage, IndexedDB
- Nessuna presa in carico/subentro/profilo reale/validazione automatica
- Messaggio prudente: validazione umana/collegiale richiesta
- File: src/data/completionMapCatalog.js, src/views/completionMapView.js, src/app.js, src/components/sidebar.js, index.html, src/styles.css
- Output: docs/03_execution/MGR-082.md, report/CONTROLLO_MGR082_COMPLETION_MAP_READONLY_UI.txt

## MGR-074 (2026-06-15)
- Wiki interna dell'app implementata come guida e aiuto integrato
- Catalogo dati creato: src/data/wikiCatalog.js
- Vista creata: src/views/wikiView.js
- Aggiunta sezione wiki in index.html con relativo script
- Aggiunta route wiki in src/app.js
- Aggiunta voce "Wiki" nel menu laterale in src/components/sidebar.js
- Contenuti: guida introduttiva, documenti istituzionali, matrice revisione, output center, validazione umana, sicurezza e limiti
- Frontend/static/local-only: nessun backend, API, OAuth, cloud o export automatico
- Spiega solo funzioni realmente presenti nell'applicazione
- Copy prudente: consulta interna, revisione umana richiesta, nessun invio automatico

## MGR-072 (2026-06-14)
- DOCUMENT_OUTPUT_CENTER_CONTRACT definito in modalità docs-only
- Sei stati output locale: bozza non modificata, modificata localmente, salvata, pronta per stampa, da rivedere, completata manualmente
- Azioni consentite: apri, continua bozza, stampa bozza, reset singolo, segna da rivedere, segna completato manualmente
- Azioni vietate: DOCX, PDF programmatico, Drive, OAuth, backend, sync remota, invio automatico, firma digitale, protocollazione
- Persistenza vincolata a localStorage; completamento manuale distinto dall'approvazione istituzionale

## MGR-068 (2026-06-14)
- LOCAL_DRAFT_STATE_AND_RESET completato
- Chiave storage aggiornata a curriculumManager.documentDrafts.<documentId>
- Stato bozza: non modificata / modificata localmente / salvata
- Reset singolo documento con conferma esplicita

## MGR-066 (2026-06-14)
- EDITABLE_DOCUMENT_DRAFT_MODEL implementato
- documentiIstituzionaliView.js con sezioni editabili
- Salvataggio bozza in localStorage (curriculumManager.editableDrafts.<documentId>)
- Pulsanti: "Salva bozza", "Ripristina bozza iniziale"
- Stato salvato mostrato dopo modifica
- Nessun bridge revisione ancora

## MGR-065 (2026-06-14)
- DOCUMENT_SOURCE_IMPORT_MAP creato in src/data/documentSourceImportMap.js
- 11 mappature tra SchoolDocs e Curriculum Manager documenti
- Documenti mappati: UDA, rubrica, griglia, programmazioni, verbale, schede revisione
- Priorità: high (7), medium (2), low (1), reference (2)
- Tutti i documenti: isOfficial: false, humanValidationRequired: true

## MGR-064 (2026-06-14)
- DOCUMENT_SOURCE_IMPORT_EDITABLE_REVIEW_CONTRACT definito in modalità audit-only
- Inventario documenti Curriculum Manager e SchoolDocs
- Gap: UDA, rubrica, griglia, programmazione, verbale mancanti
- Modello dati: DocumentSource, EditableDocument, DocumentChange, RevisionEntry, SmartViewerState
- Sequenza proposta: MGR-065 → MGR-066 → MGR-067 → MGR-068 → MGR-069

## MGR-063B (2026-06-14)
- DOCUMENT_CONTENT_COVERAGE_AND_READING_VIEW implementato
- documentContentCatalog.js creato con strutture per tutti i documenti
- showDocumentDetail() mostra sezioni, check, output
- Pulsante "Aggiungi osservazione" collega a matrice revisione
- Nessun documento senza contenuto leggibile

## MGR-062 (2026-06-14)
- WORK_SCOPE_ROUTING implementato
- getSuggestedPath() deriva percorso dal ruolo
- renderSuggestedContext() mostra contesto profilo
- openHomeGuidedPath() naviga alla vista suggerita
- Azioni: Documenti, Revisione, Materiali sempre accessibili

## MGR-061 (2026-06-14)
- USER_PROFILE_ONBOARDING_CONFIG implementato
- ROLE_OPTIONS dropdown per ruolo obbligatorio al primo accesso
- PROFILE_STORAGE_KEY = "curriculumManager.userProfile"
- ONBOARDING_DISMISSED_KEY = "curriculumManager.onboardingDismissed"
- Pulsante "Reset profilo" aggiunto in home
- Messaggio "Questi dati restano solo su questo dispositivo"
- Ruolo sempre visibile nella home
- Vincolo sicurezza: chiavi separate, nessun dato personale hardcoded

## MGR-059 (2026-06-14)
- PROCESS_COMPLETION_UX_CONTRACT redatto in modalità docs-only
- Contratto di prodotto e UX che blocca la direzione prima di nuove implementazioni
- Formula obbligatoria: user need → fase → documento/attività → azione umana → output → stato finale
- Pattern visuale vincolato: dove sono, cosa faccio, perché, cosa posso fare, cosa produco
- Stati minimi del lavoro definiti (Da avviare → Consolidato → Esportato/stampato)
- Sequenza implementativa vincolata: UserProfile → WorkScope → DocumentContent → WorkItemState → OutputCenter → PackageImportExport → SyncModel → DriveGate → UploadPilot → CollaborativeRelease

## MGR-060 (2026-06-14)
- USER_PROFILE_ONBOARDING_CONFIG_SELECTION_AUDIT completato in modalità audit-only
- Profilo: 7 campi definiti, tutti opzionali, solo role per instradamento
- Storage: localStorage solo, nessun server, nessun invio dati
- Rischi privacy: bassi, dato da migliorare reset esplicito
- File ammessi per MGR-061: solo modelliSorgenteView.js

## MGR-057 (2026-06-14)
- User flow copy and card simplification completato
- Documenti: tono "Documento di lavoro", dettaglio semplificato
- Matrice: etichette operative, pulsanti rinominati

## MGR-056 (2026-06-14)
- Process timeline user guidance completato
- Home rivista con "Dove sono nel percorso?"
- 6 fasi del processo timeline aggiunte
- Modelli spostati in "Materiali di lavoro"

## MGR-055 (2026-06-14)
- File protocol frame self load hotfix
- Aggiunto controllo sicurezza file:// in app.js

## MGR-054 (2026-06-14)
- File protocol script boot hotfix completato
- Rimosso doppio SOURCE_TEMPLATE_CATALOG
- Aggiunte esc/jsAttr locali in modelliSorgenteView.js
- App funzionante via file://

## MGR-053 (2026-06-14)
- Role work paths completato
- 4 profili: Docente, Coordinatore, Gruppo curricolo, Staff
- Role selector in dashboard con obiettivo/output

## MGR-052 (2026-06-14)
- Dashboard process overview completato
- Stato processo + azioni rapide in vista modelliSorgente
- Grid cols-2 con badge e pulsanti di navigazione

## MGR-051 (2026-06-14)
- Smart onboarding skippable completato
- Onboarding card con "Salta introduzione" e "Inizia dal percorso guidato"
- localStorage cmOnboardingSeen per persistenza

## MGR-050 (2026-06-14)
- Workflow visual guidance light completato
- 8 step workflow con nodi cliccabili nella matrice revisione
- Nessuna libreria esterna

## MGR-049 (2026-06-14)
- Release candidate V1 completato
- 3 viste, dettaglio documento, note locali, export MD/JSON, stampa/PDF
- Nessun DOCX per V1

## MGR-048 (2026-06-14)
- DOCX export gate contract completato
- Decisione: A) nessun DOCX per V1, solo HTML/PDF + Markdown/JSON
- Gate dedicato richiesto prima di DOCX

## MGR-047 (2026-06-14)
- HTML print document pack completato
- Sezione pacchetto stampa nella matrice revisione
- CSS print ottimizzato per textarea draft note

## MGR-046 (2026-06-14)
- Data export Markdown/JSON completato
- Pulsanti export nella matrice revisione (JSON + MD)
- Blob client-side, nessun server
- Include draft notes localStorage

## MGR-045 (2026-06-14)
- Local edit draft mode completato
- Bozza locale per note revisione in matrice
- localStorage con chiave cmDraftNotes, pulsante reset

## MGR-044 (2026-06-14)
- Revision workflow read-only plus completato
- Aggiunti: priorità, prossima azione, status dinamico
- Status dinamico: badge ok/warn in base a humanValidationRequired

## MGR-043 (2026-06-14)
- Document detail view implementata
- Click su card documento apre vista dettaglio read-only
- Pulsante "Torna ai documenti" per ritorno alla lista

## MGR-042 (2026-06-14)
- Print output polish completato
- CSS @media print migliorato per leggibilità PDF/browser
- Font, margini, page break ottimizzati

## MGR-041 (2026-06-14)
- Demo readiness QA completato
- Status: MGR_041_DEMO_READY_WITH_NOTES
- Print button funzionante nella matrice revisione
- Problemi minori: statusbar, .mini, .simple-help styling

## MGR-040 (2026-06-14)
- Print button client-side implementato
- View: matriceRevisione
- Metodo: window.print() - zero dipendenze
- Status: MGR_040_PRINT_BUTTON_CLIENT_SIDE_READY

## MGR-039 (2026-06-14)
- Export strategy audit completato
- Strategia: E) Ibrida (HTML/PDF prima, DOCX dopo gate dedicato)
- Prossimo slice: MGR-040 (print button client-side) - completato

## MGR-038 (2026-06-14)
- Visual gate audit completato
- Status: VISUAL_GATE_PASSED_WITH_MINOR_NOTES
- Problemi minori: statusbar mancante, classi CSS .mini/.simple-help non definite
- Verdetto: app read-only pronta per export DOCX/PDF

## MGR-037 (chiuso)
- Smoke QA standard app read-only
- 10 cards/template/righe verificate
- Nessun pulsante export
- Monolite intatto

## MGR-036 (chiuso)
- Export gate QA contract definito