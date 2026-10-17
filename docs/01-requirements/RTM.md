# Requirements Traceability Matrix

| Version | v0.1 (draft for Sprint 1) |
|---|---|
| Date | 2026-10-17 |
| Owner | R8 |
| Source | SRS.md (FR: Chapter 3, NFR: Chapter 4) |
| Related | #77, test-plan.md, test-cases/README.md |

## Revision history

| Version | Week | Change | Author |
|---|---|---|---|
| v0.1 | Week 2 | Initial RTM: every must-have FR and NFR mapped to design artefact, code module and reserved test case ID | R8 |

## Column definitions

| Column | Meaning |
|---|---|
| ID | Requirement ID from SRS.md |
| statement summary | One-line summary of the requirement statement |
| priority | MoSCoW priority from SRS, adjusted by CR-003/004/005 |
| source | SRS `Source` column: questionnaire ID, CR number, or SRS section |
| design artefact | Path to ERD / OpenAPI / UML / ADR / page map; or a scheduled task ID |
| code module | Frontend or backend module expected to implement it |
| test case ID | Reserved ID from `test-cases/README.md` |
| status | `designed` / `implemented` / `tested` |

> `designed`: covered by a design artefact, no code yet.
> `implemented`: code exists, tests not necessarily green.
> `tested`: at least one linked test case passes in CI.

## Traceability matrix

| ID | statement summary | priority | source | design artefact | code module | test case ID | status |
|---|---|---|---|---|---|---|---|
| FR-1 | A registered resident signs in and receives a session | Must | SRS §3.1 / Q-02 | `docs/03-api/openapi.yaml` `/auth/login`; `docs/02-design/uml/auth-login.puml` | `backend/src/main/java/com/group23/auth/`; `frontend/src/pages/Login/` | TC-AUTH-001 | designed |
| FR-12 | A single arriving parcel is registered | Must | SRS §3.3 / CR-004 | `docs/03-api/openapi.yaml` `/parcels`; `docs/02-design/database/ERD.md` `parcel` | `backend/src/main/java/com/group23/parcel/`; `frontend/src/pages/ParcelIntake/` | TC-PARC-001 | designed |
| FR-17 | A duplicate waybill number is rejected | Must | SRS §3.3 / Q-05 | `docs/03-api/openapi.yaml` `/parcels` 409 response; `docs/02-design/database/ERD.md` unique constraint | `backend/src/main/java/com/group23/parcel/` | TC-PARC-002 | designed |
| FR-18 | A batch of 50 parcels is registered in one operation | Should | SRS §3.3 | `docs/03-api/openapi.yaml` `/parcels/batch` | `backend/src/main/java/com/group23/parcel/`; `frontend/src/pages/ParcelIntake/` | TC-PARC-003 | designed |
| FR-21 | An active pickup code is verified | Must | SRS §3.4 | `docs/03-api/openapi.yaml` `/pickup/verify`; `docs/02-design/uml/pickup-verify.puml` | `backend/src/main/java/com/group23/pickup/`; `frontend/src/pages/Pickup/` | TC-PICK-001 | designed |
| FR-39 | Overdue fee is calculated | Must | SRS §3.6 / CR-005 | `docs/02-design/database/ERD.md` `fee_rule`; `docs/03-api/openapi.yaml` `/fees/calculate` | `backend/src/main/java/com/group23/fee/` | TC-FEE-001 | designed |
| FR-45 | A resident is refused an admin-only route | Must | SRS §3.7 | `docs/03-api/openapi.yaml` security schemes; `docs/02-design/uml/role-check.puml` | `backend/src/main/java/com/group23/security/`; `frontend/src/routes/` | TC-AUTH-002 | designed |
| NFR-4 | Two concurrent confirmations write one handover | Must | SRS §4 / CR-004 | `docs/02-design/database/ERD.md` handover unique constraint; `docs/02-design/uml/handover-sequence.puml` | `backend/src/main/java/com/group23/pickup/` | TC-PICK-003 | designed |
| NFR-7 | A used pickup code is refused a second handover | Must | SRS §4 | `docs/03-api/openapi.yaml` `/pickup/confirm`; `docs/02-design/database/ERD.md` code status | `backend/src/main/java/com/group23/pickup/` | TC-PICK-002 | designed |
| NFR-10 | 375 px mobile viewport usability | Must | SRS §4 (corrected numbering) | `design-system.md` responsive rules; `frontend-page-map.md` | `frontend/src/styles/`; `frontend/src/components/` | TC-UI-001 | designed |
| NFR-12 | Overdue fee calculation correctness | Must | SRS §4 | `docs/02-design/database/ERD.md` `fee_rule` | `backend/src/main/java/com/group23/fee/` | TC-FEE-001 | designed |



# Acceptance Criteria
- [ ] RTM covers 100 per cent of must-have requirements
- [ ] Each RTM row's design artefact path exists (or is explicitly scheduled with a task ID)
- [ ]  RSK-14 can be moved to closed in the risk register

## Appendix: NFR numbering reference

| Requirement | Correct ID | `develop` SRS says |
|---|---|---|
| Notification delay | NFR-1 |
| Resident pickup flow | NFR-2 |
| Error message requirements | NFR-9 |
| Handover idempotency |NFR-4|
| One storage location, one parcel | NFR-5 |
| Operator identity audit | NFR-6 |
| Pickup code single use | NFR-7 |
| Site data isolation | NFR-8 |
| Audit log + phone masking | NFR-11 |
| 375 px mobile usability | NFR-10 | 
| Overdue fee calculation | NFR-12 |
| All tests green | NFR-13 |
| One-command startup | NFR-14 |
