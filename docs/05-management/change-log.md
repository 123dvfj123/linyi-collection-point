# Change Log

## COMP 3500SEF Group 23

### Community Parcel Collection Point Management System

| Item | Detail |
|---|---|
| Task | T-00-06 |
| Owner | R1, with process sections maintained by R2 |
| Version | v1.11 |
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
| CR-008 | Week 2 | Requirement | SRS chapters 1 and 2: background, problem statement, scope, functions, user roles, references, assumptions and open issues | Chapters 1 and 2 were written before the questionnaire results reached the team | The evidence showed a mismatch between earlier assumptions and the actual role and boundary findings, so the first draft could not stand as a complete specification | Updated to match the role model, the product boundary and the confirmed requirements set | Medium. The SRS, the personas and the work plan are affected | R1 | Sprint 1 | Implemented |
| CR-009 | Week 2 | Requirement | Persona identifiers, `Personas.md` and SRS section 2.3 | The four personas carried invented personal names (Emily Chen, Daniel Wu, Linda Zhang, Alex Ho) and were described as real people | The ethics statement and the project process require anonymity. The survey data is composite evidence, not a record of named individuals | The personas are written as anonymous composites with role-based identifiers only | Low. Affects the elicitation appendix and the SRS wording | R2 | Sprint 1 | Implemented |
| CR-010 | Week 2 | Design | Exception type enumeration: `ERD.md`, `class-parcel-and-location.puml` and `ui-prototype.md` | The exception types were not defined consistently. `ERD.md` and the class diagram used different labels from the prototype | The same operational values must be used everywhere so the intake flow, the API and the design remain aligned | The agreed exception set is `overdue`, `damaged`, `wrong-recipient`, `refused` and `lost` | Medium. Affects the ERD, the prototype and the data model | R2 | Sprint 2 | Approved |
| CR-011 | Week 2 | Design | Exception type list in `prototype/README.md`, `PLAN.md` and `glossary.md` | The exception types were written down in seven places with four different wordings. `prototype/README.md` used names that other documents did not share | A single vocabulary is required so staff, reviewers and testers use the same terms | The accepted names are standardised and the glossary is updated | Low. Affects the glossary, the prototype notes and the plan | R2 | Sprint 2 | Implemented |
| CR-012 | Week 2 | Process | `docs/glossary.md` as the single source for domain vocabulary; the retired-term rule | Domain terms were repeated in full in the SRS, the ERD, the class diagram, the prototype and the glossary itself | A single source of truth is needed so that a standard term is written once and reused everywhere. The review history showed drift caused by partial updates | The glossary becomes the reference for the controlled vocabulary, and older terms are rejected or retired | Medium. Affects every requirements and design document that names the domain | R1 | Sprint 1 | Implemented |
| CR-013 | Week 2 | Scope | Sprint 2 contract: the resident read path. `frontend-page-map.md`, `user-journey-maps.md`, `frontend-api-dependencies.md`, `openapi.yaml`, `product-backlog.md` | The frontend contract had no resident read path, so the resident journey could not be mocked or tested against a real API surface | The resident list, detail and pickup-code reads are necessary to keep Sprint 2 risk under control and to match the confirmed scope in the requirement walkthrough | The resident reads are part of the frozen Sprint 2 contract, and they are traced to the relevant requirement IDs | High. Affects the API contract, the user journey and the sprint backlog | R2 | Sprint 2 | Approved |
| CR-014 | Week 2 | Design | Design system palette: `design-system.md` 5.1 and 5.2, `frontend/src/styles/tokens.css`, and the high fidelity pages | The palette was the teal and pale-slate set fixed in the initial mock, but the prototype and later design review found it hard to read and the contrast was not strong enough | The staff workflow depends on fast scanning of statuses and alerts. The palette had to support a greyscale system and clear state colours | The palette is replaced by the approved neutral and accent tokens used by the high fidelity pages | Medium. Affects the design system, the UI mock and the frontend tokens | R4 | Sprint 1 | Implemented |
| CR-015 | Week 2 | Design | Design baselines delivered in week 2 with no issue of their own: `docs/02-design/location-recommender-rules.md` and `docs/02-design/overdue-fee-rules.md` | Two design baselines were created without a separate change record, so the team had no evidence trail for the decisions behind them | A design artifact is a decision point in a requirements-driven project, and a rule table needs to be traceable to the change it supports | The recommender and overdue-fee rule tables are recorded as design baseline decisions, with their reviewers and evidence | Medium. Affects the design rule documents and the backlog trace | R1 | Sprint 2 | Implemented |
| CR-016 | Week 2 | Design | Contract and plan decisions raised by R6 while reviewing `T-20-15`: `openapi.yaml`, `PLAN.md` T-42-02, `ADR-004-location-recommendation.md` and the unique partial constraint | The rule table and the API contract had drifted from the accepted design decision on the recommender and the location model | The team needed a single authoritative decision: deterministic recommendation, optional override, no automatic assignment, and the partial constraint on location availability | The recommender design is constrained to a deterministic, read-only suggestion and the plan records the implementation order | Medium. Affects the contract, plan and design record | R6 | Sprint 2 | Approved |
| CR-017 | Week 2 | Scope | The week 2 scope of issue #73 and four stale issue references: `README.md`, `backend/Dockerfile` and `docker-compose.yml` | Issue #73 asked for "four jobs and all are going into week 2", but the actual scope was smaller and the references still pointed at closed tasks | The plan and the repository had drifted to stale issue numbers, which muddied the traceability of work already complete | The issue references are narrowed to the two jobs that are still active, and the stale links are corrected | Low. Affects the plan, the README and the runtime setup | R1 | Sprint 2 | Implemented |
| CR-018 | Week 2 | Design | Completing CR-014: the sidebar token group and `--color-surface-alt` in `frontend/src/styles/tokens.css`, `docs/02-design/design-system.md` 5.2, `docs/02-design/high-fidelity/README.md` and `docs/02-design/ui-prototype.md` | The first palette change corrected the page colours but left the shell tokens inconsistent with the design system | The shell and the page set had to share one definition so the visual language remained coherent | The sidebar group becomes the single source for the shell, and `--color-surface-alt` is removed from the live design | Medium. Affects the design system, the shell component and the high fidelity pages | R1 | Sprint 2 | Implemented |
| CR-019 | Week 2 | Process | `docs/06-logbook/README.md`, the template every personal logbook was copied from | Three logbooks carry a wrong period and two carry a placeholder date, and both come from the wrong template | The weekly logbook is a project artefact and must be accurate, or it misleads the review of work performed | The logbook template is corrected and the copied files are refreshed to match the actual week and date format | Low. Affects the logbook process and every weekly logbook | R1 | Sprint 2 | Implemented |
| CR-020 | Week 2 | Process | Three remaining references to issue #75 in `CHANGELOG.md` and `docs/07-report/chapters/00-outline.md` | The Spring Boot skeleton is delivered by `T-30-02`, and the follow-on issue numbers were still named as if they tracked the old work | Stale issue references make the report and the change log unreliable to reviewers and future maintainers | The references are corrected to the actual issue and the report wording is aligned to the implementation | Low. Affects the report and the change log | R1 | Sprint 2 | Implemented |
| CR-021 | Week 3 | Design | `docs/02-design/database/ERD.md`, `docs/02-design/adr/ADR-002-backend-architecture.md` | `ERD.md` held eight entities and none carried a collection point identifier, so the database design could not support a multi-point model | The design must support multiple collection points in one shared database. The staffing and reporting requirements all assume that the point is a first-class dimension | `CollectionPoint` is added to the ERD and the ADR trace, and the design is updated to keep a point identifier on collection-point-scoped records | Medium. Affects the design baseline and the shared-database architecture | R1 | Sprint 2 | Approved |
| CR-022 | Week 3 | Scope | `docs/01-requirements/specification/SRS.md` `OS-3`; `PLAN.md` `T-44-01`; finding A of `docs/05-management/minutes/20261016_requirements-walkthrough.md` | The walkthrough had not yet ruled whether online fee payment and settlement were inside or outside scope. The earlier wording still implied they might later be included | The project schedule is eight weeks and the scope review established that billing and settlement are outside the current system boundary. The requirement had to be made explicit to keep Sprint 2 on track | Payment and settlement stay out of scope. The overdue fee calculation remains in scope, but no online charging or settlement is added to the system boundary | Medium. Affects the SRS, the backlog and the Sprint 2 plan | R2 | Sprint 2 | Approved |
| CR-023 | Week 3 | Requirement | FR-19 and FR-20, `docs/02-design/location-recommender.md`, `ui-prototype.md`, `T-42-07` | `CR-004` kept storage-location recommendation as a should-have optional suggestion, and the UI prototype and Sprint 2 plan still treated it as a visible recommendation panel | `survey-results.md` S4 recorded **0 of 7** staff choosing the recommendation and S5 showed **4 of 7** preferring manual control or no suggestion. Issue #170 finding 12 also records that two respondents saw the panel as adding latency in single mode. The panel is not a value driver in Sprint 2 | `FR-19` and `FR-20` are reduced from Should to Could. The recommendation panel is deferred, and the default path for Sprint 2 is manual selection with no recommendation UI. `CR-004` is superseded rather than amended | Medium. Affects the SRS, the backlog, the prototype and the Sprint 2 task ordering for the recommendation panel | R2 | Sprint 2 | Approved |
| CR-024 | Week 3 | Scope | `T-42-04` full-shelf handling and the `shelve later` path | The contract had no explicit continuation when a storage location was unavailable, so the flow depended on a design gap rather than a defined behaviour | `#98` and issue #170 finding 13 identify the same problem: a full shelf blocks staff with no defined fallback, which is not operationally acceptable. The project needs a clean decision early so the contract does not keep drifting | `shelve later` does not enter Sprint 2. The contract keeps the normal full-shelf failure path and records the missing later-assignment route as deferred work instead of a Sprint 2 promise | Medium. Affects the contract, the staff intake flow, and the manual shelving design; no new API route is introduced this sprint | R2 | Sprint 2 | Approved |
| CR-025 | Week 3 | Requirement | FR-18 batch limit, `openapi.yaml`, `ui-prototype.md`, `T-42-01` | The batch requirement was defined as up to 50 parcels in one operation, but the contract still did not name what happens when a request exceeds the cap | Issue #170 finding 14 records the exact problem: a batch over 50 returns `400` with no queueing mechanism and no way to keep the valid 50 while the rest waits. The survey and current design point to a hard limit rather than a queue | The requirement remains “up to 50 parcels per request.” Any request above 50 is rejected with `400`, and staff split the batch before retrying. No queueing or deferred backlog mechanism is added in Sprint 2 | Medium. Affects the API contract, the intake workflow and the error-handling text for batch registration | R2 | Sprint 2 | Approved |

## 3. Requests that were considered and rejected

Recording a rejected request is as useful as recording an accepted one, because
it shows the option was weighed.

| ID | Date | Request | Reason for rejection |
|---|---|---|---|
| CRJ-001 | Week 1 | Adopt a complex scoring algorithm for the storage location recommendation | A deterministic rule is easier to test and explain, and the survey did not support prioritising the recommendation over the other staff tasks |
| CRJ-002 | Week 1 | Add a mobile application | Out of scope. The system is a responsive web application |
| CRJ-003 | Week 1 | Integrate directly with courier platforms | Out of scope. Parcel data is entered manually |

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Initial log with seven change records and three rejected requests | R1 |
| v1.1 | Week 2 | Added CR-008 and CR-009; corrected the CR-008 wording on exception types; added CR-010, CR-011 and CR-012 and recorded CR-013 as Proposed | R1 |
| v1.2 | Week 2 | Added CR-014, the design system palette change | R4 |
| v1.3 | Week 2 | Added CR-015, the recommender and overdue fee design baselines, recorded as Proposed pending two value sign-offs | R1 |
| v1.4 | Week 2 | CR-015 confirmed and moved to Implemented; added CR-016 for the recommender contract ruling, the turnover score conflict and the constraint dependency | R1 |
| v1.5 | Week 2 | Added CR-017, narrowing issue #73 to the two jobs that can run in week 2 and correcting four references that named issue #75 for `T-30-02` | R1 |
| v1.6 | Week 2 | Added CR-018, completing CR-014: the sidebar group becomes the shell's single definition, `--color-surface-alt` is removed and the `hi-fi.css` declarations that shadowed those tokens are corrected | R1 |
| v1.7 | Week 2 | Added CR-019, fixing the logbook template that three logbooks copied a wrong period and two copied a placeholder date from | R1 |
| v1.8 | Week 2 | Added CR-020, pointing the three remaining issue #75 references at issue #137, which CR-017 recorded as four | R1 |
| v1.9 | Week 3 | Added CR-021, the collection point decision that closes the design half of issue #127: Sprint 2 assumes more than one collection point, `CollectionPoint` is added to `ERD.md`, the ADR is updated and the multi-point data model is recorded | R1 |
| v1.10 | Week 3 | Added CR-022, the billing scope ruling from the requirements walkthrough: the horizon is eight weeks, payment and settlement stay out of scope, and the overdue fee calculation remains in scope without any online payment step | R2 |
| v1.11 | Week 3 | Added CR-023, CR-024 and CR-025 for the week 3 adjudication: the recommendation panel is demoted, the full-shelf fallback is deferred, and the 50-parcel batch cap is kept without a queue | R2 |
