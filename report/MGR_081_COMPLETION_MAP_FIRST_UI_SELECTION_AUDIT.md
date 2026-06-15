# MGR-081_COMPLETION_MAP_FIRST_UI_SELECTION_AUDIT

## 1. Opzioni UI valutate

### Opzione A — Mappa globale read-only

Superficie: mostrare lo stato del Curriculum di Istituto senza interazioni complesse.

Criteri:

| Criterio | Valutazione |
|---|---|
| Valore per l’utente | Alto: tutti vedono come procede il lavoro |
| Chiarezza workflow | Alta: percorso “vedo lo stato → capisco cosa fare” |
| Rischio confusione | Basso: nessuna CTA ambigua, nessun salvataggio |
| Rischio tecnico | Basso: read-only, dati statici/demo o derivati da contratti |
| Dipendenze contratti | MGR-080 (CompletionMapNode, stati, aree) |
| Dipendenze runtime | Minime: solo rendering statico |
| Coerenza MGR-079 | Alta: mappa globale come contesto per tutti |
| Coerenza MGR-080 | Alta: usa entità CompletionMapNode, Activity, Evidence |
| Read-only possibile | Sì, senza autosave/subentro/profilo |
| Rischio falsa validazione | Basso: messaggio esplicito “validazione umana” |
| Impatto su Home/sidebar/Wiki | Basso: nuova vista separata o sezione Home |

### Opzione B — Lista attività filtrate dal profilo

| Criterio | Valutazione |
|---|---|
| Valore per l’utente | Medio-alto: utile ma dipende da profilo configurato |
| Chiarezza workflow | Media: richiede onboarding prima di essere utile |
| Rischio confusione | Medio: utente senza profilo vede poco/niente |
| Rischio tecnico | Medio: filtro, stato attività, assegnazione |
| Dipendenze contratti | MGR-078 (profilo), MGR-080 (Activity) |
| Dipendenze runtime | Medie: persistenza, filtro, list rendering |
| Coerenza MGR-079 | Alta: profilo → attività pertinenti |
| Coerenza MGR-080 | Alta: usa Activity, ActivityAssignment |
| Read-only possibile | Parziale: serve profilo minimo |
| Rischio falsa validazione | Medio: potrebbe sembrare “to-do list” senza contesto globale |
| Impatto su Home/sidebar/Wiki | Medio: modifica Home personale |

### Opzione C — Workspace attività

| Criterio | Valutazione |
|---|---|
| Valore per l’utente | Alto: massima utilità operativa |
| Chiarezza workflow | Bassa se implementato per primo: troppo complesso |
| Rischio confusione | Alto: CTA multiple, autosave, documento laterale |
| Rischio tecnico | Alto: stato attività, linked document, note, checklist |
| Dipendenze contratti | MGR-078, MGR-080, MGR-085 (autosave) |
| Dipendenze runtime | Molte: workspace, pannello destro, persistenza |
| Coerenza MGR-079 | Alta: workspace centrale del flusso |
| Coerenza MGR-080 | Alta: usa tutte le entità |
| Read-only possibile | No: interazioni obbligatorie |
| Rischio falsa validazione | Alto: potrebbe sembrare “form di completamento” |
| Impatto su Home/sidebar/Wiki | Alto: modifica layout principale |

### Opzione D — Pannello documento destro

| Criterio | Valutazione |
|---|---|
| Valore per l’utente | Medio: importante ma dipende da attività o nodo selezionato |
| Chiarezza workflow | Bassa se isolato: “documento senza contesto” |
| Rischio confusione | Medio: utente non capisce da dove si apre |
| Rischio tecnico | Medio: rendering documento, sezioni, anteprima |
| Dipendenze contratti | MGR-080 (LinkedDocument, Evidence) |
| Dipendenze runtime | Medie: pannello destro, sync con attività/nodo |
| Coerenza MGR-079 | Media: supporta ma non guida il flusso |
| Coerenza MGR-080 | Alta: usa LinkedDocument |
| Read-only possibile | Sì, ma dipende da selezione contestuale |
| Rischio falsa validazione | Basso: documento in lettura |
| Impatto su Home/sidebar/Wiki | Medio: richiede layout workspace |

## 2. Tabella riassuntiva opzioni

| Opzione | Rischio | Valore | Prontezza | dipendenze | Raccomandazione |
|---|---|---|---|---|---|
| A — Mappa read-only | Basso | Alto | Alta | MGR-080 | ✅ **RACCOMANDATA** |
| B — Lista attività | Medio | Medio-alto | Media | MGR-078 + MGR-080 | Dipende da profilo |
| C — Workspace | Alto | Alto | Bassa | Molte | No come primo incremento |
| D — Pannello documento | Medio | Medio | Media | MGR-080 | No come primo incremento |

## 3. Raccomandazione

**Opzione A — Mappa globale read-only**

Motivazione:

- basso rischio: nessuna interazione pericolosa, nessun salvataggio, nessun autosave;
- massimo aumento della comprensione: tutti vedono lo stato del Curriculum di Istituto;
- nessun bisogno di autosave o profilo reale: funziona con dati statici/demo o derivati da contratti;
- nessun subentro operativo ancora: solo visualizzazione;
- coerenza con MGR-079: la mappa è il contesto globale per tutti;
- coerenza con MGR-080: usa direttamente CompletionMapNode, Activity, Evidence;
- rispetta il vincolo “tutti devono poter vedere come procede il lavoro”.

Rischi residui:

- se la mappa è troppo astratta, l’utente potrebbe non capirla → mitigare con etichette chiare e leggenda;
- se mostra troppi dati, rischia confusione → mitigare con gerarchia e raggruppamento aree;
- se sembra “conclusiva”, l’utente potrebbe pensare che il curriculum sia finito → mitigare con messaggio esplicito “lavoro in corso, validazione umana richiesta”.

Dipendenze:

- MGR-080 (contratto dominio) — completato;
- MGR-079 (specifica workflow) — completato;
- nessun altro contratto o runtime richiesto come prerequisito.

## 4. Confini MGR-082 (proposta)

La futura MGR-082 deve:

- mostrare una mappa/stato globale del Curriculum di Istituto;
- essere read-only;
- non permettere acquisizione attività;
- non implementare autosave;
- non implementare subentro;
- non implementare profilo reale oltre a filtraggio opzionale;
- non implementare validazione automatica;
- non generare documenti;
- non chiamare backend/API/cloud;
- non dichiarare conformità automatica.

Deve invece mostrare:

- aree principali del curriculum (normativa, struttura, discipline, verticalità, valutazione, inclusione, revisione, output);
- stato di completamento per ogni area/nodo;
- cosa manca;
- cosa è da revisionare;
- cosa è pronto per validazione;
- collegamento concettuale a documenti/evidenze (senza aprire pannello laterale ancora);
- messaggio chiaro: “la validazione resta umana/collegiale”.

## 5. Superfici candidate per mount UI

| Mount point | Visibilità | Rischio duplicazione | Chiarezza | Impatto sidebar | Raccomandazione |
|---|---|---|---|---|---|
| Home | Alta | Basso | Alta | Basso | ✅ Preferito |
| Nuova voce sidebar “Mappa” | Alta | Medio | Alta | Medio | Accettabile |
| Integrazione in Documenti | Bassa | Alto | Bassa | Basso | No |
| Integrazione in Wiki | Bassa | Alto | Bassa | Basso | No |
| Dashboard iniziale | Media | Medio | Media | Basso | Valutare in MGR-082 |

Raccomandazione mount point:

- **Home come mount point primario**: la mappa è il contesto iniziale per tutti;
- **Sidebar “Mappa” come accesso diretto**: permette di raggiungere la mappa senza passare dalla Home;
- definire il mount point esatto in MGR-082 come contract UI prima di implementazione.

## 6. Proposta MGR-082

Titolo: **MGR-082 — COMPLETION_MAP_READONLY_UI**

Obiettivo: implementare la prima superficie UI read-only della mappa globale di completamento del Curriculum di Istituto.

File attesi:

- `src/views/completionMapView.js` (read-only, dati statici/demo o derivati da MGR-080)
- `docs/02_system/COMPLETION-MAP-READONLY-UI-CONTRACT.md` (contract UI)
- `docs/03_execution/MGR-082.md`
- `report/CONTROLLO_MGR082_COMPLETION_MAP_READONLY_UI.txt`
- `REPO-MOVELOG.md`

Criteri di accettazione MGR-082:

- la mappa mostra tutte le aree principali del curriculum;
- ogni area ha un stato visibile (non avviato, parziale, in lavorazione, incompleto, da revisionare, pronto per validazione, validato fuori dall’app);
- l’utente capisce entro pochi secondi dove si trova il lavoro;
- non ci sono CTA per acquisire attività;
- non c’è autosave;
- non c’è profilo reale obbligatorio;
- non c’è documento laterale (solo collegamento concettuale);
- messaggio esplicito: “validazione umana/collegiale richiesta”;
- nessun dato personale/studente;
- nessun backend/API/cloud/cloud sync/DOCX/PDF programmatico.

## 7. Criteri di accettazione MGR-081

- tabella opzioni A/B/C/D completa;
- raccomandazione motivata;
- confini MGR-082 definiti;
- mount point raccomandato;
- proposta MGR-082 con file e criteri;
- nessuna modifica runtime;
- nessuna contaminazione `e86064b`.
