# Change Log

## COMP 3500SEF Group 23

### Community Parcel Collection Point Management System

| Item | Detail |
|---|---|
| Task | T-00-06 |
| Owner | R1, with process sections maintained by R2 |
| Version | v1.0 |
| Status | Active |

## 1. What this log records

Any change to scope, requirements or design is recorded here before it is
carried out. A change that is not in this log did not happen.

### 1.1 The change process

The process has three stages. It follows the change management process
described in the course material on requirements engineering.

| Stage | What happens | Who does it |
|---|---|---|
| 1. Problem analysis and change specification | The request is written down as a change record: what is wrong or missing, and what the requester wants instead. | The person who raises it |
| 2. Change analysis and cost | The effect on requirements, design, code, tests and the schedule is worked out. The cost is stated in hours and in risk. | R2 for requirement and scope effect, R6 or R4 for technical effect, R1 for schedule effect |
| 3. Change implementation | The change is applied to every affected artefact, and the record is closed with a reference to the pull requests that carried it out. | The owner named in the record |

A change is only started once stage 2 is complete. If the analysis shows the
change would not fit the remaining schedule, the record is closed as rejected,
with the reason stated.

### 1.2 Change record format

| Field | Meaning |
|---|---|
| Change ID | CR-nnn, numbered in order |
| Date | When the record was opened |
| Type | Requirement, design, scope, or process |
| Item affected | The requirement ID, design document or plan entry |
| Before | What the document said before the change |
| Reason | Why the change is needed, with the evidence |
| After | What it will say after the change |
| Impact | High, medium or low, and which artefacts are affected |
| Raised by | The member who raised it |
| Implementing sprint | Which sprint carries the work |
| Status | Proposed, approved, rejected, implemented or closed |

## 2. Change records

| ID | Date | Type | Item affected | Before | Reason | After | Impact | Raised by | Sprint | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| CR-001 | Week 1 | Design | Backend framework and database, ADR-002 and ADR-005 | The first design baseline specified Node.js with Express 4 and MySQL 8, with Sequelize for migrations | Three reasons: the handover requirement needs real transaction and row locking support, the persistence layer has to map cleanly onto the ER design, and the two backend members are more experienced in Java. The alternatives considered and rejected are recorded in ADR-005 | Java 17 with Spring Boot 3.3, Spring Data JPA, Flyway and PostgreSQL 16 | High. Affected the architecture document, ERD, CI pipeline, backend folder layout, README and the plan | R6 | Sprint 1 | Implemented |
| CR-002 | Week 1 | Scope | Elicitation method, plan entry T-10-02 and T-10-03 | The plan included three stakeholder interviews and a competitor analysis of three platforms | With a ten-member team and an eight-week schedule, the questionnaire reaching four role groups was judged to give broader coverage. The course material notes that interviews are poor for domain requirements. Competitor analysis was dropped because the system boundary excludes courier and logistics functions, which is where existing platforms differ most | Requirements are elicited from the questionnaire only. The limitation is stated in the SRS Preface | Medium. The SRS, the RTM and the plan task table are affected. The elicitation evidence base is narrower | R1 | Sprint 1 | Implemented |
| CR-003 | Week 1 | Requirement | FR-18 batch registration, backlog priority | Batch registration of up to 50 parcels was listed as a should-have | Staff questionnaire S3: 4 of 7 respondents named batch registration as their main source of delay. It is the single largest delay identified by any role group | Batch registration is raised to must-have and becomes the first staff feature built in Sprint 2 | High. Affects the backlog order and the Sprint 2 task sequence | R2 | Sprint 2 | Approved |
| CR-004 | Week 1 | Requirement | FR-19 and FR-20, storage location recommendation | The recommendation feature was listed as a must-have and was described in early material as a headline feature | Staff questionnaire S4: 0 of 7 chose location recommendation. S5: 4 of 7 preferred manual control or no suggestion at all | The feature is reduced to should-have, is delivered as a suggestion the staff member can override, and must never be applied automatically. It is no longer presented as a headline feature | Medium. Affects the backlog priority and the wording of the requirement | R2 | Sprint 2 | Approved |
| CR-005 | Week 1 | Requirement | FR-9 and FR-10, delegated collection | Delegated collection was listed in scope as IS-8 | Resident questionnaire R5: 0 of 11 chose the delegated collection code | Moved out of the must-have scope and recorded as future work | Low. The requirement is written but not built | R2 | Sprint 3 | Approved |
| CR-006 | Week 1 | Design | Parcel status enumeration, ERD.md | The status enumeration was `registered, in_storage, ready_for_pickup, out_for_delivery, picked_up, returned, exception` | `out_for_delivery`, `ready_for_pickup` and `returned` describe courier and logistics stages. The SRS puts dispatch and delivery tracking outside the system boundary, so the enumeration contradicted the requirements | Reduced to `registered, shelved, collected` with `exception` handled as a separate flow | Medium. Affects the ERD, the state machine, the OpenAPI status field and the class diagram | R1 | Sprint 2 | Approved |
| CR-007 | Week 1 | Design | Pickup confirmation endpoint, openapi.yaml | The `/pickup/confirm` request body required `operatorId` to be supplied by the client | The operator must be taken from the authenticated session. Accepting it from the client would let one staff member record a handover as another, which breaks the audit requirement NFR-6 | `operatorId` is removed from the request body and read from the security context | Medium. Affects the OpenAPI specification and the handover service | R6 | Sprint 2 | Approved |

## 3. Requests that were considered and rejected

Recording a rejected request is as useful as recording an accepted one, because
it shows the option was weighed.

| ID | Date | Request | Reason for rejection |
|---|---|---|---|
| CRJ-001 | Week 1 | Adopt a complex scoring algorithm for the storage location recommendation | A deterministic rule is easier to test and explain, and the survey did not support prioritising the feature. See ADR-004 |
| CRJ-002 | Week 1 | Add a mobile application | Out of scope. The system is a responsive web application |
| CRJ-003 | Week 1 | Integrate directly with courier platforms | Out of scope. Parcel data is entered manually |

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Initial log with seven change records and three rejected requests | R1 |
