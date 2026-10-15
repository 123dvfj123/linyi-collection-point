# Risk Register

## COMP 3500SEF Group 23

### Community Parcel Collection Point Management System

| Item | Detail |
|---|---|
| Task | T-00-06 |
| Owner | R1 |
| Version | v1.3 |
| Status | Active, reviewed at the end of every sprint |

## How to read this register

Each risk has an owner and a trigger signal. The trigger signal is the
observable event that tells us the risk is becoming real. When a trigger fires,
the owner acts on the response rather than waiting for the problem to grow.

Likelihood and impact are rated high, medium or low. Status is one of
`not occurred`, `being monitored`, `occurred, being handled`, or `closed`.

## Active risks

| ID | Risk | Likelihood | Impact | Response | Owner | Trigger signal | Status |
|---|---|---|---|---|---|---|---|
| RSK-01 | The schedule is compressed to eight weeks, so any slippage in Sprint 1 pushes into the build sprints with no slack left | High | High | Sprint 1 has a hard deliverable list and a mid-week checkpoint on Wednesday. If the SRS is not complete by the end of week 2, scope is cut from Sprint 3 rather than from Sprint 2 | R1 | The Wednesday checkpoint shows less than half of the week's deliverables complete | Being monitored |
| RSK-02 | Sprint 1 has no task table in the plan, so design work cannot be assigned a task ID and cannot be reviewed through the normal route | High | High | Add the Sprint 1 task table to the plan. This has already blocked one pull request of 544 lines | R1 | Design work sitting on a branch with no task ID | Occurred, being handled |
| RSK-03 | The requirements evidence base rests on one convenience sample of 29 questionnaire responses, so the quantitative targets are not statistically supported | High | Medium | The limitation is stated in the SRS Preface and in the survey results. Targets are described as design targets supported by the questionnaire, not as values from a representative study | R2 | A reviewer questions where a target value came from | Occurred, being handled |
| RSK-04 | The ERD, the OpenAPI specification and the SRS describe the same domain differently, so the frontend and backend will be built against different models | High | High | The project manager rules on the role model and the parcel status model. The ERD, OpenAPI and class diagram are then aligned to the ruling in the same sprint | R6 | Two documents in the repository give different values for the same field | Occurred, being handled |
| RSK-05 | The backend lead carries six Sprint 1 items, including the ERD revision and the OpenAPI expansion, and is over capacity | High | Medium | Work is redistributed: the OpenAPI expansion moves to the DevOps role, the recommender design becomes a pair task with the second backend developer | R1 | The backend lead reports more than 15 hours of committed work in one week | Occurred, being handled |
| RSK-07 | The demo fails during the progress review because the environment cannot be reproduced on the review machine | Medium | High | Docker Compose is built early, in week 2 rather than week 3. A cloud deployment and a local backup are both prepared. A recorded fallback is kept | R10 | Docker Compose does not start cleanly on a second machine | Being monitored |
| RSK-08 | The handover feature is not idempotent under concurrent requests, so a parcel could be recorded as handed over twice | Medium | High | The handover is designed around a database transaction with a unique constraint on the pickup code. A concurrency test with 50 simultaneous submissions is a required acceptance test | R6 | The concurrency test produces more than one handover record | Being monitored |
| RSK-09 | Individual logbooks are written at the end of the period rather than week by week, so they do not evidence continuous work | Medium | High | Entries are written within 48 hours. The project manager checks each Sunday and spot-checks two logbooks at the end of each sprint | R1 | A member has no logbook entry for a week in which they committed work | Being monitored |
| RSK-10 | Members have outside commitments such as examinations and part-time work that collide with the sprint schedule | High | Medium | Busy weeks are collected at the start and the plan avoids them where possible. Effort is sized at five to six hours per person per week, which leaves margin | R1 | A member misses two stand-ups in a row | Being monitored |
| RSK-11 | Java and Spring Boot are new to part of the team, so Sprint 2 falls behind while people learn the framework | Medium | High | The backend skeleton is built in week 3 with a working health endpoint before any business code. The two backend members pair on the first module | R6 | By the end of week 3 the application does not start | Being monitored |
| RSK-12 | The repository carries 38 branches, most of them merged or auto-generated, which makes the history hard to read | High | Low | The DevOps role removes the auto-generated branches and the merged working branches, leaving `develop` and `main`. A few branches with unmerged work are assessed first. The count was re-checked on 14 October: 38 remote branches, so the cleanup has not been done yet | R10 | A reviewer cannot tell which branches matter | Being monitored |
| RSK-13 | Simulated survey data exists on an unmerged branch and would contradict the real questionnaire results if it were merged | Medium | High | The branch is not merged. The simulated files are left on the branch and the branch is closed. A note is added to the pull request explaining why | R3 | Any file named simulation, or any response count that does not match the real survey | Occurred, being handled |
| RSK-14 | The requirements traceability matrix does not exist, so no requirement can be shown to have a test | High | Medium | The matrix is a Sprint 1 deliverable with a test-plan cross-check. Every must-have requirement must map to at least one test case. **The blocker was cleared on 14 October: SRS chapter 3 defines 47 functional requirements (PR #114), so all three functional identifiers `test-plan.md` cites — FR-6, FR-17 and FR-39 — now resolve to real requirements instead of placeholders. The six cited NFR identifiers (NFR-1, NFR-4, NFR-5, NFR-7, NFR-10, NFR-12) are reserved for chapter 4, issue #77.** What remains is R8 allocating the test-case ids, writing the matrix rows, and creating the matrix document itself, which is still missing | R8 | A requirement is quoted in review with no test reference | Occurred, being handled |

## Closed risks

| ID | Risk | Outcome |
|---|---|---|
| RSK-C01 | The team has no Git experience, so commits and pull requests would be inconsistent | Closed. A one-hour training session was held in week 1, and every member completed a practice pull request |
| RSK-C02 | The repository scaffold might overwrite work already committed by members | Closed. The main and develop branches were compared before the restructure, and the restructure was applied on a branch off develop |
| RSK-06 | The frontend has no code at all, only folders, so Sprint 2 cannot start on the frontend | Closed in the week 3 close-out review. The folder-only state no longer holds: the Vue 3 skeleton with the router, the store and the API wrapper landed in PR #97. Owner R4; the trigger was no runnable frontend by the end of Wednesday in week 3 |
| RSK-15 | Diagram sources are committed as exported images rather than text, so changes cannot be reviewed | Closed in the week 3 close-out review. The working agreement requires PlantUML, draw.io or Mermaid sources, and exported images go only to the report figures folder. Owner R4; the trigger was a pull request adding a `.png` where a `.puml` is expected |

## Review record

| Sprint | Date reviewed | Changes made |
|---|---|---|
| Sprint 0 | Week 1 | Initial register: 13 risks, 2 closed |
| Sprint 1 | Week 2 | Two risks added (RSK-14, RSK-15); RSK-02, RSK-04, RSK-05 and RSK-13 moved to being handled |
| Sprint 1, close-out | Week 3, 14 October | RSK-06 and RSK-15 closed with evidence. RSK-12 re-checked (38 branches, still open). RSK-14 recorded as blocked on issue #76. RSK-09 remains open: five of ten logbooks still carry `W01-W16` as the period, and two carry a single data row |
| Sprint 1, close-out follow-up | Week 3, 14 October | RSK-14 unblocked by SRS chapter 3 (PR #114) and moved to being handled, with R8 as the owner of the remaining test mapping |

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Initial register | R1 |
| v1.1 | Week 2 | Sprint 1 review, two risks added | R1 |
| v1.2 | Week 3 | Sprint 1 close-out review: RSK-06 and RSK-15 closed, RSK-12 number refreshed, RSK-14 blocker recorded | R1 |
| v1.3 | Week 3 | RSK-06 and RSK-15 reformatted as closed-risk rows. Both carried the eight-column shape of the active table, which broke the Closed risks table and left their status reading "Being monitored" | R4 |
