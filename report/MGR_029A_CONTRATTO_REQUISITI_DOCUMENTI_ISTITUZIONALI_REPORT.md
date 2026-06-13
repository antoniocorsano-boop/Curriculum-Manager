# MGR-029A — Contratto requisiti documenti istituzionali curricolari

Data: 2026-06-13
Autore: Antonio Corsano

## Baseline Git

* **Branch:** main
* **HEAD locale:** 806a51abc417bb869a4cd14ad8406553ce071007
* **origin/main:** 8b7175005fc29c163c36944b1bda350b9caf9c20
* **Sync:** divergente (HEAD locale ahead by 1, senza commit MGR-029A)
* **Commit HEAD:** 806a51a mgr: record visual Writer/Word compatibility gate blocked (no GUI)

## File creati

* `report/MGR_029A_REQUISITI_DOCUMENTI_ISTITUZIONALI_CURRICOLARI.md` — contratto dei requisiti (11 sezioni).
* `report/MGR_029A_CONTRATTO_REQUISITI_DOCUMENTI_ISTITUZIONALI_REPORT.md` — presente documento.
* `report/CONTROLLO_MGR029A_REQUISITI_DOCUMENTI_ISTITUZIONALI.txt` — controllo esito.

## Fonti e riferimenti considerati

* DPR 275/1999: autonomia scolastica, PTOF, curricolo d’Istituto.
* DM 254/2012: Indicazioni nazionali per il curricolo della scuola dell’infanzia e del primo ciclo.
* Indicazioni nazionali eventualmente aggiornate (da validare a cura dell’Istituto).
* Direttiva 8 maggio 2002: semplificazione del linguaggio amministrativo.
* Linee guida AgID sul documento informatico: formato, gestione e limiti.
* Dati ricostruiti dai report MGR-025, MGR-026, MGR-028A/B/C per coerenza con implementazione esistente.

## Sintesi requisiti

1. Scopo: distinzione tra documento tecnico, report istruttorio, documento curricolare, documento di dipartimento, documento approvato/validato, allegato curricolare.
2. Fonti: riferimenti normativi e amministrativi senza interpretazioni arbitrarie.
3. Principio di prudenza normativa: il Manager prepara documenti per revisione, non produce atti amministrativi definitivi.
4. Requisiti comuni: metadati istituzionali obbligatori, sezioni numerate, tabelle, spazio firme, dicitura limiti amministrativi.
5. Requisiti curricolari: finalità, profilo studente, competenze, traguardi, obiettivi, contenuti, metodologie, strumenti, inclusione, continuità, educazione civica, orientamento, valutazione, monitoraggio.
6. Chiarezza: frasi brevi, evitare burocratese, spiegare sigle, nessun codice interno, nessun undefined/null.
7. Placeholder ammessi e vietati: sei placeholder istituzionali; vietati placeholder generici, undefined, null, codici tecnici.
8. Tipografia: frontespizio, gerarchia titoli, tabelle leggibili, paginazione/footer, spazi firme, margini, assenza di tecnicalità.
9. Tipologie documentali: 10 tipologie con scopo, destinatari, sezioni minime, stati ammessi.
10. Gate validazione umana: bozza → revisione → validazione/approvazione umana, mai automatico.
11. Criteri di accettazione MGR-029: set di regole che MGR-029 deve rispettare per essere considerato passante.

## Cosa resta fuori scope

* Modifiche a `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
* Modifiche al motore DOCX/export.
* Nuove funzioni nel Manager.
* Backend, API, autenticazione, deploy, CDN.
* Inclusione di librerie/docx/JSZip vendorizzati.
* Dati reali.
* Push automatico.

## Perché MGR-029 non deve partire senza questo contratto

MGR-029 riguarderà l’implementazione di modelli documentali curricolari. Senza un contratto di requisiti:

* i modelli rischierebbero di produrre semplici report tecnici invece di veri documenti curricolari;
* le sezioni curricolari minime non sarebbero garantite;
* i placeholder sarebbero lasciati a discrezione dell’implementazione, con rischio di valori tecnici esposti;
* i limiti amministrativi non sarebbero codificati, creando aspettative errate su validazione/firma/approvazione;
* la coerenza con DPR 275/1999, DM 254/2012 e altre fonti sarebbe debole.

Il contratto serve quindi a **congelare i requisiti** prima di qualsiasi codice.

## Verdict

MGR_029A_REQUISITI_DOCUMENTI_ISTITUZIONALI_CURRICOLARI_APPROVATI
