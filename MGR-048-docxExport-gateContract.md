# MGR-048: DOCX Export Gate Contract

## Decisione Strategica
**Opzione Selezionata:** **A) Nessun DOCX per V1, solo HTML/PDF browser + Markdown/JSON**

## Analisi Opzioni

| Opzione | Rischio tecnico | Qualità output | Compatibilità Word/LibreOffice | Dipendenze | Mantenibilità | Rischio demo/prodotto | Effort minimo |
|---------|-----------------|----------------|-------------------------------|------------|---------------|------------------------|---------------|
| A | 0 (nessuna aggiunta) | Media (browser) | Buona (PDF) | 0 | Massima | 0 | ✅ Minimo |
| B | 0 | Media/Bassa | Dipende da copia manuale | 0 | Massima | Basso | ✅ Minimo |
| C | Alto | Media | Limitata (librerie JS) | 1-2 | Media | Medio | ❌ |
| D | Medio | Alta | Limitata (senza setup) | 1+ template | Media | Alto | ❌ |
| E | Alto | Alta | Ottima | Pipeline esterna | Bassa | Alto | ❌ |

## Rationale

1. **App stabile V1** - HTML/PDF + Markdown/JSON copre 90% degli use case
2. **Zero dipendenze** - Obiettivo mantere app leggera e locale
3. **Demo ready** - Funzionalità esistenti sufficienti per presentazione
4. **Gate dedicato necessario** - Prima di DOCX:
   - Definire template struttura
   - Testare compatibilità Word/LibreOffice
   - Valutare libreria client-side (docx, docxtemplater)
   - Implementare in sandbox separato

## Prossimo Step
MGR-049 DOCX_PROTOTYPE_ONE_DOCUMENT - sandbox separato, gate dedicato

## Vincoli Rispettati
- ✅ Nessun DOCX implementato
- ✅ Nessuna dipendenza aggiunta
- ✅ Source app invariato
- ✅ Monolite intatto