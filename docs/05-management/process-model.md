# Process model decision

| Item | Detail |
|---|---|
| Task | T-00-07 |
| Owner | R1, for R2 and the team to review |
| Version | v0.2 |
| Status | Draft for Sprint 3 review; asynchronous decision rule added |
| Related | `PLAN.md`, `team-charter.md`, `change-log.md`, `docs/05-management/minutes/` |

## 1. Context

The project had to deliver a working web system, a 1000-word report, a recorded
presentation and ten individual logbooks inside an eight-week teaching project,
with a fixed in-class progress-review window and a fixed final deadline. Ten
students worked in parallel, most of them new to Java/Spring Boot, and the
requirements were still being discovered while the first design was being built.

Those constraints rule out both extremes:

- A pure waterfall would have frozen a requirements baseline in week 1, before
  the 29 questionnaire responses had been analysed, and would have made the
  week-3 requirement corrections expensive.
- A pure Scrum process would have produced working increments but too little of
  the architecture, traceability and change evidence that the course rubric
  explicitly assesses.

## 2. Decision

We used a **hybrid incremental and plan-driven process**:

- **Plan-driven spine:** a WBS in `PLAN.md` with a task ID, one owner and one
  folder per task; a frozen SRS/architecture baseline at the end of Sprint 1;
  a change log with a before/after/impact record; a risk register; a definition
  of done; and a non-author review before merge.
- **Incremental/Agile outer loop:** five sprints, a product backlog ordered by
  business value, a demonstrable increment at the end of each sprint, a sprint
  review/retrospective, and continuous integration on every pull request.

The process is deliberately documented in the artefacts a reader can inspect,
not only in meeting chat: `PLAN.md` for the plan, `team-charter.md` for the
working agreement, `change-log.md` for decisions, and the minutes or
asynchronous decision records for meetings and time-boxed group-chat decisions.

## 3. Tailoring

| Scrum practice | What we did | Why |
|---|---|---|
| Daily scrum | Weekly 20-minute stand-up plus a Thursday working session | Ten students had different timetables; a daily meeting would have been performative |
| Story points / velocity | Task IDs and a completed/committed task count per sprint | The assessment needs traceability to artefacts more than relative estimation |
| Dedicated Scrum Master | R1 facilitated, R2 owned the backlog | A ten-person course team could not justify a non-delivery role |
| Sprint review meeting | Sometimes asynchronous, recorded against the repository | Members had examinations and outside commitments; the evidence is the increment, not a meeting that did not happen |
| Decision meeting | Synchronous when possible; a time-boxed group-chat thread with explicit `AGREE`/`OBJECT` and a committed record when not | Ten timetables made a synchronous meeting unreliable; silence is not consent, so the record must show who replied |
| Potentially shippable increment | A tagged release (`v0.0.1`, `v0.1.0`, `v0.2.0`) plus CI evidence | The course needs a demonstrable build at the progress review |

The team kept the parts that carried assessment value: a prioritised backlog,
short iterations, a review/retrospective, CI, and a working increment. It dropped
the parts that would have produced ceremony without evidence.

## 4. Evaluation

| Observation | Evidence | What it shows |
|---|---|---|
| Sprint 1 requirements slipped into week 3 | `RSK-01`, sprint 1 review, CR-008 to CR-013 | The baseline was too optimistic; change control absorbed the correction |
| Sprint 2 closed 18 of 19 planned tasks, one deferred | Sprint 2 review | The two-week cadence was realistic once the design baseline existed |
| 36 change records, including 3 rejected requests | `change-log.md` | Change was recorded and analysed, not silently absorbed |
| CR-028 was approved and then corrected by CR-029 | `change-log.md`, issue #98 | A record can be wrong; the review and correction are the process working |
| Handover tests passed on a state the application could not reach | Sprint 2 review, DEF-PARC-001 | A green test is not evidence unless its precondition is reachable |
| Five CI jobs run on every PR | `.github/workflows/ci.yml`, Actions history | Quality is enforced at the integration boundary, not only at release |

## 5. What we would change

1. Freeze the requirements baseline at the end of week 2, before any feature
   code, and write the RTM at the same time rather than reconstructing it.
2. Add a system test that starts from the public API/UI and reaches the handover
   state, so a fixture cannot hide an unreachable path.
3. Keep a live sprint board with a WIP limit; the current plan is detailed but
   the amount of work in progress is not visible at a glance.
4. Record review approval as a formal GitHub review, not only as a PR comment,
   so the review rule is auditable.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v0.1 | Week 5 | First version: context, hybrid decision, tailoring table, evaluation and four changes | R1 |
| v0.2 | 2026-11-09 | Added the time-boxed asynchronous decision-thread rule and the requirement for an explicit `AGREE`/`OBJECT` record | R1 |
