# ACTIVITY-STATE-DOMAIN-CONTRACT

## 1. Scopo

Definire il contratto di dominio per gli stati futuri delle attività della mappa di completamento del Curriculum di Istituto.

Questo contratto è puramente concettuale e documentale: non introduce codice, non modifica runtime, non introduce salvataggi, autosave, storage, backend, API, cloud, ownership, subentro o profilo reale.

Gli stati sono indicatori di lavoro/avanzamento, non validazione ufficiale, non conformità normativa automatica, non certificazione.

## 2. Cosa gli stati rappresentano

Gli stati rappresentano:

* lo stato di avanzamento di un’area/nodo della mappa;
* la presenza o assenza di evidenze prodotte;
* la necessità o meno di revisione umana;
* la readiness per validazione umana/collegiale;
* eventuali blocchi o condizioni di non applicabilità.

Gli stati non rappresentano:

* conformità automatica a norme o documenti;
* validazione istituzionale;
* approvazione ufficiale da parte della piattaforma;
* certificazione di completezza;
* titolarità esclusiva dell’attività;
* completamento definitivo del curriculum.

## 3. Differenza tra avanzamento, evidenza, revisione e validazione

* Avanzamento: indica cosa è stato avviato o lavorato.
* Evidenza: indica che è stato prodotto un risultato verificabile (bozza, nota, checklist, riferimento).
* Revisione: indica che il materiale necessita di controllo da parte di persone autorizzate.
* Validazione umana: indica che la revisione è completata e il materiale è pronto per accettazione ufficiale da parte di organi/collegi.

La piattaforma può orientare, organizzare e rendere visibile il lavoro; non certifica.

## 4. Stati futuri — tassonomia prudente

### 4.1 `not_started` / non avviata
* **Significato**: area/nodo ancora senza lavoro iniziato.
* **Condizione minima**: nessuna evidenza, nessuna attività collegata.
* **UI ammessa**: stato neutro o vuoto, nessun messaggio di allerta.
* **Vietato dedurre**: che l’area non serve o è deprioritaria.
* **Conferma futura**: docente/referente.
* **Evidenza richiesta**: no.
* **Validazione umana**: no.

### 4.2 `orientation_available` / orientamento disponibile
* **Significato**: l’utente può consultare riferimenti, documenti e linee guida per iniziare.
* **Condizione minima**: documenti/riferimenti caricati o linkati.
* **UI ammessa**: evidenza che il materiale di orientamento è disponibile.
* **Vietato dedurre**: che l’attività è già completata.
* **Conferma futura**: sistema (promozione automatica da non_started a orientation_available quando i riferimenti sono pronti).
* **Evidenza richiesta**: no (solo riferimenti).
* **Validazione umana**: no.

### 4.3 `in_progress` / in lavorazione
* **Significato**: un utente sta lavorando o ha lavorato sull’area/nodo, ma non ha ancora prodotto evidenza conclusiva.
* **Condizione minima**: nota di lavoro, bozza parziale, o assegnazione temporanea (senza ownership esclusiva).
* **UI ammessa**: indicatore di lavorazione in corso.
* **Vietato dedurre**: che il lavoro è completo o corretto.
* **Conferma futura**: utente con visibilità adeguata.
* **Evidenza richiesta**: parziale.
* **Validazione umana**: no.

### 4.4 `evidence_present` / evidenza presente
* **Significato**: è stato prodotto un risultato verificabile collegato all’area/nodo.
* **Condizione minima**: sezione compilata, nota di revisione, checklist, bozza, riferimento collegato, output parziale.
* **UI ammessa**: mostra il tipo di evidenza e il collegamento al documento.
* **Vietato dedurre**: che l’evidenza è definitiva o convalidata.
* **Conferma futura**: autore dell’evidenza o referente.
* **Evidenza richiesta**: sì.
* **Validazione umana**: no (l’evidenza è un prodotto, non una validazione).

### 4.5 `needs_review` / da rivedere
* **Significato**: l’evidenza prodotta necessita di controllo da parte di persone autorizzate.
* **Condizione minima**: presenza di evidenza + indicazione esplicita di revisione.
* **UI ammessa**: avviso “Da revisionare” con riferimenti a revisori/ruoli.
* **Vietato dedurre**: che la revisione è stata completata.
* **Conferma futura**: revisore autorizzato.
* **Evidenza richiesta**: sì.
* **Validazione umana**: no (revisione è un controllo, non una validazione finale).

### 4.6 `ready_for_human_validation` / pronta per validazione umana
* **Significato**: dopo revisione, il materiale è pronto per accettazione ufficiale.
* **Condizione minima**: evidenza presente + revisione completata.
* **UI ammessa**: indicazione “Pronto per validazione” con nota su chi/deve validare.
* **Vietato dedurre**: che la validazione è già avvenuta.
* **Conferma futura**: organo/collegio/autorità competente.
* **Evidenza richiesta**: sì.
* **Validazione umana**: sì, obbligatoria prima di cambiare stato in `human_validated`.

### 4.7 `human_validated` / validata da persona autorizzata
* **Significato**: un organo/autorità competente ha accettato il materiale.
* **Condizione minima**: registrazione esplicita di validazione da parte di persona/autorità autorizzata.
* **UI ammessa**: stato “Validato” con riferimento a chi ha validato e data.
* **Vietato dedurre**: che la validazione è automatica o garantita dalla piattaforma.
* **Conferma futura**: dirigente/consiglio/collegio/referente secondo regole istituzionali.
* **Evidenza richiesta**: sì (protocollo di validazione).
* **Validazione umana**: già avvenuta.

### 4.8 `blocked` / bloccata
* **Significato**: l’attività non può proseguire per ragioni esterne o vincoli specifici.
* **Condizione minima**: motivo esplicito di blocco.
* **UI ammessa**: indicazione “Bloccato” con motivo e condizioni per sblocco.
* **Vietato dedurre**: che il blocco è permanente o insuperabile.
* **Conferma futura**: referente/autorità competente.
* **Evidenza richiesta**: no (ma motivo documentato).
* **Validazione umana**: no.

### 4.9 `not_applicable` / non applicabile
* **Significato**: l’area/nodo non è pertinente per il contesto specifico.
* **Condizione minima**: decisione motivata di esclusione.
* **UI ammessa**: indicazione “Non applicabile” con motivazione breve.
* **Vietato dedurre**: che l’area è trascurata o ignorata.
* **Conferma futura**: referente/autorità competente.
* **Evidenza richiesta**: no (ma motivazione documentata).
* **Validazione umana**: no.

## 5. Stati vietati e wording vietato

Sono vietati i seguenti stati o formulazioni:

* `compliant` / conforme
* `normativamente valido`
* `approvato automaticamente`
* `certificato`
* `conforme al ministero`
* `completato ufficialmente`
* qualsiasi formula che faccia sembrare la piattaforma un’autorità di validazione.

Sono inoltre vietati testi che implichino:

* validazione automatica da parte dell’applicazione;
* conformità normativa garantita dal software;
* certificazione istituzionale senza intervento umano.

## 6. Principio fondamentale

La piattaforma può:

* orientare l’utente;
* organizzare il lavoro;
* rendere visibile l’avanzamento;
* conservare tracce locali di avanzamento/evidenza;
* supportare la revisione e la validazione umana.

La piattaforma non può:

* certificare;
* validare automaticamente;
* approvare ufficialmente;
* dichiarare conformità;
* sostituire organi collegiali o autorità competenti.

## 7. Relazione con la mappa di completamento curricolo

Ogni nodo/area della mappa può essere associato a uno stato futuro.

Lo stato del nodo deve essere derivabile da:

* stati delle attività collegate;
* presenza di evidenze;
* stato di revisione/validazione.

Il nodo non deve dichiarare conformità: mostra avanzamento e lacune, non certificati.

## 8. Relazione con documenti, revisione e output finale

* Documenti istituzionali: possono fungere da riferimenti o da contenuti di lavoro.
* Revisione: attività in stato `needs_review` → revisori autorizzati.
* Output finale: attività in stato `human_validated` → pronte per consolidamento.

## 9. Limiti privacy/local-first

* Gli stati futuri possono essere salvati localmente (da definire in contratto separato).
* Nessun dato personale obbligatorio.
* Nessun dato studente.
* Nessun cloud/sync/backend senza contratto dedicato.
* Reset possibile senza side-effect su documenti ufficiali.

## 10. Prerequisiti prima di qualunque implementazione runtime

Prima di implementare qualsiasi logica di stato attività, definire separatamente:

* contratto storage/autosave locale;
* contratto privacy/dati reali;
* contratto ownership/subentro;
* contratto UI copy e boundary;
* contratto smoke audit pre-runtime;
* contratto gestione errori e conflitti.

## 11. Struttura dati concettuale (non codice)

```yaml
activityId: string
state: string
stateLabel: string
evidenceRefs: string[]
lastUpdatedAt: string
updatedByRole: string
requiresHumanValidation: boolean
validationNote: string
blockedReason: string
sourceView: string
targetOutput: string
```

Nota: questa struttura è un contratto documentale, non uno schema runtime.

## 12. Criteri di accettazione del contratto

Il contratto è valido se:

* definisce stati prudenti e non conformistici;
* chiarisce che la validazione è sempre umana/collegiale;
* vieta wording di conformità automatica;
* non introduce runtime;
* non introduce storage/autosave/backend/API/cloud;
* non introduce ownership/subentro;
* è comprensibile per future slice UI e dati.
