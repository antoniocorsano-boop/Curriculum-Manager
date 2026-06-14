# MGR-053: Role Work Paths

## Implementazione
- **File:** `src/data/roleWorkPathsCatalog.js`, `src/views/modelliSorgenteView.js`

## Role Paths Aggiunti
1. **Docente** - Preparare curriculum individuale
2. **Coordinatore dipartimento** - Coordinare revisione documentale
3. **Gruppo curricolo** - Svolgere lavori tematici
4. **Funzione strumentale** - Supportare gestione documentale

## Dashboard Role Selector
- Dropdown nella dashboard
- Mostra obiettivo e output previsto
- localStorage `cmRolePath` per persistenza

## Vincoli Rispettati
- ✅ Nessun login/auth
- ✅ Nessun multiutente reale
- ✅ Monolite intatto