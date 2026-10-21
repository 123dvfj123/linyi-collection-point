# Project Report - outline and word budget

| Item | Detail |
|---|---|
| Task | T-20-14 |
| Owner | R1 |
| Status | Skeleton, to be written |
| Version | v0.1 |
| Deadline | 2026-12-08 |
| Limit | **Not more than 1000 words**, source code excluded |
| Submitted by | the leader only, as a PDF through the OLE assignment link |

## First line of the report

The course requires the GitHub link on the first line of the report:

    https://github.com/Django-coder6/3500SEF-Group23-Project-LMS

It must also carry a guide to install and run the project. `README.md` holds the
guide; it is not yet runnable, because `backend/pom.xml` and the Maven wrapper
arrive with issue #137.

## How the report is marked

Course rubric, Project Report (15 per cent):

| Part | Weight | What it asks for |
|---|---|---|
| Quality of project management | **12%** | Correct use of software engineering concepts: software processes, requirement engineering, system modeling, architectural design, design and implementation, software testing, and software evolution. The list is not exhaustive, and the rubric asks the team to show understanding rather than to tick items off |
| Quality of report | 3% | Organization, design and analysis, writing |

The twelve per cent is the part to aim at: it is a judgement about whether the
team used software engineering deliberately. Every section below therefore names
the artefact that evidences it, so the writing can point at something rather
than assert.

## Word budget

1000 words is not much. This split leaves about 100 words for the conclusion.

| Section | Words | Rubric concept | Evidence to cite |
|---|---|---|---|
| Title block and repository link | 20 | - | `README.md` |
| 1. The problem and the context | 80 | requirement engineering | SRS 1.2, 1.3; `survey-results.md` |
| 2. Process | 150 | software processes | `PLAN.md`; `team-charter.md`; the sprint minutes |
| 3. Requirements engineering | 150 | requirement engineering | SRS; `survey-results.md`; `personas`; `user-journey-maps.md`; `change-log.md` CR-002 |
| 4. System modeling | 120 | system modeling | the twelve `.puml` sources; `uml/README.md` |
| 5. Architectural and database design | 100 | architectural design | ADR-002 to ADR-005; `ERD.md`; `backend-state-machines.md` |
| 6. Design and implementation | 150 | design and implementation | `design-system.md`; `tokens.css`; `openapi.yaml`; the frontend skeleton |
| 7. Testing and validation | 120 | software testing | `test-plan.md`; the eleven unit tests; `RTM.md` |
| 8. Software evolution | 180 | **software evolution** | `change-log.md`; `risk-register.md`; the cases below |
| 9. Conclusion and reflection | 80 | - | - |

## Section notes

### 2. Process

Five sprints in eight weeks, with Sprint 0 and Sprint 1 one week each. Say what
was actually run: a Wednesday checkpoint, a Sunday logbook deadline, one approval
before a merge, a protected `main` and `develop`. The honest sentence here is
that the process held for design work and slipped for requirements, which is what
the risk register records.

### 3. Requirements engineering

The elicitation method changed mid-project, which is itself the story. The team
began with interviews, found the evidence weak, and replaced them with two
questionnaires (29 responses) plus four composite personas, then went back and
corrected chapters 1 and 2 that had been written on the old basis (CR-002,
CR-008, CR-009). Say what the limitation is: one convenience sample, so the
targets are design targets and not statistically supported (RSK-03).

### 4. System modeling

Twelve PlantUML sources, kept as text so a change to a model is reviewable. The
strongest material is not the count: it is that tracing the models against the
contract found two real defects in the contract. One was fixed; one is still
open. A model that finds a defect in a document has earned its place.

### 5. Architectural and database design

Four ADRs, each with the alternative it rejected and why. The parcel status model
is worth one sentence: seven statuses were reduced to three because three of them
described courier stages that the SRS puts outside the system boundary (CR-006).

### 6. Design and implementation

Frontend: Vue 3 with the design system expressed as CSS custom properties, so no
component holds a raw colour or size. Backend: the contract was frozen before the
code, so the frontend could be built against it. Be honest that at the time of
writing the backend holds no code yet.

### 7. Testing and validation

The test plan names the cases that matter and says why: handover idempotency
under concurrency, one location holding one parcel, duplicate waybill rejection,
pickup code single use. Describe the verification that is already running: ESLint,
eleven unit tests and a production build on every push.

### 8. Software evolution - the longest section, and the one that distinguishes the report

This is the concept most teams treat as an afterthought. The repository has real
material for it; five cases, each with a decision behind it:

1. **A scope ruling.** The resident pages are P0 in the page map, but the frozen
   contract has no resident endpoint. The team did not change the contract
   quietly: the gap was routed to the product owner, who ruled that the resident
   read path belongs to Sprint 2. The record is CR-013, and the endpoint shape is
   deliberately left unfrozen until the requirements exist.
2. **A design change with a corrected premise.** The exception types were changed
   to five values. Recording the change exposed that the reason first given, that
   CR-006 defined them, was wrong: CR-006 was about parcel status only. The change
   record says so, and the correction is visible in the log (CR-010, CR-011).
3. **A failure of single-sourcing, and the fix.** The same list of exception types
   appeared in seven documents in four different wordings. The fix was not seven
   edits but a rule: the glossary holds the list and other documents refer to it
   (CR-012).
4. **A model that corrected the contract.** The sequence and activity models for
   the handover showed a `409` on a repeated confirmation. The contract had been
   changed to make that call idempotent, so the models were wrong. They were
   changed to match the contract rather than the other way round.
5. **A regression that local testing could not see.** Two SRS links pointed at
   `personas.md` while the file is `Personas.md`. A Windows checkout resolves that
   silently; GitHub does not. The link check was rewritten to be case-exact.

Two sentences on the risk register belong here as well: it is reviewed at the end
of every sprint, risks are closed with evidence rather than by deleting them, and
one risk is recorded as blocked on another team member's deliverable rather than
quietly dropped.

### 9. Conclusion

What the team would do differently: freeze the requirements before the design,
and write the traceability matrix as the requirements are written rather than
afterwards.

## Writing rules

- English, per `team-charter.md` section 5.3.
- Cite the artefact, not the memory: "`change-log.md` CR-010", not "we discussed".
- No personal names for respondents. The personas are composites and are named by
  role (CR-009).
- Count the words before submitting. 1000 is a hard limit.
- The PDF is submitted by the leader only. Put the repository link on line one.

## What is still missing before this can be written

| Section | Waiting on | Issue |
|---|---|---|
| 3, 7, 9 | SRS chapters 3 and 4, and the traceability matrix | #76, #77 |
| 3 | the product backlog and acceptance criteria | #78 |
| 6 | the backend skeleton, so implementation can be described as running | #137 |
| 7 | the test cases and the defect log | #78 depends on the matrix |



## Revision history

| Version | Week | Change | Author |
|---|---|---|---|
| v0.1 | Week 2 | First version recorded in this file. The outline and word budget for the 1000-word project report. Still a skeleton: the chapters are not written, and the outline is over the word limit at 1123 words. Any earlier edit is not listed: this file had no revision history until week 3, so records of those edits do not exist here. | R1 |
