# MGR-087A — ACTIVITY_DATA_STORAGE_PRIVACY_CONTRACT

## Summary

Contratto di sistema per la futura persistenza locale degli stati attività della mappa di completamento.

Definisce privacy/local-first, categorie dati ammesse/vietate, regole di minimizzazione, reset/cancellazione, esportazione futura, divieti espliciti, informativa UI, audit trail concettuale e prerequisiti prima di qualunque implementazione runtime.

Questo documento è puramente documentale: nessun codice, nessuna modifica runtime, nessuno storage, nessun backend.

## Files changed

* `docs/02_system/ACTIVITY-DATA-STORAGE-PRIVACY-CONTRACT.md`
* `docs/03_execution/MGR-087A.md`
* `report/CONTROLLO_MGR087A_ACTIVITY_DATA_STORAGE_PRIVACY_CONTRACT.txt`
* `REPO-MOVELOG.md`

## Scope

Docs/contract only.

No runtime files changed.

## Decision

Viene introdotto nel repo un contratto separato per storage/privacy degli stati attività futuri, senza implementazione.

Il contratto ribadisce local-first, vieta dati personali/studenti in questa fase, vieta sync/cloud/backend senza contratto separato, vieta salvataggio implicito/autosave non visibile, e definisce prerequisiti separati per storage tecnico, UI copy/privacy, reset/export, audit trail e ownership/subentro.

## Boundaries

* Non implementa UI.
* Non modifica runtime.
* Non introduce backend/API/OAuth/cloud/sync.
* Non introduce DOCX/PDF programmatico.
* Non introduce salvataggio/autosave/storage.
* Non introduce ownership/subentro/profilo reale.
* Non promette validazione automatica o conformità normativa.

## Validation

* `git diff --check`: passed.
* No changes to `src/**`.
* No changes to `index.html`.
* No changes to `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
* Nessun dato personale/studente reale.
* Nessuna contaminazione `e86064b`.

## Future slices dipendenti

* MGR-088A: activity state UI copy contract
* MGR-088B: activity storage technical contract
* MGR-088C: completion map state prototype read-only fixture
* MGR-088D: activity ownership/subentro contract (da rimandare)

Expected post-merge verdict:

`MGR_087A_CLOSED_MERGED_REMOTE`
