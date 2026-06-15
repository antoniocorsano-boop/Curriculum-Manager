# ACTIVITY-STORAGE-TECHNICAL-CONTRACT

## 1. Scopo

Definire il contratto tecnico per eventuale storage locale futuro degli stati attività della mappa di completamento del Curriculum di Istituto.

Questo contratto è puramente documentale: non introduce codice, non modifica runtime, non introduce storage reale, non introduce autosave, non introduce backend, API, cloud, sync, ownership o subentro.

Lo storage è considerato un requisito futuro, separato e subordinato a ulteriori slice e contratti.

## 2. Perché lo storage non viene implementato in questa slice

* I contratti di dominio (MGR-086B), privacy (MGR-087A) e copy/UI (MGR-088A) sono appena stati definiti.
* Non esiste ancora una UI concreta degli stati attività.
* Non è stato definito un contratto tecnico di storage separato.
* Non sono stati definiti ownership/subentro, reset/export, audit trail, gestione errori e versioning.
* Implementare storage ora sarebbe prematuro, rischioso e contrasterebbe con il principio di contratto-first adottato dal progetto.

## 3. Opzioni storage future — panoramica

Sono considerate opzioni future, senza implementazione:

| Opzione | Descrizione |
|---|---|
| `none` | Nessuna persistenza. Stato visibile solo nella sessione corrente. |
| `memory-only` | Stato tenuto in memoria JavaScript, perso alla navigazione/chiusura scheda. |
| `localStorage` | Persistenza locale minimale, solo se dati non sensibili, dimensione contenuta, con reset esplicito. |
| `IndexedDB` | Persistenza locale strutturata, solo se serve modello dati più robusto o dimensioni oltre i limiti localStorage. |
| `local file export/import` | Esportazione/importazione esplicita da parte dell’utente tramite file locale. |
| `cloud/sync` | Esplicitamente vietata finché non esiste contratto separato dedicato. |

## 4. Opzione `none` / nessuna persistenza

* **Quando sarebbe ammessa**: default iniziale; fase prototipale; fase demo; fase senza UI reale degli stati.
* **Rischio privacy**: nessuno (nessun dato salvato).
* **Rischio perdita dati**: totale alla chiusura scheda (accettabile in fase prototipale).
* **Rischio complessità**: minimo.
* **Dati ammessi**: nessuno.
* **Dati vietati**: qualsiasi dato reale.
* **Requisiti UI**: nessuno di storage.
* **Requisiti reset**: nessuno.
* **Requisiti test**: verifica comportamento offline senza persistenza.

## 5. Opzione `memory-only` / stato volatile

* **Quando sarebbe ammessa**: UI read-only con fixture statiche; prototyping senza necessità di recupero stato tra sessioni.
* **Rischio privacy**: basso.
* **Rischio perdita dati**: alto (perdita a ogni navigazione o reload).
* **Rischio complessità**: basso.
* **Dati ammessi**: solo dati non sensibili strettamente necessari per orientare l’utente nella sessione corrente.
* **Dati vietati**: qualsiasi dato personale/studente; credenziali; token; riferimenti sensibili.
* **Requisiti UI**: messaggio che lo stato non viene salvato.
* **Requisiti reset**: nessuno (reset implicito a chiusura).
* **Requisiti test**: verifica perdita stato dopo reload/navigazione.

## 6. Opzione `localStorage` / solo se dati minimi e non sensibili

* **Quando sarebbe ammessa**: solo dopo nuovo contratto dedicato (nuova slice esplicita) e solo per dati minimi, non sensibili, senza implicazioni normative.
* **Rischio privacy**: medio (dati locali esposti a utente dispositivo; rischio recupero da parte di terzi su computer condivisi).
* **Rischio perdita dati**: medio (dati legati al browser; pulizia cache/private mode/aggiornamenti possono cancellarli).
* **Rischio complessità**: medio (gestione chiavi, reset, scadenza implicita, sincronia tra dispositivi non garantita).
* **Dati ammessi**:
  * `activityId`
  * `state`
  * `stateUpdatedAt`
  * `stateUpdatedByRole` (solo ruolo generico, non nominativo)
  * `evidenceRefs` (solo riferimenti pubblici/generici, non contenuti sensibili)
  * `validationRequired`
  * `validationStatus` (solo valori boolean/enum generici)
  * `blockedReason` (solo testo generico, senza nominativi)
  * `metadata` tecniche (versione, timestamp)
* **Dati vietati**:
  * nomi studenti reali;
  * codici fiscali;
  * dati sanitari;
  * BES/DSA/PEI/PDP nominativi;
  * valutazioni nominative;
  * credenziali;
  * token;
  * chiavi API;
  * allegati reali;
  * documenti firmati;
  * dati da registro ufficiale;
  * log non anonimizzati.
* **Requisiti UI**:
  * informativa chiara su cosa viene salvato, dove, per quanto tempo, chi può accedere, come cancellarlo;
  * conferma utente prima di qualsiasi scrittura;
  * distinzione visiva tra bozza locale e validazione ufficiale.
* **Requisiti reset**:
  * reset esplicito e confermato dall’utente;
  * reset non deve avere side-effect su documenti ufficiali;
  * reset deve indicare cosa viene cancellato e cosa rimane.
* **Requisiti test**:
  * test scrittura/lettura/cancellazione in localStorage;
  * test reset;
  * test compatibilità cross-browser (se supportato);
  * test assenza di writing implicito non documentato;
  * test presenza informativa UI.

## 7. Opzione `IndexedDB` / solo se serve struttura più robusta

* **Quando sarebbe ammessa**: solo dopo nuovo contratto dedicato; solo se localStorage risulta insufficiente per dimensione o struttura.
* **Rischio privacy**: medio-alto (struttura più complessa può nascondere side-effect e aumentare superficie di conservazione).
* **Rischio perdita dati**: medio (cancellabile da utente, ma meno agevole di localStorage).
* **Rischio complessità**: alto (versionamento schema, migrazioni, gestione indici).
* **Dati ammessi**: stessi di `localStorage`; eventualmente riferimenti a oggetti/evidenze più articolati, purché non sensibili.
* **Dati vietati**: stessi di `localStorage`.
* **Requisiti UI**:
  * informativa storage aggiornata per IndexedDB;
  * interfaccia di reset adattata a struttura complessa.
* **Requisiti reset**:
  * cancellazione completa store/object store;
  * verifica post-reset assenza dati residui.
* **Requisiti test**:
  * test CRUD su strutture complesse;
  * test migrazione schema quando versione storage cambia;
  * test quota disco/browser;
  * test compatibilità browser supportati.

## 8. Opzione `local file export/import` / solo con azione esplicita utente

* **Quando sarebbe ammessa**: solo dopo nuovo contratto dedicato; solo con azione utente esplicita, non automatica.
* **Rischio privacy**: medio (il file localmente salvato è sotto responsabilità dell’utente).
* **Rischio perdita dati**: medio (l’utente è responsabile del backup del file).
* **Rischio complessità**: medio (formato, validazione file, gestione conflitti all’import).
* **Formati ammessi in futuro**: JSON, CSV, Markdown.
* **Formati vietati senza contratto separato**: DOCX, PDF programmatico, formati binari proprietari.
* **Dati ammessi**: stessi di `localStorage`/`IndexedDB`.
* **Dati vietati**: stessi di `localStorage`.
* **Requisiti UI**:
  * pulsante esplicito “Esporta” / “Importa” con conferma;
  * anteprima/riepilogo contenuto prima di importare;
  * avvertimento su responsabilità dell’utente.
* **Requisiti reset**:
  * import non deve sovrascrivere documenti ufficiali o stati già validati senza conferma esplicita.
* **Requisiti test**:
  * export; verifica contenuto non sensibile;
  * import in ambiente pulito;
  * import con conflitti e versioni diverse;
  * verifica assenza di side-effect su altre sezioni dell’app.

## 9. Opzione `cloud/sync` / vietato finché non esiste contratto separato

* **Quando sarebbe ammessa**: mai in MGR-089A. Solo in futuro con contratto dedicato, revisione sicurezza, informativa privacy esplicita e consenso utente.
* **Rischio privacy**: alto.
* **Rischio perdita dati**: variabile.
* **Rischio complessità**: alto.
* **Stato**: vietata in questa slice e fino a nuovo contratto.

## 10. Struttura concettuale futura — contratto documentale (non codice)

```yaml
storageVersion: string
activities:
  - activityId: string
    state: string
    updatedAt: string
    updatedByRole: string
    evidenceRefs: string[]
    validationRequired: boolean
    validationStatus: string
    validationNote: string
    blockedReason: string
    metadata: object
resetAt: string | null
```

Note:

* `storageVersion` serve per gestire migrazioni future.
* Non sono previsti campi nominativi.
* Non sono previsti allegati binari nello storage attività.
* `metadata` è riservato a informazioni tecniche (versione, timestamp, flag tecnici), non a dati personali.

## 11. Namespace e key strategy futura

### In ammissibile senza contratto, ma da definire in slice futura:

* `storageVersion`: costante numerica/semver legata alla versione del contratto di storage (es. `1` o `v1`).
* `activities`: array/object principale.
* `activityId`: deve essere generato in modo deterministico o minimamente casuale, senza PII.
* Possibile namespace futuri esemplificativi, non prescrittivi:
  * `curriculumManager.activities.v1`
  * `curriculumManager.activities.meta.resetAt`
* Regola: chiavi non devono contenere dati personali o temporalmente riconducibili a persone.

## 12. Versionamento dati

* Ogni modifica del contratto di storage deve corrispondere a un incremento di `storageVersion`.
* In caso di upgrade di versione:
  * leggere dati vecchi;
  * migrare struttura minima necessaria;
  * riscrivere con nuova versione;
  * mantenere traccia di migrazione eseguita.
* Compatibilità all’indietro non obbligatoria, ma migrazione deve essere documentata.

## 13. Migrazioni dati

* Migrazioni sono ammesse solo dopo:
  * contratto versionamento;
  * contratto privacy aggiornato;
  * test di migrazione su dataset realistici non sensibili;
  * piano di rollback.
* Dati legacy non riconosciuti devono essere gestiti in modo safe:
  * non bloccante;
  * loggabile localmente senza PII;
  * recuperabile in forma anonimizzata/aggregata se necessario;
  * altrimenti scartabile con avviso all’utente.

## 14. Reset e cancellazione

* Reset deve essere:
  * esplicito;
  * confermato;
  * distinguibile da cancellazione accidentale;
  * documentato (cosa viene cancellato, cosa rimane).
* Reset non deve cancellare documenti ufficiali approvati (se mai presenti in futuro nella piattaforma).
* Reset deve rendere non recuperabili i dati locali cancellati nella misura del possibile:
  * rimuovere riferimenti;
  * sovrascrivere valori sensibili se presenti;
  * resettare contatori/metadati associati.

## 15. Import/export futuri

* Ammessi solo dopo contratto separato.
* Devono essere:
  * azioni utente esplicite;
  * documentate in UI;
  * non automatiche.
* Formati ammessi: JSON, CSV, Markdown.
* Formati vietati: DOCX, PDF programmatico, binari proprietari senza contratto.
* Import deve:
  * validare `storageVersion`;
  * rifiutare contenuti malevoli o fuori schema;
  * chiedere conferma prima di sovrascrivere dati esistenti.

## 16. Backup futuri

* Nessun backup automatico cloud è ammesso.
* Backup locale è responsabilità dell’utente:
  * tramite export manuale;
  * tramite copia cartella browser/profilo (operazione avanzata, documentabile nella guida).
* Backup rimane sotto responsabilità dell’utente; la piattaforma non può garantirlo.

## 17. Error handling futuro

Errori attesi:

* quota esaurita;
* storage corrotto;
* versione dati non compatibile;
* accesso storage negato dal browser;
* delete/update fallito;
* reset incompleto.

Regole generali:

* errori non devono esporre dati sensibili in log;
* messaggi utente devono essere chiari, non tecnici, non allarmistici senza motivo;
* ogni errore deve essere recuperabile senza perdita di dati ufficiali;
* non devono essere introdotte chiamate a servizi esterni per gestire errori.

## 18. Limiti di dimensione

* `localStorage`: limiti generalmente bassi (5–10 MB). Dati attività devono restare minimi.
* `IndexedDB`: limiti maggiori, ma variabili per browser/dispositivo.
* Nessun dato binario pesante è ammesso nello storage attività.
* Se la dimensione supera soglie prudenziali:
  * mostrare avviso;
  * proporre export/cleanup;
  * non cancellare dati senza conferma utente.

## 19. Comportamento offline

* L’applicazione è pensata per utilizzo locale anche offline.
* Storage locale deve funzionare senza rete.
* Nessuna sincronizzazione online è prevista in MGR-089A.
* Eventuale funzionalità che richiede rete deve:
  * essere opzionale;
  * non rompere funzionalità offline;
  * essere documentata come dipendente da connettività.

## 20. Relazione con MGR-087A (privacy contract)

* MGR-089A rispetta la categorizzazione privacy di MGR-087A.
* Qualsiasi implementazione futura deve garantire:
  * minimizzazione assoluta;
  * assenza di dati personali/studenti;
  * reset esplicito;
  * local-first;
  * no sync/cloud senza contratto separato.
* MGR-089A definisce solo gli aspetti tecnici dello storage; la responsabilità dei contenuti rimane in MGR-087A.

## 21. Relazione con MGR-088A (copy contract)

* MGR-089A non definisce copy/UI, ma deve tenerne conto:
  * lo stato salvato non deve mai apparire come “validato”, “certificato”, “approvato automaticamente”;
  * ogni messaggio salvato o mostrato deve rispettare il tono ammesso;
  * i nomi degli stati non devono cambiare senza allineamento copy contract.
* MGR-088A ha definito le regole di copy; MGR-089A garantisce che lo storage non presti il fianco a interpretazioni scorrette.

## 22. Relazione con MGR-086B (domain contract)

* MGR-089A rispetta la tassonomia stati di MGR-086B.
* Non introduce nuovi stati o varianti non previste.
* Non modifica la semantica degli stati: salvataggio tecnico ≠ validazione istituzionale.

## 23. Opzioni tecniche vietate senza contratto separato

Sono vietate senza contratto separato dedicato:

* sincronizzazione cloud automatica o manuale server-side;
* backup remoto automatico;
* storage centralizzato multiutente;
* tracciamento utente anonimizzato o meno;
* invio di dati a endpoint esterni tramite fetch/XMLHttpRequest/API;
* storage condiviso tra contesti/soggetti non espressamente previsti;
* trasformazione dello stato attività in dato ufficiale o vincolante.

## 24. Prerequisiti prima di implementare storage runtime

Prima di qualunque implementazione runtime, è obbligatorio avere:

1. slice di implementazione esplicita e dedicata;
2. contratto UI copy/privacy approvato;
3. contratto storage tecnico/versione approvato;
4. contratto reset/export approvato;
5. contratto audit trail definito (se necessario);
6. contratto ownership/subentro definito (se necessario);
7. test manuale local-first;
8. test reset e cancellazione;
9. test assenza dati personali/studenti reali;
10. test contro parole vietate copy;
11. scan storage/API per rischi residui;
12. smoke audit post-implementazione;
13. rollback plan;
14. documentazione utente su privacy/reset.

## 25. Failure modes futuri — gestione contrattuale

### Storage corrotto

* Rilevamento: parser/validator su `storageVersion` e struttura minima.
* Gestione: isolamento blocco corrotto; proposta reset/ripristino senza perdita di dati ufficiali.
* Comunicazione: messaggio prudente (“dati di lavoro locali non leggibili, puoi ripristinare bozze precedenti”).

### Versione dati non compatibile

* Rilevamento: mismatch `storageVersion`.
* Gestione: migrazione gui data o, se impossibile, proposta pulizia con conferma.
* Comunicazione: chiarezza su cosa viene mantenuto/aggiornato/rimosso.

### Reset incompleto

* Rilevamento: verifica post-reset tramite lettura storage.
* Gestione: retry; se non risolvibile, avviso utente e suggerimento export prima di ulteriori azioni.
* Comunicazione: comunicare che alcuni dati potrebbero residuare e come intervenire manualmente.

### Quota browser esaurita

* Rilevamento: errore di scrittura storage e/o API quota.
* Gestione: avviso utente; proposta cleanup/esportazione; nessuna cancellazione automatica.
* Comunicazione: guida su come liberare spazio/gestire dimensione.

### Accesso file locale non disponibile

* Rilevamento: errore su API file/browser per import/export.
* Gestione: messaggio chiaro; suggerimento permessi browser/configurazione; nessun fallback a cloud.
* Comunicazione: chiarezza su dipendenza da azione utente e configurazione locale.

### Dati legacy non riconosciuti

* Rilevamento: struttura o enum non mappabili.
* Gestione: fallback safe (ignora, non sovrascrivere); log locale; proposta migrazione/esportazione.
* Comunicazione: spiegazione che parte del lavoro locale non è più leggibile nella nuova versione e come recuperarlo.

## 26. Criteri di accettazione del contratto

Il contratto è valido se:

* definisce scopo tecnico e motivo del non-implemento ora;
* vieta implementazioni senza contratto separato;
* definisce opzioni storage future ammesse e vietate;
* definisce struttura concettuale senza codice runtime;
* definisce namespace/key strategy solo come contratto futuro;
* definisce versionamento e migrazioni future;
* definisce reset/export/backup solo come azioni future/esplicite;
* definisce limiti, offline, error handling;
* chiarisce relazione con MGR-086B/087A/088A;
* prevede prerequisiti operativi prima del runtime;
* è compliance-only e non introduce codice/runtime/storage/autosave/api/backend/cloud/sync/ownership/subentro.
