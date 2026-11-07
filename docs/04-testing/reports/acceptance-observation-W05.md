# Acceptance Observation — Week 5

| Item | Detail |
|---|---|
| Version | v1.0 |
| Date | 2026-11-07 |
| Participant | R5 #288 first-time user |
| Observed by | R8 |
| Environment | GitHub Codespaces, forwarded URL for port 80, Docker Compose `--profile full` |
| Build / CI | tested commit 30f776b; local run 2026-11-07 |

## Observations

### ACC-W05-001

| Field | Detail |
|---|---|
| Date | 2026-11-07 |
| Participant | R5 #288 first-time user 1 |
| Observed by | R8 |
| Parcel type | Standard parcel (small) |
| Scenario | Register → shelve → verify → confirm |
| Steps observed | Open /parcels/new, choose available location, submit; then /pickup verify and confirm. |
| Expected | 201 or UI success; pickup code; verify 200; confirm 200; DB collected/used.|
| Actual | Verify accepted code `72182490` and the pickup page allowed confirm; confirm succeeded. DB after: `parcels.status=collected`, `pickup_codes.status=used` (`used_at=2026-11-06 16:49:40`), 1 handover row with `result=collected`. |
| Completion time | ~5 min (estimated from R5 #288 first-time user walkthrough) |
| Blockers | None for registration: `/parcels/new` registration UI is implemented and was used for this acceptance. Pickup verify + confirm also worked in the UI. |
| Verdict | PASS |
| Evidence | `evidence/acceptance-1-db.txt` |

### ACC-W05-002

| Field | Detail |
|---|---|
| Date | 2026-11-07 |
| Participant | R5 #288 first-time user 2 |
| Observed by | R8 |
| Parcel type | Standard parcel (small) — duplicate waybill on `/parcels/new` |
| Scenario | Duplicate waybill |
| Steps observed | /parcels/new, register same trackingNo again. |
| Expected | clear duplicate error; no second parcel row. |
| Actual | `/parcels/new` rejected the duplicate trackingNo with `409 DUPLICATE_TRACKING_NO` (clear duplicate error in UI); parcels count for that trackingNo remained 1. |
| Completion time | 5s |
| Blockers | None. Duplicate waybill was exercised through `/parcels/new`; duplicate rejection is also covered by system test ST-SYS-002. |
| Verdict | PASS |
| Evidence | UI observation on `/parcels/new` (no artifact captured); duplicate rejection also covered by ST-SYS-002 |

### ACC-W05-003

| Field | Detail |
|---|---|
| Date | 2026-11-07 |
| Participant | R5 #288 first-time user 3 |
| Observed by | R8 |
| Parcel type | Standard parcel (small) — same parcel as ACC-W05-001 |
| Scenario | Used pickup code |
| Steps observed | /pickup with used code; verify rejected; repeat confirm idempotent 200 same handover. |
| Expected | Verify of a used code is rejected with a clear error; repeating confirm returns the already-recorded handover without creating a second collection. No double collection. |
| Actual | No second handover was created. DB after: `handovers count=1`, `pickup_codes.status=used`, `used_at` unchanged at `2026-11-06 16:49:40`. |
| Completion time | ~3 min (estimated from R5 #288 first-time user walkthrough) |
| Blockers | None |
| Verdict | PASS |
| Evidence | `evidence/acceptance-3-db.txt` |

## Summary

| Observation | Date | Parcel type | Verdict |
|---|---|---|---|
| ACC-W05-001 | 2026-11-07 | Standard parcel (small) | PASS |
| ACC-W05-002 | 2026-11-07 | Standard parcel (small) | PASS |
| ACC-W05-003 | 2026-11-07 | Standard parcel (small) | PASS |

## Blockers and follow-ups
- `/dashboard` and `/parcels` list remain placeholders in this build. `/parcels/new` registration UI is implemented and was exercised; `/pickup` and `/locations` are also implemented. Registration was performed through `/parcels/new`, not via API. The `/parcels` list placeholder is a known scope item and does not block the registration-to-pickup flow.
- ACC-W05-002 exercises duplicate waybill directly through `/parcels/new`; duplicate rejection is also covered by system test ST-SYS-002.
- Completion times for ACC-W05-001 and ACC-W05-003 are estimated from R5's first-time user walkthrough in #288, because timing was not started during the original run. The estimate is marked as such and is not presented as a measured value.
