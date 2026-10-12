# Week 1 summary, review and retrospective

| Field | Detail |
|---|---|
| Task | T-00-06 |
| Date | 2026-10-12 |
| Time | 20:00 to 20:18 |
| Duration | 18 minutes |
| Chair | R1 (Liu JiaHao) |
| Minutes taken by | R1, from the meeting recording |
| Attendees | R1, R2, R4, R5, R6, R7, R8, R9 |
| Absent | R3, R10 |
| Sprint | Sprint 0 review, at the start of Sprint 1 |
| Recording | Held outside the repository. See section 10 |
| Related | [PLAN.md](../plans/PLAN.md), [risk register](../risk-register.md), [change log](../change-log.md), [survey results](../../01-requirements/elicitation/survey-results.md) |

Two members were absent. Their parts are recorded as not reported, and the
chair undertook to speak to them separately.

## 1. Agenda

The chair opened with a three part agenda.

| Part | Content |
|---|---|
| 1 | Each member reports what they did in week one. The chair opens with his own report |
| 2 | The chair raises the problems found during the week |
| 3 | Next week |

Because the meeting was a week one summary, part 3 was kept short by design.

### 1.1 Ground rules for the round

Two rules were set before the round began, and both were followed.

1. Each member speaks for about a minute, saying what they did and what blocked them.
2. The chair does not comment after each member. Questions are deferred to the end.

## 2. Opening

The chair noted that two members were absent and that their parts would be
covered with them separately.

The chair then reported his own week, and stated his own error at the outset
rather than saving it for the problems section:

> I did one thing badly, and I want to flag it to everyone: my plan only covers
> part of the weeks. Only R2, R3, R4, R6, R9 and R10 have planned work in the
> first two weeks, including me.

This was the same defect later raised formally as problem P1. Raising it in his
own report first is recorded here because it set the tone of the meeting.

## 3. What each member reported

Eight of the ten members reported. The table records what each said.

### R1, project manager

| Item | Reported |
|---|---|
| Repository | Set up the repository and the branch model. Protected `main` and `develop` |
| Board | Opened the GitHub Projects board |
| Issues | Broke the first two weeks into issues |
| Documents | Published the plan, the team charter and the glossary |
| Glossary | Fixed the terminology so the same word is used in the same sense throughout, and confirmed the naming used across the design documents is consistent |
| Conventions | Added the file naming conventions and the diagram naming rule to `CONTRIBUTING.md` |
| Review | Reviewed pull requests, which is where most of his time went |
| Self-reported defect | The plan does not cover all ten members for the first two weeks |
| Correction during the meeting | He stated that the plan had been corrected after R1's own review pass, and that R6's `T-0007` task was the one concerned. **This needs confirming, because the recording is unclear at this point** |

### R2, product owner

| Item | Reported |
|---|---|
| Personas | Four personas, one per role: resident, staff, owner and administrator |
| SRS | Chapter 1 covers the background, the problem, the goals and a clear in scope and out of scope list. Chapter 2 defines the four user roles and the system boundary |

**Note.** The recording is unreliable for the part of R2's report that names the
four personas. The role list above is the team's agreed four roles, not a
transcription of what was said. R2 should confirm this row.

### R3, requirements analyst

**Absent.** Not reported.

### R4, frontend lead

| Item | Reported |
|---|---|
| Domain model | The agreement on the collective model, task `T-0007` |
| Plan | Published the plan |
| Charter and glossary | Published the team charter and the glossary |
| Terminology | Fixed the terminology and the naming conventions |
| Contributing | Added the naming conventions and the diagram naming rule to `CONTRIBUTING.md` |
| Open item | Raised that a wording issue in the charter still needed adjusting, and offered to take comments on the pull request |

### R5, frontend developer

| Item | Reported |
|---|---|
| No assigned issues | Week one had no issues assigned to this role |
| Workflow | Read the workflow and pushed a first comment, to learn the process |
| Review | Read pull request #28 and reviewed the frontend architecture, the page map and the frontend API dependency list |

### R6, backend lead

| Item | Reported |
|---|---|
| Week one scope | Few tasks in week one. Most of the week was building the repository tree and getting the process running |
| Repository | Set up the repository tree, protected `main` and `develop`, opened the GitHub Projects board, and broke the first two weeks into issues |
| Design baseline | The backend design baseline: data models, architecture decision records, four state machines, and a draft OpenAPI file |
| State machines | Four of them, covering the parcel, the location, the pickup code, and the exception status transitions |

### R7, backend developer

| Item | Reported |
|---|---|
| Assigned issues | None in week one |
| Logbook | Created the personal logbook file |
| Development environment | Set up the development environment |

### R8, QA lead

| Item | Reported |
|---|---|
| Guidance | Referred to a `RACA` item, most likely the quality and review guidance. **The recording is unclear here** |
| Assigned issues | None in week one |
| Logbook | Created the personal logbook file |
| Environment | Set up the development environment |

### R9, documentation and quality

| Item | Reported |
|---|---|
| README | Corrected the README |
| Team table | Corrected errors in the team table |

R9 was also called on during the problems section, where the chair asked for the
R7 account correction, and R9 agreed to make it.

### R10, infrastructure and integration

**Absent.** Not reported.

### 3.1 Summary figure given at the end of the round

After the last report, the chair gave one figure.

| Metric | Value |
|---|---|
| Pull requests opened during week one | 32 |
| Pull requests merged | all of them |
| Pull requests merged in the repository in total | 35 |

The chair's comment, as recorded: this is not a team still learning Git, this is
a team shipping.

**Note on this figure.** The recording says "32 PR this weekend". The repository
shows 32 pull requests opened between 2026-10-06 and 2026-10-12, which is the
week in question, and 35 merged in total. The figure is therefore right for the
week.

## 4. Problems raised

The chair opened part 2 by saying there were three problems. Four were in fact
covered, plus one finding. The recording runs them together, so they are
separated here.

### P1. The plan covered only part of the team for the first two weeks

| Item | Detail |
|---|---|
| What | `PLAN.md` carried task tables for Sprints 2, 3 and 4, but none for Sprint 0 or Sprint 1. In week one, only six of the ten members had planned work |
| Effect | R4's six UML diagrams, 544 lines, could not be merged, because there was no task identifier to attach them to |
| Cause | The plan was written for the later sprints only |
| Ownership | The chair stated plainly that this is his error, not R4's |
| Resolution | The Sprint 1 task table was merged as pull request #60, so the reason pull request #58 was closed no longer applies. Pull request #58 is to be reopened |

### P2. Generated data on an unmerged branch

| Item | Detail |
|---|---|
| What | An exploration branch carried generated material, including datasets that contradict the real questionnaire |
| Risk | Two contradictory datasets in one repository. A reviewer will ask which is authoritative |
| Current damage | None. None of it reached `develop` |
| Resolution | Stated in the meeting: R3 has merged the three questionnaire files and the data, and the rest stays on the branch |

### P3. The README team table links R7 to an unrelated person's account

| Item | Detail |
|---|---|
| What | The README team table links R7 to `@Momoka17`, which belongs to an unrelated person |
| Detail | R7's actual account is `@Allen06914`. Its display name is "Momoka17", which is why the mistake was easy to make |
| Raised by | The chair, who found it while preparing the meeting |
| Resolution | R9 was called on during the meeting and agreed to change it |
| Owner | R9 |

The chair spoke to R9 directly at this point, and R9 confirmed. This is the only
exchange during the problems section where a member other than the chair spoke.
It is recorded because the fix was agreed on the call rather than left open.

### P4. Two documents that contradict each other, and a security fault

The chair introduced this as the third problem. The recording is partly garbled
at this point, but the content matches the decisions taken and the change
records already written.

| Part | Detail |
|---|---|
| Status model | The data model carried seven parcel status values, three of which describe courier stages that the scope statement puts outside the system |
| Security | The handover endpoint accepted the operator identifier from the client, which would let one staff member complete a handover as another and make the operation log unreliable |
| Resolution | Three status values, exceptions as a separate state, and the operator taken from the authenticated session. Recorded as CR-006 and CR-007 |

**Note.** The recording at this point contains several repetitions of the string
"PR 60" and is not reliable. The substance above is taken from the decisions the
meeting confirmed and from the change log, not from a literal reading of that
passage.

## 5. Decisions

The chair put the plan for week 2 and the decisions that support it. The
following are recorded as confirmed in the meeting.

| # | Decision | Change record |
|---|---|---|
| D1 | The Sprint 1 task table is part of the plan | Pull request #60, merged |
| D2 | Requirements come from the questionnaire only. Interviews and competitor analysis are dropped | CR-002 |
| D3 | Three parcel status values: `registered`, `shelved`, `collected`. Exceptions are a separate state | CR-006 |
| D4 | The handover operator is taken from the authenticated session, never from the client | CR-007 |
| D5 | `ParcelException` for the class, `ExceptionRecord` for the entity | CR-006 |
| D6 | Generated data files are not merged | CR-002 |

## 6. Next week

Kept short by design, because the meeting was a week one summary. The chair
covered it in about a minute.

| Area | What happens |
|---|---|
| Goal | Sprint 1: requirements and the design baseline |
| Why it matters | Code starts in week 3. If the requirements are still moving then, the code is wasted |
| Requirements | SRS chapters 3 to 7 |
| Design | The ERD gets fixed, and the OpenAPI gets the endpoints Sprint 2 needs |
| Traceability | The traceability matrix gets built |
| Assignment | The full task table is in the plan. Assignments to be posted to the group chat after the meeting |

## 7. Open question raised from the floor

One question was raised at the end, and it is the most consequential item in the
meeting.

| Item | Detail |
|---|---|
| Raised by | R2 |
| Question | SRS chapter 3 is a blocker. The later chapters cannot be completed until chapter 3 is ready |
| Effect | Nothing can progress on those chapters while chapter 3 is outstanding |
| Chair's response | Noted, and R3 is absent. The chair undertook to follow up with R3 directly |
| Status | Open |

This is recorded as an open item rather than a decision, because the person who
owns chapter 3 was not present.

## 8. Recording of the meeting

| Item | Detail |
|---|---|
| Duration | 18 minutes. Recording is 1082.8 seconds |
| Held where | Outside the repository. The team holds it, and it is available to the instructor on request |
| Why not in the repository | The repository holds text sources so that a change shows as a readable difference. A recording is a binary file of tens of megabytes and cannot be reviewed. This repository is public and the recording contains members' voices |
| Transcript | A machine transcript was produced for writing these minutes. It contains recognition errors, particularly where members speak a mixture of Chinese and English. It is not committed here, because it is not reliable enough to be a record |
| Consent | All attendees were told the meeting was being recorded |

## 9. Retrospective

The retrospective was folded into the problems section rather than run
separately, because the meeting was 18 minutes long.

| Done well | Done badly | What we change |
|---|---|---|
| 32 pull requests opened and merged in one week, with eight of the ten members reporting work | The plan covered only six of the ten members for the first two weeks, which left 544 lines of design work with no identifier | The task table for a sprint is written before the sprint starts, not after |
| The questionnaire reached all four role groups and the analysis was written | One dataset on an unmerged branch contradicts the real questionnaire | Anything generated is kept off the shared branches, and a dataset that contradicts the real one is never merged |
| The terminology and naming conventions were fixed in week one, before code exists | The README team table linked a member to an unrelated person's account | Team table details are checked against the members' own logbook headers |
| Process was learned by doing: every member pushed a comment or a pull request | Two members were absent and their parts could not be covered | Absences are known before the meeting, and the agenda is adjusted |

The chair recorded his own responsibility on the record: the plan was his.

## 10. Actions

| # | Action | Owner | Due |
|---|---|---|---|
| A1 | Reopen pull request #58, the UML design baseline | R1 | 2026-10-12 |
| A2 | Change the R7 GitHub link from `@Momoka17` to `@Allen06914` | R9 | 2026-10-13 |
| A3 | Follow up with R3, who was absent, on the SRS chapter 3 blocker and on the three questionnaire files | R1 | 2026-10-13 |
| A4 | Follow up with R10, who was absent, on the branch cleanup and the CI position | R1 | 2026-10-13 |
| A5 | Confirm the `T-0007` correction that R4 raised, because the recording is unclear | R1, R2 | 2026-10-13 |
| A6 | Confirm R2's report row, which the transcript does not support | R2 | 2026-10-13 |
| A7 | Write the six decisions into the change log | R1 | 2026-10-12 |
| A8 | Post the week 2 task assignments to the group chat | R1 | 2026-10-12 |
| A9 | Resolve the SRS chapter 3 blocker with R2 and R3 | R1 | 2026-10-14 |

## 11. Weather warning about these minutes

These minutes were reconstructed from a machine transcript. Three passages in
particular are unreliable, and each is flagged in place above.

| Where | Problem |
|---|---|
| R2's report, naming the four personas | The transcript garbles this. The role list in the table is the agreed four roles, not what was said |
| R4's report, the `T-0007` correction | The transcript is unclear about what was corrected and by whom |
| P4, the status model and the security fault | The transcript repeats garbled fragments. The substance is taken from the confirmed decisions and the change log |

Two members were absent, so their parts of the round were not covered at all.

Anyone who disagrees with how their own report is summarised should comment on
the pull request rather than editing this file, so that the change is visible.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | 2026-10-12 | Initial minutes, written from the meeting recording | R1 |
