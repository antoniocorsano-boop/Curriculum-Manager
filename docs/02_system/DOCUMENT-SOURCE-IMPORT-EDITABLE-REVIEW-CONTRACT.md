# DOCUMENT_SOURCE_IMPORT_EDITABLE_REVIEW_CONTRACT

## Obiettivo del contratto

Trasformare Curriculum Manager da visualizzatore di schede/bozze statiche a strumento di lavoro documentale: documenti reali o semi-reali importati, bozza modificabile in loco, modifiche collegate automaticamente alla revisione, e visualizzatore laterale persistente.

## Inventario documenti Curriculum Manager

### Documenti visibili nell'app (CATALOGO READ-ONLY)
- **10 documenti** tutti con status "CATALOGO READ-ONLY"
- **0 documenti editabili**
- **Template MD** con placeholder "[DA COMPILARE]"

### Gap principale
I documenti in Curriculum Manager sono modelli strutturali, non contenuti reali.

## Inventario documenti SchoolDocs Tecnologia

### Documenti ad alta completezza (Priority 1)
1. **uda-template.md** (~415 righe) - Modello UDA con campi strutturati
2. **rubrica-valutazione-tecnologia.md** (~352 righe) - Rubrica dettagliata
3. **griglia-osservazione-competenze.md** (~254 righe) - Griglia osservazione
4. **programmazione-annuale-classe-*.md** (3 file, ~291-327 righe ciascuno) - Programmazione annuale

### Documenti media completezza (Priority 2)
5. **verbale-dipartimento-template.md** (~202 righe) - Verbale riunione
6. **schede-revisione-curricolo-uda.md** (~180 righe) - Workflow revisione

### Dati semi-reali
- **app-data.json** - 12 UDA strutturati con obiettivi/prodotti

## Gap analitico

| Documento SchoolDocs | In Curriculum Manager | Stato |
|-------------------|-------------------|-------|
| UDA template | NO | **MISSING** - Nessun template UDA |
| Rubrica valutazione | NO | **MISSING** - Nessun tool assessment |
| Griglia osservazione | NO | **MISSING** - Nessun strumento osservazione |
| Programmazione annuale | NO | **MISSING** - Nessun modello piani |
| Verbale dipartimento | NO | **MISSING** - Nessun modello verbali |

## Modello dati documenti editabili

### DocumentSource
```javascript
{
  id: "tecnologia-uda-base",
  title: "UDA Tecnologia base",
  type: "UDA",
  originRepo: "SchoolDocs",
  originPath: "kb/discipline/tecnologia/kit-docente/uda-template.md",
  sourceStatus: "imported", // imported | local_static | missing | external_future
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
      body: "[testo utente]",
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
  changeType: "integrazione", // integrazione | modifica | criticità | proposta | conferma
  status: "bozza", // bozza | pronta_per_confronto | consolidata
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
  status: "da_verificare", // da_verificare | in_revisione | consolidata
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
| [Area testo editabile]                                   |
|                                                         |
| Sezione 2: Obiettivi                                   |
| [Area testo editabile]                                   |
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

2. **MGR-066 EDITABLE_DOCUMENT_DRAFT_MODEL**
   - Modello bozza modificabile
   - Salvataggio localStorage automatico

3. **MGR-067 DOCUMENT_EDIT_TO_REVISION_BRIDGE**
   - Auto-popolamento matrice revisione
   - Tracciamento modifiche

4. **MGR-068 SMART_DOCUMENT_VIEWER_PANEL**
   - Pannello laterale persistente
   - Navigazione sezioni

5. **MGR-069 OUTPUT_FROM_EDITABLE_DOCUMENTS**
   - Export da documenti editabili
   - Output consolidato

## Vincoli permanenti

- No contenuti ufficiali inventati - solo import da SchoolDocs
- No backend/API - localStorage solo
- No OAuth/Drive - file:// solo
- Nessun documento senza reale origine
- Nessun contenuto senza validazione umana

---

**MARKER**: `MGR_064_DOCUMENT_SOURCE_IMPORT_EDITABLE_REVIEW_CONTRACT_READY`