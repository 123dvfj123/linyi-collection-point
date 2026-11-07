# Interim Test Report — Week 5

> **Status: Technical walkthrough (not user acceptance).** System tests 3/3 PASS; R5 manual flow 7/7 PASS. Participant-based acceptance is not complete; #291 remains open. **0 acceptance PASS.**

| Item | Detail |
|---|---|
| Report type | Interim (end of Week 5) |
| Version tested | System tests: commit `30f776b` (w05r81). R5 manual flow verification: baseline `b336754`, tested HEAD `a5f8f24` (documentation-only changes; application source unchanged). Final squash commit / future acceptance build: `6e32f86`. Acceptance: **not complete** — no participant-based acceptance was run in this report. #291 remains open. |
| Report commit | Final report commit `6e32f86`. |
| Environment | GitHub Codespaces, Docker Compose `--profile full`, http://localhost:80 |
| Test period | System tests: 2026-11-06 – 2026-11-07. R5 manual verification (supporting): 2026-11-05. |
| Prepared by | R8 |
| Evidence base | `system-test-report-W05.md`; `[R5 W05] Manual flow verification — registration.txt` |

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

### R5 manual flow verification — supporting evidence, not user acceptance

| Item | Detail |
|---|---|
| Source | `[R5 W05] Manual flow verification — registration.txt` |
| Date | 2026-11-05 |
| Baseline / tested HEAD | `b336754` / `a5f8f24` |
| Note | `b336754..a5f8f24` contains documentation changes only; application source is unchanged |
| Scenarios | 7 |
| Passed | 7 |
| Failed | 0 |

> This is R5 technical/manual flow verification, not participant-based user acceptance. It supports that `/parcels/new` registration UI is implemented and was exercised, and that `/pickup` and `/locations` are implemented and working. It does not replace three participant acceptance observations and provides no participant completion times.

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
| Participant-based acceptance | **Not complete in this report** |
| Open issue | #291 remains open |
| Claim | Do not report “3 acceptance PASS” unless `acceptance-observation-W05.md` contains three first-time participants from R5 #288 (or newly recruited participants) with recorded completion times. |
| Final build for future acceptance | `6e32f86` — any participant acceptance must record this build and measured completion times. |
| Current evidence | R5 manual flow verification is technical walkthrough evidence only. |

## 3. Findings

| ID | Finding | Severity | Status |
|---|---|---|---|
| F-01 | Staff navigation/list UI incomplete: `/dashboard` and `/parcels` list are placeholders. `/parcels/new` (registration), `/pickup` and `/locations` are implemented and working. `/parcels/new` and the pickup flow were exercised in R5 manual flow verification on 2026-11-05 (tested HEAD `a5f8f24`). | Major (scope gap) | Open — Sprint 2 scope |
| F-02 | Shelf released automatically on confirm (`locations.status` → `available`, `parcels.location_id` → `NULL`). Contract does not state this explicitly. | Minor (needs confirmation) | Open — confirm intended |
| F-03 | CI run `42239430380` failed at `commitlint` on commit `9273b705` (message format only, not build/test). This is **not** the system-test run; the system-test run is CI run `42394179858` on PR #301 (all jobs pass). | Minor (process) | Resolved in final commit `6e32f86` |
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
| Participant-based acceptance | Not complete — completion times not recorded | Cannot claim acceptance PASS; #291 remains open. |

## 5. Risks and Open Items

| Item | Type | Next step |
|---|---|---|
| `/dashboard` and `/parcels` list are placeholders | Risk | Team to confirm Sprint 2 / 3 scope. |
| Shelf release on confirm | To confirm | Confirm with R2 / R5 whether intended. |
| Participant acceptance not complete | Open item | Recruit three first-time participants from R5 #288, or newly recruited participants, record completion times; otherwise keep “Technical walkthrough (not user acceptance)” wording and keep #291 open. |
| System-test report placeholders | Resolved | Replaced in `system-test-report-W05.md`: final commit `6e32f86`, CI run `42394179858` (`https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42394179858`). |
| Baseline clarity | Communication | Keep three baselines explicit: system tests at `30f776b`; R5 manual verification tested HEAD `a5f8f24`; final build / future participant acceptance `6e32f86`. |

## 6. Conclusion

**Conditional pass for system tests and technical walkthrough only; user acceptance is not complete.**

- All three system tests pass (3/3) on commit `30f776b`.
- R5 manual flow verification passed 7/7 scenarios on 2026-11-05, tested HEAD `a5f8f24`. This is a technical walkthrough, not user acceptance.
- Final build for any future participant acceptance is `6e32f86`; no participant acceptance has been recorded against it.
- `/parcels/new` registration UI is implemented and was exercised; `/pickup` and `/locations` are implemented and working.
- `/dashboard` and the `/parcels` list remain placeholders (F-01).
- Participant-based acceptance is **not complete**: completion times were not recorded. #291 remains open.
- Do not report “3 acceptance PASS” until three first-time participants have completed the observations **and** completion times are recorded.

## 7. Attachments

- `system-test-report-W05.md` — 3 system tests, full actual results, DB evidence (included in final commit `6e32f86`, CI run `42394179858`)
- `[R5 W05] Manual flow verification — registration.txt` — 7 manual flow scenarios, request IDs, successful registration and pickup-code evidence
- `acceptance-observation-W05.md` — only if it contains real participant evidence with three first-time participants and completion times; otherwise it must not be used as acceptance PASS evidence
- `evidence/` — 9 system-test evidence files; plus R5 manual verification attachment(s)
