# DOCUMENT_SOURCE_IMPORT_EDITABLE_REVIEW_CONTRACT

## Obiettivo del contratto

Trasformare Curriculum Manager da visualizzatore di schede/bozze statiche a strumento di lavoro documentale: documenti reali o semi-reali importati, bozza modificabile in loco, modifiche collegate automaticamente alla revisione, e visualizzatore laterale persistente.

## Vincoli permanenti (NON MODIFICARE)

- No contenuti ufficiali inventati - solo import da SchoolDocs
- No backend/API - localStorage solo
- No OAuth/Drive - file:// solo
- Nessun documento senza reale origine
- Nessun contenuto senza validazione umana
- Nessuna modifica a src/**
- Nessuna modifica a index.html

## 1. Documenti già disponibili in Curriculum-Manager

| ID | Titolo | Categoria | Contenuto | Status | Editable |
|----|--------|-----------|-----------|--------|----------|
| curricolo-verticale-istituto | Curricolo verticale d'Istituto | Curricolo | Struttura sezioni (premessa, riferimenti, finalità...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| curricolo-ordine-scolastico | Curricolo per ordine scolastico | Curricolo | Struttura sezioni (dati, competenze, traguardi...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| curricolo-disciplina-campo | Curricolo per disciplina/campo | Curricolo | Struttura sezioni (dati, disciplina, finalità, nuclei...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| documento-finale-dipartimento | Documento finale di dipartimento | Documento dipartimento | Struttura sezioni (dati, ordine, sintesi, decisioni...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| documento-gruppo-lavoro | Documento gruppo di lavoro | Documento gruppo | Struttura sezioni (dati, mandato, attività, proposte...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| documento-revisione-aggiornamento | Documento revisione | Revisione | Struttura sezioni (dati, motivazione, modifiche...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| documento-approvato-validato | Documento approvato | Documento ufficiale | Struttura sezioni (dati, documento, distribuzione) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| quadro-competenze-traguardi-obiettivi | Quadro competenze | Quadro sintetico | Struttura sezioni (competenze, traguardi...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| quadro-valutazione-rubriche | Quadro valutazione | Valutazione | Struttura sezioni (criteri, livelli...) | CATALOGO READ-ONLY — NON UFFICIALE | No |
| allegato-educazione-civica-digitale-orientamento-inclusione | Allegato temi | Allegato | Struttura sezioni (attività, collegamenti...) | CATALOGO READ-ONLY — NON UFFICIALE | No |

**TOTALE**: 10 documenti, 0 editabili - tutti sono "schede di lavoro" con struttura sezioni, non documenti con corpo editabile.

## 2. Documenti già disponibili in SchoolDocs

| Documento | Tipo | Completezza | Status | Path |
|-----------|------|-------------|--------|------|
| uda-template.md | Modello UDA | Alta (~415 righe) | draft | kb/discipline/tecnologia/kit-docente/uda-template.md |
| rubrica-valutazione-tecnologia.md | Rubrica | Alta (~352 righe) | draft | kb/discipline/tecnologia/kit-docente/rubrica-valutazione-tecnologia.md |
| griglia-osservazione-competenze.md | Griglia osservazione | Alta (~254 righe) | draft | kb/discipline/tecnologia/kit-docente/griglia-osservazione-competenze.md |
| programmazione-annuale-classe-prima.md | Programmazione annuale | Alta (~291 righe) | draft | kb/discipline/tecnologia/kit-docente/programmazione-annuale-classe-prima.md |
| programmazione-annuale-classe-seconda.md | Programmazione annuale | Alta (~291 righe) | draft | kb/discipline/tecnologia/kit-docente/programmazione-annuale-classe-seconda.md |
| programmazione-annuale-classe-terza.md | Programmazione annuale | Alta (~327 righe) | draft | kb/discipline/tecnologia/kit-docente/programmazione-annuale-classe-terza.md |
| verbale-dipartimento-template.md | Verbale | Media (~202 righe) | draft | kb/discipline/tecnologia/kit-docente/verbale-dipartimento-template.md |
| schede-revisione-curricolo-uda.md | Schede revisione | Media (~180 righe) | draft | kb/discipline/tecnologia/kit-docente/schede-revisione-curricolo-uda.md |
| scheda-revisione-curricolo.md | Scheda revisione | Bassissima (~60 righe) | draft | kb/discipline/tecnologia/kit-docente/scheda-revisione-curricolo.md |
| guida-operativa.md | Guida kit | Media (~155 righe) | draft | kb/discipline/tecnologia/kit-docente/guida-operativa.md |

**TOTALE**: 10 documenti con contenuto strutturato reale, tutti con metadata `publishable: false` e `human_review_required: true`.

## 3. Gap: cosa manca per trasformarli in documenti editabili dentro l'app

| Documento SchoolDocs | In Curriculum Manager | Tipo mancante | Stato richiesto |
|---------------------|-------------------|---------------|----------------|
| uda-template.md | NO | DocumentSource, EditableDocument | Template UDA operativo con sezioni editabili |
| rubrica-valutazione-tecnologia.md | NO | DocumentSource, EditableDocument | Tool assessment operativo con descrittori editabili |
| griglia-osservazione-competenze.md | NO | DocumentSource, EditableDocument | Strumento osservazione con griglia editabile |
| programmazione-annuale-classe-*.md | NO | DocumentSource, EditableDocument | Modello piani con macro-periodi editabili |
| verbale-dipartimento-template.md | NO | DocumentSource, EditableDocument | Template verbale con sezioni editabili |
| schede-revisione-curricolo-uda.md | NO | DocumentSource, EditableDocument | Workflow revisione operativo |
| guida-operativa.md | NO | DocumentSource | Mappa operativa kit |

**CONCLUSIONE GAP**: Nessun documento SchoolDocs è rappresentato nell'app. Tutti sono MISSING. L'app mostra solo metadata di documento, non i documenti veri.

## Risposte alle domande obbligatorie

1. **Quali documenti reali o semi-reali sono già disponibili nei repo?**
   - SchoolDocs: 10 documenti con contenuto strutturato (~400-60 righe ciascuno)
   - Curriculum Manager: 10 documenti con solo metadata strutturali

2. **Quali documenti devono essere importati in Curriculum Manager?**
   - UDA template → nuovo tipo "UDA" (collegato a curricolo-disciplina-campo)
   - Rubrica valutazione → mappato a "quadro-valutazione-rubriche"
   - Griglia osservazione → nuovo tipo "observation_grid"
   - Programmazione annuale → nuovo tipo "annual_plan"
   - Verbale template → mappato a "documento-finale-dipartimento"

3. **Quale formato interno deve avere un documento editabile?**
   - DocumentSource: metadati origine immutabili
   - EditableDocument: sections[] con body editabile
   - DocumentSection: body, placeholder, linkedRevisionArea
   - Tutto salvato in localStorage

4. **Come si distingue documento sorgente / bozza locale / modifica utente / revisione collegata / output finale?**
   - DocumentSource: template originale (read-only)
   - Bozza locale: copia in localStorage
   - Modifica utente: DocumentChange registrato
   - Revisione collegata: RevisionEntry generato
   - Output finale: esportazione consolidata

5. **Come viene salvata una modifica locale?**
   - DocumentChange in localStorage
   - Section body in EditableDocument
   - Salvataggio debounce o esplicito

6. **Come una modifica popola automaticamente la matrice revisione?**
   - Observer su textarea
   - Al "Segna per revisione", crea RevisionEntry
   - RevisionEntry collegato a cmDraftNotes o nuovo store

7. **Come deve funzionare il visualizzatore laterale intelligente?**
   - Slide-in non modale
   - Mostra stato documento/sezione/modifiche
   - Toggle persistente

8. **Come evitare contenuti ufficiali inventati?**
   - Solo import da SchoolDocs
   - isOfficial: false sempre
   - Frontmatter con `human_review_required: true`

9. **Come mantenere compatibilità file://?**
   - Nessun fetch runtime
   - Solo JS statico + localStorage
   - Blob URL per export

10. **Quale slice implementativa deve venire dopo?**
    - MGR-065: DOCUMENT_SOURCE_IMPORT_MAP
    - MGR-066: EDITABLE_DOCUMENT_DRAFT_MODEL
    - MGR-067: DOCUMENT_EDIT_TO_REVISION_BRIDGE
    - MGR-068: SMART_DOCUMENT_VIEWER_PANEL
    - MGR-069: OUTPUT_FROM_EDITABLE_DOCUMENTS

## Modello dati documenti editabili

### DocumentSource
```javascript
{
  id: "tecnologia-uda-base",
  title: "UDA Tecnologia base",
  type: "UDA",
  originRepo: "SchoolDocs",
  originPath: "kb/discipline/tecnologia/kit-docente/uda-template.md",
  sourceStatus: "imported",
  isOfficial: false,
  humanValidationRequired: true
}
```

### EditableDocument
```javascript
{
  documentId: "uda-local-001",
  sourceId: "tecnologia-uda-base",
  title: "UDA Tecnologia - [Intestazioni]",
  sections: [
    {
      sectionId: "contesto",
      heading: "Contesto e finalità",
      body: "[testo utente modificabile]",
      placeholder: "Inserire contesto...",
      order: 1,
      linkedRevisionArea: "contesto",
      outputRole: "descrizione iniziale"
    }
  ],
  version: "bozza",
  localDraftKey: "cmEditableDoc-uda-local-001",
  updatedAt: "timestamp"
}
```

### DocumentChange
```javascript
{
  changeId: "ch-uda-local-001-xyz",
  documentId: "uda-local-001",
  sectionId: "contesto",
  beforeText: "[placeholder]",
  afterText: "[testo utente]",
  note: "[osservazione opzionale]",
  changeType: "integrazione",
  status: "bozza",
  linkedRevisionArea: "contesto",
  updatedAt: "timestamp"
}
```

### RevisionEntry (auto-popolata)
```javascript
{
  revisionId: "rev-uda-local-001-xyz",
  documentId: "uda-local-001",
  sectionId: "contesto",
  documentTitle: "UDA Tecnologia - [Intestazioni]",
  revisionArea: "contesto",
  proposedChange: "[testo utente]",
  note: "[osservazione]",
  status: "da_verificare",
  sourceChangeId: "ch-uda-local-001-xyz"
}
```

### SmartViewerState
```javascript
{
  selectedDocumentId: "uda-local-001",
  selectedSectionId: "contesto",
  showOriginal: true,
  showDraft: true,
  showChanges: true,
  showRevisionLink: true,
  panelOpen: false
}
```

## UX documento editabile

### Vista principale
```
+----------------------------------------------------------+
| [Titolo documento]                        [Modifica bozza]|
| Breve descrizione                         [Apri pannello] |
+----------------------------------------------------------+
| Sezione 1: Contesto                                       |
| [Area testo editabile - textarea]                        |
|                                                          |
| Sezione 2: Obiettivi                                   |
| [Area testo editabile - textarea]                        |
+----------------------------------------------------------+
| [Salva bozza] [Segna per revisione] [Prepara output]      |
+----------------------------------------------------------+
```

### Pannello laterale (sempre apribile)
```
Documento: UDA Tecnologia - [Intestazioni]
Sezione: Contesto
Stato: bozza

Modifiche:
+ [testo...] (oggi)

Collegata:
→ Matrice revisione / UDA
→ Stato: da verificare
```

## Sequenza implementativa

1. **MGR-065 DOCUMENT_SOURCE_IMPORT_MAP**
   - Mappare documenti SchoolDocs → Curriculum Manager
   - Creare bridge origine → documento locale
   - Aggiornare institutionalDocumentsCatalog.js

2. **MGR-066 EDITABLE_DOCUMENT_DRAFT_MODEL**
   - Modello bozza modificabile
   - Salvataggio localStorage automatico
   - Editor inline nella vista documento

3. **MGR-067 DOCUMENT_EDIT_TO_REVISION_BRIDGE**
   - Auto-popolamento matrice revisione
   - Tracciamento modifiche in cmDraftNotes

4. **MGR-068 SMART_DOCUMENT_VIEWER_PANEL**
   - Pannello laterale persistente
   - Navigazione sezioni

5. **MGR-069 OUTPUT_FROM_EDITABLE_DOCUMENTS**
    - Export da documenti editabili
    - Output consolidato

---

**MARKER**: `MGR_064_DOCUMENT_SOURCE_IMPORT_EDITABLE_REVIEW_CONTRACT_READY`

**MARKER**: `DOCUMENTS_ARE_EDITABLE_WORK_OBJECTS`

**MARKER**: `NO_DOCUMENT_METADATA_ONLY_VIEW`

**MARKER**: `EDIT_TO_REVISION_BRIDGE_REQUIRED`

**MARKER**: `SMART_DOCUMENT_VIEWER_REQUIRED`

**MARKER**: `SCHOOL_DOCS_IMPORT_MAP_REQUIRED`

**MARKER**: `NO_FAKE_OFFICIAL_CONTENT`

**MARKER**: `FILE_PROTOCOL_COMPATIBLE_NO_RUNTIME_FETCH`