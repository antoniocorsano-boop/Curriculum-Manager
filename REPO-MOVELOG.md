# REPO-MOVELOG

## MGR-077 (2026-06-15)
- DM221_2025_CURRICULUM_DATA_MODEL_CONTRACT definito in modalità docs/report-only
- Entità dati definite: CurriculumSource, DisciplineCurriculum2025, FoundationalNucleus, EssentialKnowledge, CompetenceTarget, AssessmentEvidence, HumanReviewState
- Regole definite: campi obbligatori per "pronta 2025", campi draft, revisione umana, divieto dati personali/studenti, collegamenti PTOF/RAV/PdM senza dati reali
- Vincolo confermato: nessun claim automatico di conformità; solo `ready_for_human_review` strutturale
- Output: `docs/02_system/DM221-2025-CURRICULUM-DATA-MODEL-CONTRACT.md`, `docs/03_execution/MGR-077.md`, `report/CONTROLLO_MGR077_DM221_2025_DATA_MODEL.txt`

## MGR-078 (2026-06-15)
- LOCAL_PROFILE_AND_CONTEXT_CONFIGURATION_CONTRACT definito in modalità docs-only
- Campi configurazione locale: nome docente (opzionale), disciplina, scuola/plesso, ordine, dipartimento/sezione/intersezione, classi, ruolo operativo, preferenze percorso
- Principi privacy: dati locali, nessun invio automatico, nessun dato studente, nessun obbligatorio oltre minimo funzionale, reset possibile
- Relazione DM221: configurazione non sostituisce modello curricolare, filtra/orienta viste
- Confini: no backend/account/login/OAuth/Drive/cloud/sync/remoto/automazioni nascoste
- Futuro abilitato: MGR-079 UI onboarding, MGR-080 profilo persistente, MGR-081 routing, MGR-082 gate privacy/reset
- Output: docs/02_system/LOCAL-PROFILE-CONTEXT-CONFIGURATION-CONTRACT.md, docs/03_execution/MGR-078.md, report/CONTROLLO_MGR078_LOCAL_PROFILE_CONTEXT_CONFIGURATION.txt

## MGR-079 (2026-06-15)
- USER_WORKFLOW_COMPLETION_MAP_SPEC definito in modalità docs/spec-only
- Specifica prodotto/workflow: casi d'uso, ruoli, profilo/visibilità, mappa visuale completamento, stati attività, activity card, presa in carico/subentro, workspace operativo, autosalvataggio locale concettuale, evidenze/riferimenti/validazione, relazione con Wiki, riduzione UI, micro-roadmap, criteri di accettazione
- Micro-roadmap: MGR-080 activity/domain model, MGR-081 completion map data, MGR-082 profile-filtered activity list UI, MGR-083 workspace layout, MGR-084 right document panel, MGR-085 local autosave, MGR-086 handover/subentro, MGR-087 contextual Wiki, MGR-088 evidence/status layer
- Output: docs/02_system/USER-WORKFLOW-COMPLETION-MAP-SPEC.md, docs/03_execution/MGR-079.md, report/CONTROLLO_MGR079_USER_WORKFLOW_COMPLETION_MAP_SPEC.txt

## MGR-080 (2026-06-15)
- ACTIVITY_AND_COMPLETION_MAP_DOMAIN_MODEL_CONTRACT definito in modalità docs/contract-only
- Entità definite: UserProfileContext, CompletionMapNode, Activity, ActivityAssignment, LinkedDocument, Evidence, Reference
- Stati mappa e attività definiti con transizioni ammesse
- Visibilità filtrata da profilo: mappa globale visibile a tutti, attività pertinenti filtrate
- Presa in carico/subentro: responsabilità operativa temporanea, non proprietà esclusiva
- Documento collegato e pannello destro concettualizzato
- Evidenze e tracciabilità tipizzate
- Riferimenti normativi/documentali con regole di prudenza
- Autosalvataggio locale concettuale (no implementazione)
- Relazione con UI futura: Home, mappa, lista attività, workspace, pannello documento, Wiki, output center, matrice revisione
- Confini: nessuna UI/persistence/backend/API/OAuth/cloud/DOCX/PDF
- Output: docs/02_system/ACTIVITY-COMPLETION-MAP-DOMAIN-CONTRACT.md, docs/03_execution/MGR-080.md, report/CONTROLLO_MGR080_ACTIVITY_COMPLETION_MAP_DOMAIN.txt

## MGR-081 (2026-06-15)
- COMPLETION_MAP_FIRST_UI_SELECTION_AUDIT completato in modalità audit/selection-only
- Audit opzioni UI: A (mappa read-only), B (lista attività filtrate), C (workspace), D (pannello documento)
- Raccomandazione: Opzione A — Mappa globale read-only (basso rischio, massimo valore, nessun autosave/subentro/profilo reale)
- MGR-082 proposta: COMPLETION_MAP_READONLY_UI con confini read-only, dati statici/demo, mount point Home + sidebar
- Output: docs/03_execution/MGR-081.md, report/MGR_081_COMPLETION_MAP_FIRST_UI_SELECTION_AUDIT.md, report/CONTROLLO_MGR081_COMPLETION_MAP_FIRST_UI_SELECTION.txt

## MGR-083 (2026-06-15)
- COMPLETION_MAP_POST_MERGE_SMOKE_AND_NEXT_INCREMENT_SELECTION_AUDIT completato in modalità audit/selection-only
- Smoke audit post-merge MGR-082: sidebar "Mappa" funziona, vista leggibile, nessuna CTA operativa, nessuno storage/autosave/fetch/backend/cloud/DOCX/PDF
- Nessuna ridondanza critica con Home/Documenti/Revisione/Wiki
- Prossimo incremento selezionato: MGR-084B — link read-only dalle card mappa a viste esistenti
- Alternative valutate: MGR-084A (polish UI), MGR-084C (contratto dati), MGR-084D (presa in carico/subentro — da non fare ancora)
- Output: docs/03_execution/MGR-083.md, report/CONTROLLO_MGR083_COMPLETION_MAP_POST_MERGE_SMOKE.txt

## MGR-088A (2026-06-15)
- ACTIVITY_STATE_UI_COPY_CONTRACT definito in modalità docs/contract-only
- Copy ammesso/vietato per 9 stati: not_started, orientation_available, in_progress, evidence_present, needs_review, ready_for_human_validation, human_validated, blocked, not_applicable
- Tono ammesso: informativo, orientativo, lavorativo, revisionale, prudente, temporale
- Tono vietato: certificativo, autoritario, automatico, definitivo, registriale
- CTA ammesse: "Apri sezione", "Vedi riferimenti", "Vedi evidenze", "Rivedi contenuto", "Prepara per controllo", "Contatta referente"
- CTA vietate: "Approva", "Certifica", "Rendi conforme", "Completa ufficialmente", "Salva stato", "Prendi in carico", "Conferma validazione", "Registra"
- human_validated: non impostabile da CTA generica
- Indicatori visuali: colori/icone di orientamento/lavoro, non certificativi
- Messaggi di prudenza obbligatori: "bussola di lavoro, non certificazione", "validazione resta umana/collegiale/istituzionale", ecc.
- Requisiti futuri prima di UI runtime: copy review, smoke test umano, test contro parole vietate, verifica accessibilità, coerenza con MGR-086B/087A
- Confini: nessun runtime, nessuna UI reale, nessun salvataggio/autosave/storage/backend/API/cloud, nessuna ownership/subentro, nessun dato personale/studente reale
- File: docs/02_system/ACTIVITY-STATE-UI-COPY-CONTRACT.md, docs/03_execution/MGR-088A.md, report/CONTROLLO_MGR088A_ACTIVITY_STATE_UI_COPY_CONTRACT.txt

## MGR-087A (2026-06-15)
- ACTIVITY_DATA_STORAGE_PRIVACY_CONTRACT definito in modalità docs/contract-only
- Principio local-first: dati attività locali per dispositivo, nessun sync/cloud/backend in questa fase
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