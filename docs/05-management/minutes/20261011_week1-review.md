# Week 1 review and retrospective

| Field | Detail |
|---|---|
| Date | 2026-10-11 |
| Time | 21:00 to 22:00 |
| Chair | R1 |
| Attendees | All ten members |
| Absent | None |

## Agenda

1. Demonstrate what was produced in Sprint 0.
2. Compare the plan with what was actually delivered.
3. Agree what to change in Sprint 1.

## Increment demonstrated

The team showed the repository, the plan, the glossary, the team charter, the
continuous integration pipeline, and the twenty-nine questionnaire responses
with the analysis in `survey-results.md`.

## Plan against actual

| Item | Target | Actual |
|---|---|---|
| Topic submitted | Yes | Yes |
| Repository usable by all members | Yes | Yes |
| Continuous integration green | Yes | Yes |
| Issues created and assigned | 11 | 11 |
| Members who completed a practice pull request | 10 | 10 |
| Personal logbooks created | 10 | 10 |
| Questionnaires distributed | 4 | 4 |
| Questionnaire responses | 20 resident | 11 resident, 7 staff, 7 owner, 4 administrator |

The resident questionnaire fell short of its target, so the sample is smaller
than planned. The other three groups returned usable numbers.

## Findings raised

| Raised by | Finding |
|---|---|
| R4 | Design work cannot be assigned a task ID because the plan has no Sprint 1 table. A pull request of six diagrams was closed for this reason |
| R6 | The ERD and the SRS disagree about the parcel status values |
| R3 | Fifteen files sit on an exploration branch. Some are generated response files and one names itself as a simulation |
| R1 | The main branch had received direct commits, so it diverged from `develop` |

## Decisions

| # | Decision |
|---|---|
| D11 | Requirements are elicited from the questionnaire only. Interviews and competitor analysis are dropped, and the limitation is stated in the SRS |
| D12 | The parcel status model is ruled to be `registered`, `shelved`, `collected`, with exceptions handled separately |
| D13 | The operator on a handover is taken from the authenticated session, never from the request body |
| D14 | Generated response files and the simulation document are not merged. The exploration branch is closed |
| D15 | The Sprint 1 task table is added to the plan as the first task of week 2 |

## Retrospective

| What went well | What went badly | What we will change |
|---|---|---|
| The repository and pipeline were ready in the first week | The plan was written for Sprints 2 to 4 only, so week 2 had no task numbers and design work was blocked | The task table for the current sprint is written before the sprint starts |
| Every member completed a practice pull request, so we know the process works | Two members pushed to `main` before branch protection was enabled, so the branches diverged | Branch protection is enabled before the first commit, not after |
| The questionnaire reached four role groups | The resident questionnaire fell short of its target and the sample is a convenience sample | When a research task is planned, the target response count and a backup distribution channel are written into the issue |
| The team vocabulary was fixed early | Two documents described the same domain differently before anyone noticed | A review of the domain model is part of every design pull request |

## Actions

| Action | Owner | Due |
|---|---|---|
| Add the Sprint 1 task table to the plan | R1 | 2026-10-12 |
| Rule on the domain model conflicts and announce the ruling | R1 | 2026-10-12 |
| Decide the fate of the fifteen files on the exploration branch | R3 | 2026-10-13 |
| Reopen the diagram pull request once the task ID is confirmed | R4 | 2026-10-15 |
