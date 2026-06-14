# DOCUMENT_OUTPUT_CENTER_CONTRACT

## 0. Scopo del contratto

Definire il **Document Output Center** come area di controllo dei documenti prodotti da Curriculum Manager, senza introdurre export reale, backend, Drive, OAuth, DOCX, PDF programmatico o sincronizzazione remota.

Il centro output è un **pannello di stato e orientamento** sui documenti già iniziati o prodotti localmente. Non è un gestionale documentale, non è un archivio ufficiale e non certifica approvazione istituzionale.

## 1. Principio operativo

Il Document Output Center risponde a queste domande:

| Domanda utente | Risposta attesa |
|----------------|-----------------|
| Quali documenti ho iniziato? | Documenti aperti o con bozza locale |
| Quali bozze sono modificate ma non salvate? | Bozza con contenuto locale non salvato |
| Quali bozze sono salvate su questo dispositivo? | Bozza salvata in `localStorage` |
| Quali documenti sono pronti per stampa? | Bozza salvata e stampabile localmente |
| Quali documenti richiedono revisione? | Documenti marcati esplicitamente “Da rivedere” |
| Quali documenti ho completato manualmente? | Documenti marcati manualmente come completati |

## 2. Perimetro ammesso

### Ammesso

- Controllare lo stato locale dei documenti.
- Aprire documenti esistenti.
- Continuare una bozza locale.
- Stampare una bozza tramite `window.print()`.
- Reset singolo documento.
- Marcare un documento “Da rivedere”.
- Marcare un documento “Completato manualmente”.
- Usare solo `localStorage` per stato e bozze.
- Mostrare riepiloghi Home o pannello “Output documenti” purché derivino da dati locali.

### Vietato per ora

- Export DOCX.
- Export PDF programmatico.
- Google Drive.
- OAuth.
- Backend/API.
- Sincronizzazione remota.
- Invio automatico.
- Firma digitale.
- Protocollazione.
- Qualunque automazione che finga approvazione, rilascio o consegna istituzionale.

## 3. Stati documento

Gli stati sono stati di **output locale**. Non rappresentano validazione, approvazione, pubblicazione o protocollazione.

| Stato | Chiave | Quando si applica | Cosa vede l'utente |
|-------|--------|-------------------|--------------------|
| Bozza non modificata | `draft_unmodified` | Documento aperto senza contenuto locale modificato o dopo reset | “Puoi iniziare a compilare la bozza” |
| Bozza modificata localmente | `draft_modified_local` | Esiste contenuto locale non salvato o modificato dopo ultimo salvataggio | “Modifiche non salvate su questo dispositivo” |
| Salvato su questo dispositivo | `saved_local` | Bozza salvata in `localStorage` con timestamp locale | “Salvato su questo dispositivo: data/ora” |
| Pronto per stampa | `ready_for_print` | Bozza salvata localmente e non marcata “Da rivedere” | “Pronto per stampa locale” |
| Da rivedere | `needs_review` | Utente marca esplicitamente il documento come da rivedere | “Richiede revisione” |
| Completato manualmente | `completed_manually` | Utente marca manualmente il documento come completato | “Completato manualmente” |

### Regole di stato

1. Lo stato deve essere derivabile da dati locali o da flag locali espliciti.
2. `ready_for_print` non deve essere confuso con “approvato”.
3. `completed_manually` non deve essere confuso con “documento istituzionale approvato”.
4. `needs_review` deve avere precedenza visiva su `ready_for_print`.
5. `completed_manually` deve avere precedenza visiva su `needs_review` solo se l'utente lo imposta dopo la revisione.
6. Lo stato di output deve restare separato dal contenuto testuale della bozza quando opportuno.
7. Il reset singolo documento deve cancellare solo i dati locali del documento interessato.

## 4. Azioni consentite

| Azione | Superficie | Effetto ammesso | Effetto vietato |
|--------|------------|-----------------|-----------------|
| Apri documento | Vista Documenti / Output documenti | Apre il documento o la sua scheda | Non avvia export, sync o invio |
| Continua bozza | Vista Documenti / Output documenti | Carica bozza locale in modifica | Non crea copie remote |
| Stampa bozza | Vista Documenti / Output documenti | Esegue `window.print()` | Non genera PDF/DOCX programmatici |
| Reset singolo documento | Vista Documenti / Output documenti | Rimuove bozza/stato locali del documento | Non resetta l'intera app |
| Segna da rivedere | Vista Documenti / Output documenti | Scrive flag locale `needsReview` | Non invia notifiche o task |
| Segna completato manualmente | Vista Documenti / Output documenti | Scrive flag locale `completedManually` | Non certifica approvazione |

## 5. Superfici coinvolte

### Vista Documenti

Obbligatorio:

- Mostrare lo stato output dei documenti già iniziati.
- Distinguere bozza non modificata, modificata, salvata, pronta per stampa, da rivedere e completata manualmente.
- Consentire apertura, continuazione bozza, stampa bozza e reset singolo.
- Consentire marcatura manuale “Da rivedere” e “Completato manualmente”.

### Eventuale riepilogo Home

Consentito:

- Mostrare conteggi locali aggregati:
  - documenti iniziati;
  - bozze salvate;
  - pronti per stampa;
  - da rivedere;
  - completati manualmente.
- Mostrare una frase di contesto: “Stati locali, non approvazione istituzionale”.

Vietato:

- Trasformare la Home in archivio documenti.
- Mostrare documenti come ufficiali o approvati.

### Eventuale pannello “Output documenti”

Consentito:

- Pannello di controllo locale.
- Filtri per stato.
- Azioni per documento.
- Avvisi di confine: “Output locale, nessuna sincronizzazione”.

Vietato:

- Upload.
- Download DOCX/PDF programmatico.
- Login.
- Connessione a servizi esterni.

## 6. Persistenza

### Chiavi locali

Schema consigliato:

```json
{
  "documentId": "document-id",
  "outputState": "saved_local",
  "needsReview": false,
  "completedManually": false,
  "lastOpenedAt": "ISO timestamp",
  "lastSavedAt": "ISO timestamp",
  "lastMarkedForReviewAt": "ISO timestamp",
  "lastMarkedCompletedAt": "ISO timestamp"
}
```

### Regole

- Usare solo `localStorage`.
- Nessun dato reale obbligatorio.
- Nessuna persistenza remota.
- Stato output separato dal contenuto bozza quando opportuno.
- Contenuto bozza può restare in chiave dedicata per documento.
- Reset singolo documento deve rimuovere solo stato e bozza locali del documento.
- Timestamp locali non devono essere usati come prova di avvenuta consegna o approvazione.

## 7. UX attesa

L'utente deve capire subito:

| Bisogno | Indicatore richiesto |
|---------|----------------------|
| Quali documenti ho iniziato? | Badge “Iniziato” o stato locale presente |
| Quali sono pronti per stampa? | Badge “Pronto per stampa” |
| Quali richiedono revisione? | Badge “Da rivedere” |
| Quali sono stati completati manualmente? | Badge “Completato manualmente” |
| Quali stati sono solo locali? | Avviso “Solo su questo dispositivo” |
| Quali stati non sono approvazione? | Avviso “Non è documento approvato” |

### Microcopy obbligatorio

- “Salvato su questo dispositivo”
- “Pronto per stampa locale”
- “Completato manualmente dall'utente”
- “Non equivale ad approvazione istituzionale”
- “Nessuna sincronizzazione remota”

## 8. Confini istituzionali

Il Document Output Center deve evitare ogni ambiguità su validità legale o amministrativa.

### Non dichiarare mai

- Documento approvato.
- Documento ufficiale.
- Documento protocollato.
- Documento firmato.
- Documento inviato.
- Documento condiviso.
- Documento pubblicato.
- Documento sincronizzato.

### Dichiarare sempre quando necessario

- Il documento è una bozza di lavoro.
- Lo stato è locale.
- Il completamento è manuale.
- La revisione umana resta necessaria.
- La stampa avviene tramite browser.

## 9. Criteri di accettazione

Il contratto è rispettato quando:

- Gli stati documento sono limitati ai sei stati definiti.
- Le azioni vietate non compaiono nel perimetro V1.
- La vista Documenti può mostrare stato e azioni senza backend.
- Un eventuale riepilogo Home usa solo dati locali.
- Un eventuale pannello “Output documenti” non introduce export, Drive, OAuth o sync.
- La persistenza usa solo `localStorage`.
- Il completamento manuale è esplicitamente distinto dall'approvazione istituzionale.

## 10. Marker

**MARKER**: `DOCUMENT_OUTPUT_CENTER_CONTRACT_READY`

**MARKER**: `NO_REAL_EXPORT_IN_OUTPUT_CENTER`

**MARKER**: `OUTPUT_CENTER_IS_LOCAL_STATUS_ONLY`

**MARKER**: `COMPLETED_MANUALLY_IS_NOT_APPROVAL`

**MARKER**: `NO_REMOTE_SYNC_IN_OUTPUT_CENTER`
