# Frontend API Dependencies

- Status: Draft, aligned with OpenAPI v0.2.0-draft (CR-003, CR-004, CR-006, CR-007). The two endpoints that are needed by the frontend but are outside the Sprint 2 contract are listed under "Endpoints deferred to Sprint 3" instead of in the P0 list.
- Task: T-30-04
- Owners: R4 Frontend Lead, R6 Backend Lead
- Consumers: R4 and R5 frontend implementation
- Base URL: `/api`

## Contract Rules

- The backend owns the final endpoint paths and response fields.
- The frontend must not invent fields before R6 updates the OpenAPI draft.
- Requests and responses use JSON.
- The shared response envelope from ADR-002 is `data`, `error` and `requestId`.
- Dates use ISO 8601 strings in UTC and are formatted in the frontend.
- Parcel sizes use `small`, `medium` and `large`.
- Parcel, location and exception status values are stable strings, not UI labels.
- Endpoint paths in the table omit the `/api` base URL.

## P0 Endpoint List

| Priority | Method and path | Used by | Purpose | Important fields | Status |
|---|---|---|---|---|---|
| P0 | `GET /health` | Development | Service health check | status | In OpenAPI draft |
| P0 | `POST /auth/login` | Login | Login | username, password, token, user.roles | In OpenAPI draft |
| P0 | `GET /parcels` | Parcel list | List and filter parcels | page, pageSize, status, keyword, items, total | In OpenAPI draft |
| P0 | `POST /parcels` | Parcel create | Register an incoming parcel | trackingNo, carrier, recipientName, recipientPhone, size, locationId | In OpenAPI draft |
| P0 | `POST /parcels/batch` | Parcel create | Register a batch of up to 50 parcels | parcels, created, rejected | In OpenAPI draft (raised to must-have by CR-003) |
| P0 | `PATCH /parcels/{id}/status` | Parcel detail | Controlled status update | status, reason, expectedVersion | In OpenAPI draft |
| P0 | `GET /locations` | Dashboard, location board | List storage locations | id, code, zone, size, status, parcelId | In OpenAPI draft |
| P0 | `POST /locations/recommend` | Parcel create | Recommend an available location | size, zone, recommendedLocation, reason | In OpenAPI draft |
| P0 | `POST /pickup/verify` | Pickup workflow | Validate a pickup code | pickupCode, parcelSummary, location | In OpenAPI draft |
| P0 | `POST /pickup/confirm` | Pickup workflow | Confirm handover | pickupCode, result (the operator comes from the session, CR-007) | In OpenAPI draft |

## P1 Endpoint List

| Priority | Method and path | Used by | Purpose | Status |
|---|---|---|---|---|
| P1 | `GET /exceptions` | Exception list | List abnormal parcels | Proposed, needs SRS requirement IDs |
| P1 | `POST /exceptions/{id}/resolve` | Exception detail | Resolve an exception | Proposed, needs SRS requirement IDs |
| P1 | `GET /reports/summary` | Dashboard and reports | Retrieve summary metrics | Proposed, needs SRS requirement IDs |
| P1 | `GET /users` | User management | List staff and resident accounts | Proposed, needs SRS requirement IDs |
| P1 | `GET /audit-logs` | Audit page | List audit records | Proposed, needs SRS requirement IDs |
| P1 | `GET /settings` | Settings page | Load system configuration | Proposed, needs SRS requirement IDs |
| P1 | `PUT /settings` | Settings page | Update system configuration | Proposed, needs SRS requirement IDs |

## Endpoints deferred to Sprint 3

These two endpoints are needed by the frontend, but R6 ruled them out of the
Sprint 2 contract, so they are deliberately not in the P0 list above and must
not be built against yet. They are kept here, with the consequence of their
absence, so nobody has to rediscover it at implementation time.

| Method and path | Used by | Purpose | Important fields | Consequence while the endpoint is missing |
|---|---|---|---|---|
| `GET /auth/me` | App shell | Restore the current session | user.id, user.username, user.roles | Refreshing the page cannot re-validate the session against the server. The shell has to trust the token it kept and treat an HTTP 401 as "session gone" and redirect to `/login`, and the role list is only available from the login response until this endpoint exists |
| `GET /parcels/{id}` | Parcel detail | Retrieve one parcel | id, trackingNo, status, size, locationId, expectedVersion | The detail page has to read the parcel out of a list response it already holds. A direct link to, or a refresh of, the detail page has nothing to load the parcel from until this endpoint exists |

## Status Values Needed by the Frontend

### Parcel

`registered`, `shelved`, `collected` (CR-006). An exception is not a parcel
status; it is a separate record, listed below.

### Location

`available`, `reserved`, `occupied`, `disabled`.

### Exception (`ParcelException`)

`open`, `processing`, `resolved`.

The backend provides the canonical values. The frontend maps them to display labels and colours.

## Shared API Wrapper

Use one Axios instance:

```text
frontend/src/api/http.js
```

The wrapper is responsible for:

- Base URL `/api`.
- JSON request and response handling.
- Authentication header or token injection.
- Response-envelope normalisation.
- Error normalisation to `code`, `message` and `requestId`.
- Redirecting to `/login` on HTTP 401.
- No feature-specific business logic.

Feature-specific calls go in:

```text
frontend/src/api/auth.js
frontend/src/api/parcels.js
frontend/src/api/locations.js
frontend/src/api/pickup.js
frontend/src/api/exceptions.js
frontend/src/api/reports.js
```

## Shared State

Pinia stores are used for data shared across routes:

```text
frontend/src/stores/auth.js
frontend/src/stores/parcels.js
frontend/src/stores/locations.js
```

Pages should not duplicate authentication or parcel-list state.

## Mock Strategy

Until an endpoint is approved, each feature uses a local mock module with the same function name and return shape as the real API. Switching from mock to real API should change the API boundary, not page code.

## Review Checklist Before Implementation

- R6 confirms the final paths, schema fields and response envelope.
- R5 confirms the fields required by each page.
- SRS FR and NFR IDs are linked to the relevant endpoints.
- Status values and error codes are stable.
- Pickup confirmation defines idempotency behaviour.
- Location recommendation defines `recommendedLocation = null` and `reason`.
