# MGR-025 - Template tipografici istituzionali

## Verdetto

`PATCH_TEMPLATE_TIPOGRAFICI_PRONTA_PER_TEST_MANUALE`

## Intervento

È stata aggiunta una sezione **Documenti istituzionali** per generare documenti prodotti dai gruppi/dipartimenti e documenti approvati/validati con formattazione istituzionale.

## Modelli introdotti

1. Report complessivo del curricolo d'istituto
2. Documento prodotto dal gruppo di lavoro
3. Documento finale di dipartimento
4. Proposta di aggiornamento del curricolo
5. Documento approvato / validato
6. Verbale / sintesi della giornata di lavoro
7. Quadro sinottico delle decisioni
8. Report per disciplina / area / ordine
9. Documento di consegna al referente

## Caratteristiche tipografiche

- Frontespizio istituzionale
- Dati di identificazione
- Stato del documento
- Sezioni numerate
- Tabelle con intestazioni
- Spazi firma
- Footer con versione e avvertenza di validazione
- Export stampa/PDF, Word .doc e DOCX

## Modelli aggiornabili

I modelli documentali si possono esportare e importare come JSON dalla sezione Documenti istituzionali.

## Fuori scope

- Conservazione a norma
- Firma digitale
- Protocollo informatico
- PDF/A certificato
- Backend/API/autenticazione/deploy

## Gate successivo

MGR-026 deve essere un test manuale/browser reale sugli export istituzionali: PDF, Word .doc e DOCX per almeno tre modelli.

## Campione verificato

È stato incluso un campione tipografico in DOCX e PDF:

- `campioni/MGR025_CAMPIONE_REPORT_ISTITUZIONALE.docx`
- `campioni/MGR025_CAMPIONE_REPORT_ISTITUZIONALE.pdf`

Il DOCX è stato renderizzato in PNG con LibreOffice headless e controllato visivamente: 2 pagine, tabelle leggibili, header/footer presenti, nessun clipping o sovrapposizione evidente.
