# MGR-042: Print Output Polish and Page Rules

## Implementazione
- **Scope:** CSS @media print migliorato in `src/styles.css`

## Regole Print Aggiunte

1. **Font e layout:**
   - Body: 12pt font, line-height 1.35
   - Main padding: 12px
   - Header background scuro per leggibilità stampa

2. **Card print:**
   - Border #999 per stampa (più visibile)
   - Padding 12px, margin-bottom 12px
   - Font-size ridotti: h2→16pt, h3→13pt

3. **Matrice revisione:**
   - Gap ridotto a 10px per più contenuto
   - h3 ridotto a 12pt
   - Check list a 10pt

4. **Notice print:**
   - Border-left 3px
   - Padding ridotto per più contenuto

## Vincoli Rispettati
- ✅ Nessun DOCX generato
- ✅ Nessun PDF programmatico
- ✅ Nessun backend/API
- ✅ Nessuna dipendenza
- ✅ Monolite intatto