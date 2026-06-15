# ACTIVITY-DATA-STORAGE-PRIVACY-CONTRACT

## 1. Scopo

Definire il contratto di sistema per la **futura persistenza locale** degli stati attività della mappa di completamento del Curriculum di Istituto.

Questo contratto è puramente documentale: non introduce codice, non modifica runtime, non introduce salvataggi, autosave, storage, backend, API, cloud, ownership, subentro o profilo reale.

La persistenza è considerata come requisito futuro, separato e subordinato a ulteriori slice e contratti.

## 2. Principio local-first

* I dati di avanzamento attività sono, per design, **locali per dispositivo**.
* Nessun sync automatico tra dispositivi è previsto in questa fase.
* Nessun cloud, nessun backend, nessuna API è coinvolta in questa slice.
* L’utente è il solo responsabile dei propri dati locali.

## 3. Distinzione tra categorie di dati

| Categoria | Significato | Privacy risk | Persistenza ammessa | Dati personali/studenti |
|---|---|---|---|---|
| Dato tecnico | ID, timestamp, ruolo operativo, stato | Basso | Ammessa in futuro | No |
| Dato di lavoro | stato attività, evidenze, note di lavoro | Medio-basso | Ammessa in futuro, solo locale | No |
| Dato personale | nome/cognome docente, scuola, plesso | Medio | **Vietata** in MGR-087A | Sì (solo se esplicitamente autorizzato da contratto separato) |
| Dato studente | nomi, codici, valutazioni, BES/DSA/PEI nominativi | Alto | **Vietata** in MGR-087A | Sì (solo se esplicitamente autorizzato da contratto separato) |

## 4. Categorie dati future — contratto concettuale

### 4.1 `activityId`
* **Significato**: identificatore univoco dell’attività.
* **Necessità**: collegare stato, evidenze, validazione.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro.
* **Dati personali/studenti**: no.
* **Conferma**: sistema.
* **Contratto separato**: no.

### 4.2 `state`
* **Significato**: stato attività secondo tassonomia MGR-086B.
* **Necessità**: tracciare avanzamento.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro.
* **Dati personali/studenti**: no.
* **Conferma**: utente con visibilità adeguata.
* **Contratto separato**: no.

### 4.3 `stateUpdatedAt`
* **Significato**: timestamp locale ultimo aggiornamento stato.
* **Necessità**: audit trail concettuale.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro.
* **Dati personali/studenti**: no.
* **Conferma**: sistema.
* **Contratto separato**: no.

### 4.4 `stateUpdatedByRole`
* **Significato**: ruolo operativo che ha aggiornato lo stato.
* **Necessità**: tracciare chi ha modificato.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro.
* **Dati personali/studenti**: no (ruolo generico, non nominativo).
* **Conferma**: sistema/utente.
* **Contratto separato**: no.

### 4.5 `evidenceRefs`
* **Significato**: riferimenti a evidenze collegate (tipo, ID, descrizione).
* **Necessità**: collegare stato a prove di avanzamento.
* **Rischio privacy**: medio (se le evidenze contengono dati personali/studenti).
* **Persistenza**: ammessa in futuro, solo per riferimenti pubblici o generici.
* **Dati personali/studenti**: **vietati** come contenuto delle evidenze in MGR-087A.
* **Conferma**: autore evidenza.
* **Contratto separato**: sì, se le evidenze potranno contenere dati personali/studenti.

### 4.6 `validationRequired`
* **Significato**: flag che indica se lo stato richiede validazione umana.
* **Necessità**: gestire flusso di validazione.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro.
* **Dati personali/studenti**: no.
* **Conferma**: sistema.
* **Contratto separato**: no.

### 4.7 `validationStatus`
* **Significato**: stato di validazione (pending, approved, rejected).
* **Necessità**: tracciare esito validazione.
* **Rischio privacy**: medio-basso.
* **Persistenza**: ammessa in futuro.
* **Dati personali/studenti**: no.
* **Conferma**: organo/autorità competente.
* **Contratto separato**: sì, per dettagli su chi valida e come.

### 4.8 `validationNote`
* **Significato**: nota testuale associata alla validazione.
* **Necessità**: motivazione dell’esito.
* **Rischio privacy**: medio (può contenere riferimenti a persone/studenti).
* **Persistenza**: ammessa in futuro, solo per note generiche.
* **Dati personali/studenti**: **vietati** in MGR-087A.
* **Conferma**: revisore/autorità.
* **Contratto separato**: sì, se le note potranno contenere dati personali/studenti.

### 4.9 `blockedReason`
* **Significato**: motivo esplicito per cui l’attività è bloccata.
* **Necessità**: documentare impedimenti.
* **Rischio privacy**: medio (può contenere riferimenti a persone/studenti).
* **Persistenza**: ammessa in futuro, solo per motivi generici.
* **Dati personali/studenti**: **vietati** in MGR-087A.
* **Conferma**: referente/autorità competente.
* **Contratto separato**: sì, se i motivi potranno contenere dati personali/studenti.

### 4.10 `localDraftMetadata`
* **Significato**: metadati locali di bozza (es. ultima sezione aperta, focus UI).
* **Necessità**: migliorare UX locale senza salvare contenuti sensibili.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro (locale).
* **Dati personali/studenti**: no.
* **Conferma**: sistema/utente.
* **Contratto separato**: no.

### 4.11 `resetMarker`
* **Significato**: flag che indica che l’utente ha richiesto reset di dati locali.
* **Necessità**: implementare cancellazione sicura.
* **Rischio privacy**: basso.
* **Persistenza**: ammessa in futuro, solo come flag temporaneo.
* **Dati personali/studenti**: no.
* **Conferma**: utente.
* **Contratto separato**: no.

## 5. Dati vietati in questa fase

Sono **vietati** in MGR-087A e in qualunque implementazione futura senza contratto separato:

* nomi studenti reali;
* codici fiscali;
* dati sanitari;
* BES/DSA/PEI/PDP nominativi;
* valutazioni nominative;
* credenziali;
* token;
* chiavi API;
* dati sincronizzati cloud;
* allegati reali;
* documenti istituzionali finali firmati;
* qualsiasi dato che faccia sembrare il sistema un registro ufficiale.

## 6. Regole di minimizzazione

* Persistere solo dati strettamente necessari per orientare il lavoro.
* Non persistere dati personali se non esplicitamente richiesto e autorizzato.
* Non persistere dati studenti in nessun caso in questa fase.
* Separare chiaramente dato tecnico, dato di lavoro, dato personale, dato studente.
* Documentare ogni categoria prima di implementarla.

## 7. Reset / cancellazione dati

* L’utente deve poter cancellare tutti i dati locali senza side-effect su documenti ufficiali.
* Reset deve essere esplicito, confermato, non automatico.
* Reset non deve cancellare documenti istituzionali finali approvati (se mai presenti nella piattaforma in futuro).
* Reset deve documentare cosa viene cancellato e cosa rimane.

## 8. Esportazione futura

* Esportazione di dati attività/evidenze/stati è ammessa **solo** dopo contratto separato.
* Formati ammessi in futuro: JSON, CSV, Markdown.
* Formati vietati senza contratto: DOCX, PDF programmatico, formati binari proprietari.
* Esportazione deve essere autorizzata dall’utente, non automatica.

## 9. Divieti espliciti

Sono vietati in MGR-087A e senza contratto separato:

* sincronizzazione cloud;
* backup remoto;
* sync tra dispositivi;
* invio automatico a servizi esterni;
* salvataggio implicito non visibile;
* autosave senza conferma utente;
* logging di dati personali/studenti;
* qualsiasi forma di tracking utente non anonimizzata.

## 10. Informativa UI futura

Prima di implementare qualsiasi storage, l’UI deve mostrare chiaramente:

* cosa viene salvato;
* dove viene salvato (solo locale);
* per quanto tempo;
* chi può accedervi (solo utente del dispositivo);
* come cancellarlo;
* che non sostituisce la validazione ufficiale.

## 11. Audit trail futuro (concettuale)

* Ogni modifica di stato deve poter lasciare traccia locale: `activityId`, `state`, `stateUpdatedAt`, `stateUpdatedByRole`.
* Audit trail è solo concettuale in MGR-087A.
* Implementazione audit trail richiede contratto separato su storage, privacy, retention.

## 12. Prerequisiti prima di qualunque implementazione runtime

Prima di implementare storage/autosave/PRIVACY:

* contratto storage tecnico (dove, come, quanto);
* contratto UI copy/privacy (informativa chiara);
* contratto reset/export (come cancellare, come esportare);
* contratto audit trail (chi ha modificato cosa, quando);
* contratto ownership/subentro se necessario;
* smoke test local-first;
* scan privacy;
* smoke audit dopo implementazione.

## 13. Criteri di accettazione del contratto

Il contratto è valido se:

* definisce chiaramente what is local-only e what requires a separate contract;
* vieta dati personali/studenti in questa fase;
* vieta sync/cloud/backend senza contratto separato;
* vieta salvataggio implicito/autosave non visibile;
* ribadisce che la validazione resta umana/istituzionale;
* è comprensibile per future slice storage e privacy;
* non introduce runtime.
