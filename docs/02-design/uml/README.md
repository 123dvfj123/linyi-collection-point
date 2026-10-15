# UML design baseline

| Item | Detail |
|---|---|
| Tasks | T-20-07 (use case, sequence, class), T-20-11 (activity diagrams) |
| Issue | #81 |
| Owner | R4 Frontend Lead / Product Architect A |
| Sources of truth | SRS.md, ERD.md, openapi.yaml, ADR-002, ADR-003, backend-state-machines.md |
| Supersedes | PR #58 (closed, unmerged) |
| Status | Baseline complete for Sprint 1 |

This folder is the design baseline for Sprint 2. Each diagram answers one
question about the system and traces back to a document. The state machines
for the domain objects are owned by R7 (T-20-04) and live here too.

## Naming rules

- File: `<type>-<scope>.puml`, lower case, hyphens, no spaces.
  Types: usecase, sequence, class, activity, state.
- The title inside the file names the business scope, not a figure number:
  `title Use Case Diagram(Collection Point Counter Work)`.

## Index

| File | Diagram title | Scope | Traces to | Owner | Status |
|---|---|---|---|---|---|
| usecase-counter-work.puml | Use Case Diagram(Collection Point Counter Work) | Staff counter goals | SRS 2.2, 2.3 | R4 | done |
| usecase-oversight-and-administration.puml | Use Case Diagram(Oversight And Administration) | Owner and Administrator goals | SRS 2.2, 2.3 | R4 | done |
| sequence-staff-intake.puml | Sequence Diagram(Staff Intake And Shelving) | Intake path | openapi /parcels, /locations/recommend | R4 | done |
| sequence-resident-pickup.puml | Sequence Diagram(Resident Pickup Handover) | Pickup path | openapi /pickup/verify, /pickup/confirm | R4 | done |
| sequence-login-role-guard.puml | Sequence Diagram(Login And Role Guard) | Authentication path | openapi /auth/login, ADR-003 | R4 | done |
| class-parcel-and-location.puml | Class Diagram(Parcel And Storage Location Domain) | Domain structure | ERD.md, CR-006, SRS IS-8 | R4 | done |
| activity-parcel-intake.puml | Activity Diagram(Parcel Intake And Shelving) | Intake process | SRS 2.2, business rules | R4 | done |
| activity-handover.puml | Activity Diagram(Parcel Handover) | Handover process | SRS 2.2, business rules | R4 | done |
| usecase-resident-parcel-tracking.puml | Use Case Diagram(Resident Parcel Tracking) | Resident goals | SRS 2.2, SRS 2.3 | R4 | deferred |
| state-parcel-lifecycle.puml | State Diagram(Parcel Lifecycle) | Parcel lifecycle | backend-state-machines.md, CR-006 | R7 | done |
| state-storage-location.puml | State Diagram(Storage Location Lifecycle) | Storage location lifecycle | backend-state-machines.md | R7 | done |
| state-pickup-code.puml | State Diagram(Pickup Code Lifecycle) | Pickup code lifecycle | backend-state-machines.md | R7 | done |
| state-exception-ticket.puml | State Diagram(Exception Ticket Lifecycle) | Exception ticket lifecycle | backend-state-machines.md, CR-006 | R7 | done |

### Coverage decision: the resident use case diagram

A dedicated resident use case diagram is deferred out of this pull request.
Issue #81 lists two use case diagrams, neither of which covers the resident, so
this pull request keeps to that list. The resident's interaction is shown in
`sequence-resident-pickup.puml`, and the resident goals are recorded in the SRS
role table. The diagram is tracked as a follow-up rather than silently dropped.

## Open findings raised by this baseline

Tracing the diagrams against the contract surfaced two inconsistencies. Both are
now resolved in the contract. They are kept here struck through, so that the
trace is not lost when the row stops being an open action.

| Finding | Where | What is needed |
|---|---|---|
| ~~`POST /parcels` does not define the `409` that duplicate-waybill rejection needs~~ | Resolved | R6 added the `409` response in PR #90; the rejection the sequence diagram shows and the contract now agree |
| ~~`POST /pickup/confirm` carries `operatorId`~~ | Resolved | R6 removed the field in PR #90, per CR-007. The sequence diagram already reads the operator from the session. |

## How to render

- VS Code: open a .puml file and press Alt+D (the PlantUML extension is
  already installed). Export through the command palette.
- Command line: `java -jar <plantuml.jar> -tsvg <file>.puml`
- A diagram that does not compile is not a deliverable. Do not confuse "the
  preview opened" with "the diagram is correct": a missing `@enduml` produces
  no image at all, and a wrong diagram still renders.

## Checklist before a diagram is merged

- [ ] renders with no errors, and an image actually appears
- [ ] one perspective per diagram (no database fields in a use case diagram,
      no flows in a class diagram)
- [ ] every element traces to a document listed above
- [ ] associations carry multiplicity, and state values match
      backend-state-machines.md (parcel status follows CR-006)
- [ ] activity diagrams show the decision points: duplicate waybill, full
      shelf, code mismatch
- [ ] sequence diagrams show at least one alt/else branch
