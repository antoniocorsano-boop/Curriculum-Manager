# ACTIVITY-STATE-READONLY-FIXTURE-PROTOTYPE-CONTRACT

## 1. Scopo

Definire il contratto per il primo prototipo read-only degli stati attività nella mappa di completamento del Curriculum di Istituto.

Questo contratto è puramente documentale: non introduce codice, non modifica runtime, non introduce fixture JS/JSON reali, non introduce storage, autosave, backend, API, cloud, ownership, subentro o dati reali.

Il prototipo read-only è una superficie di visualizzazione statica o semi-statica, senza persistenza, senza interazioni di salvataggio e senza alcuna implicitazione di validazione ufficiale.

## 2. Cosa significa “activity state” nel dominio Curriculum Manager

Un activity state è un indicatore di avanzamento di un’area/nodo del curricolo, rappresentato come informazione visiva e testuale destinata a orientare il lavoro dei docenti e dei referenti.

Lo state:

* non è un giudizio di conformità;
* non è una validazione automatica;
* non è un’approvazione istituzionale;
* non è un certificato;
* non è un completamento ufficiale;
* non è un registro ufficiale;
* non è una valutazione nominativa.

Lo state è una bussola di lavoro: mostra dove si trova il lavoro, dove manca, cosa è pronto per controllo umano, cosa è bloccato.

## 3. Confine del prototipo read-only

Il prototipo read-only:

* è una superficie visiva statica o semi-staticca;
* mostra stati attività legati a aree/nodi della mappa di completamento;
* replica la mappatura esistente o una versione semplificata;
* non salva alcun dato;
* non ricorda lo stato tra sessioni;
* non modifica documenti ufficiali;
* non altera la mappa esistente della piattaforma.

Il prototipo read-only non è:

* un modulo di lavoro editing;
* un form di inserimento stato;
* un sistema di tracciamento persistente;
* uno strumento di validazione;
* un registro ufficiale;
* una fonte di conformità normativa.

## 4. State categories ammesse nel prototipo

### 4.1 not_started / non avviata

* **Significato prototipo**: l’area/nodo non ha ancora lavoro iniziato.
* **Visualizzazione ammessa**: badge neutro o vuoto, testo sobrio.
* **Non autoritario**: non implica esclusione o deprioritizzazione.

### 4.2 orientation_available / orientamento disponibile

* **Significato prototipo**: materiale di orientamento/documentazione disponibile per iniziare.
* **Visualizzazione ammessa**: indicatore informativo, non badge di avanzamento.
* **Non autoritario**: non implica completamento o definizione.

### 4.3 in_progress / in lavorazione

* **Significato prototipo**: un utente sta lavorando o ha lavorato sull’area/nodo, ma senza evidenza conclusiva.
* **Visualizzazione ammessa**: indicatore di lavorazione.
* **Non autoritario**: non implica correttezza o completezza.

### 4.4 evidence_present / evidenza presente

* **Significato prototipo**: è stato prodotto un risultato verificabile collegato all’area/nodo.
* **Visualizzazione ammessa**: mostra collegamento a evidenza o documento.
* **Non autoritario**: non implica validazione o approvazione.

### 4.5 needs_review / da rivedere

* **Significato prototipo**: l’evidenza necessita di controllo da parte di persone autorizzate.
* **Visualizzazione ammessa**: avviso prudente, con riferimento a revisori/ruoli.
* **Non autoritario**: non implica revisione completata.

### 4.6 ready_for_human_validation / pronta per controllo umano

* **Significato prototipo**: dopo revisione, il materiale è pronto per accettazione ufficiale fuori dall’app.
* **Visualizzazione ammessa**: indicazione prudente, senza claim di validazione.
* **Non autoritario**: non implica certificazione o conformità.

### 4.7 human_validated / validata da persona autorizzata

* **Significato prototipo**: un organo/autorità competente ha accettato il materiale.
* **Visualizzazione ammessa**: indicazione con riferimento a persona/ente autorizzato.
* **Non autoritario**: non implica validazione automatica o sistema-certificata.

### 4.8 blocked / bloccata

* **Significato prototipo**: l’attività non può proseguire per ragioni esterne o vincoli specifici.
* **Visualizzazione ammessa**: indicazione con motivo e condizioni di sblocco.
* **Non autoritario**: non implica rimozione definitiva.

### 4.9 not_applicable / non applicabile

* **Significato prototipo**: l’area/nodo non è pertinente per il contesto specifico.
* **Visualizzazione ammessa**: indicazione con motivazione breve.
* **Non autoritario**: non implica negligenza o trascuratezza.

## 5. Cosa il prototipo può mostrare

Il prototipo read-only può mostrare:

* label stato (con copy conforme a MGR-088A);
* descrizione stato (prudente, orientativa);
* riferimento a documento, evidenza, area o nodo collegato;
* indicatore visivo non certificativo (colore/iconp di orientamento/lavoro/attesa/revisione);
* nota di prudenza fissa: “Questa è una bussola di lavoro, non una certificazione. La validazione ufficiale resta umana, collegiale o istituzionale.”

## 6. Cosa il prototipo non deve implicare

Il prototipo non deve:

* dichiarare conformità normativa;
* dichiarare approvazione istituzionale;
* dichiarare certificazione;
* dichiarare completamento ufficiale;
* trasformare la piattaforma in registro ufficiale;
* promettere salvataggio/autosave invisibile;
* usare linguaggio di registro scolastico ufficiale;
* attribuire a un badge/icona colore significato di “validato dal sistema” o “conforme”.

## 7. Relazione con i contratti esistenti

| Contratto | Relazione per MGR-090A |
|---|---|
| MGR-086B — domain contract | Il prototipo usa gli stessi 9 stati; non introduce nuovi stati o varianti. |
| MGR-087A — privacy contract | Il prototipo non memorizza dati; rispetta local-first e minimizzazione. |
| MGR-088A — ui copy contract | Il prototipo usa solo copy ammesso; vieta wording certificativo/conformistico. |
| MGR-089A — storage technical contract | Il prototipo non tocca storage; conferma opzione `none` o `memory-only` come default. |

## 8. Human validation boundary

Il prototipo:

* mostra lo stato `human_validated` come indicatore, non come meccanismo;
* non permette di impostare `human_validated` tramite CTA, button, link o interazione;
* non implementa ownership/subentro per la transizione a `human_validated`;
* non implementa audit trail;
* non genera automaticamente il passaggio a `human_validated`.

La validazione rimane:

* umana;
* collegiale;
* istituzionale;
* fuori dall’app.

## 9. Storage prohibition per questa slice

Questa slice:

* non introduce localStorage/sessionStorage/IndexedDB runtime;
* non introduce autosave;
* non introduce fetch/XMLHttpRequest/API/backend;
* non introduce cloud/sync/remoto;
* non introduce storage/autosave di alcun tipo.

Il prototipo è strettamente:

* read-only;
* volatile (a meno che non sia esplicitamente una fixture statica nel codice, che rimane comunque non persistente).

## 10. Future implementation gates

Prima di qualunque implementazione runtime successiva, occorre:

1. contratto storage tecnico approvato (MGR-089A o successivo);
2. contratto ownership/subentro definito;
3. contratto audit trail definito;
4. slice UI runtime dedicata;
5. smoke test umano su copy/visual indicators;
6. test contro parole vietate;
7. verifica accessibilità (WCAG);
8. verifica privacy/reset;
9. documentazione utente aggiornata;
10. rollback plan approvato.

## 11. Relazione con completion map, workflow, ruoli e percorsi

* Completion map (MGR-082/084B): il prototipo può riflettere la struttura delle aree già esistenti nella mappa, senza modificarla.
* Activity completion map domain (MGR-080): rispetta entità e stati già definiti.
* Workflow process catalog: mostra aree coerenti con le fasi del processo.
* Role work paths: non introduce filtraggio per ruolo in questo prototipo (rimane visualizzazione neutra/globale).
* Document workflows: mostra riferimenti a documenti collegati senza aprire viste nuove.

## 12. Boundary rispetto a src/** e index.html

Questa slice:

* non modifica `src/**`;
* non modifica `index.html`;
* non aggiunge route/views/sidebar voci/runtime.

Se in futuro il prototipo diventerà fixture JS/JSON nella codebase, quella trasformazione richiederà:

* una slice dedicata;
* contratto runtime separato;
* smoke test completo.

## 13. Accettazione del contratto

Il contratto è valido se:

* definisce chiaramente il significato di activity state nel dominio Curriculum Manager;
* delimita il prototipo read-only senza storage;
* elenca state categories ammesse e vieta wording certificativo/conformistico;
* esplicita cosa può e non può mostrare;
* chiarisce la relationship con MGR-086B/087A/088A/089A;
* ribadisce il human validation boundary;
* proibisce storage in questa slice;
* definisce future implementation gates;
* rimane docs-only/contract-only.
