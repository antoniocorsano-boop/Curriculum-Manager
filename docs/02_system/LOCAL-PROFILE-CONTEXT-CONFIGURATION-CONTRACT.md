# LOCAL-PROFILE-CONTEXT-CONFIGURATION-CONTRACT

## 1. Scopo

Definire il contratto per la configurazione locale iniziale del Curriculum Manager.
La configurazione è un set di dati locali, opzionali e non vincolanti che orientano
l’utente all’interno dell’applicazione senza modificare il modello curricolare
definito da DM221/2025 (MGR-077).

## 2. Campi configurabili

| Campo | Tipo | Note |
|---|---|---|
| nome e cognome docente | stringa | Opzionale, local-only, non obbligatorio |
| disciplina | stringa | Opzionale, usata per filtrare viste e documenti |
| scuola / plesso | stringa | Opzionale, local-only |
| ordine scolastico | enum | infanzia / primaria / secondaria_i_grado / altro |
| dipartimento / sezione / intersezione | stringa | Opzionale |
| classi / anni di riferimento | array di stringhe | Opzionale |
| ruolo operativo nel flusso | enum | Docente / Coordinatore / Gruppo curricolo / Staff / altro |
| preferenze di percorso iniziale | enum | Dai modelli sorgente / Dai documenti istituzionali / Dalla matrice revisione / Output center / Dashboard |

Tutti i campi sono opzionali salvo diversa indicazione esplicita futura.
Il minimo funzionale è zero: l’applicazione deve funzionare senza configurazione.

## 3. Principi privacy

- Dati locali: nessun invio automatico a servizi remoti.
- Nessun dato studente: la configurazione contiene solo dati docente/operatore.
- Nessun dato obbligatorio oltre il minimo funzionale.
- Possibilità futura di cancellazione / reset senza side-effect sul modello curricolare.
- Chiavi di storage locali separate da quelle del modello curricolare DM221.

## 4. Relazione con DM221 / MGR-077

La configurazione locale **non sostituisce** il modello curricolare DM221/2025.
Serve a:
- filtrare viste per disciplina/ordine;
- orientare il routing iniziale;
- predisporre contenuti di documento in base al contesto operativo.

Il modello curricolare rimane la fonte di verità per le entità dati.

## 5. Relazione con flussi futuri

| Flusso | Ruolo della configurazione |
|---|---|
| Onboarding | Pre-compilazione guidata, skip consentito |
| Dashboard | Contesto profilo, percorsi suggeriti |
| Documenti istituzionali | Filtro per ordine/disciplina |
| Matrice revisione | Filtro per classi/anni |
| Output center | Pre-selezione template/documenti |
| Analytics futuri | Aggregazioni locali, nessun invio remoto |

## 6. Confini espliciti

- ❌ No backend
- ❌ No account
- ❌ No login
- ❌ No OAuth
- ❌ No Google Drive / cloud sync
- ❌ No condivisione remota
- ❌ No automazioni nascoste
- ❌ No salvataggio automatico senza conferma utente
- ❌ No sincronizzazione tra dispositivi

## 7. Cosa abilita in futuro

- MGR-079: UI onboarding locale
- MGR-080: profilo persistente locale
- MGR-081: routing verso percorso consigliato
- MGR-082: gate privacy / reset

## 8. Cosa NON implementa ora

- ❌ Nessuna UI
- ❌ Nessun salvataggio
- ❌ Nessuna modifica runtime
- ❌ Nessuna sincronizzazione
- ❌ Nessun export

## 9. Storage previsto (futuro)

- Chiave proposta: `curriculumManager.localProfile.<campo>`
- Storage: `localStorage` browser, lato client only
- Reset: cancellazione chiave senza impatto su `curriculumManager.documentDrafts` o entità DM221

## 10. Validazione

- Contratto docs-only, nessun codice runtime introdotto.
- Nessun dato personale reale o studente reale inserito.
- Campi opzionali confermati.
- Rispetta i vincoli permanenti del progetto.
