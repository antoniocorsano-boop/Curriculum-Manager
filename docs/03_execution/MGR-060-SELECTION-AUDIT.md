# MGR-060 — USER_PROFILE_ONBOARDING_CONFIG_SELECTION_AUDIT

## Audit scope
Analisi del profilo di lavoro e onboarding per MGR-060 (implementazione successiva a MGR-059). Modalità audit-only, nessuna modifica al codice.

## Stato attuale del profilo

### Campi implementati (modelliSorgenteView.js:9-17)

| Campo | ID | Obbligatorio | Usato per |
|-------|-----|-------------|-----------|
| Nome | firstName | No | Visualizzazione nome completo |
| Cognome | lastName | No | Visualizzazione nome completo |
| Scuola/plesso | school | No | Contesto istituzionale |
| Ordine/livello | orderLevel | No | Filtro documenti |
| Disciplina/ambito | discipline | No | Filtro documenti |
| Dipartimento/sezione/intersezione | department | No | Filtro documenti |
| Ruolo di lavoro | role | No | Routing percorso |

### Storage (modelliSorgenteView.js:6,438-448)

- `localStorage.cmWorkProfile` - JSON con tutti i campi
- `localStorage.cmWorkProfileConfigSeen` - Flag se il form è stato mostrato
- `localStorage.cmRolePath` - Ruolo selezionato separatamente
- `localStorage.cmOnboardingSeen` - Flag onboarding mostrato

### Attualmente salvato

```json
{
  "firstName": "...",
  "lastName": "...",
  "school": "...",
  "orderLevel": "...",
  "discipline": "...",
  "department": "...",
  "role": "..."
}
```

## Risposte alle domande

### 1. Quali campi del profilo servono davvero per instradare l'utente?

**Campo critico**: `role` - determina il percorso di lavoro (Docente, Coordinatore, Gruppo curricolo, Staff)

**Campi contestuali**: `school`, `orderLevel`, `discipline`, `department` - filtrano i documenti e mostrano contesto

**Campi descrittivi**: `firstName`, `lastName` - solo visualizzazione, nessun routing

### 2. Quali campi sono obbligatori e quali opzionali?

**Obbligatori per funzionalità base**: NESSUNO

**Obbligatori per UX consigliata**: Solo `role` (per instradamento automatico)

**Opzionali**: `firstName`, `lastName`, `school`, `orderLevel`, `discipline`, `department`

### 3. Dove viene salvato il profilo locale?

- `localStorage` con chiave `cmWorkProfile`
- Nessun server, nessun web request
- Persiste finché non si pulisce la cache del browser

### 4. Come si modifica?

- Pulsante "Modifica profilo" nella card "Il tuo profilo di lavoro"
- Riapre il form di configurazione
- Salva sovrascrivendo il localStorage

### 5. Come si cancella/resetta?

- **Manca meccanismo esplicito** - attualmente solo "Salta per ora" che nasconde il form
- Nessun pulsante "Reset profilo"
- Solo cancellazione manuale di localStorage

### 6. Come evitare di presentarlo come account o login?

**Già fatto**:
- Testo: "Il profilo resta solo in questo browser: niente login, niente invio dati"
- Pulsante "Salta per ora" disponibile
- Nessun campo password/email
- Nessun auth flow

### 7. Come mostrare chiaramente che i dati restano locali?

**Già fatto**:
- Privacy notice nella card: "Resta locale: non viene inviato a server esterni"
- Pulsante "Salta per ora"
- Nessun invio dati confermato

**Da migliorare**:
- Aggiungere icona/località indicator più visibile
- Spiegazione "solo nel tuo browser" più esplicita

### 8. Quale vista deve usare il profilo per suggerire il percorso?

**Vista principale**: `modelliSorgenteView` (home)
- Mostra "Fase consigliata" basata su PROCESS_TIMELINE_CATALOG
- Mostra "Il tuo profilo di lavoro" con ruolo
- Mostra "Prossime azioni" contestuali

### 9. Quali file saranno toccati nella successiva implementazione?

| File | Tipo | Modifica prevista |
|------|------|------------------|
| src/views/modelliSorgenteView.js | Esistente | Aggiornamento funzioni profilo |
| src/app.js | Esistente | Nessuna modifica necessaria |
| src/data/roleWorkPathsCatalog.js | Esistente | Nessuna modifica necessaria |

**Nuovi file potenziali** (solo se necessario):
- Nessun nuovo file necessario per MGR-060

### 10. Rischi privacy/copy/UX da evitare

| Rischio | Stato | Mitigazione |
|---------|-------|-------------|
| Confondere con account | BASSO | ✓ Testo esplicito "niente login" |
| Salvataggio dati sensibili | BASSO | ✓ Nessun invio dati |
| Pulizia localStorage → perdita lavoro | MEDIO | Aggiungere export/import profilo |
| Manca reset esplicito | MEDIO | Aggiungere pulsante reset |
| Nome istituto → dati reali | BASSO | ✓ Nessun dato studente mai chiesto |
| Ruolo sbagliato → percorso errato | BASSO | ✓ Modifica sempre disponibile |

## Selezione del perimetro implementativo

### Campi MINIMI da mantenere

1. **role** - Obbligatorio per instradamento
2. **discipline** - Contesto documenti
3. **school** - Contesto istituzionale (facoltativo ma consigliato)

### Campi da segnalare come OPZIONALI

1. **firstName/lastName** - Solo visualizzazione
2. **orderLevel** - Mostrato in home, poco filtraggio
3. **department** - Mostrato in home, poco filtraggio

## Raccomandazioni per MGR-061

### Cosa NON toccare (vincoli)

- Nessun nuovo campo obbligatorio
- Nessun richiamo a server
- Nessun OAuth o auth flow
- Nessun invio dati
- Nessuna chiave API o secrets

### Cosa AGGIUNGERE (consigliato)

1. **Pulsante reset profilo** - Per cancellare completamente
2. **Indicator località visibile** - Icona "locale" più evidente
3. **Spiegazione export profilo** - "Puoi esportare il tuo profilo come backup"
4. **Validazione ruolo** - Prima azione consigliata

### File ammessi per MGR-061 implementation

- `src/views/modelliSorgenteView.js` - Solo funzioni profilo e rendering
- `src/app.js` - Solo se necessario per binding globale (attualmente non serve)

---

**MARKER**: `USER_PROFILE_ONBOARDING_CONFIG_SELECTION_AUDIT`
**MARKER**: `PROFILE_FIELDS_SCOPE_DEFINED`
**MARKER**: `LOCAL_STORAGE_ONLY_GUARANTEED`