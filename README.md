# Manager Curricolo d'Istituto v3.6

Release istituzionale export basata su MGR-026.

## Che cosa aprire

Aprire il file:

```text
APRI_MANAGER_CURRICOLO_ISTITUTO.html
```

Il Manager funziona in locale dal browser. Non richiede backend, API, autenticazione, deploy o connessione a servizi esterni.

## Destinatari

Questa release e pensata per:

- dirigente scolastico;
- referente curricolo;
- coordinatori e dipartimenti;
- gruppi di lavoro.

## Cosa si puo fare

- Gestire documenti istituzionali e modelli aggiornabili.
- Esportare documenti per stampa/PDF tramite browser.
- Esportare documenti Word-compatible `.doc`.
- Esportare documenti DOCX nativi minimali.
- Gestire backup JSON e sessioni di lavoro.
- Preparare pacchetti con allegati, se presenti nel browser locale.

## Cosa non dichiara

Il Manager produce documenti predisposti per revisione, stampa, condivisione e lavoro in Word. Non:

- firma digitalmente;
- protocolla;
- conserva a norma;
- produce PDF/A certificato;
- sostituisce delibera, validazione formale o procedure ufficiali dell'Istituto.

## Procedura minima

1. Aprire `APRI_MANAGER_CURRICOLO_ISTITUTO.html`.
2. Entrare nella sezione **Documenti istituzionali**.
3. Scegliere il modello documentale.
4. Esportare in **Stampa/PDF**, **Word .doc** o **DOCX**.
5. Verificare il contenuto del documento esportato.
6. Validare, approvare, protocollare o conservare solo secondo le procedure dell'Istituto.

## Stati documentali

- **Bozza**: documento di lavoro non validato.
- **Consegnato**: materiale trasmesso al referente o al coordinatore.
- **In revisione**: documento in controllo o istruttoria.
- **Validato**: documento controllato dal referente o dall'organo previsto.
- **Approvato**: documento approvato secondo procedura interna.
- **Archiviato**: documento conservato nel fascicolo o archivio dell'Istituto secondo regole interne.

## Export disponibili

- **Stampa/PDF**: apre la vista stampabile del browser; usare "Stampa" o "Salva come PDF".
- **Word .doc**: produce un file HTML compatibile con Word, utile per modifica rapida.
- **DOCX**: produce un pacchetto DOCX nativo minimale in WordprocessingML.
- **Backup/sessione**: salva dati e sessione di lavoro per ripristino o passaggio su altro PC.
- **Allegati/pacchetto completo**: esporta materiali allegati se caricati nel browser locale.

## Gate residuo

Prima della distribuzione ampia, aprire almeno un DOCX reale in Microsoft Word o LibreOffice. Questo e un gate residuo di compatibilita applicativa, non un bug noto del Manager.

## Report inclusi

- `report/MGR_026_EXPORT_ISTITUZIONALE_VALIDATION_REPORT.md`
- `report/CONTROLLO_MGR026_EXPORT_ISTITUZIONALE.txt`
- `report/MGR_027_RELEASE_ISTITUZIONALE_EXPORT_REPORT.md`
- `report/CONTROLLO_MGR027_RELEASE_ISTITUZIONALE_EXPORT.txt`
