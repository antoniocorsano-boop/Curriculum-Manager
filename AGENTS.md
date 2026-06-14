# Curriculum Manager — Stato operativo corrente

## Stato corrente MGR
- MGR-036 chiuso: export gate QA contract
- MGR-037 chiuso: smoke QA app standard read-only
- MGR-038 chiuso remoto: visual gate report-only
- MGR-039 chiuso remoto: strategia export ibrida (HTML/PDF prima, DOCX dopo gate)
- MGR-040 chiuso remoto: print button client-side con window.print()
- MGR-041 chiuso remoto: demo ready with notes
- MGR-042 chiuso remoto: print output polish and page rules
- MGR-043 chiuso remoto: design quality baseline light
- MGR-044 chiuso remoto: document detail view
- MGR-045 chiuso remoto: revision workflow readonly plus
- MGR-046 chiuso remoto: data export Markdown/JSON
- MGR-047 chiuso remoto: HTML print document pack
- MGR-048 chiuso remoto: DOCX export gate contract (nessun DOCX per V1)
- MGR-049 chiuso remoto: release candidate V1
- MGR-050 chiuso remoto: smart onboarding skippable
- MGR-051 chiuso remoto: dashboard process overview
- MGR-052 chiuso remoto: workflow visual guidance light
- MGR-053 chiuso remoto: role work paths
- HEAD sincronizzato con origin/main
- working tree pulita

## Struttura app standard
- index.html, src/styles.css, src/app.js
- src/components/{layout.js, sidebar.js, noticeBox.js}
- src/data/{sourceTemplateCatalog.js, institutionalDocumentsCatalog.js, revisionMatrixCatalog.js, workflowProcessCatalog.js, roleWorkPathsCatalog.js}
- src/views/{modelliSorgenteView.js, documentiIstituzionaliView.js, matriceRevisioneView.js}

## Flusso prodotto
Modelli sorgente → Documenti istituzionali → Matrice revisione → Stampa/PDF browser

## Vincoli permanenti
- Non toccare monolite salvo esplicita autorizzazione
- Nessun backend/API/deploy/dipendenze
- Nessun export DOCX/PDF programmatico senza gate dedicato
- Mantenere app locale HTML/CSS/JS
- Semantica read-only salvo slice esplicita di draft/edit mode

## Roadmap futura
- DOCX export (gate dedicato richiesto)
- Template-based document generation
- Validazione istituzionale integrata