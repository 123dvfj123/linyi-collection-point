# Personal Logbook - Liu JiaHao

- Student ID: 13662451
- GitHub: @Django-coder6
- Role: R1 group project leader
- Modules: project coordination, schedule and risk management, report process chapters
- Period covered: W01-W08

> **Note on this file name.** This file was renamed from
> `20261006_Liu JiaHao_Logbook.md` to `20261006_LiuJiaHao_Logbook.md`, because
> the file naming rule in `CONTRIBUTING.md` does not allow spaces. The date
> prefix is kept so the folder listing still sorts chronologically.
> Any document that cites the old name needs its link updated.

## Week boundary

A note on how the weeks are labelled, because the sprint numbering and the
calendar week do not line up in this project.

| Logbook week | Calendar dates | What it covers |
|---|---|---|
| W01 | 2026-10-02 to 2026-10-09 | Sprint 0: topic, repository, research setup |
| W02 | 2026-10-10 to 2026-10-12 | Sprint 1 start: requirements and design baseline |

## Weekly log

| Week | Date | Task | Description (output produced) | Time | Hours | Status | Evidence (links) | With | Problem and fix | Note |
|---|---|---|---|---|---|---|---|---|---|---|
| W01 | 2026-10-02 | T-00-01 | Confirmed the project topic and submitted the topic choice on OES; drafted the team charter (roles, meeting frequency, reporting rules) | 20:00-22:00 | 2.0 | done | [path to topic submission screenshot], `docs/05-management/team-charter.md` | - | - | The topic deadline was Sep 30, so it was good to handle it early |
| W01 | 2026-10-03 | T-00-02 | Created the GitHub repository and set up the folder structure (36 folders, 13 config files); added the 9 team members with Write access | 14:00-16:00 | 2.0 | done | repository home page, commit `a0c34ca` | - | On the first web upload the empty folders did not come through, so I switched to a scaffold that carries `.gitkeep` files | Did not know at first that Git does not track empty folders |
| W01 | 2026-10-03 | T-00-02 | Set up branch protection: both `main` and `develop` require 1 approval and a passing CI run, with bypassing disabled | 16:00-17:00 | 1.0 | done | [Settings, Branches screenshot] | - | Protection was not on at the start, so I pushed straight to `main` myself and `main` and `develop` diverged | Lesson: turn protection on before the first commit is made |
| W01 | 2026-10-03 | T-00-04 | Created the GitHub Projects board (Backlog / This Week / In Progress / In Review / Done) | 19:00-20:00 | 1.0 | done | [Projects board screenshot] | - | - | The board lets everyone see which column their own card is in |
| W01 | 2026-10-03 | T-00-04 | Created the 11 Week 1-2 issues (each with its WBS task ID, label, assignee and week tag) | 20:00-22:30 | 2.5 | done | Issues #1-#11 | - | Titles were inconsistent at first, then standardised to `[T-xx-xx] English title` | Every issue maps to one WBS task |
| W01 | 2026-10-10 | T-00-07 | Wrote the project glossary: domain terms, the four login roles, engineering and technology terms, code naming rules, and a list of retired terms that must not appear in documents or the report | 21:00-23:00 | 2.0 | done | `docs/glossary.md` | R4 | The glossary had to state that a courier is an external actor with no account, because an earlier draft treated the courier as a login role | Retired terms came from the abandoned smart locker framing: cabinet, compartment, opening a door |
| W01 | 2026-10-11 | T-00-02 | Drove the repository restructure from Node and Express to Spring Boot and PostgreSQL: Java package layout under `backend/src/main/java/com/group23`, Maven wrapper, Flyway migration folder, frontend Vite layout, and the CI structure check updated to match | 22:00-2026-10-11 01:00 | 3.0 | done | PR #36, `chore: restructure repository for Spring Boot and PostgreSQL` | R6 | The old scaffold had the wrong directory names, so the structure check and the plan both had to move in the same commit | This was the change that invalidated 20 folder paths already written in `PLAN.md` |
| W01 | 2026-10-11 | T-10-01 | Ran the questionnaire fieldwork across four role groups and worked with R2 on the analysis: 29 responses, 11 residents, 7 staff, 7 owners, 4 administrators | 15:00-18:00 | 3.0 | done | `docs/01-requirements/elicitation/survey-results.md`, PR #53 | R2 | The resident questionnaire target was 20 responses and returned 11, so the analysis states counts rather than percentages and records the sampling limits in writing | Three assumed problems were disproved by the data: shelf searching scored 0 of 7 on staff, queues 2 of 11 on residents, location recommendation 0 of 7 |
| W01 | 2026-10-11 | T-00-06 | Reviewed pull requests across the week. Most of my hours went here rather than into producing documents | spread across the week | 3.0 | done | repository pull request list | all | Two review passes were needed: the first round found the missing survey file and the stale role names, the second found the codename still present in documents | Reviewing is the part of the role that does not appear as a commit |
| **W02** | 2026-10-12 | T-00-06 | Held the Week 1 summary, review and retrospective. Ran it as a round where each member reported their own week first, then raised the problems, then covered week 2 briefly. 18 minutes, 8 of 10 members present | 20:00-20:18 | 1.0 | done | `docs/05-management/minutes/20261012_week1-summary-review.md` | all present | R3 and R10 were absent, so their parts could not be covered and are recorded as follow-up actions rather than as reported | Two ground rules: about a minute each, and no comment from the chair after each report |
| W02 | 2026-10-12 | T-00-06 | Wrote the meeting minutes from the recording, including the five problems, the six decisions, the retrospective and nine follow-up actions | 21:00-23:00 | 2.0 | done | `docs/05-management/minutes/20261012_week1-summary-review.md` | - | The machine transcript was about 70 per cent usable, so the three unreliable passages are flagged inside the minutes rather than smoothed over | Transcription quality dropped sharply wherever members mixed Chinese and English in one sentence |
| W02 | 2026-10-12 | T-00-06 | Raised the Week 1 review findings as written records: the change log with seven change records and three rejected requests, and the risk register with fifteen risks | 19:00-21:00 | 2.0 | done | `docs/05-management/change-log.md`, `docs/05-management/risk-register.md` | - | The SRS already cited the change log before it existed, so the file had to be created rather than deferred | CR-006 and CR-007 record the parcel status ruling and the handover operator fix |
| W02 | 2026-10-12 | T-00-06 | Finalised the glossary, the team charter and the plan for week 1, and added the file naming rules and the diagram naming rule to `CONTRIBUTING.md` | 18:00-19:00 | 1.0 | done | `docs/glossary.md`, `docs/05-management/team-charter.md`, `CONTRIBUTING.md` | R4 | The naming rules were written after the rest of `CONTRIBUTING.md`, so they had to be inserted into the existing structure rather than appended | Worked with R4 on this. R4 published these files and raised them in the week 1 meeting, so the two of us appear on the same documents. The split was: I set the content, R4 carried the changes through the pull request route |
| W02 | 2026-10-12 | T-00-06 | Followed up the finding that the README team table linked R7 to an unrelated person's GitHub account. Confirmed `@Allen06914` is R7 and `@Momoka17` is a different user, and asked R9 to correct it | 0:10 | 0.2 | done | README team table, action A2 in the minutes | R9 | R7's account display name happens to be "Momoka17", which is why the wrong account was linked | Raised during the meeting and agreed on the call |
| W02 | 2026-10-13 | T-10-05 | Opened the SRS chapter 3 blocker as an issue. R2 raised it in the meeting: chapters 4 to 7 cannot be completed until chapter 3 is ready, and R3 was absent so it could not be decided | 0:30 | 0.5 | done | issue `Week2-3 [T-10-06] SRS Chapter 3 is a blocker` | R2, R3 | One chapter late is not one deliverable late. The traceability matrix, the use cases, the acceptance criteria and the Sprint 2 scope all read from chapter 3 | Proposed a split of chapters 3 to 7 across R2, R3 and R5, for the meeting to accept or reject |
| W02 | 2026-10-13 | T-00-06 | Renamed this logbook file to remove the space, and noted that any document citing the old name needs its link updated | 0:10 | 0.2 | done | this file | - | The old file name contained a space, which the naming rule in `CONTRIBUTING.md` does not allow | - |

## Running total

| Week | Dates covered | Hours |
|---|---|---|
| W01 | 2026-10-02 to 2026-10-11 | 19.5 |
| W02 | 2026-10-12 to 2026-10-13 | 6.9 |
| **Total to date** | | **26.4** |

The project plan sizes each member at five to six hours a week. W01 is above
that because sprint 0 carried the repository setup, the restructure and the
questionnaire fieldwork in the same week.

## Forward plan

| Week | Focus |
|---|---|
| W02 | Sprint 1 close: SRS chapters 3 to 7, the traceability matrix, the design baseline, and the `v0.1.0` tag |
| W03 | Sprint 2 opens. Release the `v0.0.1` and `v0.1.0` tags if not already done, and write the progress review pack |
| W04 | Sprint 2 close. Report chapters 4 and 5 figure captions and text |
| W05-W06 | Sprint 3. Progress review in week 6, which is 10 per cent of the OES mark |
| W07-W08 | Sprint 4. Report chapters, logbook finalisation, retrospective, and the presentation |

## Outstanding evidence to attach

| Entry | Missing |
|---|---|
| W01 2026-10-02 | Topic submission screenshot |
| W01 2026-10-03 | Branch protection settings screenshot, Projects board screenshot |
| W01 2026-10-03 | Commit `a0c34ca` should be confirmed as the correct reference |
| W01 2026-10-10 | Confirm the merge status of the glossary on `develop` |
| All W02 | Pull request links for the change log, risk register and minutes are pending submission |
