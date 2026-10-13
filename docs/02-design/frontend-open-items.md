# Frontend open items from the Sprint 2 contract review

| Item | Detail |
|---|---|
| Status | Working list, not a contract |
| Owner | R4 Frontend Lead, with R5 |
| Raised | 2026-10-13, from R6's Sprint 2 contract note and R4's read of the contract |
| Source of truth | `docs/03-api/openapi.yaml`. The rows below are what the frontend needs from it |

These are the points that surfaced while aligning the frontend with the Sprint 2
contract (OpenAPI v0.2.0-draft). They are recorded here so the decision can be
revisited in one place instead of being buried in a chat message. Every row
names who decides and which file changes when it is decided.

| # | Item | Why it matters to the frontend | Decision / owner | File to change later |
|---|---|---|---|---|
| 1 | The contract has no resident self-service endpoint (`GET /my-parcels`, pickup code, notifications), while `frontend-page-map.md` lists `/my-parcels` and `/my-parcels/:id` as P0 | Those two pages cannot be built against the contract; they are mock or blocked | R2 (scope) with R6 | `docs/03-api/openapi.yaml`, `docs/02-design/frontend-page-map.md` |
| 2 | `Parcel` responses carry only `id, trackingNo, status, size, locationId, expectedVersion` | Staff cannot match a parcel to a resident in a list or detail view, and there are no timestamps for the audit view | R6, before implementation | `docs/03-api/openapi.yaml`, `docs/03-api/frontend-api-dependencies.md` |
| 3 | `/locations` returns a bare array while `/parcels` returns `PagedParcels` | Two list shapes for the frontend to handle | Accepted for Sprint 2; note it in the contract | `docs/03-api/openapi.yaml` |
| 4 | `POST /parcels/batch` answers `created[]` plus `rejected[{ index, trackingNo, reason }]` | The batch registration screen must show a per-row error and must not fail the whole batch | R5 implements; the UML does not show it yet | `docs/02-design/uml/activity-parcel-intake.puml` |
| 5 | The intake sequence diagram does not show `POST /locations/recommend`, although the UML README indexes it | The recommendation is only a suggestion that staff may ignore, so the diagram should show it or the index should drop it | R4 | `docs/02-design/uml/` |
| 6 | Parcel status (`registered/shelved/collected`), exception status (`open/processing/resolved`) and location status (`available/reserved/occupied/disabled`) are stable strings, not labels | `StatusTag` must map every value to one label and one colour, in one place | R4, when `StatusTag` is built | `docs/02-design/frontend-page-map.md` (component map) |
| 7 | `PATCH /parcels/{id}/status` requires `expectedVersion` and answers 409 when it is stale | The detail page must send the version and show a "someone else just changed this" prompt | R5, Sprint 2 | page work; `docs/02-design/frontend-page-map.md` |
| 8 | `POST /pickup/confirm` is idempotent and no longer accepts `operatorId` | The handover button must not double-submit | R4/R5, Sprint 2; the sequence diagram already covers it | page work |

Item 2 is the only one that blocks a Sprint 2 feature page (the staff parcel list
and detail). The others are scope notes or later page work.