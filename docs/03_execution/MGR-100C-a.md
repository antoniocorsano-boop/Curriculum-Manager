# MGR-100C-a — NAVIGATION_SIDEBAR_FALLBACK_HOTFIX

## Contesto
Durante una correzione demo si è reso evidente che `index.html` aveva un markup sidebar statico incompleto (solo 1 voce: "Modelli sorgente"). La `sidebar.js` genera dinamicamente 7 voci di navigazione. Se il JavaScript fallisce, l'app resta senza navigazione.

## Fix
Aggiornato `index.html` con fallback statico completo che replica le 7 voci generate da `sidebar.js`:
- Materiali
- Documenti
- Output
- Revisione
- Mappa
- Stati attività
- Wiki

## Accettazione
- `index.html` ha fallback sidebar non vuoto
- Layout dinamico continua a funzionare
- Nessuna modifica a matrice revisione
- Nessuna modifica a output center
- Validazioni: `git diff --check` e `node --check` passate
- Boundary scan: nessun network/storage/OAuth/aggiunte

## Commit
`fix: add sidebar fallback navigation`