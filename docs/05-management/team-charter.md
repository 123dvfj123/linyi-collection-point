# Team Charter

## COMP 3500SEF Group 23

| Item | Detail |
|---|---|
| Task | T-00-01 |
| Owner | R1 (Liu JiaHao) |
| Version | v1.0 |
| Status | Agreed by all members |
| Related | [Project plan](plans/PLAN.md), [CONTRIBUTING.md](../../../CONTRIBUTING.md), [Glossary](../../glossary.md) |

## 1. Purpose of this charter

This document records how Group 23 works together. It answers four questions
that otherwise cause friction later:

1. Who is responsible for what.
2. When we meet and how we communicate.
3. How decisions are made when we disagree.
4. What each member must do every week.

Where this charter and `CONTRIBUTING.md` disagree, `CONTRIBUTING.md` wins,
because it defines the repository rules. This charter covers the working
arrangements around those rules.

## 2. The project

| Item | Detail |
|---|---|
| Project | Community parcel collection point management system |
| Deliverable | A web application, plus a report, a presentation and personal logbooks |
| Duration | Eight weeks, five sprints |
| Assessment | Progress review 10%, presentation 10%, report 15%, logbook 15% |
| Boundary | Software only. The system controls no hardware. |

The sprint plan is in [`plans/PLAN.md`](plans/PLAN.md). The requirements are in
[`../01-requirements/specification/SRS.md`](../01-requirements/specification/SRS.md).

## 3. Members and roles

| Role ID | Role | Name | Student ID | GitHub |
|---|---|---|---|---|
| R1 | Project manager | Liu JiaHao | 13662451 | [Django-coder6](https://github.com/Django-coder6) |
| R2 | Product owner | Chan Yin Cho | 14489395 | [ohcyc246](https://github.com/ohcyc246) |
| R3 | Requirements analyst | Li Cheuk Fung | 14320368 | [Kennethli13](https://github.com/Kennethli13) |
| R4 | Frontend lead, product architect A | Yuan Chong Jun | 13705584 | [RookieVENENO](https://github.com/RookieVENENO) |
| R5 | Frontend developer | Tan Yuan Ting | 13374348 | [Christine049](https://github.com/Christine049) |
| R6 | Backend lead, product architect B | Hu Qing Kai | 13661454 | [123dvfj123](https://github.com/123dvfj123) |
| R7 | Backend developer | Huang Wei Jia | 13686319 | [Momoka17](https://github.com/Momoka17) |
| R8 | QA lead | Wu Kehao | 14612273 | [fannaodawang](https://github.com/fannaodawang) |
| R9 | Documentation and quality | Guo Yuhui | 14294174 | [RavenG7](https://github.com/RavenG7) |
| R10 | Infrastructure and integration | Chan Sung Ming | 14480597 | [smcheese9731-sys](https://github.com/smcheese9731-sys) |

## 4. What each role owns

Each role has a small number of decisions where that person's word is final.
Everything else is discussed and agreed in the group.

| Role | Owns these decisions | Delivers |
|---|---|---|
| R1 | Schedule, milestones, risk, change log, what goes into the report process chapters | Progress review pack, weekly report, risk register, change log |
| R2 | Backlog order, MoSCoW priority, scope cuts, acceptance criteria | Backlog, priorities, scope decisions |
| R3 | How requirements are elicited and written | SRS, requirements traceability matrix, elicitation records |
| R4 | Frontend structure, shared components, coding standards, frontend review | Frontend skeleton, shared components, design system, UML |
| R5 | None individually. Implements frontend features under R4's standards | Feature pages, integration fixes |
| R6 | Backend architecture, data model, API contract, backend review | Architecture, ER design, OpenAPI, core services |
| R7 | None individually. Implements backend modules under R6's standards | Module code, Flyway migrations |
| R8 | Whether a defect blocks a release, test scope, acceptance evidence | Test plan, test cases, defect log, test report |
| R9 | Document consistency, terminology, formatting, report compilation | Report drafts, glossary, user manual |
| R10 | Repository rules, CI, Docker, deployment, contribution statistics | CI pipeline, Docker Compose, deployment, contributor report |

Where two roles disagree, the rule is:

- a technical disagreement is settled by the owning role (R4 for frontend,
  R6 for backend)
- a requirements or scope disagreement is settled by R2 as product owner
- anything that changes the schedule is settled by R1

## 5. How we work together

### 5.1 Meetings

| Meeting | When | Duration | Purpose |
|---|---|---|---|
| Stand-up | Monday 20:00 | 20 minutes | Each member says what they finished, what is next, and whether anything blocks them |
| Working session | Thursday 20:00 | 45 minutes | Unblock problems that need two or more people, especially environment and integration issues |
| Sprint review and retrospective | Last day of each sprint | 30 minutes | Demonstrate the increment, then agree what to change next sprint |

All meetings happen online unless the group agrees otherwise. The minutes go
into `docs/05-management/minutes/` on the same day.

If a member cannot attend, they post their three answers in the group chat
before the meeting starts. Repeated absence without notice is treated as a
risk to the project and is raised by R1.

### 5.2 Communication

| Channel | Used for | Expected response |
|---|---|---|
| Group chat | Day to day questions, quick decisions | Within a few hours on working days |
| GitHub issues | Anything that needs a record: a task, a defect, a change request | Within 24 hours, by the person assigned |
| Pull request comments | Code and document review | Within 48 hours, as required by CONTRIBUTING |
| Meetings | Anything that needs discussion | n/a |

A decision that only exists in the chat does not count. If a decision matters,
it goes into an issue, the minutes, or the change log.

### 5.3 Language

All repository content, commit messages, pull request text, documents and the
report are written in English, because the course instructor reads English.
Conversation inside the group may be in Chinese. Personal logbooks are written
in English.

## 6. Weekly commitments

Every member commits to the following each week. These are the minimum, not
the target.

| Commitment | Detail |
|---|---|
| Commits | At least two substantive commits, following the message format in CONTRIBUTING |
| Logbook | Update `docs/06-logbook/<your file>.md` and push before Sunday 21:00 |
| Prompt recording | Write each log entry within 48 hours of doing the work |
| Review | Review at least one pull request from another member |
| Attendance | Stand-up on Monday, or post the three answers beforehand |

### 6.1 What a logbook entry must contain

Task ID, description of the work, time spent, status, an evidence link to the
pull request or commit, who you worked with, and any problem you hit with how
you resolved it. An entry without a link is not evidence.

### 6.2 What we agreed about effort

We expect roughly five to six hours per person per week, which is the level the
eight week plan was sized for. If a member cannot meet that in a given week,
they say so at the stand-up rather than disappearing, and R1 rebalances the
work.

## 7. Standards we hold each other to

These are the things that, when they slip, cause the most damage.

1. **A decision is written down.** If it is not in an issue, the minutes or the
   change log, it did not happen.
2. **A task has one owner.** Shared responsibility means no responsibility.
3. **Commit messages carry the task ID.** This is how any piece of work can be
   traced back to the plan.
4. **Nothing is merged without a review.** Including the project manager's work.
5. **A problem is raised within half a day.** Being stuck silently for two days
   is worse than admitting you are stuck.
6. **We use the agreed vocabulary.** The definitions are in
   [`glossary.md`](../../glossary.md). Terms that are no longer used are listed
   there too.
7. **We do not commit secrets.** No `.env` files, no passwords, no tokens.

## 8. Scope rules

The system is software only. Anything that would require hardware, a real
courier integration, or a payment gateway is out of scope. The full list is in
section 1.5 of the SRS.

If a member believes something should be added, they raise it as a change
request. R2 decides whether it enters the backlog, and R1 records the effect on
the schedule. Nothing is added silently.

## 9. How we handle problems

| Situation | What happens |
|---|---|
| A member is blocked | Raise it at the stand-up or in the chat within half a day. R1 finds a second person or reassigns |
| A task is going to be late | The owner says so as soon as they know, not on the deadline. R1 adjusts the plan and records it in the change log |
| Two members disagree | The owning role decides, see section 4 |
| A member is not contributing | R1 raises it privately first. If it continues for two weeks, it is discussed with the whole group |
| A deadline slips because of an outside commitment | Reported at the stand-up in advance. R1 records it as a risk |

## 10. Review of this charter

This charter is reviewed at the end of each sprint. Changes are made through a
pull request, like any other document, and need one approval from a member
other than R1.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Initial charter agreed by all members | R1 |
