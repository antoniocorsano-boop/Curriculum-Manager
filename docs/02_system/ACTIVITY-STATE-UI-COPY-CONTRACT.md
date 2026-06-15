# ACTIVITY-STATE-UI-COPY-CONTRACT

## 1. Scopo

Definire il contratto di copy/UI per mostrare in futuro gli stati attività nella mappa di completamento del Curriculum di Istituto, senza implicare validazione automatica, conformità normativa, certificazione, approvazione istituzionale, completamento ufficiale, registro ufficiale, valutazione o controllo su dati reali.

Questo contratto è puramente documentale: non introduce codice, non modifica runtime, non introduce UI reale degli stati, non introduce storage, autosave, backend, cloud, ownership, subentro o dati reali.

## 2. Principi di copy

* Il copy deve essere **chiaro, sobrio, orientativo**.
* Il copy deve distinguere sempre tra:
  * stato di lavoro (cosa è stato fatto);
  * evidenza (prova di avanzamento);
  * revisione (controllo umano);
  * validazione umana (accettazione ufficiale da parte di organi/autorità).
* Il copy NON deve:
  * dichiarare conformità automatica;
  * dichiarare approvazione istituzionale;
  * dichiarare certificazione;
  * dichiarare completamento ufficiale;
  * trasformare la piattaforma in registro ufficiale;
  * promettere salvataggio/autosave invisibile;
  * usare linguaggio di registro scolastico ufficiale.

## 3. Tono ammesso

* Informativo: “Stato: …”
* Orientativo: “Per iniziare, consulta …”
* Lavorativo: “In lavorazione”, “Evidenza presente”
* Revisionale: “Da rivedere”, “Pronto per controllo umano”
* Prudente: “Validazione umana richiesta”, “Non sostituisce la validazione ufficiale”
* Temporale: “Ultimo aggiornamento: …”

## 4. Tono vietato

* Certificativo: “Certificato”, “A norma”, “Conforme”
* Autoritario: “Ufficiale”, “Istituzionale”, “Registro aggiornato”
* Automatico: “Validato automaticamente”, “Sistema approva”
* Definitivo: “Completato ufficialmente”, “Finale”
* Registriale: “Protocollato”, “Registrato”, “Archiviato ufficialmente”

## 5. Copy per ogni stato

### 5.1 `not_started` / non avviata

| Elemento | Contenuto |
|---|---|
| Label breve | “Non avviata” |
| Descrizione | “Area/nodo ancora senza lavoro iniziato.” |
| Tooltip/help | “Puoi consultare i riferimenti disponibili per orientarti.” |
| CTA/link ammessi | “Vedi riferimenti” (link a Wiki/documenti) |
| Wording vietato | “Deprioritaria”, “Sospesa”, “Non necessaria” |
| Rischio semantico | Potrebbe sembrare esclusa o ignorata |
| Nota di prudenza | “Solo un indicatore di avanzamento, non una valutazione.” |

### 5.2 `orientation_available` / orientamento disponibile

| Elemento | Contenuto |
|---|---|
| Label breve | “Orientamento disponibile” |
| Descrizione | “Puoi consultare riferimenti, documenti e linee guida per iniziare.” |
| Tooltip/help | “Il materiale di orientamento è pronto. Il lavoro vero e proprio deve ancora iniziare.” |
| CTA/link ammessi | “Apri guida”, “Vedi documenti” |
| Wording vietato | “Pronta”, “Completata”, “Già definita” |
| Rischio semantico | Potrebbe sembrare un’attività già conclusa |
| Nota di prudenza | “Solo orientamento, non avanzamento.” |

### 5.3 `in_progress` / in lavorazione

| Elemento | Contenuto |
|---|---|
| Label breve | “In lavorazione” |
| Descrizione | “Un utente sta lavorando o ha lavorato sull’area/nodo, ma non ha ancora prodotto evidenza conclusiva.” |
| Tooltip/help | “Il lavoro è in corso. Non è ancora pronto per revisione o validazione.” |
| CTA/link ammessi | “Continua lavoro”, “Apri documento collegato” |
| Wording vietato | “Completata”, “Pronta per validazione”, “Salvata” |
| Rischio semantico | Potrebbe sembrare avanzamento conclusivo |
| Nota di prudenza | “Stato di lavoro, non di avanzamento completato.” |

### 5.4 `evidence_present` / evidenza presente

| Elemento | Contenuto |
|---|---|
| Label breve | “Evidenza presente” |
| Descrizione | “È stato prodotto un risultato verificabile collegato all’area/nodo.” |
| Tooltip/help | “L’evidenza è un prodotto intermedio, non una validazione.” |
| CTA/link ammessi | “Vedi evidenza”, “Apri documento collegato” |
| Wording vietato | “Convalidata”, “Approvata”, “Definitiva” |
| Rischio semantico | Potrebbe sembrare revisione/validazione |
| Nota di prudenza | “Evidenza ≠ validazione. Serve revisione/validazione umana.” |

### 5.5 `needs_review` / da rivedere

| Elemento | Contenuto |
|---|---|
| Label breve | “Da rivedere” |
| Descrizione | “L’evidenza prodotta necessita di controllo da parte di persone autorizzate.” |
| Tooltip/help | “La revisione è un controllo, non una validazione finale.” |
| CTA/link ammessi | “Rivedi contenuto”, “Vedi revisori” |
| Wording vietato | “Validata”, “Approvata”, “Conforme” |
| Rischio semantico | Potrebbe sembrare validazione finale |
| Nota di prudenza | “Revisione ≠ validazione. Dopo la revisione serve la validazione umana.” |

### 5.6 `ready_for_human_validation` / pronta per validazione umana

| Elemento | Contenuto |
|---|---|
| Label breve | “Pronta per controllo umano” |
| Descrizione | “Dopo revisione, il materiale è pronto per accettazione ufficiale da parte di organi/collegi.” |
| Tooltip/help | “La validazione resta umana/collegiale/istituzionale. La piattaforma non certifica.” |
| CTA/link ammessi | “Prepara per controllo” (solo se esplicita che la validazione è fuori dall’app) |
| Wording vietato | “Validata”, “Approvata automaticamente”, “Conforme”, “Certificata” |
| Rischio semantico | ALTO: potrebbe sembrare validazione finale |
| Nota di prudenza | “PRONTA PER CONTROLLO UMANO ≠ VALIDATA. La validazione avviene fuori dall’app.” |

### 5.7 `human_validated` / validata da persona autorizzata

| Elemento | Contenuto |
|---|---|
| Label breve | “Validata da persona autorizzata” |
| Descrizione | “Un organo/autorità competente ha accettato il materiale.” |
| Tooltip/help | “Questa registrazione non è automatica. È stata inserita manualmente da una persona autorizzata.” |
| CTA/link ammessi | Nessuna CTA generica. Solo “Vedi protocollo” se esiste contratto audit trail separato. |
| Wording vietato | “Approvata dal sistema”, “Certificata”, “Conforme”, “Ufficiale” |
| Rischio semantico | ALTO: potrebbe sembrare validazione automatica |
| Nota di prudenza | “VALIDATA DA PERSONA AUTORIZZATA ≠ VALIDATA DAL SISTEMA. La piattaforma non certifica.” |

### 5.8 `blocked` / bloccata

| Elemento | Contenuto |
|---|---|
| Label breve | “Bloccata” |
| Descrizione | “L’attività non può proseguire per ragioni esterne o vincoli specifici.” |
| Tooltip/help | “Mostra il motivo del blocco e le condizioni per sblocco.” |
| CTA/link ammessi | “Vedi motivo”, “Contatta referente” |
| Wording vietato | “Annullata”, “Eliminata”, “Non più necessaria” |
| Rischio semantico | Potrebbe sembrare rimozione definitiva |
| Nota di prudenza | “Blocco temporaneo, non esclusione definitiva.” |

### 5.9 `not_applicable` / non applicabile

| Elemento | Contenuto |
|---|---|
| Label breve | “Non applicabile” |
| Descrizione | “L’area/nodo non è pertinente per il contesto specifico.” |
| Tooltip/help | “Mostra la motivazione breve dell’esclusione.” |
| CTA/link ammessi | “Vedi motivazione” |
| Wording vietato | “Ignorata”, “Trascurata”, “Non considerata” |
| Rischio semantico | Potrebbe sembrare negligenza |
| Nota di prudenza | “Esclusione motivata, non trascuratezza.” |

## 6. Regole per CTA future

### CTA ammesse

* “Apri sezione”
* “Vedi riferimenti”
* “Vedi evidenze”
* “Rivedi contenuto”
* “Prepara per controllo”
* “Contatta referente”

### CTA vietate

* “Approva”
* “Certifica”
* “Rendi conforme”
* “Completa ufficialmente”
* “Salva stato”
* “Prendi in carico”
* “Conferma validazione”
* “Registra”

### Regola speciale per `human_validated`

Lo stato `human_validated` **non deve essere impostabile da CTA generica**.
La sua transizione deve avvenire solo tramite:
* contratto ownership/subentro separato;
* contratto UI copy specifico;
* contratto audit trail;
* azione umana esplicita e tracciata.

## 7. Regole per indicatori visuali futuri

* Colori/icone non devono implicare certificazione.
* Vietati: badge “OK ufficiale”, “Approvato”, “Conforme”, “Certificato”.
* Ammessi: indicatori di orientamento, lavoro, revisione, attesa.
* Esempi ammessi:
  * Grigio = non avviato/non applicabile
  * Blu = orientamento disponibile
  * Arancione = in lavorazione
  * Verde chiaro = evidenza presente
  * Giallo = da rivedere
  * Verde scuro = pronto per controllo umano
  * Verde scuro + icona persona = validato da persona autorizzata
  * Rosso = bloccato

## 8. Messaggi di prudenza obbligatori in UI futura

Prima di implementare qualsiasi UI con stati attività, aggiungere sempre:

* “Questa è una bussola di lavoro, non una certificazione.”
* “La validazione ufficiale resta umana, collegiale o istituzionale.”
* “Lo stato non sostituisce l’approvazione del dirigente o del collegio docenti.”
* “Nessun dato viene salvato automaticamente senza tua conferma.”

## 9. Differenza tra avanzamento, evidenza, revisione e validazione (copy breve per UI)

* **Avanzamento**: cosa è stato iniziato o lavorato.
* **Evidenza**: prova di avanzamento (bozza, nota, checklist).
* **Revisione**: controllo da parte di persone autorizzate.
* **Validazione umana**: accettazione ufficiale da parte di organi/collegi/autorità competenti.

La piattaforma aiuta a organizzare e rendere visibile; non sostituisce organi collegiali o autorità competenti.

## 10. Requisiti futuri prima di UI runtime degli stati

Prima di implementare la UI degli stati attività, definire separatamente:

* contratto UI copy/privacy (questo documento);
* contratto storage/autosave (MGR-087A o successivo);
* contratto ownership/subentro (se necessario);
* contratto audit trail (se necessario);
* smoke test umano con focus su wording/ambiguity;
* test automatico contro parole vietate (se struttura test adatta);
* verifica accessibilità (WCAG) per colori/icone;
* verifica coerenza con MGR-086B (domain contract);
* verifica coerenza con MGR-087A (privacy contract);
* documentazione utente su significato di ogni stato.

## 11. Criteri di accettazione del contratto

Il contratto è valido se:

* definisce copy ammesso e vietato per ogni stato;
* vieta wording di conformità/certificazione/approvazione automatica;
* vieta CTA che implicano validazione automatica;
* vieta indicatori visuali che sembrano certificazioni;
* include messaggi di prudenza obbligatori;
* distingue chiaramente avanzamento/evidenza/revisione/validazione;
* è comprensibile per future slice UI copy e runtime;
* non introduce runtime.
