# Curriculum Manager — Stato operativo corrente

## Stato corrente MGR
- MGR-036 chiuso: export gate QA contract
- MGR-037 chiuso: smoke QA app standard read-only
- MGR-038 chiuso remoto: visual gate report-only
- MGR-039 chiuso remoto: strategia export ibrida (HTML/PDF prima, DOCX dopo gate)
- MGR-040 chiuso remoto: print button client-side con window.print()
- MGR-041 chiuso remoto: demo ready with notes
- HEAD sincronizzato con origin/main
- working tree pulita

## Struttura app standard
- index.html, src/styles.css, src/app.js
- src/components/{layout.js, sidebar.js, noticeBox.js}
- src/data/{sourceTemplateCatalog.js, institutionalDocumentsCatalog.js, revisionMatrixCatalog.js}
- src/views/{modelliSorgenteView.js, documentiIstituzionaliView.js, matriceRevisioneView.js}

## Flusso prodotto
Modelli sorgente → Documenti istituzionali → Matrice revisione → Stampa/PDF browser

## Vincoli permanenti
- Non toccare monolite salvo esplicita autorizzazione
- Nessun backend/API/deploy/dipendenze
- Nessun export DOCX/PDF programmatico senza gate dedicato
- Mantenere app locale HTML/CSS/JS
- Semantica read-only salvo slice esplicita di draft/edit mode

## Piano 10 step
1. MGR-042 PRINT_OUTPUT_POLISH_AND_PAGE_RULES
2. MGR-043 DESIGN_QUALITY_BASELINE_LIGHT
3. MGR-044 DOCUMENT_DETAIL_VIEW
4. MGR-045 REVISION_WORKFLOW_READONLY_PLUS
5. MGR-046 LOCAL_EDIT_DRAFT_MODE
6. MGR-047 DATA_EXPORT_MARKDOWN_JSON
7. MGR-048 HTML_PRINT_DOCUMENT_PACK
8. MGR-049 DOCX_EXPORT_GATE_CONTRACT
9. MGR-050 DOCX_PROTOTYPE_ONE_DOCUMENT
10. MGR-051 RELEASE_CANDIDATE_V1