# Activity and Completion Map Domain Contract

## 1. Scopo

Definire il modello concettuale per:

* attività acquisibili;
* mappa visuale di completamento;
* stati di avanzamento;
* presa in carico e subentro;
* evidenze;
* riferimenti normativi/documentali;
* documento collegato;
* validazione umana.

Il modello deve sostenere la UI definita in MGR-079:
`profilo → attività pertinenti → mappa globale → presa in carico/subentro → workspace → documento a destra → evidenze → validazione umana`.

Il contratto non implementa codice.

## 2. Entità principali

### UserProfileContext

Rappresenta il contesto locale configurato dall’utente:

* ruolo;
* ordine scolastico;
* disciplina;
* classi/anni;
* dipartimento/interclasse/intersezione;
* ambito operativo;
* preferenze di percorso.

Specificare che:

* è locale;
* non richiede dati personali reali obbligatori;
* serve a filtrare attività e riferimenti;
* non autorizza automaticamente validazioni.

### CompletionMapNode

Rappresenta un nodo della mappa di completamento del Curriculum di Istituto.

Campi concettuali:

* id;
* titolo;
* descrizione breve;
* livello gerarchico;
* nodo padre;
* ordine visuale;
* area: normativa, struttura curricolo, disciplina, verticalità, valutazione, inclusione, revisione, output;
* stato;
* attività collegate;
* documenti collegati;
* evidenze disponibili;
* parti mancanti;
* validazione richiesta.

### Activity

Rappresenta un’attività concreta che un utente può acquisire, continuare o completare.

Campi concettuali:

* id;
* titolo;
* descrizione breve;
* perché serve;
* profili pertinenti;
* nodo mappa collegato;
* documento collegato;
* riferimenti collegati;
* evidenze attese;
* rischio se saltata;
* stato;
* assegnazione/presa in carico;
* ultimo aggiornamento;
* completamento operativo;
* validazione richiesta.

### ActivityAssignment

Rappresenta la presa in carico operativa.

Campi concettuali:

* activityId;
* presa in carico da ruolo/profilo, non necessariamente persona reale;
* timestamp locale;
* stato presa in carico;
* note operative;
* subentro ammesso sì/no;
* motivo subentro se presente.

Chiarire:

* presa in carico non è proprietà esclusiva;
* una attività incompleta può essere subentrata da chi ha visibilità adeguata;
* il subentro conserva evidenze e lavoro precedente.

### LinkedDocument

Rappresenta il documento collegato all’attività e mostrabile nel pannello destro.

Campi concettuali:

* id;
* titolo;
* tipo documento;
* sezione collegata;
* stato bozza;
* sezioni compilate;
* sezioni mancanti;
* anteprima disponibile;
* output collegato;
* validazione richiesta.

### Evidence

Rappresenta ciò che dimostra l’avanzamento.

Campi concettuali:

* id;
* tipo evidenza;
* attività collegata;
* documento collegato;
* descrizione;
* stato;
* origine: compilazione, revisione, checklist, nota, output, controllo;
* data/ultimo aggiornamento locale;
* validazione richiesta.

### Reference

Rappresenta norma, documento core, contratto o guida collegata.

Campi concettuali:

* id;
* titolo;
* tipo: norma, documento core, contratto repo, guida Wiki, criterio collegiale, documento istituzionale;
* stato: verificato, da verificare, interno, esterno;
* attività collegate;
* note di prudenza.

Non inventare nuove norme non già presenti nei documenti del repo senza marcarle come `da verificare`.

## 3. Stati della mappa

Stati per i nodi della mappa:

* non avviato;
* parziale;
* in lavorazione;
* incompleto;
* da revisionare;
* pronto per validazione;
* validato fuori dall’app.

Chiarire:

* lo stato del nodo deriva dalle attività collegate;
* il nodo non deve dichiarare conformità automatica;
* il nodo può mostrare avanzamento e mancanze.

## 4. Stati delle attività

Stati minimi:

* non avviata;
* disponibile;
* presa in carico;
* in lavorazione;
* non completata;
* disponibile per subentro;
* completata;
* da revisionare;
* pronta per validazione;
* validata fuori dall’app.

Per ogni stato indicare:

* significato;
* CTA ammessa;
* visibilità nella mappa;
* relazione con documento collegato;
* relazione con evidenze;
* relazione con validazione.

## 5. Regole di transizione attività

Transizioni ammesse:

* disponibile → presa in carico;
* presa in carico → in lavorazione;
* in lavorazione → non completata;
* non completata → disponibile per subentro;
* disponibile per subentro → in lavorazione;
* in lavorazione → completata;
* completata → da revisionare;
* da revisionare → pronta per validazione;
* pronta per validazione → validata fuori dall’app.

Chiarire:

* la validazione fuori dall’app è una registrazione di stato, non una certificazione automatica;
* il sistema non decide la validità istituzionale;
* il subentro non cancella lo storico/evidenza precedente.

## 6. Visibilità filtrata dal profilo

Regole:

* ogni utente vede la mappa globale;
* ogni utente vede in evidenza solo le attività pertinenti al profilo;
* le attività non pertinenti possono essere visibili nella mappa come stato aggregato, ma non come attività personali;
* i riferimenti mostrati devono essere coerenti con ruolo, ordine, disciplina e documenti collegati.

## 7. Mappa globale di completamento

Struttura concettuale minima:

* fondazione normativa/documentale;
* struttura curricolo;
* discipline;
* verticalità/classi/anni;
* valutazione;
* inclusione e personalizzazione senza dati personali;
* revisione/coerenza;
* output e validazione finale.

Per ogni nodo indicare:

* come si calcola/descrive lo stato;
* quali attività possono collegarsi;
* quali evidenze alimentano il nodo;
* come mostrare cosa manca;
* come evitare falsa conformità automatica.

## 8. Documento collegato e pannello destro

Ruolo del documento collegato:

* ogni attività rilevante deve avere un documento o sezione documento collegata;
* il workspace futuro deve poter mostrare il documento in pannello/tab destro;
* il documento deve mostrare stato bozza, sezioni compilate, sezioni mancanti, anteprima e stato validazione;
* il documento non deve essere trattato come output ufficiale senza validazione umana.

## 9. Evidenze e tracciabilità

Tipi di evidenza:

* sezione compilata;
* nota di revisione;
* checklist completata;
* controllo di coerenza;
* bozza documento;
* output stampabile/esportabile;
* riferimento collegato;
* stato validazione.

Per ogni evidenza indicare:

* cosa dimostra;
* a quale attività/nodo/documento è collegata;
* se richiede validazione umana;
* se è locale.

## 10. Riferimenti normativi/documentali

Regole:

* i riferimenti aiutano l’utente a capire perché una attività serve;
* i riferimenti non equivalgono a conformità automatica;
* i riferimenti incerti devono essere marcati `da verificare`;
* i riferimenti core del repo possono essere collegati alle attività;
* la Wiki può spiegare i riferimenti, ma non sostituire la validazione.

## 11. Presa in carico e subentro

Regola centrale:
la presa in carico è responsabilità operativa temporanea, non proprietà esclusiva.

Specificare:

* quando una attività è subentrabile;
* chi può vedere e subentrare;
* cosa vede chi subentra;
* come conservare note/evidenze precedenti;
* come mostrare cosa manca;
* come evitare blocchi personali;
* come distinguere completamento da validazione.

## 12. Autosalvataggio locale concettuale

Definire:

* quali dati possono essere salvati localmente;
* stato attività;
* bozze;
* note;
* checklist;
* evidenze;
* ultimo aggiornamento;
* documento collegato.

Chiarire:

* nessun cloud/sync/backend;
* nessun dato studente reale;
* nessun invio automatico;
* autosave non implementato in questa slice.

## 13. Relazione con UI futura

Definire come il modello alimenta:

* Home personale;
* mappa globale;
* lista attività;
* activity card;
* workspace;
* pannello documento destro;
* Wiki contestuale;
* output center;
* matrice revisione.

## 14. Confini espliciti

Questa slice non implementa:

* UI;
* persistence;
* localStorage;
* IndexedDB;
* autosave;
* backend;
* API;
* OAuth;
* cloud sync;
* DOCX/PDF programmatico;
* validazione automatica;
* dati personali/studenti reali.

## 15. Criteri di accettazione

Il contratto è valido se:

* traduce MGR-079 in entità e regole chiare;
* distingue attività, nodo mappa, documento, evidenza e riferimento;
* chiarisce stati e transizioni;
* include subentro;
* mantiene validazione umana;
* non introduce runtime;
* resta comprensibile per future slice UI.
