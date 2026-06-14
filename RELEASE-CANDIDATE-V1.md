# Curriculum Manager - Release Candidate V1

## Stato V1
**Pronto per uso locale. Nessun backend, nessun DOCX programmatico.**

## Feature V1
1. **3 viste navigabili:**
   - Modelli sorgente (10 template)
   - Documenti istituzionali (10 documenti)
   - Matrice revisione (10 voci)

2. **Dettaglio documento** - Click su card apre vista dettaglio read-only

3. **Note locali** - Textarea in matrice revisione, persistite in `localStorage` con chiave `cmDraftNotes`

4. **Export dati:**
   - Esporta JSON - download `matrice-revisione-bozza.json`
   - Esporta Markdown - download `matrice-revisione-bozza.md`

5. **Stampa/PDF:**
   - Pulsante "Stampa / Salva in PDF" nella matrice revisione
   - CSS `@media print` ottimizzato
   - Sezione "Pacchetto stampa" inclusa

## Checklist Uso Locale
- Aprire `index.html` nel browser
- Naviga tra le 3 viste
- Usa textarea per note locali (opzionale)
- Clicca "Stampa / Salva in PDF" per PDF locale
- Clicca "Esporta JSON" o "Esporta Markdown" per dati

## Limitazioni V1
- Nessun export DOCX (previsto in roadmap futura)
- Nessun salvataggio server
- Dati personali: non supportati né richiesti

## Ringraziamenti
Sviluppato seguendo piano MGR 10-step.