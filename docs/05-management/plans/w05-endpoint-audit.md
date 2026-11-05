# T-42-04 endpoint audit for R3 and R2

Reviewed the controller annotations on `ec62be0` against [OpenAPI](../../03-api/openapi.yaml) and the [RTM](../../01-requirements/RTM.md). Paths below follow the API base `/api`.

| Controller | Mapped operations | RTM coverage |
|---|---|---|
| Health | GET /health | Operational smoke check |
| Auth | POST /auth/login | FR-1, sign-in |
| Parcel | POST /parcels, POST /parcels/batch, PATCH /parcels/{id}/location | FR-12, FR-14, FR-16 and FR-17, intake and shelving |
| Location | GET /locations, PATCH /locations/{id}/status | FR-15 and FR-16, availability and manual selection |
| Pickup | POST /pickup/verify, POST /pickup/confirm | FR-21, FR-22 and FR-25, verification and audited handover |

## Five parcel operations without a controller

| OpenAPI operation | Affected RTM rows | What is missing |
|---|---|---|
| GET /parcels | FR-11, FR-27, FR-28, FR-34 | Staff/owner parcel list and point scoping |
| PATCH /parcels/{id}/status | FR-4 | Generic status update. Shelving is served by PATCH /parcels/{id}/location |
| GET /my-parcels | FR-2, FR-4 | Resident-scoped list with current status |
| GET /my-parcels/{id} | FR-3, FR-5 | Resident-scoped detail and location |
| GET /my-parcels/{id}/pickup-code | FR-8 | Authenticated resident retrieval |

The sixth unmatched OpenAPI operation, POST /locations/recommend, is deferred under CR-023 (FR-19/20, Could). Other Must rows without specified operations, including notifications and reporting, are separate RTM gaps.

Only the shelving service passes the issued credential to `ParcelResponse.from(parcel, code)`. Registration with a location delegates to that service. The single-argument factory supplies null, including for the parcel summary in pickup verification. The verification envelope separately echoes the code the staff member submitted. Staff and resident parcel list/detail handlers are absent on this revision, so their payloads cannot be verified at runtime. The security matcher and `AuthSecurityIntegrationTest` both include staff PATCH access to the parcel location route.

The [develop CI run](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/41977146617) recorded 90 passing tests, including the named registration transaction, ordered migrations, V4 used-code preservation, the parcel/code reference checks and the three concurrency cases added by PR #299.

Local Maven verification on 4 November passed 87 tests; after PR #299, the suite is 90 tests with 35 test cases in seven Testcontainers classes.
