# MGR-028B — Word/LibreOffice Real Test Report

## Baseline Git
* **Branch:** main
* **HEAD locale:** e0514a913ffa68315a70bc41a03c7c44eabf4f99
* **origin/main:** e0514a913ffa68315a70bc41a03c7c44eabf4f99
* **Sync:** true
* **Commit:** e0514a9 mgr: harden internal docx profile
* **Working tree:** pulita

## Software Usato
* **LibreOffice:** rilevato in `C:\Program Files\LibreOffice\program\soffice.exe`
* **Microsoft Word:** non disponibile nel PATH/registro di sistema
* Note: conversione headless effettuata su ambiente Windows senza riavvio; percorso esplicito utilizzato per bypassare PATH non aggiornato.

## Documenti Testati
1. `report/verifiche_mgr028a/Report_complessivo_del_curricolo_istituto.docx`
2. `report/verifiche_mgr028a/Documento_prodotto_dal_gruppo_di_lavoro.docx`
3. `report/verifiche_mgr028a/Documento_finale_di_dipartimento.docx`
4. `report/verifiche_mgr028a/Documento_approvato_validato.docx`

## Metodo Test
* LibreOffice Writer headless conversion DOCX → PDF
* Nessuna apertura visuale in Writer possibile in ambiente CLI non interattivo
* Conversione effettuata con profilo temporaneo locale (`report/verifiche_mgr028b/lo-profile`) per evitare blocchi da primo avvio/profilo utente
* Flag usati: `--headless --nologo --nofirststartwizard --norestore`

## Esito Apertura DOCX
* Conversione headless completata per tutti e 4 i DOCX:
  * ExitCode: 0 per ciascun file
  * Warning innocuo: `Could not find platform independent libraries <prefix>` (tipico su Windows, non bloccante)
* PDF generati in `report/verifiche_mgr028b/`:
  * `Report_complessivo_del_curricolo_istituto.pdf` — 191.463 bytes
  * `Documento_prodotto_dal_gruppo_di_lavoro.pdf` — 191.419 bytes
  * `Documento_finale_di_dipartimento.pdf` — 191.255 bytes
  * `Documento_approvato_validato.pdf` — 191.186 bytes
* Nessun errore di conversione
* Tutti i PDF hanno dimensione > 0

## Messaggi di Riparazione
* Nessun messaggio di riparazione rilevato durante la conversione headless
* Apertura visuale in Writer non eseguita (ambiente CLI)

## Esito Layout
* Layout verificato indirettamente tramite conversione PDF riuscita
* PDF prodotti da LibreOffice con filtro `writer_pdf_Export`
* Non è stato possibile effettuare ispezione visiva diretta in Writer

## PDF Generati
| File DOCX | File PDF | Dimensione |
|---|---|---|
| Report_complessivo_del_curricolo_istituto.docx | Report_complessivo_del_curricolo_istituto.pdf | 191.463 bytes |
| Documento_prodotto_dal_gruppo_di_lavoro.docx | Documento_prodotto_dal_gruppo_di_lavoro.pdf | 191.419 bytes |
| Documento_finale_di_dipartimento.docx | Documento_finale_di_dipartimento.pdf | 191.255 bytes |
| Documento_approvato_validato.docx | Documento_approvato_validato.pdf | 191.186 bytes |

## Problemi Trovati
* Microsoft Word non disponibile: test Word non eseguito
* Apertura visuale in LibreOffice Writer non possibile in ambiente CLI non interattivo
* Nessun problema strutturale riscontrato nei DOCX
* Nessun `undefined`/`null`/`[object Object]` rilevato (validazione tecnica MGR-028A positiva)

## Eventuali Note di Layout
* Dimensioni PDF omogenee (~191 KB per documento), suggeriscono struttura DOCX consistente
* Conversione riuscita senza errori indica compatibilità DOCX valida

## Patch Applicate
* Nessuna patch applicata

## Verdetto
**MGR_028B_HEADLESS_PASSED_VISUAL_GATE_PENDING**

## Controlli Finali
* `git diff --check`: pulito
* `git status --short --branch`: working tree pulita

## Prossimi Passi
* Eseguire apertura visuale in LibreOffice Writer su ambiente con interfaccia grafica
* Verificare presenza messaggi di riparazione all'apertura
* Verificare layout: intestazione istituto, anno scolastico, sezioni numerate, tabelle, firme
