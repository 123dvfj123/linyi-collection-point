# Requirement Confirmation

| Item | Detail |
|---|---|
| Task | T-10-13 |
| Owner | R2 |
| Version | v1.1 |
| Status | Draft |
| Related | #79, `20261016_requirements-walkthrough.md`, `ui-prototype.md` |

## Method

This is a written requirement confirmation (Route B from issue #79). No respondents were available within the sprint window, so the requirements listed below were checked against the artefacts that describe the same user journeys: `docs/01-requirements/elicitation/user-journey-maps.md`, `docs/02-design/frontend-page-map.md`, and `docs/02-design/ui-prototype.md`.

Per the project's ethics statement (docs/05-management/ethics-statement.md), simulated interview or survey data must not be presented as collected data; therefore no respondent names or fabricated responses are included. This record therefore documents design coverage of requirements rather than user acceptance.

Scope: a representative core set of functional requirements (20 items) was selected for this confirmation. The selection prioritised requirements that affect the resident parcel flows, intake/batch intake, handover, and administrative views.

How to read the confirmation matrix below:
- Journey: file and section in the user journey maps that reference the requirement (when present).
- Route: frontend route from `frontend-page-map.md` that would implement the requirement (when present).
- Prototype: section(s) in `ui-prototype.md` showing the screen or interaction (when present).
- Coverage: Covered / Partial / Not covered. "Partial" indicates the artefacts show a screen but the interaction or data element (for example collection-point ID) is not present.
- Evidence: short pointer to the artefact location used as evidence.
- Action: whether a CR is recommended, or "No action" if the artefacts already satisfy the requirement.

## Confirmation matrix — core 20 requirements

| FR | Short description | Journey (file §) | Route (frontend) | Prototype (section) | Coverage | Evidence | Action |
|---:|---|---|---|---|---:|---|---|
| FR-01 | Resident parcel list (view own parcels) | user-journey-maps.md §3.2 | `/my-parcels` | ui-prototype.md §5.1 | Covered | Journey + route + prototype §5.1 | No action |
| FR-02 | Intake single parcel | user-journey-maps.md §3.3 | `/parcels/new` | ui-prototype.md §5.4 | Covered | Journey + route + prototype §5.4 | No action |
| FR-03 | Batch intake (multiple parcels) | user-journey-maps.md §3.3 | `/parcels/new` | ui-prototype.md §5.4 (batch mode) | Covered | Journey + prototype §5.4 batch flow | No action |
| FR-04 | Handover / parcel collection flow | user-journey-maps.md §3.1 + §3.3 | `/pickup` | ui-prototype.md §5.6 | Covered | Journey + route + prototype §5.6 | No action |
| FR-05 | Notification of ready-for-collection | user-journey-maps.md §3.2 | Not covered — no dedicated notification route in `frontend-page-map.md` | ui-prototype.md §5.1 (resident list state) | Partial | Notification is described in the resident journey, but no dedicated route or screen exists | CR recommended |
| FR-06 | Search / filter resident parcels | user-journey-maps.md §3.2 | `/my-parcels` | ui-prototype.md §5.1 | Covered | Journey + route + prototype §5.1 | No action |
| FR-07 | Administrative overview of collection points | user-journey-maps.md §3.5 | Not covered — no dedicated overview route in `frontend-page-map.md` | — | Not covered | No matching route or prototype section in the actual artefacts | CR recommended |
| FR-08 | Admin: view logs per collection point | user-journey-maps.md §3.5 | `/audit` | ui-prototype.md §5.9 | Covered | Route + audit log prototype §5.9 | No action |
| FR-09 | Collection-point identifiers on records | user-journey-maps.md §3.4 + §3.5 | `/parcels/:id` and `/audit` | ui-prototype.md §5.2 + §5.9 | Partial | The record and audit screen show parcel facts, but no explicit collection-point identifier field is shown | CR recommended |
| FR-10 | Staff counter quick intake workflow | user-journey-maps.md §3.3 | `/parcels/new` | ui-prototype.md §5.4 | Covered | Journey + route + prototype §5.4 | No action |
| FR-11 | Owner: manage collection point settings | user-journey-maps.md §3.5 | `/settings` | ui-prototype.md §5.8 | Partial | Admin settings exist, but direct owner-managed collection-point settings are not represented as an owner route | Review design ownership |
| FR-12 | Access control: staff vs owner vs resident | user-journey-maps.md §2, §3.2–§3.5 | `/login`, `/dashboard`, `/my-parcels`, `/users`, `/settings` | ui-prototype.md §5.1–§5.9 | Partial | Role-based routes and menu access are represented, but the explicit access-control matrix is not a separate user journey section | Review access model |
| FR-13 | Parcel status history / timeline | user-journey-maps.md §3.4 | `/parcels/:id` | ui-prototype.md §5.2 | Partial | The detail page shows progress state, but not a full history timeline | Consider CR if full timeline is required |
| FR-14 | Export logs / reports (admin) | user-journey-maps.md §3.4 | `/reports` | — | Partial | Reporting exists as a route, but no export or report-generation interaction is shown in the prototype | Review reporting scope |
| FR-15 | Manual override for handover exceptions | user-journey-maps.md §3.3 | `/pickup` and `/exceptions` | ui-prototype.md §5.6 | Partial | Handover verification and exception terminology are shown, but no explicit override workflow is drawn as a dedicated UI | Clarify in design |
| FR-16 | Retention / archive of parcel records | user-journey-maps.md §6 (Open points) | `/settings` | ui-prototype.md §5.8 | Partial | Retention is configurable in settings, but archive/retention workflow is not a full parcel-record lifecycle screen | Review retention policy |
| FR-17 | Audit trail for changes (admin) | user-journey-maps.md §3.4 + §3.5 | `/audit` | ui-prototype.md §5.9 | Covered | Audit log route and page prototype cover the required change trail | No action |
| FR-18 | Batch registration / intake as a first-class workflow | user-journey-maps.md §3.3 | `/parcels/new` | ui-prototype.md §5.4 | Covered | Batch mode is explicitly specified in the staff journey and the prototype | No action |
| FR-19 | Mobile / responsive interactions | user-journey-maps.md §3.2 | `/my-parcels` and `/my-parcels/:id` | ui-prototype.md §5.1 + §5.2 + §8 | Covered | Responsive requirement is explicit in the implementation design for resident mobile flows | No action |
| FR-20 | Error handling & user messages | user-journey-maps.md §3.2–§3.5 | `/my-parcels`, `/pickup`, `/parcels/new`, `/audit` | ui-prototype.md §5.1–§5.9 | Partial | Error and validation states are covered on the key pages, but no single cross-cutting error-handling specification is provided | Consider CR if full coverage is required |

Notes:
- Rows marked "Not covered" or "Partial" are the outcome of comparing the user journeys, page map and prototype; they indicate either a gap in the design artefacts or an interaction that is implied rather than fully specified.
- The intent of this confirmation is to record design coverage and follow-up actions, not to claim user acceptance without respondents.

## What was confirmed

- The design artefacts provide explicit screens or routes for the principal resident workflows (parcel list, intake, handover) and for staff intake. These cover the majority of the core items examined.

## What was rejected or changed

- No respondent feedback was collected, so no direct rejections from users are recorded in this file.
- No requirement was changed as a result of this written confirmation. Any future change resulting from user testing must be recorded as a CR and added to `change-log.md`.

## What the design does not cover (summary)

- Administrative views and export/reporting (e.g. admin logs, reports) — design artefacts do not show screens or routes.
- Explicit collection-point identifiers on each record — prototype does not surface these fields.
- Some owner/management flows are not present in the page map or prototype.

## Effect on the requirements

No requirement changed as a result of this confirmation. Where the matrix marks "CR recommended" or "Design needed", a CR should be opened and the change logged in `change-log.md`.

## Limitations

- This is a written confirmation: no respondents were interviewed. The record shows design coverage, not user acceptance.
- The core set reviewed is a selected sample (20 FRs) chosen to cover the most impactful user journeys; it is not an exhaustive review of all FRs.

## Next steps (recommended)

1. For rows marked "Not covered" or "Partial", raise CRs to specify the missing screens/data elements and link them back to the affected FR IDs.
2. If the team prefers to meet the original acceptance criterion requiring three respondents, run the short interview script (five questions) with three appropriate respondents and update this file with counts-only responses.
3. Once CRs are raised and implemented, re-run this confirmation against the updated artefacts and update the revision history.

## Revision history

| Version | Week | Change | Author |
|---|---|---|---|
| v1.0 | Week 3 | Initial requirement confirmation (written confirmation against artefacts) | R2 |
| v1.1 | Week 3 | Wording refined; added confirmation matrix and next steps | R2 |