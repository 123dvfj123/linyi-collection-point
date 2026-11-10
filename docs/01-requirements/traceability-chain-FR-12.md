# Traceability chain — FR-12 (staff registers a single arriving parcel)

This note records one requirement-to-test chain for review, as asked in
[#286](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/issues/286).
Each hop was checked against the current `develop` tree
(`75f3fb16402ab3080a8e7e3f1578073d2406d3c5`) on 2026-11-10. No requirement
text, design artefact, or implementation status was changed to fit this chain.

FR-12 is the preferred chain: the OpenAPI path, controller, service, and
integration test are all present, and the latest `develop` CI run executed the
test class with no failures or skips. FR-21 remains `designed` in the RTM and
was not used.

## Chain

| Hop | Artefact | Location / identifier |
|---|---|---|
| Requirement | SRS FR-12 | `docs/01-requirements/specification/SRS.md` Chapter 3: "The system shall allow an authenticated staff member to register a single arriving parcel at their assigned collection point." Priority in SRS v0.11: `Must (approved)`. |
| Design | Staff intake sequence | `docs/02-design/uml/sequence-staff-intake.puml`: `UI -> API : POST /parcels (trackingNo, carrier, size, locationId)`, then insert and `201 Parcel` (or `409 Conflict` on a duplicate waybill). Supporting design already cited in the RTM includes `docs/02-design/uml/activity-parcel-intake.puml`, `docs/02-design/uml/state-parcel-lifecycle.puml` (`[*] --> Registered : register parcel`), and `docs/02-design/uml/usecase-counter-work.puml` (`UC_Register`). |
| Contract | `POST /parcels` | `docs/03-api/openapi.yaml`: servers url `/api`; path `/parcels` `post`. Summary "Register an incoming parcel". Description names IS-2 and FR-12. Responses include `201` and `409` (`DUPLICATE_TRACKING_NO`, FR-17). When `locationId` is supplied, the same operation also shelves the parcel and issues a pickup code (FR-14, FR-21). |
| Implementation | Controller then service | `backend/src/main/java/com/group23/parcel/ParcelController.java`: class mapping `/api/parcels`; `@PostMapping` `register(...)` returns HTTP 201 and calls `ParcelRegistrationService.register`. Service: `backend/src/main/java/com/group23/parcel/ParcelRegistrationService.java`, method `register(ParcelCreateRequest, AuthenticatedUser)`. |
| Test | Integration class | `backend/src/test/java/com/group23/parcel/ParcelRegistrationIntegrationTest.java`. The RTM reserves `TC-PARC-001` for FR-12; that identifier is a reserved test case ID, not itself an executed CI result. The executed evidence is this class. Methods that exercise `POST /api/parcels` for single-parcel registration include `createsParcelAndWritesOneMaskedAuditEntry`, `databaseUniqueConstraintRejectsADuplicateTrackingNo`, `registersAndShelvesWithPickupCodeInOneRequest`, and `rejectsALocationOwnedByAnotherCollectionPoint`. The same class also contains two `POST /api/parcels/batch` methods, which belong to FR-18 rather than FR-12. |
| CI | Latest successful `develop` run | [42803306061](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42803306061), push of `75f3fb16402ab3080a8e7e3f1578073d2406d3c5` (merge of PR #318). All five jobs succeeded (frontend, docker-smoke, commitlint, sanity, backend). The backend job ran `./mvnw -B verify` and reported `Tests run: 6, Failures: 0, Errors: 0, Skipped: 0 -- in com.group23.parcel.ParcelRegistrationIntegrationTest`, with a suite total of 90 tests, 0 failures, 0 skipped, and `BUILD SUCCESS`. Backend job: [129786049385](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42803306061/job/129786049385). |

The FR-12 status cell in `docs/01-requirements/RTM.md` still reads
`implemented (ParcelRegistrationIntegrationTest; CI 41977146617)` and was not
edited in the v0.7 label sync. Run
[41977146617](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/41977146617)
is a successful `develop` push from 2026-11-05 (merge of PR #298). Both that
run and 42803306061 are green; this chain uses the current `develop` run.
Run [42465249204](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42465249204)
also succeeded, but it is a `pull_request` event on branch `w05r81`, not a
`develop` push, so it is not used as the current develop evidence.

## Validation evidence asked for by #286

Issue #286 asks to record the requirements walkthrough and the three
prototype-confirmation respondents as validation evidence. The records exist
in the repository. Personal names do not, and none are added here.

| Record | Where | What is evidenced |
|---|---|---|
| Requirements walkthrough | `docs/05-management/minutes/20261016_requirements-walkthrough.md` (2026-10-16) | Internal walkthrough of CR-003, CR-004, CR-005 and CR-006 using the course validity, consistency, completeness, realism and verifiability checks. |
| Prototype confirmation with three respondents | `docs/01-requirements/elicitation/20261019_requirement-confirmation.md` (current header: Version v1.6, Task T-10-13, Owner R2) | The method section describes a walkthrough with three respondents, shown the resident parcel list, the staff intake screen and the pickup screen. The sample table identifies them only as Respondent 1 (resident, 25 minutes), Respondent 2 (staff, and a resident, 15 minutes) and Respondent 3 (resident, 15 minutes): one staff member and two residents, described as a convenience sample. FR-12 appears in the confirmation matrix as Covered (intake single parcel / staff counter quick intake workflow; journey `user-journey-maps.md` §3.3, route `/parcels/new`, prototype `ui-prototype.md` §5.4). |
| Sprint 1 review summary | `docs/05-management/minutes/20261022_sprint1-review.md` | Repeats the same three-respondent sample and records that observations were checked against the files rather than accepted as written. |

Issue #286 (body and its comments) does not name the three respondents either.
The confirmation record and `docs/05-management/ethics-statement.md` require
that respondents are identified by role and relevant experience, never by
name. No named individuals are therefore claimed, and none have been
invented.

## Out of scope of this note

This chain does not change RTM implementation statuses. FR-11 remains
`not implemented (Sprint 3 gap — #289)`. FR-21 remains `designed`.
