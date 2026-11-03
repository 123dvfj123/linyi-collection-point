# Project Report - outline and word budget

| Item | Detail |
|---|---|
| Task | T-20-14 |
| Owner | R1 |
| Status | Chapters drafted and fact-checked; figures and final PDF pending |
| Version | v0.6 |
| Deadline | 2026-12-08 |
| Limit | Not more than 1000 words, source code excluded |
| Submitted by | the leader only, as a PDF through the OLE assignment link |

## First line of the report
The course requires the GitHub link on the first line of the report:
https://github.com/Django-coder6/3500SEF-Group23-Project-LMS

It must also carry a guide to install and run the project. `README.md` holds the complete setup
and run guide. The backend, Maven wrapper, Flyway migrations, seeded data and full Docker Compose
stack are now available through `T-30-02`, `T-30-03` and the related Sprint 2 work.

## How the report is marked
Course rubric, Project Report (15 per cent):

| Part | Weight | What it asks for |
|---|---|---|
| Quality of project management | 12% | Correct use of software engineering concepts: software processes, requirement engineering, system modeling, architectural design, design and implementation, software testing, and software evolution. |
| Quality of report | 3% | Organization, design and analysis, writing |

The 12 per cent evaluates whether the team used software engineering deliberately. Every section names the artefact that evidences it, so the writing points at something rather than asserts.

## Word budget

The nine chapters now total **929 words** as measured from the Markdown. Add
about 15 words for the title block and repository link and 30 for three figure
captions, and the target is about **974 words**, inside the 1000-word limit with
a small safety margin. The table below records the current counts.

| Section | Words | Rubric concept | Evidence to cite |
|---|---|---|---|
| Title block and repository link | 15 | - | README.md |
| 1. The problem and the context | 96 | requirement engineering | SRS 1.2, 1.3; survey-results.md |
| 2. Process | 162 | software processes | PLAN.md; team-charter.md; the sprint minutes |
| 3. Requirements engineering | 91 | requirement engineering | SRS; survey-results.md; personas; user-journey-maps.md; change-log.md CR-002 |
| 4. System modeling | 88 | system modeling | the twelve .puml sources; uml/README.md |
| 5. Architectural and database design | 100 | architectural design | ADR-002 to ADR-005; ERD.md; backend-state-machines.md |
| 6. Design and implementation | 108 | design and implementation | openapi.yaml; ADR-002/003; design-system.md; tokens.css |
| 7. Testing and validation | 108 | software testing | test-plan.md; 87 backend test methods and 68 frontend tests; RTM.md |
| 8. Software evolution | 116 | software evolution | change-log.md; risk-register.md; the cases below |
| 9. Conclusion and reflection | 60 | - | - |
| **Total (chapters)** | **929** | | |
| **With title/link and captions** | **~974** | | |

## Section notes

### 2. Process
Five sprints in eight weeks, with Sprint 0 and Sprint 1 one week each. Execution included a Wednesday checkpoint, a Sunday logbook deadline, one approval before a merge, and protected main/develop branches. The process held for design but slipped for requirements, as the risk register records.

### 3. Requirements engineering
The elicitation method changed mid-project. Initial interviews provided weak evidence and were replaced by four role-specific questionnaires (29 responses) and four composite personas. Chapters 1 and 2 were then corrected to align with this new basis (CR-002, CR-008, CR-009). The limitation is a single convenience sample, meaning targets are design targets rather than statistically supported (RSK-03).

### 4. System modeling
Twelve PlantUML sources are kept as text for reviewable changes. Tracing these models against the contract revealed two real defects in the contract (one fixed, one open), proving the models' value.

### 5. Architectural and database design
Four ADRs detail the chosen alternatives and rejected options. The parcel status model reduced seven statuses to three, as the others described courier stages outside the SRS system boundary (CR-006).

### 6. Design and implementation
The frontend uses Vue 3, with the design system expressed as CSS custom properties to prevent raw colors or sizes in components. The backend uses Java 17 and Spring Boot 3.3. The contract was frozen before any code, so the frontend could be built against it in parallel; by week 3 the backend implements login, JWT, four-role access control, the audit log and the Flyway baseline.

### 7. Testing and validation
The test plan prioritizes handover idempotency under concurrency, single location per parcel, duplicate waybill rejection, and single-use pickup codes. Continuous verification runs on every pull request: ESLint, 68 frontend tests, 87 backend test methods, Flyway and a Compose smoke test that signs in as a seeded account.

### 8. Software evolution
Five cases, each with a decision behind it:
- **Scope ruling:** Resident pages are P0 but lack contract endpoints; the product owner ruled this belongs to Sprint 2 (CR-013).
- **Design change:** Exception types changed to five values. The premise was corrected as CR-006 only covered parcel status (CR-010, CR-011).
- **Single-sourcing:** A list of exception types in seven documents was unified by placing it in the glossary (CR-012).
- **Model correction:** Handover models originally showed a 409 on repeated confirmation; they were updated to match the idempotent contract.
- **Regression:** Case-sensitive link issues between `personas.md` and `Personas.md` were fixed by rewriting the link check.
- **Risk register:** Reviewed every sprint; risks are closed with evidence, and blocked risks are explicitly recorded.

### 9. Conclusion
The team would freeze requirements before design and write the traceability matrix concurrently with the requirements, rather than retrospectively.

## Writing rules
- English, per team-charter.md section 5.3.
- Cite the artefact, not the memory: "change-log.md CR-010", not "we discussed".
- No personal names for respondents. The personas are composites and are named by role (CR-009).
- Count the words before submitting. 1000 is a hard limit.
- The PDF is submitted by the leader only. Put the repository link on line one.

## Current drafting status

| Section | Status | Source |
|---|---|---|
| 1. The problem and context | Drafted (96 words) | `chapters/01-introduction.md` |
| 2. Process | Drafted (162 words) | `chapters/02-process.md` |
| 3. Requirements engineering | Drafted (91 words) | `chapters/03-requirements.md` ([PR #257](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/pull/257)) |
| 4. System modeling | Drafted (88 words) | `chapters/04-modeling.md` ([PR #258](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/pull/258)) |
| 5. Architectural and database design | Drafted (100 words) | `chapters/05-architecture.md` |
| 6. Design and implementation | Drafted (108 words) | `chapters/06-implementation.md` ([PR #261](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/pull/261)) |
| 7. Testing and validation | Drafted (108 words) | `chapters/07-testing.md` |
| 8. Software evolution | Drafted (116 words) | `chapters/08-evolution.md` |
| 9. Conclusion and reflection | Drafted (60 words) | `chapters/09-conclusion.md` |

## Revision history
| Version | Week | Change | Author |
|---|---|---|---|
| v0.1 | Week 2 | First version recorded. Skeleton, over limit at 1123 words. | R1 |
| v0.2 | Week 3 | Trimmed redundant text to bring the outline body under the 1000-word limit while preserving section structure. Clarified that the limit applies to the submitted report, not metadata. | R9 |
| v0.3 | Week 3 | The word budget table added to **1150 against a limit of 1000**, and the sentence above it promised "about 100 words for the conclusion" while the table gave the conclusion 80. Chapter 1 is raised from 80 to 130 because it now cites the resident and staff pain points with their counts, which is what the requirement engineering criterion asks for, and cutting it back would turn evidence into assertion. The 150 words come from chapters 3 to 9, and chapter 8 keeps the largest single share because this outline itself calls it the section that distinguishes the report. Chapter 2 keeps 150, so its drafted 176 words need a 26-word trim rather than a budget change | R1 |
| v0.4 | Week 3 | Corrected the stale runnable-state note now that the backend and full Compose stack are delivered. Replaced the obsolete missing-artefact table, whose issues are closed, with the current drafting status; found that both drafted chapters still need trimming to their budget | R4 |
| v0.5 | Week 4 | Added chapters 5, 7, 8 and 9, and recorded every chapter's actual word count against its budget. Corrected chapters 1 and 2, which the status table still listed as needing reduction when both were already inside their allocation. The nine chapters now total 947 words | R1 |
| v0.6 | Week 5 | Fact-checked all nine chapters: corrected the questionnaire count from two to four, the database foreign-key count from nineteen to eighteen, the backend test count from 74 to 87 methods, the coverage claim from current to historical, and the CR-013 wording from "added endpoints" to "added to the contract, not implemented". Added the hybrid process rationale and the fixture-blind-spot testing insight. The chapters now total 929 words; figures and final PDF are still pending | R1 |
