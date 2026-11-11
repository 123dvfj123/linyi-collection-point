# W06 demo narration — the 90-second staff slice

| Item | Detail |
|---|---|
| Task | T-60-02 |
| Owner | R2 (Chan Yin Cho) |
| Version | v0.1 |
| Status | Draft — narration only; rehearsal starts 13 November |
| Route | login → register with a location → read the pickup code → verify → confirm |

The narration is written for the recorded `ST-SYS-001` run and for the live UI, which performs the
same five calls. It is 173 words: at 120 to 140 words per minute that is 75 to 87 seconds, inside
the 90-second limit. Each claim has an evidence line, because the weekly sheet forbids "a PR is a
test".

## The narration

| Clock | Say | On screen |
|---|---|---|
| 0:00–0:08 | "This is the staff parcel desk: sign in, register a parcel onto a shelf, take the pickup code, verify it at the counter, confirm the handover." | Login page |
| 0:08–0:18 | "I sign in as `demo_staff_1`. Every endpoint in this flow is role-scoped: a resident account cannot reach any of it." | Login, then the workbench |
| 0:18–0:38 | "I register one parcel: waybill, recipient, phone, size, and an available shelf location. One request does three things — the parcel becomes **shelved**, the location becomes **occupied**, and a **pickup code is issued**." | Intake form, then the success line |
| 0:38–0:52 | "The code appears once, in this response. The contract deliberately does not return it again on later reads, so it is shown here and handed to the resident." | Success message with the code |
| 0:52–1:08 | "At the counter I verify the code. The response shows the parcel and where it is, and no second code — the credential is not echoed back." | Pickup verification screen |
| 1:08–1:25 | "I confirm. The parcel becomes **collected**, the code becomes **used**, the location is free again, and the handover is stored against my signed-in identity." | Confirmation, then parcel state |
| 1:25–1:30 | "That is the whole slice, and it is the slice the system test covers end to end." | Back to the slide |

## Claim → evidence

| Claim in the narration | Evidence |
|---|---|
| Sign-in works and every endpoint in the flow is role-scoped | `openapi.yaml` `POST /auth/login`; `AuthSecurityIntegrationTest` role matrix; `frontend/tests/login-view.spec.js`; `ST-SYS-001` step 1 |
| Registering with a location shelves, occupies and issues a code in one transaction | `POST /parcels` with `locationId`; `ParcelRegistrationIntegrationTest.registersAndShelvesWithPickupCodeInOneRequest`; `CR-034`; `ST-SYS-001-register.txt` (HTTP 201, `status="shelved"`, `pickupCode`) |
| The code is returned once and not on later reads | `ParcelResponse.from(parcel, pickupCode)` is the only issuance path; `openapi.yaml` note on `pickupCode`; `ST-SYS-001-verify.txt` (`pickupCode=null`) |
| Verify returns the parcel and location and no code | `POST /pickup/verify`; `PickupVerificationServiceTest`; `ST-SYS-001-verify.txt` (HTTP 200, `location.status="occupied"`) |
| Confirm collects the parcel, uses the code, frees the location | `POST /pickup/confirm`; `PickupHandoverIntegrationTest`; `ST-SYS-001-confirm.txt`; `ST-SYS-001-db.txt` (`collected`, code `used`, location `available`) |
| The handover is stored against the session identity | `FR-22`, `NFR-6`; `ST-SYS-001-db.txt` (`handovers count=1`); `CR-007` |
| A used or expired code cannot confirm twice | `NFR-4`, `NFR-7`; `ST-SYS-003-confirm-repeat.txt`, `ST-SYS-003-verify-used.txt` |

All ST-SYS files sit in `docs/04-testing/reports/evidence/`; the report that reads them is
`docs/04-testing/reports/system-test-report-W05.md` (ST-SYS-001 PASS).

## If the live demo fails

Do not debug on stage. Switch to the recorded run and say: "The recorded end-to-end run is in
`system-test-report-W05.md`: registration returned 201 with the parcel already shelved and the code
issued, verification returned 200, confirmation returned 200, and the database shows the parcel
collected with the code used." Then open `ST-SYS-001-db.txt`. The verdict is PASS in
`system-test-report-W05.md` v1.2.

## What not to say

- "The resident sees the code in their app." The resident read path is contract-only
  (`CR-013`); the staff side issues it and hands it over.
- "The tests prove the flow." The component tests prove components; `ST-SYS-001` is the public-API
  evidence.
- No invented timing, no invented test count. If a number is asked for, read it from
  `Coverage-Report3.md` or the current `develop` CI run.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v0.1 | 2026-11-11 | First version: 173-word narration with per-claim evidence, a fallback to the recorded run and the wording guardrails | R2 |
