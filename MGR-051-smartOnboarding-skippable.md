# MGR-051: Smart Onboarding Skippable

## Implementazione
- **File:** `src/views/modelliSorgenteView.js`, `src/views/matriceRevisioneView.js`

## Funzionalità Aggiunte
1. **Onboarding card** - Benvenuto con descrizione e pulsanti
2. **Salta introduzione** - Nasconde onboarding e salva in localStorage
3. **Inizia dal percorso guidato** - Salta e apre workflow
4. **Mostra introduzione** - Riapre onboarding in matrice revisione

## Dettagli Onboarding
- Chiave localStorage: `cmOnboardingSeen`
- 2 pulsanti: "Salta introduzione" (secondario), "Inizia dal percorso guidato" (primario)
- Tonale: italiano istituzionale, chiaro, rivolto a collega docente

## Vincoli Rispettati
- ✅ Nessun backend/API
- ✅ Nessuna libreria esterna
- ✅ Monolite intatto
- ✅ Nessun dati personale richiesto