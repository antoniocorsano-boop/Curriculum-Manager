# PROCESS_COMPLETION_UX_CONTRACT

## 1. Scopo del contratto

Curriculum Manager serve a **portare docenti e gruppi dal primo orientamento fino alla produzione di materiali di lavoro conclusi**. Non è un archivio, un catalogo o un gestionale. È un **percorso operativo guidato** che accompagna l'utente attraverso le fasi dell'aggiornamento curricolare.

## 2. Obiettivo finale del sistema

Il sistema deve permettere all'utente di:

| Requisito | Descrizione |
|-----------|-------------|
| Capire la fase del percorso | Visualizzare sempre la fase corrente del processo |
| Sapere cosa fare ora | Mostrare le azioni disponibili nella fase corrente |
| Consultare documenti pertinenti | Accedere ai documenti rilevanti per la fase |
| Leggere contenuto o struttura | Visualizzare struttura di lavoro o contenuto reale |
| Annotare osservazioni/proposte/criticità | Aggiungere note locali nel contesto revisonale |
| Preparare materiali per confronto o validazione | Generare output per discussione |
| Esportare, stampare o salvare il pacchetto di lavoro | Produrre artefatti locali (MD, JSON, stampa browser) |
| Distinguere lavoro locale, lavoro esportato e futuro lavoro condiviso | Stati chiari su dove si trova il lavoro |

## 3. Processo operativo minimo

### Fase 1: Orientamento e rilettura

| Elemento | Dettaglio |
|----------|----------|
| Scopo | Accedere al curricolo esistente e capire lo stato attuale |
| User need | "Devo capire da dove parto" |
| Azioni lecite | Consultare modelli sorgente, aprire documenti, leggere strutture |
| Documenti/materiali pertinenti | Curricolo verticale, curricolo ordine, curricolo disciplina |
| Azione umana | Lettura attiva, annotazione iniziale |
| Output | Osservazioni preliminari, stato iniziale documenti |
| Stato finale | **Orientamento completato**

### Fase 2: Quadro comune

| Elemento | Dettaglio |
|----------|----------|
| Scopo | Allineare riferimenti e comprendere gli obiettivi comuni |
| User need | "Devo capire gli obiettivi del percorso" |
| Azioni lecite | Leggere documenti di riferimento, consultare quadri sintetici |
| Documenti/materiali pertinenti | Quadro competenze/traguardi/obiettivi, quadro valutazione/rubriche |
| Azione umana | Condivisione riferimenti, verifica allineamento |
| Output | Documento di riferimento consultato, stato **Consultato** |
| Stato finale | **Quadro comune stabilito**

### Fase 3: Revisione nei gruppi

| Elemento | Dettaglio |
|----------|----------|
| Scopo | Revisione documentale con contributi di gruppo/dipartimento |
| User need | "Devo produrre revisioni mirate alla mia area di lavoro" |
| Azioni lecite | Aprire documento, leggere struttura, aggiungere note, segnare pronto |
| Documenti/materiali pertinenti | Tutti i documenti del catalogo |
| Azione umana | Annotazione, proposta, criticità, segnalazione pronto per confronto |
| Output | Note locali, stato **Annotato** o **Pronto per confronto** |
| Stato finale | **Revisione gruppo completata**

### Fase 4: Consolidamento

| Elemento | Dettaglio |
|----------|----------|
| Scopo | Raccogliere e sintetizzare le proposte emerse |
| User need | "Devo consolidare le decisioni prese in sede" |
| Azioni lecite | Consultare documenti con note, aggiornare stati, preparare output |
| Documenti/materiali pertinenti | Documenti revisionati, note locali |
| Azione umana | Consolidamento decisioni, aggiornamento stati |
| Output | Documenti marcati **Consolidato**, pacchetto di lavoro |
| Stato finale | **Consolidamento completato**

### Fase 5: Riallineamento

| Elemento | Dettaglio |
|----------|----------|
| Scopo | Allineare coloro che non hanno partecipato alle fasi precedenti |
| User need | "Devo aggiornare chi è arrivato dopo" |
| Azioni lecite | Consultare documenti consolidati, leggere note, segnare **Incluso nel pacchetto** |
| Documenti/materiali pertinenti | Tutti i documenti del percorso |
| Azione umana | Lettura allineamento, verifica comprensione |
| Output | Documenti marcati **Incluso nel pacchetto** |
| Stato finale | **Riallineamento completato**

### Fase 6: Output e chiusura

| Elemento | Dettaglio |
|----------|----------|
| Scopo | Preparare materiali finali per condivisione o archiviazione |
| User need | "Devo esportare o stampare il materiale completato" |
| Azioni lecite | Generare JSON, generare Markdown, stampare PDF browser |
| Documenti/materiali pertinenti | Pacchetto completo di lavoro |
| Azione umana | Esportazione, stampa, salvataggio locale |
| Output | File MD/JSON scaricati, PDF stampato |
| Stato finale | **Esportato/stampato**

## 4. Pattern visuale obbligatorio

Ogni vista deve mostrare:

| Elemento | Descrizione |
|----------|-------------|
| Dove sono | Fase corrente del percorso (es. "Fase 3: Revisione nei gruppi") |
| Cosa sto facendo | Azione specifica in corso (es. "Stai leggendo il curricolo disciplina") |
| Perché lo sto facendo | Scopo dell'attività nella fase corrente |
| Cosa posso fare adesso | Task list disponibili in questa fase |
| Cosa produrrò alla fine | Output atteso (es. "Note salvate, documento pronto per confronto") |

**Pattern richiesto**:
- Percorso guidato (fasi numerate)
- Fase corrente evidenziata
- Task list della fase
- Documenti pertinenti mostrati
- Area di lavoro umana (textarea per note)
- Output generato
- Stato finale indicato

## 5. Regole per la home

La home deve mostrare:

| Elemento consentito | Descrizione |
|---------------------|-------------|
| Titolo del percorso | "Curriculum Manager — Percorso di aggiornamento curricolare" |
| Fase corrente o consigliata | Evidenziata con badge o stato |
| Azione primaria | Pulsante principale ("Vai alla fase corrente") |
| Massimo tre azioni secondarie | Per accessi rapidi (es. "Materiali", "Documenti", "Revisione") |
| Stato sintetico | Riepilogo lavori in corso |
| Profilo di lavoro | Filtro se impostato (scuola, ordine, dipartimento) |
| Materiali in posizione secondaria | Link ai template, non come viste principali |

**La home NON deve essere**:
- Catalogo
- Scaffale documenti
- Pannello tecnico
- Elenco di template
- Dashboard con troppe card equivalenti

## 6. Regole per i documenti

Ogni documento visibile deve avere:

| Elemento obbligatorio | Descrizione |
|-----------------------|-------------|
| Ruolo nel percorso | Fase in cui è rilevante |
| Fase collegata | Riferimento esplicito |
| Contenuto o struttura leggibile | MD reale o "Struttura di lavoro da completare" |
| Punti da controllare | Check richiesti dal modello |
| Azione collegata | Cosa fare (leggere, annotare, segnare pronto) |
| Output collegato | Stato dopo l'azione |

**Se il contenuto reale non è disponibile**:
- Mostrare "Struttura di lavoro da completare"
- Non fingere contenuto ufficiale
- Non inventare contenuti normativi o istituzionali definitivi

## 7. Regole per la revisione

La revisione è il luogo principale dell'attività umana. Deve supportare:

| Funzionalità | Descrizione |
|--------------|-------------|
| Annotazione | Textarea per note locali |
| Osservazione | Campo per criticità rilevate |
| Proposta | Campo per possibili modifiche |
| Integrazione | Possibilità di aggiungere contenuto |
| Criticità | Segnalazione problemi |
| Pronto per confronto | Azione per marcare documento completo |
| Consolidamento | Azione per chiudere revisione |
| Output | Generazione stato/note esportabili |

## 8. Stati minimi del lavoro

Stati ammessi per ogni documento/attività:

| Stato | Descrizione |
|-------|-------------|
| Da avviare | Lavoro non ancora iniziato |
| In corso | Attività attiva |
| Annotato | Note aggiunte |
| Pronto per confronto | Revisione completata, in attesa di verifica |
| Consolidato | Decisioni prese in sede |
| Da rivedere | In attesa di ulteriore lavoro |
| Incluso nel pacchetto | Parte del materiale finale |
| Esportato o stampato | Output generato |

## 9. Profilo e instradamento

Il profilo futuro serve a filtrare attività e documenti:

| Campo | Descrizione |
|-------|-------------|
| Nome | Per riconoscimento (non account finché non esiste auth) |
| Cognome | Per riconoscimento |
| Scuola/plesso | Filtro su ambito di lavoro |
| Ordine/livello | Filtro su ordini scolastici |
| Disciplina/ambito | Filtro su aree disciplinari |
| Dipartimento/sezione/intersezione | Filtro su gruppi di lavoro |
| Ruolo di lavoro | Docente, Coordinatore, Gruppo curricolo, Staff |

**Nota**: Il profilo non è un account finché non esiste autenticazione reale. Serve a filtrare attività, documenti, fasi e futuro lavoro condiviso.

## 10. Presa in carico

Stati futuri per tracciare la presa in carico del lavoro:

| Stato | Descrizione |
|-------|-------------|
| Non assegnata | Nessun utente ha iniziato |
| Presa in carico da me | L'utente ha iniziato a lavorare |
| In lavorazione | Attività in corso |
| Pronta per confronto | Pronta per verifica |
| Completata | Lavoro terminato |
| Rilasciata | Disponibile per altri |
| Da rivedere | In attesa di modifiche |

**Vincolo**: Un altro utente può completare il lavoro solo se appartiene allo stesso perimetro operativo:
- Stessa scuola/plesso
- Stesso ordine/livello
- Stesso dipartimento/sezione/intersezione
- Stessa disciplina/ambito
- Stessa fase del percorso

## 11. Sincronizzazione futura

La sincronizzazione remota è futura e deve distinguere:

| Stato | Descrizione |
|-------|-------------|
| Lavoro locale | Presente solo sul dispositivo |
| Lavoro condiviso | Presente nella cartella condivisa |
| Lavoro non ancora caricato | Locale ma non sincronizzato |
| Lavoro aggiornato dalla cartella condivisa | Modifiche remote rilevate |
| Conflitto | Divergenza tra locale e remoto |
| Permesso mancante | Accesso negato |
| Upload completato | Sincronizzato con successo |

**Vietato**: sincronizzazione invisibile.

## 12. Strategia Drive/cartella Curriculum

| Versione | Strategia |
|----------|-----------|
| V1 (attuale) | Export, stampa, copia dati, pacchetto locale |
| V2 (futura) | OAuth, cartella condivisa Curriculum, manifest condiviso, upload consapevole, conflitti |

**Vincoli V1**:
- Nessun OAuth
- file:// non è target definitivo per OAuth
- Solo export MD/JSON e stampa browser

## 13. Criteri di accettazione UX

Una schermata è valida solo se l'utente capisce:

| Elemento | Domanda risposta |
|----------|-----------------|
| Dove si trova | "In quale fase sono?" |
| Perché è lì | "Perché questa vista è importante?" |
| Cosa può fare | "Quali azioni sono disponibili?" |
| Cosa produrrà | "Cosa otterrò al termine?" |
| Come tornare | "Come ritorno al percorso?" |

## 14. Criteri di accettazione del processo completo

Il processo è completo quando l'utente può:

1. Aprire l'app
2. Capire la fase
3. Vedere il proprio percorso
4. Consultare documenti pertinenti
5. Leggere contenuto o struttura
6. Annotare osservazioni o proposte
7. Marcare attività pronta per confronto
8. Consolidare o preparare output
9. Esportare o stampare materiale
10. Sapere se il lavoro è locale, esportato o predisposto per condivisione futura

## 15. Sequenza implementativa vincolata

Dopo il contratto, le implementazioni devono seguire questo ordine:

1. `USER_PROFILE_ONBOARDING_CONFIG`
2. `WORK_SCOPE_ROUTING`
3. `DOCUMENT_CONTENT_COVERAGE_AND_READING_VIEW`
4. `WORK_ITEM_STATE_AND_OWNERSHIP_LOCAL`
5. `OUTPUT_CENTER_AND_COMPLETION_STATUS`
6. `LOCAL_PACKAGE_IMPORT_EXPORT`
7. `SHARED_WORKSPACE_SYNC_MODEL_CONTRACT`
8. `DRIVE_OR_REMOTE_SYNC_GATE`
9. `DRIVE_UPLOAD_PILOT`
10. `COLLABORATIVE_RELEASE_CANDIDATE`

## 16. Vincoli permanenti

| Vincolo | Motivazione |
|--------|-------------|
| No backend senza contratto dedicato | MGR-019 precedentemente chiuso |
| No OAuth senza contratto dedicato | MGR-048 precedentemente chiuso |
| No DOCX programmatico senza gate dedicato | MGR-048 precedentemente chiuso |
| No dati studenti | Privacy e compliance |
| No contenuti ufficiali inventati | Solo template/read-only con "NON UFFICIALE" |
| No automatismi normativi non verificati | Responsabilità professionale |
| No sincronizzazione silenziosa | Trasparenza operativa |
| No funzioni collaborative finte | UX onesta e chiara |
| No vista senza user need | Ogni vista ha uno scopo operativo |
| No azione senza output | Ogni azione produce un risultato |
| No output senza stato | Ogni output ha uno stato finale |

---

**MARKER**: `PROCESS_COMPLETION_UX_CONTRACT`