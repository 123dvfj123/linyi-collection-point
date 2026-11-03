# Defect Log

This document records all defects found during testing.

| Item | Detail |
|---|---|
| Version | v1.1 |
| Status | Active |
| Owner | R8 |

The format and severity rules were defined in Sprint 1, before any code existed.
The log stayed empty through Sprint 2 because the tests were passing; the Week 4
reachability review then found the first real P0 defects by tracing the running
path rather than by adding another happy-path test.

## Why create the template before the first bug?

Creating `defect-log.md` in advance has three benefits:

1. **No need to invent a format later**: testers can copy the table and fill in the data.
2. **Unified severity rules**: P0 is fixed on the same day, and P1 is fixed within the sprint.
3. **Enforced closure**: closing a defect must reference a test that changed from failed to passed.

The first entries below show the rule in use.

## Defect Severity Rules 

| Severity | Meaning | Response |
|---|---|---|
| **P0** | The system cannot be demonstrated, or data is corrupted | Fixed before any other work, **same day** |
| **P1** | A must-have requirement does not work | Fixed **within the sprint** |
| **P2** | A should-have requirement does not work, or the workaround is awkward | Scheduled into the **next sprint** |
| **P3** | Cosmetic or a minor inconvenience | Recorded, fixed if time allows |

## Defect List 

| Defect ID | Severity | Week Found | Found By | Related Requirement | Reproduction Steps | Status | Closing Evidence |
|---|---|---|---|---|---|---|---|
| *(Example)* DEF-XXX-000 | *(P0-P3)* | *(Wxx)* | *(Name)* | *(FR/NFR)* | *(Steps)* | *(Open/Fixed/Closed)* | *(TC-XXX-001 or PR #xx)* |
| DEF-PARC-001 | P0 | W04 | R1 reachability review | FR-12, FR-14, FR-21 | Register a parcel through the single-parcel form, choosing a location. The API stores `status=registered` and `locationId`, but never calls the location endpoint or marks the location occupied. A later `PATCH /parcels/{id}/location` rejects the parcel because it already names a location, and pickup verification rejects it because it is not `shelved`. | Fixed, pending integration verification | `ParcelRegistrationIntegrationTest.registersAndShelvesWithPickupCodeInOneRequest`; `ParcelShelvingIntegrationTest.placesARegisteredParcelOnAnAvailableLocation` |
| DEF-PARC-002 | P0 | W04 | R1 reachability review | FR-8, FR-21, NFR-7 | Search production code for `new PickupCode` / `INSERT INTO pickup_codes`: only tests and seed data create codes. A newly shelved parcel therefore has no code to give the resident, and the seed codes expired on 2026-11-01/02. | Fixed, pending integration verification | `PickupCodeIssuanceServiceTest`; `ParcelRegistrationIntegrationTest.registersAndShelvesWithPickupCodeInOneRequest`; `V4__refresh_demo_pickup_codes.sql` |
| DEF-SEC-001 | P0 | W04 | R1 reachability review | NFR-3 | Send `PATCH /api/parcels/{id}/location` as staff. `SecurityConfig` only matched `/api/parcels/*/status`, so the new endpoint fell through to `denyAll` and returned 403 even though the controller method existed. | Fixed, pending CI | `AuthSecurityIntegrationTest` endpoint matrix now includes the location path; `SecurityConfig` matcher added |
| DEF-OPS-001 | P0 | W04 | R1 reachability review | NFR-14 | Run the full Compose stack and open `http://localhost:80`. The frontend image has no Nginx `/api` proxy, so the browser's login request never reaches `backend:8080`; `docker-smoke` only checked the backend directly. | Fixed, pending CI | `frontend/nginx.conf`; `frontend/Dockerfile`; `docker-smoke` now checks health and login through port 80 |
| DEF-DOC-001 | P1 | W04 | R1 document audit | Report quality | Report chapter 7 said 17 test classes / 74 tests and 85.9% coverage as current; chapter 8 said CR-013 added resident endpoints that `openapi.yaml` marks specified and not built. | Closed | Chapters 7 and 8 corrected on 2026-11-03; outline v0.6 records 91 backend methods, historical coverage and the contract-only status of CR-013 |
| DEF-UI-001 | P2 | W04 | Local test run | NFR-13 | Run the full frontend suite from a cold start: `router-guard.spec.js` “lets staff open the pickup page” can exceed the 5 s Vitest timeout; the same test passes when the module cache is warm. | Closed | `vite.config.js` test timeout raised to 15 s; cold-cache run passed 68/68 on 2026-11-03 |

### Status meanings
- **Open** – Logged by QA; not fixed yet.
- **Fixed** – Developer says it is fixed; waiting for QA verification.
- **Closed** – QA verified the failed test case now passes.

**Closing Rule**: A defect is closed **only when a test case that failed now passes**. The test case ID must be referenced in the closing evidence (for example, `TC-PARC-001`).

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Empty template with severity and closure rules | R8 |
| v1.1 | Week 5 | Added the first six real defects from the reachability review and the cold-start test, with reproduction and test evidence | R1 |






