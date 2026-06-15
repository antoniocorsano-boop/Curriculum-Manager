# USER-WORKFLOW-COMPLETION-MAP-SPEC

## 1. Scopo

Definire il modello utente del Curriculum Manager.

La UI non deve presentare un catalogo tecnico di funzioni, ma un percorso operativo comprensibile per portare a consolidamento il Curriculum di Istituto.

Il sistema deve aiutare l’utente a capire:

* dove si trova nel processo;
* perché una attività serve;
* cosa deve produrre;
* quali riferimenti/documenti core sono collegati;
* quali evidenze vengono prodotte;
* cosa manca;
* cosa è pronto per validazione;
* chi può subentrare in attività non completate.

Il sistema non deve dichiarare conformità automatica né validazione istituzionale automatica.

## 2. Utenti e ruoli

Profilo/ruoli concettuali:

* docente;
* docente di disciplina;
* referente/coordinatore curricolo;
* dipartimento/interclasse/intersezione;
* dirigente o funzione di validazione, come visibilità/controllo e non come validazione automatica nell’app.

Per ogni ruolo indicare:

* cosa deve vedere;
* quali attività sono pertinenti;
* cosa può prendere in carico;
* cosa può revisionare;
* cosa può vedere nella mappa globale.

## 3. Profilo e visibilità

Dopo configurazione del profilo (MGR-078), l’utente deve vedere:

* attività pertinenti al suo ruolo/ordine/disciplina/classi/ambito;
* documenti collegati al suo contesto;
* riferimenti normativi/documentali pertinenti;
* stato della mappa globale.

La configurazione profilo filtra le attività, ma non nasconde la mappa globale del Curriculum di Istituto.

Tutti gli utenti autorizzati devono poter vedere:

* cosa è stato fatto;
* cosa è in corso;
* cosa manca;
* cosa è da revisionare;
* cosa è pronto per validazione.

## 4. Mappa visuale di completamento

Definire una mappa visibile a tutti che rappresenti la costruzione progressiva del Curriculum di Istituto.

La mappa deve seguire una logica ordinata e leggibile simile a una wiki, ma non deve essere una guida testuale: deve rappresentare livelli di completamento del documento finale.

Struttura minima suggerita:

* fondazione normativa e documentale;
* struttura del curricolo;
* discipline;
* verticalità/classi/anni;
* valutazione;
* inclusione e personalizzazione, senza dati personali;
* revisione e coerenza;
* output e validazione finale.

Per ogni nodo indicare:

* stato;
* attività collegate;
* documento collegato;
* evidenze disponibili;
* parti mancanti;
* validazione richiesta.

## 5. Stati delle attività

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

Chiarire che:

* “presa in carico” non significa proprietà esclusiva;
* una attività non completata resta visibile;
* chi ha evidenza/visibilità adeguata può subentrare e completare;
* il subentro non cancella il lavoro precedente;
* resta visibile cosa è stato fatto e cosa manca.

## 6. Activity card

Ogni attività deve mostrare almeno:

* titolo;
* perché serve;
* profilo/ruolo per cui è pertinente;
* documento collegato;
* riferimento normativo/documentale collegato;
* evidenza prodotta;
* rischio se saltata;
* stato;
* ultimo aggiornamento;
* CTA primaria:

  * `Acquisisci attività`
  * oppure `Continua attività`
  * oppure `Subentra e completa`
* CTA secondaria:

  * `Vedi riferimenti`
  * oppure `Apri guida`.

Non usare CTA generiche come “Apri” senza contesto.

## 7. Presa in carico e subentro

Definire:

* cosa accade quando un utente acquisisce un’attività;
* quando un’attività può diventare “disponibile per subentro”;
* cosa vede chi subentra;
* come viene preservata l’evidenza del lavoro precedente;
* come evitare il blocco esclusivo;
* come distinguere completamento operativo da validazione.

Regola centrale:
la presa in carico è una responsabilità operativa temporanea, non una proprietà esclusiva dell’attività.

## 8. Workspace operativo

Definire layout concettuale:

* sinistra: contesto, percorso, mappa o breadcrumb;
* centro: attività, istruzioni, checklist, note, campi da compilare;
* destra: documento collegato in tab/pannello leggibile.

Il pannello destro deve mostrare:

* documento collegato;
* sezioni compilate/mancanti;
* stato bozza;
* anteprima leggibile;
* stato di revisione/validazione.

## 9. Autosalvataggio locale

Definire solo concettualmente:

* il lavoro viene salvato localmente;
* nessun cloud/sync/backend;
* stato e bozza devono rassicurare l’utente;
* mostrare “salvato localmente” o stato equivalente;
* non richiedere dati personali non necessari;
* nessun dato studente reale.

Non implementare autosave in questa slice.

## 10. Evidenze, riferimenti e validazione

Per ogni attività deve essere chiaro:

* perché serve;
* quale riferimento/documento core richiama;
* quale evidenza produce;
* quale controllo permette;
* quale validazione umana rimane necessaria.

Ribadire:

* l’app aiuta a organizzare e verificare;
* non certifica automaticamente;
* la validazione resta umana, collegiale o istituzionale.

## 11. Relazione con la Wiki

La Wiki (MGR-074) deve essere supporto contestuale, non luogo principale di lavoro.

La UI futura deve poter collegare una attività a:

* articolo Wiki pertinente;
* riferimento documento/core;
* guida breve.

L’utente non deve essere costretto a leggere la Wiki per capire cosa fare.

## 12. Cosa togliere dalla UI futura

Indicare principi di riduzione:

* meno termini tecnici;
* meno card descrittive lunghe;
* meno duplicazioni;
* massimo una CTA primaria per contesto;
* evitare cataloghi se l’utente deve vedere un percorso;
* spostare spiegazioni lunghe nella Wiki;
* mostrare sempre contesto, stato, documento e prossimo passo.

## 13. Casi d’uso minimi

Casi d’uso minimi:

1. Configurare profilo e contesto.
2. Vedere la mappa globale di completamento.
3. Vedere le proprie attività pertinenti.
4. Acquisire una attività.
5. Continuare una attività già iniziata.
6. Subentrare in una attività non completata.
7. Compilare/adattare una sezione documento.
8. Vedere documento collegato nel pannello destro.
9. Consultare riferimenti e Wiki contestuale.
10. Segnare una attività come completata.
11. Mandare a revisione/validazione.
12. Preparare output finale.
13. Vedere cosa manca al consolidamento del Curriculum di Istituto.

## 14. Micro-roadmap proposta

Slice future proposte:

* MGR-080: activity/domain model contract;
* MGR-081: completion map data contract;
* MGR-082: profile-filtered activity list UI;
* MGR-083: activity workspace layout;
* MGR-084: right document panel contract/UI;
* MGR-085: local autosave activity state;
* MGR-086: handover/subentro activity state;
* MGR-087: contextual Wiki references;
* MGR-088: completion evidence/status layer.

## 15. Criteri di accettazione

La UI futura sarà accettabile solo se:

* l’utente capisce entro pochi secondi cosa fare;
* vede sempre perché l’attività serve;
* vede il documento collegato;
* vede il proprio contesto;
* vede cosa manca;
* può acquisire o completare attività pertinenti;
* può subentrare se l’attività è incompleta;
* la mappa globale resta visibile;
* la validazione umana resta chiara;
* non ci sono promesse di conformità automatica;
* non ci sono informazioni tecniche ridondanti.
