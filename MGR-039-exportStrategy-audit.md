# MGR-039: Export Strategy Selection Audit

## Decisione Finale
**Strategia Selezionata:** **E) export ibrido: HTML/PDF prima, DOCX dopo gate dedicato**

## Analisi Opzioni

| Opzione | Qualità istituzionale | Rischio tecnico | Compatibilità L/W | Mantenibilità | Rischio layout | Rischio privacy | Impatto app | Scope minimo |
|---------|---------------------|-----------------|-------------------|---------------|----------------|-----------------|-------------|--------------|
| A) Markdown strutturato | Bassa | Basso | Limitata | Alta | Medio | Basso | Nullo | ✅ Semplice |
| B) HTML print/PDF | Media | Basso | Buona (PDF) | Alta | Alto | Basso | Nullo | ✅ Semplice |
| C) DOCX WordprocessingML | Alta | Alto | Limitata (senza Word) | Media | Basso | Medio | Nullo | ❌ Complesso |
| D) DOCX LibreOffice | Alta | Alto | Ottima | Media | Medio | Medio | Nullo | ❌ Dipendenza |
| **E) Ibrida** | **Alta** | **Basso** | **Ottima** | **Alta** | **Basso** | **Basso** | **Nullo** | **✅ Incrementale** |

## Rapporti Chiave per Scuola Italiana

1. **Qualità istituzionale (A-F):** Le scuole richiedono DOCX ufficiale. HTML/PDF è accettato per bozze.
2. **Rischio tecnico:** DOCX da zero ha alta superficie di errore (formattazione, stili, intestazioni).
3. **Compatibilità LibreOffice/Word:** HTML → PDF è cross-platform. DOCX nativo richiede conversion.
4. **Scope minimo:** HTML print/PDF usa `window.print()` - zero codice aggiuntivo.

## Decisione E - Ibrida

### Rationale
- **Fase 1 (bozza):** HTML → PDF via `window.print()` (stampa nativa browser)
- **Fase 2 (ufficiale):** DOCX via LibreOffice headless dopo gate di validazione
- **Sicurezza:** Nessuna API, solo export client-side. Nessun dato sensibile processato.
- **Minimal impact:** CSS `@media print` già definito in styles.css.

### Prossimo Slice Consigliato
MGR-040: Aggiungere `#printButton` solo nella view matriceRevisione, con fallback `window.print()`.

### Vincoli Rispettati
- ✅ Nessun export implementato
- ✅ Nessun DOCX/PDF generato
- ✅ Nessun backend/API aggiunto
- ✅ Nessuna dipendenza introdotta
- ✅ Monolite intatto
- ✅ Cataloghi dati invariati