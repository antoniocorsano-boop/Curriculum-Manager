/**
 * Wiki/help catalog - documentation and user guidance for Curriculum Manager
 * Read-only help content, no external dependencies
 */

const WIKI_CATALOG = [
  {
    id: "introduzione",
    title: "Che cos'è il Manager Curricolo",
    category: "Informazioni generali",
    content: `
Il Manager Curricolo d'Istituto è uno strumento semplice e gratuito per aiutare le scuole nella gestione del loro curricolo. Funziona interamente nel tuo browser, senza bisogno di installazione, connessione internet o account.

### Cosa puoi fare
- Visualizzare e utilizzare modelli di documenti istituzionali
- Esportare documenti in vari formati (Stampa/PDF, Word .doc)
- Tenere traccia dello stato di avanzamento dei lavori
- Annotare osservazioni e decisioni durante il processo di revisione

### Come iniziare
1. Apri il file **APRI_MANAGER_CURRICOLO_ISTITUTO.html** nel tuo browser
2. Esplora le tre sezioni principali tramite il menu laterale: Materiali, Documenti, Revisione
3. Inizia dai **Materiali** per vedere i modelli disponibili
4. Passa a **Documenti** per lavorare sui documenti istituzionali
5. Usa **Revisione** per tenere traccia dei controlli e delle annotazioni

Tutti i tuoi dati (appunti, stato dei documenti) rimangono solo sul tuo computer. Nessun dato viene inviato a server esterni.
    `
  },
  {
    id: "documenti-istituzionali",
    title: "Documenti istituzionali: come leggere e compilare le bozze",
    category: "Guide pratiche",
    content: `
Nella sezione Documenti trovi i modelli ufficiali che la tua scuola utilizza per la pianificazione curricolare. Qui puoi lavorare sui documenti istituzionali richiesti dal tuo contesto.

### Come leggere un documento
- Ogni documento mostra il suo titolo, descrizione e stato corrente
- Gli stati indicano dove si trova il documento nel processo di approvazione
- Puoi visualizzare il contenuto completo facendo click sulla card del documento

### Come compilare una bozza
1. Seleziona un documento dalla lista
2. Clicca su "Apri" o sulla card per vedere il dettaglio
3. Nella vista dettaglio, troverai il contenuto del modello con placeholder da compilare
4. Sostituisci i placeholder tratteggiati [DA COMPILARE: ...] con le tue informazioni reali
5. Modifica il testo mantenendo la struttura richiesta dalle norme della tua scuola
6. Salva periodicamente il tuo lavoro usando il pulsante "Salva bozza"

### Stati dei documenti
- **Bozza**: documento modificabile, non ancora sottoposto a revisione
- **In revisione**: documento condiviso per feedback, ancora modificabile
- **Validato**: documento controllato e approvato dagli organi preposti
- **Approvato**: documento con approvazione finale, pronto per l'utilizzo ufficiale

Ricorda: ogni modifica richiede validazione umana secondo le procedure della tua istituzione prima di poter essere considerato definitivo.
    `
  },
  {
    id: "matrice-revisione",
    title: "Matrice revisione: come controllare completezza e coerenza",
    category: "Guide pratiche",
    content: `
La Matrice revisione è lo strumento per tenere traccia dei controlli effettuati sui documenti istituzionali e delle decisioni prese durante il processo di validazione.

### Come funziona la matrice
- Ogni riga rappresenta un documento istituzionali da revisionare
- Le colonne mostrano informazioni chiave: titolo, stato, priorità, prossima azione
- Puoi aggiungere osservazioni dettagliate su ogni documento usando l'apposito campo di testo

### Come annotare osservazioni
1. Trova il documento da revisionare nella lista
2. Clicca sul campo "Nota" o "Osservazione" associato al documento
3. Digita le tue osservazioni, suggerimenti o richieste di chiarimento
4. Clicca "Salva nota" per memorizzare il tuo intervento
5. Puoi modificare o cancellare le tue osservazioni in qualsiasi momento

### Link utili dalla matrice
- Clicca sul titolo del documento per aprire la vista dettaglio in sola lettura
- Usa il pulsante "Vai a Documenti" per tornare alla lista completa dei documenti istituzionali
- Usa il pulsante "Output Center" per esportare il lavoro completato

Tutte le annotazioni vengono salvate localmente sul tuo computer e non vengono inviate a servizi esterni.
    `
  },
  {
    id: "output-center",
    title: "Output Center: cosa fa e cosa non fa",
    category: "Funzionalità",
    content: `
L'Output Center è dove raccogli e prepari il lavoro completato per l'esportazione o la stampa.

### Cosa puoi fare nell'Output Center
- Visualizzare lo stato corrente di tutti i tuoi documenti istituzionali
- Preparare i documenti per l'esportazione in vari formati
- Stampare direttamente dal browser
- Generare backup locali del tuo lavoro
- Ripristinare bozze precedenti se necessario

### Come esportare un documento
1. Seleziona un documento dalla lista in Output Center
2. Verifica che lo stato sia adeguato per l'esportazione (solitamente "Validato" o "Approvato")
3. Clicca sul pulsante di esportazione corrispondente al formato desiderato
4. Salva il file generato sul tuo computer

### Formati di esportazione disponibili
- **Stampa/PDF**: usa la funzione di stampa standard del browser per creare un PDF
- **Word .doc**: crea un file compatibile con Microsoft Word per modifiche rapide

### Cosa NON fa l'Output Center
- Non invia automaticamente documenti a servizi esterni o cloud
- Non crea file DOCX nativi senza approvazione esplicita (gate dedicato richiesto)
- Non effettua sincronizzazione automatica con altri dispositivi o account
- Non altera il contenuto dei tuoi documenti durante l'esportazione

Tutti i processi di esportazione avvengono interamente nel tuo browser, senza invio di dati a server esterni.
    `
  },
  {
    id: "validazione-umana",
    title: "Validazione umana: criteri prima dell'uso ufficiale",
    category: "Concetti chiave",
    content: `
Prima che un documento istituzionale possa essere considerato definitivo e utilizzato ufficialmente, deve passare attraverso un processo di validazione umana secondo le procedure della tua scuola.

### Quando è richiesta la validazione
- Prima di condividere il documento con destinatari ufficiali
- Prima di pubblicare il documento sui canali istituzionali
- Prima di archiviare il documento per obblighi di conservazione
- Ogni volta che il documento subirà modifiche sostanziali dopo una precedente approvazione

### Cosa verificare durante la validazione
1. **Completezza**: tutte le sezioni richieste sono presenti e compilate
2. **Coerenza**: il contenuto è coerente con altri documenti istituzionali della scuola
3. **Conformità**: rispetta le norme, i regolamenti e il PTOF dell'istituto
4. **Chiarezza**: il linguaggio è accessibile a tutti i destinatari previsti
5. **Privacy**: non contiene dati personali sensibili inseriti per errore
6. **Autorità**: proviene dagli organi preposti alla sua redazione

### Come documentare la validazione
- Conserva traccia dell'approvazione (verbale, delibera, firma secondo le procedure interne)
- Nota la data di validazione e l'organo che ha effettuato il controllo
- Se richiesto, protocollo il documento secondo le procedure dell'istituto
- Aggiorna eventuali registri o inventari di documenti istituzionali

Il Manager Curricolo è uno strumento di supporto: la validazione ufficiale deve sempre avvenire secondo le procedure della tua istituzione scolastica, non tramite funzioni automatiche dell'applicazione.
    `
  },
  {
    id: "sicurezza-e-limiti",
    title: "Limiti e sicurezza: dati locali, nessun cloud",
    category: "Informazioni generali",
    content: `
Il Manager Curricolo è progettato per garantire la massima sicurezza e privacy dei tuoi dati istituzionali.

### Dove sono salvati i dati
- Tutti i tuoi dati (appunti, stato dei documenti, bozze) sono salvati esclusivamente nel tuo browser
- Utilizziamo il meccanismo di localStorage per persistere i dati tra le sessioni
- Nessun dato viene mai inviato a server esterni, servizi cloud o account di terze parti

### Cosa NON facciamo
- Nessuna comunicazione con API esterne o servizi web
- Nessun invio automatico di dati a indirizzi sconosciuti
- Nessuna creazione di account o profili su servizi esterni
- Nessun tracciamento o profilamento dell'utilizzo
- Nessun backup automatico su cloud o server remoti

### Limitazioni intenzionali
- Nessuna esportazione DOCX programmatica senza gate di approvazione dedicato
- Nessuna funzione di condivisione diretta via email o cloud
- Nessuna sincronizzazione automatica tra dispositivi
- Nessun accesso remoto ai tuoi dati da altri computer o utenti

### Come effettuare un backup manuale
1. Vai nell'Output Center
2. Cerca l'opzione "Esporta dati" o "Backup sessione"
3. Viene creato un file JSON che contiene tutti i tuoi appunti e lo stato corrente
4. Salva questo file sul tuo computer o su un supporto di tua scelta
5. Per ripristinare, usa l'opzione "Importa dati" o "Ripristina sessione" e seleziona il file JSON

Ricorda: se utilizzi computer condivisi o pubblici, considera di cancellare i dati locali al termine del lavoro per proteggere la privacy delle informazioni istituzionali.
    `
  }
];

// Make available globally for use in views
if (typeof window !== "undefined") {
  window.WIKI_CATALOG = WIKI_CATALOG;
}