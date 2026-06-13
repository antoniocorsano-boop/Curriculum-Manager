# MGR-027 - Release istituzionale export

Data controllo: 2026-06-13

## Baseline Git

- Branch: `main`
- Stato iniziale atteso: pulito e allineato a `origin/main`
- Commit base MGR-026: `adeb1bc08f4cad195c8a288d29a5e78608be7a8e`
- Verdict base: `MGR_026_CLOSED_REMOTE_WITH_HUMAN_GATE`

## Obiettivo

Produrre una release istituzionale export pulita, distribuibile e comprensibile per dirigente, referente curricolo, coordinatori/dipartimenti e gruppi di lavoro.

## File inclusi nella release

- `APRI_MANAGER_CURRICOLO_ISTITUTO.html`
- `README.md`
- `ISTRUZIONI_OPERATIVE_EXPORT.md`
- `report/MGR_027_RELEASE_ISTITUZIONALE_EXPORT_REPORT.md`
- `report/CONTROLLO_MGR027_RELEASE_ISTITUZIONALE_EXPORT.txt`
- `report/MGR_026_EXPORT_ISTITUZIONALE_VALIDATION_REPORT.md`
- `report/CONTROLLO_MGR026_EXPORT_ISTITUZIONALE.txt`

## File esclusi

- `.git/`
- `node_modules/`
- file temporanei;
- script temporanei Kilo/Codex;
- file personali;
- backup inutili;
- zip precedenti dentro lo zip;
- dati reali di studenti, docenti o famiglie.

## Controlli eseguiti

- Preflight Git: working tree pulita, HEAD uguale a `origin/main`.
- Presenza HTML principale.
- Presenza README.
- Presenza report MGR-026.
- Creazione pacchetto ZIP release.
- Apertura/listing pacchetto ZIP.
- Verifica esclusioni: niente `.git`, `node_modules`, temporanei, zip annidati o dati personali.
- `git diff --check`.
- `git status --short --branch`.

## Conferme tecniche

- Non sono state introdotte nuove funzioni applicative.
- Non e stato modificato il motore documentale.
- Non e stato riscritto il motore DOCX/export.
- Non sono stati introdotti backend, API, auth, deploy, CDN o librerie esterne.

## Limiti legali e amministrativi

Il Manager produce documenti predisposti per revisione, stampa, condivisione e lavoro in Word. Non sostituisce:

- protocollo;
- firma digitale;
- conservazione a norma;
- delibera;
- validazione formale secondo procedure dell'Istituto.

## Gate residuo

Resta il gate umano di compatibilita applicativa: aprire almeno un DOCX reale in Microsoft Word o LibreOffice prima della distribuzione ampia.

## Verdetto finale

`MGR_027_RELEASE_READY_WITH_HUMAN_GATE`
