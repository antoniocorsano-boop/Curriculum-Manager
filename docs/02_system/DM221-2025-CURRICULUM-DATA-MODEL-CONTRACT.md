# DM221_2025_CURRICULUM_DATA_MODEL_CONTRACT

## 0. Scopo

Definire il modello dati curricolare 2025 che Curriculum Manager dovrà usare per rappresentare una disciplina secondo DM 9 dicembre 2025, n. 221 e Indicazioni nazionali 2025, senza implementare codice runtime.

MGR-077 è docs/report-only. Non modifica `APRI_MANAGER_CURRICOLO_ISTITUTO.html`, `index.html`, `src/**`, export, backend, API, DOCX/PDF, dati reali, Output Center, Wiki o Matrice Revisione.

## 1. Principi del modello

1. Il modello rappresenta bozze e tracce di lavoro curricolare, non conformità legale automatica.
2. Ogni disciplina 2025 deve essere collegabile a una fonte normativa autoritativa.
3. Ogni contenuto curricolare deve essere revisionabile da esseri umani.
4. PTOF, RAV e PdM sono collegamenti documentali, non importazioni di dati reali.
5. Nessun campo deve contenere dati personali o identificativi di studenti.
6. Il modello deve distinguere contenuto strutturale, stato di revisione e approvazione umana.
7. Il Manager può dire “strutturalmente completo per revisione umana”, mai “automaticamente conforme”.

## 2. Relazioni tra entità

```text
CurriculumSource[] ← sourceIds — DisciplineCurriculum2025
DisciplineCurriculum2025 → FoundationalNucleus[]
FoundationalNucleus → EssentialKnowledge[]
FoundationalNucleus → CompetenceTarget[]
FoundationalNucleus → AssessmentEvidence[]
DisciplineCurriculum2025 → HumanReviewState
```

## 3. Tipi di supporto

| Tipo | Campi | Uso |
|---|---|---|
| `LinkRef` | `documentId`, `title`, `section`, `relationship`, `status` | Collegamenti PTOF/RAV/PdM, interdisciplinari, rubriche o profili |
| `ProgressionStep` | `from`, `to`, `description`, `knowledgeIds`, `competenceIds`, `notes` | Passaggi di progressione verticale |
| `InclusionAccessibility` | `principles`, `accessibilityNotes`, `readabilityNotes`, `adjustmentNotes` | Principi generali di inclusione, accessibilità e alta leggibilità |
| `ReadyForHumanReview` | calcolato, non salvato come conformità | Indica completezza strutturale per revisione umana |

## 4. Entità A — CurriculumSource

Rappresenta una fonte curricolare autoritativa o di supporto.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `id` | string | Sì | ID stabile, no dati personali |
| `title` | string | Sì | Titolo leggibile della fonte |
| `legalReference` | string | Sì | Riferimento normativo o documentale |
| `sourceType` | enum | Sì | `dm`, `national_indications`, `ptof`, `rav_pdm`, `local_institute`, `support` |
| `effectiveFromSchoolYear` | string | Sì | Es. `2026/2027` |
| `replaces` | string[] | No | Fonti sostituite, es. DM 254/2012 |
| `status` | enum | Sì | `draft`, `active`, `transitional`, `archived`, `to_verify` |
| `notes` | string | No | Note operative, no dati personali |

### Regole

- Per DM 221/2025: `sourceType=dm`, `legalReference="DM 9 dicembre 2025, n. 221"`, `effectiveFromSchoolYear="2026/2027"`.
- Per Indicazioni 2025: `sourceType=national_indications`, collegata al DM 221/2025.
- PTOF, RAV e PdM devono essere `local_institute` o `rav_pdm`, non fonti normative primarie.

## 5. Entità B — DisciplineCurriculum2025

Rappresenta il curricolo di una disciplina o campo disciplinare secondo DM 221/2025.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `disciplineId` | string | Sì | ID stabile disciplina/campo |
| `disciplineName` | string | Sì | Nome disciplina/campo |
| `schoolOrder` | enum | Sì | `infanzia`, `primaria`, `secondaria_i_grado`, `trasversale` |
| `classesCovered` | string[] | Sì | Classi/anni coperti |
| `sourceIds` | string[] | Sì | Riferimenti a `CurriculumSource.id` |
| `ptofLinks` | LinkRef[] | Sì | Collegamenti a PTOF, senza import dati reali |
| `ravPdmLinks` | LinkRef[] | Sì | Collegamenti a RAV/PdM, senza import dati reali |
| `foundationalNuclei` | FoundationalNucleus[] | Sì | Almeno un nucleo per disciplina |
| `essentialKnowledge` | EssentialKnowledge[] | Sì | Conoscenze essenziali per classi coperte |
| `expectedCompetences` | CompetenceTarget[] | Sì | Competenze/traguardi attesi |
| `verticalProgression` | ProgressionStep[] | Sì | Progressione tra classi/anni |
| `interdisciplinaryLinks` | LinkRef[] | Sì | Collegamenti reali o dichiarazione esplicita di assenza |
| `inclusionAccessibility` | InclusionAccessibility | Sì | Principi di inclusione/accessibilità/alta leggibilità |
| `assessmentEvidence` | AssessmentEvidence[] | Sì | Evidenze, rubriche e metodi documentali |
| `humanReviewState` | HumanReviewState | Sì | Stato revisione umana |
| `adoptionStatus` | enum | Sì | `dm2025`, `dm2012`, `transitional`, `exception`, `to_verify` |

## 6. Entità C — FoundationalNucleus

Rappresenta un nucleo fondante della disciplina.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `id` | string | Sì | ID stabile |
| `title` | string | Sì | Titolo nucleo |
| `description` | string | Sì | Descrizione curricolare |
| `relatedClasses` | string[] | Sì | Classi/anni collegate |
| `essentialKnowledgeIds` | string[] | Sì | Riferimenti a `EssentialKnowledge.id` |
| `competenceIds` | string[] | Sì | Riferimenti a `CompetenceTarget.id` |
| `evidenceIds` | string[] | Sì | Riferimenti a `AssessmentEvidence.id` |

### Regole

- Un nucleo senza conoscenze, competenze o evidenze collegate non è candidabile a “pronto 2025”.
- La descrizione non deve contenere nomi di studenti o casi personali.

## 7. Entità D — EssentialKnowledge

Rappresenta una conoscenza essenziale collegata a una classe/annualità.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `id` | string | Sì | ID stabile |
| `classYear` | string | Sì | Classe/anno di riferimento |
| `title` | string | Sì | Titolo conoscenza |
| `description` | string | Sì | Descrizione essenziale |
| `prerequisites` | string[] | No | Prerequisiti ammessi |
| `progressionNotes` | string | No | Note di progressione |
| `accessibilityNotes` | string | No | Note accessibilità/alta leggibilità |

### Regole

- Per ogni classe coperta deve esistere almeno una conoscenza essenziale.
- `progressionNotes` può restare draft se la conoscenza è in bozza, ma deve essere compilato prima di `department_review`.
- `accessibilityNotes` può restare draft in `draft`, ma è obbligatorio prima di `collegio_review`.

## 8. Entità E — CompetenceTarget

Rappresenta una competenza attesa o traguardo collegato a una classe/annualità.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `id` | string | Sì | ID stabile |
| `classYear` | string | Sì | Classe/anno di riferimento |
| `title` | string | Sì | Titolo competenza/traguardo |
| `description` | string | Sì | Descrizione osservabile |
| `profileLink` | string | Sì | Collegamento a profilo/traguardo in uscita |
| `observableEvidenceIds` | string[] | Sì | Riferimenti a `AssessmentEvidence.id` |

### Regole

- Una competenza senza evidenze osservabili non può essere marcata pronta per revisione.
- `profileLink` deve riferire un profilo/traguardo curricolare, non un singolo studente.

## 9. Entità F — AssessmentEvidence

Rappresenta evidenza osservabile, rubrica e metodo di documentazione.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `id` | string | Sì | ID stabile |
| `title` | string | Sì | Titolo evidenza |
| `observableBehavior` | string | Sì | Comportamento/prodotto osservabile |
| `rubricLink` | string | No | Riferimento a rubrica; draft ammesso solo in `draft` |
| `documentationMethod` | string | Sì | Metodo documentale, es. prodotto, osservazione, griglia, verbale |

### Regole

- Non inserire esiti individuali, voti, giudizi su studenti o dati personali.
- `rubricLink` può restare draft in `draft`, ma è obbligatorio prima di `department_review`.

## 10. Entità G — HumanReviewState

Rappresenta lo stato di revisione umana della disciplina.

| Campo | Tipo | Obbligatorio | Regola |
|---|---|---:|---|
| `status` | enum | Sì | `draft`, `department_review`, `collegio_review`, `approved`, `archived` |
| `reviewerRole` | string | No | Ruolo revisore |
| `reviewDate` | string | No | Data ISO o vuota |
| `notes` | string | No | Note di revisione |
| `approvalReference` | string | No | Riferimento delibera/verbale se approvato |

### Regole di stato

| Stato | Significato | Può essere “pronto 2025”? |
|---|---|---:|
| `draft` | Bozza di lavoro | No |
| `department_review` | In revisione dipartimento/gruppo | No, ma candidabile se completo |
| `collegio_review` | In revisione collegio docenti | No, attesa delibera |
| `approved` | Approvato da organo competente | Solo dopo riferimento umano |
| `archived` | Versione archiviata | Storico |

## 11. Campi obbligatori per “pronta 2025”

Una disciplina è candidabile a `ready_for_human_review` solo se tutti questi campi sono presenti e non vuoti:

- `DisciplineCurriculum2025.disciplineId`
- `DisciplineCurriculum2025.disciplineName`
- `DisciplineCurriculum2025.schoolOrder`
- `DisciplineCurriculum2025.classesCovered`
- `DisciplineCurriculum2025.sourceIds` con almeno DM 221/2025 e Indicazioni 2025
- `DisciplineCurriculum2025.ptofLinks`
- `DisciplineCurriculum2025.ravPdmLinks`
- `DisciplineCurriculum2025.foundationalNuclei`
- `DisciplineCurriculum2025.essentialKnowledge`
- `DisciplineCurriculum2025.expectedCompetences`
- `DisciplineCurriculum2025.verticalProgression`
- `DisciplineCurriculum2025.interdisciplinaryLinks` o dichiarazione esplicita di assenza
- `DisciplineCurriculum2025.inclusionAccessibility`
- `DisciplineCurriculum2025.assessmentEvidence`
- `DisciplineCurriculum2025.humanReviewState.status`
- `DisciplineCurriculum2025.adoptionStatus`
- ogni `FoundationalNucleus.title`, `description`, `relatedClasses`, `essentialKnowledgeIds`, `competenceIds`, `evidenceIds`
- almeno una `EssentialKnowledge` per classe coperta
- almeno una `CompetenceTarget` per classe coperta
- almeno una `AssessmentEvidence` collegata alle competenze

## 12. Campi che possono restare draft

Possono restare draft solo in stato `HumanReviewState.status=draft`:

- `CurriculumSource.notes`
- `EssentialKnowledge.prerequisites`
- `EssentialKnowledge.progressionNotes`
- `EssentialKnowledge.accessibilityNotes`
- `CompetenceTarget.profileLink` se il profilo è da verificare
- `AssessmentEvidence.rubricLink` se la rubrica è da collegare
- `HumanReviewState.reviewerRole`
- `HumanReviewState.reviewDate`
- `HumanReviewState.notes`
- `HumanReviewState.approvalReference`

Prima di `department_review`, devono essere compilati:

- `EssentialKnowledge.progressionNotes`
- `EssentialKnowledge.accessibilityNotes`
- `CompetenceTarget.profileLink`
- `AssessmentEvidence.rubricLink`
- `HumanReviewState.reviewerRole`
- `HumanReviewState.notes`

Prima di `collegio_review`, devono essere compilati:

- `HumanReviewState.reviewDate`
- `HumanReviewState.approvalReference` se già disponibile
- eventuali note di transizione o eccezioni

## 13. Campi che richiedono revisione umana

Richiedono sempre revisione umana:

- `DisciplineCurriculum2025.sourceIds`
- `DisciplineCurriculum2025.ptofLinks`
- `DisciplineCurriculum2025.ravPdmLinks`
- `DisciplineCurriculum2025.foundationalNuclei`
- `DisciplineCurriculum2025.essentialKnowledge`
- `DisciplineCurriculum2025.expectedCompetences`
- `DisciplineCurriculum2025.verticalProgression`
- `DisciplineCurriculum2025.interdisciplinaryLinks`
- `DisciplineCurriculum2025.inclusionAccessibility`
- `DisciplineCurriculum2025.assessmentEvidence`
- `DisciplineCurriculum2025.adoptionStatus`
- `HumanReviewState.status`
- `HumanReviewState.approvalReference` quando `approved`

## 14. Campi vietati per dati personali/studenti

Nessun campo del modello deve contenere:

- nome o cognome di studenti;
- dati anagrafici;
- dati sanitari, BES, disabilità o inclusione individuali;
- esiti individuali;
- voti o giudizi nominativi;
- foto, elaborati o documenti identificabili di studenti;
- riferimenti a famiglie o situazioni personali.

Per inclusione/accessibilità, il modello deve contenere solo principi generali, accorgimenti metodologici e riferimenti documentali istituzionali.

## 15. Collegamento a PTOF/RAV/PdM senza dati reali

Il collegamento deve usare solo riferimenti documentali:

```json
{
  "documentId": "ptof_2022_2025",
  "title": "PTOF 2022-2025",
  "section": "Curricolo di istituto",
  "relationship": "coerenza_indirizzo"
}
```

Ammesso:

- ID documento;
- titolo documento;
- sezione;
- relazione logica;
- stato `to_verify` se il documento non è stato ancora controllato.

Vietato:

- importare dati reali da PTOF/RAV/PdM;
- copiare esiti individuali;
- inserire dati studenti;
- usare RAV/PdM per generare claim automatici.

## 16. Evitare falsa conformità automatica

Il modello non deve includere un campo `isCompliant=true`.

Sono ammessi solo:

- `humanReviewState.status`
- `humanReviewState.approvalReference`
- `readyForHumanReview` calcolato strutturalmente, mai come conformità
- `complianceClaim=false` implicito nel contratto

Il Manager può dire:

- “strutturalmente completo per revisione umana”;
- “in revisione dipartimento”;
- “in revisione collegio”;
- “approvato con riferimento umano”.

Il Manager non può dire:

- “automaticamente conforme al DM 221/2025”;
- “validato dal sistema”;
- “documento istituzionale definitivo” senza `approvalReference`.

## 17. Esempio bozza minima non pronta

```json
{
  "disciplineId": "secondaria_tecnologia_dm2025",
  "disciplineName": "Tecnologia",
  "schoolOrder": "secondaria_i_grado",
  "classesCovered": ["I", "II", "III"],
  "sourceIds": ["dm_221_2025", "indicazioni_2025_primo_ciclo"],
  "ptofLinks": [
    {
      "documentId": "ptof_istituto",
      "title": "PTOF d'Istituto",
      "section": "Curricolo di istituto",
      "relationship": "coerenza_indirizzo"
    }
  ],
  "ravPdmLinks": [
    {
      "documentId": "rav_pdm_istituto",
      "title": "RAV/PdM",
      "section": "Priorità curricolari",
      "relationship": "riferimento_miglioramento"
    }
  ],
  "foundationalNuclei": [],
  "essentialKnowledge": [],
  "expectedCompetences": [],
  "verticalProgression": [],
  "interdisciplinaryLinks": [],
  "inclusionAccessibility": {
    "principles": [],
    "accessibilityNotes": "",
    "readabilityNotes": ""
  },
  "assessmentEvidence": [],
  "humanReviewState": {
    "status": "draft",
    "reviewerRole": "",
    "reviewDate": "",
    "notes": "",
    "approvalReference": ""
  },
  "adoptionStatus": "dm2025"
}
```

## 18. Verdetto

`MGR_077_DM221_2025_DATA_MODEL_CONTRACT_READY`
