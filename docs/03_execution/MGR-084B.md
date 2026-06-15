# MGR-084B — COMPLETION_MAP_READONLY_CARD_LINKS

## Summary

Aggiunge link read-only dalle card della Mappa di completamento alle viste già esistenti dell'applicazione.

La modifica mantiene la Mappa come superficie di orientamento, non come workflow engine.

## Files changed

* `src/data/completionMapCatalog.js`
* `src/views/completionMapView.js`
* `src/app.js`
* `src/styles.css`
* `docs/03_execution/MGR-084B.md`
* `report/CONTROLLO_MGR084B_COMPLETION_MAP_READONLY_CARD_LINKS.txt`
* `REPO-MOVELOG.md`

## Comportamento introdotto

* Card "Discipline" → link "Apri sezione Documenti" → vista `documentiIstituzionali`
* Card "Revisione e coerenza" → link "Apri sezione Revisione" → vista `matriceRevisione`
* Card "Output e validazione finale" → link "Apri sezione Output" → vista `documentOutputCenter`
* Link solo se esiste una vista coerente; altrimenti nessun link
* Click sul link usa `showView()` esistente, senza nuovo router, storage o stato

## Confini

* Read-only: nessuna CTA di acquisizione, completamento, subentro.
* Nessun autosave, localStorage, sessionStorage, IndexedDB.
* Nessun backend/API/OAuth/cloud/sync.
* Nessun DOCX/PDF programmatico.
* Nessun profilo reale, ownership, subentro o documento laterale.
* Dati statici locali, senza persone/studenti reali.

## Validazioni

* `git diff --check`: passed.
* `node --check src/data/completionMapCatalog.js`: passed.
* `node --check src/views/completionMapView.js`: passed.
* `node --check src/app.js`: passed.
* `node --check src/components/sidebar.js`: passed.
* Scan pattern: nessun match non ammesso.
* Nessun dato personale/studente reale.
* Nessuna contaminazione `e86064b`.

## Cosa resta fuori

* Attività reali, stati, assignment, subentro (MGR-086, MGR-087).
* Profilo reale e filtri (MGR-078, MGR-080).
* Workspace e documento laterale (MGR-083, MGR-085).
* Autosalvataggio (MGR-085).

Expected post-merge verdict:

`MGR_084B_CLOSED_MERGED_REMOTE`
