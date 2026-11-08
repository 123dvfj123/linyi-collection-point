# Interim Test Report — Week 5

> **Status: Acceptance recorded (R5 #288 first-time users).** System tests 3/3 PASS; acceptance 3/3 PASS from three R5 #288 first-time users, observed by R8. Completion times are estimated from the R5 #288 walkthrough, not measured. #291 remains open pending final test-report sign-off.

| Item | Detail |
|---|---|
| Report type | Interim (end of Week 5) |
| Version tested | System tests: commit `30f776b` (w05r81). R5 manual flow verification: baseline `b336754`, tested HEAD `a5f8f24` (documentation-only changes; application source unchanged). Acceptance: 3/3 PASS — three first-time users from R5 #288, observed by R8. Completion times are estimated from the R5 #288 walkthrough, not measured. #291 remains open pending final test-report sign-off. |
| Report commit | Final report commit at time of writing; see PR #301 checks for the current head. |
| Environment | GitHub Codespaces, Docker Compose `--profile full`, http://localhost:80 |
| Test period | System tests: 2026-11-06 – 2026-11-07. R5 manual verification (supporting): 2026-11-05. Acceptance: R5 #288 walkthrough. |
| Prepared by | R8 |
| Evidence base | `system-test-report-W05.md`; `acceptance-observation-W05.md` (3 first-time users from R5 #288, observed by R8); `[R5 W05] Manual flow verification — registration.txt` |

## 1. Scope

**In scope:**
- Staff parcel lifecycle: register → shelve → verify → confirm (FR-12, FR-14, FR-21)
- Duplicate waybill rejection (FR-12, FR-17)
- Used pickup code rejection and idempotent handover (FR-21, NFR-4, NFR-7)

**Out of scope this phase:**
- Resident read paths (`/my-parcels`, CR-013) — specified and not built
- Batch registration (`POST /parcels/batch`, FR-18)
- Location recommendation (`/locations/recommend`, deferred by CR-023)
- Exception handling (`/exceptions`, FR-23/24, still P1 Proposed)

## 2. Execution Statistics

### System tests

| Metric | Count |
|---|---|
| Planned | 3 |
| Executed | 3 |
| Passed | 3 |
| Failed | 0 |
| Blocked | 0 |
| Pass rate | 100% (3/3) |

### R5 manual flow verification — supporting evidence

| Item | Detail |
|---|---|
| Source | `[R5 W05] Manual flow verification — registration.txt` |
| Date | 2026-11-05 |
| Baseline / tested HEAD | `b336754` / `a5f8f24` |
| Note | `b336754..a5f8f24` contains documentation changes only; application source is unchanged |
| Scenarios | 7 |
| Passed | 7 |
| Failed | 0 |

> R5 technical/manual flow verification supports that `/parcels/new` registration UI is implemented and was exercised, and that `/pickup` and `/locations` are implemented and working. It is supplementary evidence alongside the participant acceptance recorded in `acceptance-observation-W05.md`.

Supporting request IDs from R5 manual verification:

| Scenario | Request ID |
|---|---|
| Duplicate waybill | `eb94a9ca-ccd1-43b8-82d4-afc1db5044d1` |
| Occupied location | `b94c2a67-db1e-4b2d-88d3-973a030627c1` |
| Invalid pickup code | `7505d988-611b-4435-8163-a05427339865` |
| Used pickup code | `6d60e11e-ea4c-4718-a0fd-7c0fd892f013` |

### Acceptance status

| Item | Status |
|---|---|
| Participant-based acceptance | **3/3 PASS** |
| Participants | Three first-time users from R5 #288, observed by R8 |
| Completion times | Estimated from the R5 #288 walkthrough, not measured |
| Open issue | #291 remains open pending final test-report sign-off |
| Evidence | `acceptance-observation-W05.md` |
| Final build | The build used for the R5 #288 walkthrough; see PR #301 checks for current head |
| Claim | Acceptance is reported as 3/3 PASS based on the three first-time users in R5 #288, observed by R8. Completion times are explicitly marked as estimated, not measured. |

## 3. Findings

| ID | Finding | Severity | Status |
|---|---|---|---|
| F-01 | Staff navigation/list UI incomplete: `/dashboard` and `/parcels` list are placeholders. `/parcels/new` (registration), `/pickup` and `/locations` are implemented and working. `/parcels/new` and the pickup flow were exercised in R5 manual flow verification on 2026-11-05 (tested HEAD `a5f8f24`). | Major (scope gap) | Open — Sprint 2 scope |
| F-02 | Shelf released automatically on confirm (`locations.status` → `available`, `parcels.location_id` → `NULL`). Contract does not state this explicitly. | Minor (needs confirmation) | Open — confirm intended |
| F-03 | CI run `42239430380` failed at `commitlint` on commit `9273b705` (message format only, not build/test). This is **not** the system-test run; the system-test run is tracked in PR #301 (all jobs pass). | Minor (process) | Resolved in the final report commit; see PR #301 checks |
| F-04 | `recipientPhone` masked in create response (`138****8888`), not only in list responses. | Info | Accepted |
| F-05 | Occupied-location rejection returns `422 UNPROCESSABLE_ENTITY`, not a location-specific error code. UI message is clear and satisfies current acceptance wording. | Info / contract note | Accepted for current wording; confirm contract intent |

## 4. Coverage Gaps

| Area | Status | Impact |
|---|---|---|
| Staff registration (FR-12) — UI | Covered via `/parcels/new`; API covered by ST-SYS-001/002; R5 manual verification scenario 1 passed. | Registration UI is implemented and was exercised; only `/dashboard` and `/parcels` list remain placeholders. |
| Duplicate waybill (FR-17) — UI | Covered via `/parcels/new`; also API covered by ST-SYS-002; R5 manual verification scenario 4 passed. | None for the registration form itself. |
| Pickup verification / confirm / invalid code / used code | Covered by R5 manual verification scenarios 2, 3, 6, 7. | Supports that `/pickup` and related UI paths are implemented and working. |
| Resident read paths (FR-2/3/8) | Not built | Outside this phase's scope. |
| Batch registration (FR-18) | Not tested | Not exercised this phase. |
| Participant-based acceptance | 3/3 PASS from R5 #288 first-time users (observed by R8) | Completion times are estimated, not measured; #291 remains open pending final sign-off. |

## 5. Risks and Open Items

| Item | Type | Next step |
|---|---|---|
| `/dashboard` and `/parcels` list are placeholders | Risk | Team to confirm Sprint 2 / 3 scope. |
| Shelf release on confirm | To confirm | Confirm with R2 / R5 whether intended. |
| Acceptance timing is estimated, not measured | Note | Completion times for ACC-W05-001 and ACC-W05-003 are estimated from the R5 #288 walkthrough; ACC-W05-002 is also marked estimated. Do not present them as measured values. |
| #291 still open | Open item | Close #291 after `system-test-report-W05.md` CI status is cleaned up and the report is final. |
| System-test report CI status | Resolved | `system-test-report-W05.md` keeps a single CI status without hard-coded commit hash; see PR #301 checks for current status. |
| Baseline clarity | Communication | Keep three baselines explicit: system tests at `30f776b`; R5 manual verification tested HEAD `a5f8f24`; acceptance walkthrough from R5 #288 as recorded in `acceptance-observation-W05.md`. |

## 6. Conclusion

**Conditional pass: system tests 3/3 PASS and acceptance 3/3 PASS from R5 #288 first-time users.**

- All three system tests pass (3/3) on the system-test build (`30f776b`).
- Acceptance is 3/3 PASS based on three first-time users from R5 #288, observed by R8.
- Completion times are estimated from the R5 #288 walkthrough, not measured; this is stated explicitly in `acceptance-observation-W05.md`.
- R5 manual flow verification passed 7/7 scenarios on 2026-11-05 (tested HEAD `a5f8f24`); this is supplementary technical evidence.
- `/parcels/new` registration UI is implemented and was exercised; `/pickup` and `/locations` are implemented and working.
- `/dashboard` and the `/parcels` list remain placeholders (F-01).
- #291 remains open pending final test-report sign-off; close it after the test report CI status is cleaned up.

## 7. Attachments

- `system-test-report-W05.md` — 3 system tests, full actual results, DB evidence; CI status tracked in PR #301 checks.
- `[R5 W05] Manual flow verification — registration.txt` — 7 manual flow scenarios, request IDs, successful registration and pickup-code evidence.
- `acceptance-observation-W05.md` — 3 first-time users from R5 #288, observed by R8; 3/3 PASS; completion times estimated, not measured.
- `evidence/` — 9 system-test evidence files; plus R5 manual verification attachment(s) and acceptance evidence files (`evidence/acceptance-1-db.txt`, `evidence/acceptance-3-db.txt`).
