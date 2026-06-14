# REPO-MOVELOG

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