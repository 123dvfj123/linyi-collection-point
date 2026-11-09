# Week 5 asynchronous decision record

## COMP 3500SEF Group 23

| Item | Detail |
|---|---|
| Format | Asynchronous decision thread |
| Channel | Team group chat (WeChat) |
| Window | 2026-11-09 19:37–20:08 HKT |
| Chair / recorder | R1 (Liu JiaHao) |
| Issue | [#284](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/issues/284) |
| Related | #283, #294, #285, #286, #288, #289, #290, #291, #292, #293 |
| Status | Approved — 9 explicit `AGREE`, 0 `OBJECT` |

> No synchronous meeting was held. This record is the decision. The group-chat
> transcript alone is not the decision.

## 1. Why this was asynchronous

The team could not schedule the 11/04 30-minute decision meeting. R1 opened a
time-boxed decision thread in the team group chat on 2026-11-09. Every member was
asked to reply `AGREE` or `OBJECT + reason`; silence and absence were not counted
as agreement.

## 2. Responders

Nine members replied explicitly with `AGREE 1-5` between 19:42 and 20:08 HKT.
The captured thread shows these display names:

- 神原
- R8
- R9
- +86 135 3723 3985
- R2
- R10
- 黄维家
- 哥凯
- KennethR3

One of the ten members did not reply in the captured thread. Quorum was **9/10**,
including R1 and the owners of the affected items; the quorum rule required 6/10.

No `OBJECT` was received.

## 3. Proposals and decisions

### D1 — P0 ratification: APPROVED

Accept `CR-034`, `CR-035` and `CR-036`, and ratify the already-merged P0 fixes in
PR #283 and #294. The P0 fixes are not reopened without new evidence.

- Owner: R1
- Evidence: PR #283/#294; CI and Docker/Compose evidence in the PRs and #284

### D2 — Week 5 scope freeze: APPROVED

Week 5 is limited to P0 fixes and evidence. No notifications, exceptions,
stocktake, billing or admin-console work.

- Owner: R2
- Evidence: scope table, backlog v1.3, SRS v0.11

### D3 — Compressed Week 5/6 sequence: APPROVED

- 11/04–11/10: converge engineering evidence
- 11/11–11/13: finish the report and logbooks
- 11/14: start review production
- No slides, script or rehearsal before 11/14

- Owner: R1
- Evidence: `progress-review-12-day-plan.md` v0.7

### D4 — Close-out owners: APPROVED

- R3: #286 — RTM FR labels, v0.7, traceability chain and validation
- R8: #291 — final test sign-off
- R9: #292 — final PDF/report
- R1: #284 — this decision record
- R5/R6/R7/R10: close completed #288/#289/#290/#293

### D5 — Decision format: APPROVED

This asynchronous thread replaces the synchronous meeting. The committed decision
record, not the chat transcript, is the decision.

## 4. Actions

| Action | Owner | Deadline |
|---|---|---|
| Commit this record and link it from #284 | R1 | 2026-11-09 |
| Sync the 31 FR `Must (proposed)` labels in RTM to `Must (approved)`; leave 14 NFR labels proposed; bump RTM to v0.7 | R3 | 2026-11-10 |
| Add one FR-12/FR-21 traceability chain and record the three validation respondents | R3 | 2026-11-10 |
| Final test-report sign-off and close #291 | R8 | 2026-11-10 |
| Attach/link the final PDF and close #292 after report checks | R9 | 2026-11-10 |
| Close completed #288/#289/#290/#293 with evidence comments | R5/R6/R7/R10 | 2026-11-10 |
| Confirm `PLAN.md`, `README.md`, `Sprint 3` milestone and `week: 5` label agree | R1 | 2026-11-10 |

## 5. Evidence

- Group-chat thread screenshots, captured 2026-11-09 (retained in the team chat;
  not committed as binary files)
- This decision record
- #284
- PR #283/#294 and their CI runs

## 6. Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | 2026-11-09 | Recorded the asynchronous Week 5 decision: P0 ratification, scope freeze, compressed sequence, close-out owners and format; 9/10 explicit AGREE, 0 OBJECT | R1 |
