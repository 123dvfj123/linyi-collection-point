# Design review: architecture, database, API and UI

| Field | Detail |
|---|---|
| Task | T-20-08 |
| Version | v1.0 |
| Date | 2026-10-15 |
| Form | Asynchronous document review. No meeting was convened and no recording exists |
| Chair | R6 (Hu QingKai) |
| Minutes taken by | R6, from the repository as it stands on 2026-10-15 |
| Reviewers | R1, R2, R3, R4, R5, R6, R7, R8, R10 |
| Sprint | Sprint 1, week 2, the design baseline review |
| Related | [ERD.md](../../02-design/database/ERD.md), [openapi.yaml](../../03-api/openapi.yaml), [backend-state-machines.md](../../02-design/backend-state-machines.md), [PLAN.md](../plans/PLAN.md), [change log](../change-log.md), [issue #98](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/issues/98) |

This review closes `T-20-08`. `PLAN.md` schedules a design review meeting covering
architecture, database, API and UI, with the findings recorded; this document is
that record.

It was run as a document review rather than a meeting. The four checklists below
were circulated, and the findings were taken from the artefacts themselves and
from the points members had already raised on pull requests. Where a finding is a
member's declaration, the pull request is named. **No finding is attributed to a
person who has not spoken in the repository**, and no attendee list is claimed
for a meeting that did not take place.

## 1. Agenda

1. Review the architecture baseline.
2. Review the database baseline.
3. Review the API contract.
4. Review the UI baseline.
5. Record the findings with an owner and a close date.

## 2. What was reviewed, and against what

| Area | Reviewed | Checklist |
|---|---|---|
| Architecture | `ADR-002`, `ADR-003`, the M1-M10 module table and the `docs/02-design/uml/` sources | layered structure, module boundaries, dependency direction, system context |
| Database | `ERD.md`, `backend-state-machines.md` and the four state diagram sources | entities, keys, unique constraints, indexes, status values, concurrency |
| API | `openapi.yaml`, `frontend-api-dependencies.md` | path completeness, request and response shapes, error shape, security scheme, requirement traceability |
| UI | `ui-prototype.md`, `design-system.md`, `high-fidelity/`, `frontend-page-map.md` | the four roles, states, breakpoints, accessibility, token use |

## 3. What the review confirmed

These passed and need no action. They are recorded because a review that only
lists problems does not show what was checked.

| Area | Checked | Result |
|---|---|---|
| Database | `Parcel.status` | `registered / shelved / collected` in the ERD, the state diagram and the contract enum. They agree with CR-006 |
| Database | Exception values | the five values `overdue, damaged, wrong_recipient, refused, lost` in the ERD, the class diagram, the SRS and the contract. They agree with CR-010 and CR-011 |
| Database | Exception lifecycle | `open -> processing -> resolved` in the ERD, the state diagram and the contract. They agree with FR-24 |
| Database | Concurrency | `Parcel.expectedVersion`, the unique constraints on the waybill and the pickup code, the partial constraint on `Location.parcelId` and the idempotent handover are all written down with the failure each one prevents |
| API | Validation | the contract passes the Redocly linter with 0 errors. The remaining warnings are style: missing operation ids, missing 4xx responses and two schemas declared ahead of an endpoint |
| API | Error shape | a success payload is flat and only a failure is wrapped in `ErrorResponse`, which is the correction ADR-002 needed and the shape `frontend/src/api/http.js` implements |
| API | Security | the handover operator comes from the session and the request body carries no `operatorId`, per CR-007 |
| API | Requirement values | the contract's enums were compared value by value with SRS chapter 3 (PR #114), which is what the contract had been waiting for. `Parcel.status` (`registered`, `shelved`, `collected`), exception `type` (the five CR-010 values `overdue`, `damaged`, `wrong_recipient`, `refused`, `lost`) and exception `status` (`open`, `processing`, `resolved`) agree with chapter 3 in the ERD, the four state machines and `openapi.yaml`. Location status, pickup-code status and handover result are not defined in chapter 3; their source is the ERD, and the state machines and the contract match it (`available / reserved / occupied / disabled`, `active / used / expired / revoked`, `collected / returned / exception`) |
| Architecture | Decisions | ADR-002 to ADR-005 are `Accepted` with a date, and ADR-005 no longer contradicts itself |
| UI | Tokens | the high fidelity pages link `tokens.css` instead of copying it, so they cannot drift from the design system |
| UI | Colour independence | `design-system.md` section 14, and the status tags carry a label as well as a colour |

## 4. Findings

Six findings. Two of the six that were on the initial checklist
(`/my-parcels` having no contract support, and the old palette in `AppLayout.vue`)
were closed during the review itself, because both were fixed while this review
was being written: CR-013 for the first, and PR #115 for the second. They are
kept in the table with their resolution so the review shows what changed, rather
than being quietly dropped.

| # | Area | Finding | Owner | Close by | Status |
|---|---|---|---|---|---|
| F1 | API | Two contract gaps remain open in issue #98. A parcel that is already `registered` cannot be given a storage location, because `POST /parcels` sets `locationId` only at creation and `PATCH /parcels/{id}/status` carries only `status`, `expectedVersion` and `reason`; and there is no verification path when a resident has lost the pickup code, because `POST /pickup/verify` accepts only `pickupCode`. These are the prototype's CD-1 and CD-2 | R6 with R2 | scope ruling by 2026-10-22 | Open. Recorded, not fixed: both change the shape of the frozen contract, so they need a scope decision before an endpoint |
| F2 | API | `frontend-page-map.md` and `user-journey-maps.md` mark `/my-parcels` and `/my-parcels/:id` as P0 resident pages, but the Sprint 2 contract had no resident-facing endpoint: `GET /parcels` is scoped to staff, owner and admin | R2 (scope), R6 (contract) | closed 2026-10-15 | **Closed.** R2 ruled that the resident read path belongs to Sprint 2 and it is recorded as CR-013 (Approved). The contract now carries `GET /my-parcels`, `GET /my-parcels/{id}` and `GET /my-parcels/{id}/pickup-code` |
| F3 | UI | `frontend/src/views/LoginView.vue` line 110 uses the raw colour `#fff` instead of a token | R4 | 2026-10-22 | Open. `design-system.md` sections 4 and 5 require colour to come from tokens only |
| F4 | UI | `frontend/src/components/AppLayout.vue` still used the skeleton's placeholder palette instead of the design tokens | R4 | closed | **Closed.** PR #115 merged; the component now uses `--color-surface`, `--color-border`, `--color-text` and the other semantic tokens |
| F5 | UI | `--color-surface-alt` is defined in `frontend/src/styles/tokens.css` line 46, but only the high fidelity mock uses it (`hi-fi.css` line 290). `design-system.md` line 114 records it as reserved and unused | R4 | 2026-10-22 | Open, low. Either the first component that needs a slate panel uses it, or a later revision of the design system removes it. It is not a defect in the mock |
| F6 | UI | The 375 px breakpoint was not verified on the high fidelity pages. `high-fidelity/README.md` records it as a known limitation | R4, R5 | Sprint 2 | Open, accepted. The mobile rules exist in `design-system.md` sections 11 and 13; they have to be checked against built components, where the shell and the long counter labels are no longer hard-coded |

### 4.1 Two further inconsistencies found while reviewing, outside the checklist

| Area | Finding | Owner |
|---|---|---|
| Design | The zone values in the repository do not agree with each other. `glossary.md` line 33 and `ui-prototype.md` line 99 name large-item, small-item, perishable and long-stay; the high fidelity pages use Zone A to Zone D. Both are examples of a label and neither is frozen, and `Location.zone` is a free string in the ERD and the contract. Nothing is broken, but the recommender has to say what it does with the value, so the set needs to be fixed before M3 is implemented | R7 (`PLAN.md` T-42-03 gives R7 location management including zones) |
| Management | `PLAN.md` T-42-02 describes the recommender as "size filter, zone priority, turnover score, safe under concurrency". A turnover score is a scored ranking, and **CRJ-001 rules out a complex scoring algorithm**. ADR-004 and `location-recommender.md` implement a deterministic rule instead | R1, R2. The ruling wins; the plan line needs correcting |

## 5. Decisions

| # | Decision |
|---|---|
| D21 | The architecture, database, API and UI baselines are accepted as the review baseline for Sprint 2. The eleven checks in section 3 passed and are what the review verified |
| D22 | The resident read path is part of Sprint 2 and the contract carries it, per CR-013. `GET /my-parcels` returns the caller's own parcels only and the pickup code is delivered by its own path, so a sensitive value is not put into a list |
| D23 | The location recommender is a deterministic, read-only suggestion and is never applied automatically. CRJ-001 rules out a scored ranking, and 0 of 7 staff in S4 asked for the feature, so it stays a `Should` |
| D24 | R7's storage location rule table ([location-recommender-rules.md](../../02-design/location-recommender-rules.md), PR #122) is accepted as the order T-42-02 implements, including the exact-fit, cold/normal/hot and code tie-breaker steps it proposed. ADR-004 is amended to record the same order, and the `LOCATION_UNAVAILABLE` conflict on a stale suggestion is agreed behaviour that stays out of the frozen contract until a change record approves it |
| D25 | The three points R7 asked about in the rule table are answered. The 20 % and 80 % thresholds are accepted as written. If `LOCATION_UNAVAILABLE` is approved it takes the shape of the existing `409` with `code: LOCATION_UNAVAILABLE` on `POST /parcels` - the operation that accepts `locationId` - and `POST /parcels/batch` needs no change because `rejected[].reason` already reports a refused entry. `Location.parcelId` is implemented as a partial unique index (`unique (parcelId) where parcelId is not null`, ERD line 129, the RSK-08 defence), not an ordinary unique column and not an ordinary foreign key |

## 6. Actions

| Action | Owner | Due |
|---|---|---|
| Take a scope ruling on the two gaps in issue #98 and record it, or leave both in Sprint 3 | R2 with R6 | 2026-10-22 |
| Replace the raw `#fff` in `LoginView.vue` with a token | R4 | 2026-10-22 |
| Decide whether `--color-surface-alt` is used or removed, and record the answer in `design-system.md` | R4 | 2026-10-22 |
| Verify the 375 px breakpoint against the built shell and counter labels | R4, R5 | Sprint 2 |
| Fix the zone value set and record it with the storage location design | R7 | before M3 is implemented |
| Correct the `turnover score` wording in `PLAN.md` T-42-02, or record why a score is acceptable after all | R1, R2 | 2026-10-22 |
| Take R7's answer on the zone values, which the recommender design note of 2026-10-15 leaves open as its last open design point | R6 | 2026-10-18 |
| ~~Move `location-recommender-rules.md` from `Status: Proposed` to `Accepted`, or retire one of the two recommender documents~~ Done 2026-10-15: R6 moved the file to `Status: Accepted` and ruled that it, not the 2026-10-15 design note, is the normative rule table | R6 | done |
| Raise the change record that lets `POST /parcels` answer a claimed location with the existing `409` and `code: LOCATION_UNAVAILABLE`, so T-42-02 can return it without an undocumented code | R1 with R2 and R6 | before T-42-02 |
| Write the partial unique index on `Location.parcelId` (`unique (parcelId) where parcelId is not null`, ERD line 129) into the first Flyway migration, so the one-parcel-per-location property holds from the first schema version rather than a later one. The index does not depend on the `LOCATION_UNAVAILABLE` wording and must not wait for it | R7 | with T-30-03, before T-42-02 |
| On the counter screen, treat the suggested location as a hint: show the conflict and take a new suggestion instead of silently retrying against another shelf | R5 | with T-42-07 |

## 7. Why this review was asynchronous

`PLAN.md` schedules `T-20-08` in week 2 as a meeting. The four baselines were
already merged and under review in pull requests, so a meeting would have had the
same content read aloud. The checklists were circulated instead and the findings
were taken from the artefacts, which is why every row above names the file or the
pull request it came from rather than a speaker.

If the group prefers a synchronous review, this document should be reissued with
the real attendee list and the discussion. The findings would not change: every
one of them is a statement about a file.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | 2026-10-15 | Initial record. The review was run as a document review over the four merged baselines | R6 |
