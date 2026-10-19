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
| FR-01 | Resident parcel list (view own parcels) | user-journey-maps.md §2.1 | `/my-parcels` | ui-prototype.md §5.1 | Covered | Journey + route + prototype §5.1 | No action |
| FR-02 | Intake single parcel | user-journey-maps.md §3.1 | `/parcels/new` | ui-prototype.md §5.4 | Covered | Journey + route + prototype §5.4 | No action |
| FR-03 | Batch intake (multiple parcels) | user-journey-maps.md §3.2 | `/parcels/new?batch=true` | ui-prototype.md §5.4 (batch view) | Covered | Prototype shows batch UI | No action |
| FR-04 | Handover / parcel collection flow | user-journey-maps.md §4.1 | `/handover` | ui-prototype.md §5.7 | Covered | Prototype §5.7 | No action |
| FR-05 | Notification of ready-for-collection | user-journey-maps.md §2.2 | `/notifications` | ui-prototype.md §5.1 (indicators) | Partial | Journey indicates notifications; prototype shows indicators but not full notification settings | Consider CR if notification settings required |
| FR-06 | Search / filter resident parcels | user-journey-maps.md §2.3 | `/my-parcels` | ui-prototype.md §5.1 (filters) | Covered | Prototype §5.1 shows filters | No action |
| FR-07 | Administrative overview of collection points | user-journey-maps.md §7.1 | `/admin/collection-points` | — | Not covered | Journey indicates admin view; no route or prototype | CR recommended (design admin view) |
| FR-08 | Admin: view logs per collection point | user-journey-maps.md §7.2 | `/admin/logs` | — | Not covered | No route or prototype | CR recommended (FR-47 relates to this) |
| FR-09 | Collection-point identifiers on records | user-journey-maps.md §6.1 | (various record routes) | Prototype: record screens | Partial | Prototype screens do not surface explicit collection-point ID field | CR recommended (FR-46) |
| FR-10 | Staff counter quick intake workflow | user-journey-maps.md §3.3 | `/staff/intake` | ui-prototype.md §5.4 (staff view) | Covered | Prototype shows staff intake view | No action |
| FR-11 | Owner: manage collection point settings | user-journey-maps.md §8.1 | `/owner/settings` | — | Not covered | No route/prototype found | Design needed |
| FR-12 | Access control: staff vs owner vs resident | user-journey-maps.md §1.1 | (role-based routes) | Prototype indicates role sections | Partial | Role UI present; explicit access control flows not fully documented | Review authentication/authorization design |
| FR-13 | Parcel status history / timeline | user-journey-maps.md §5.2 | `/parcels/:id` | ui-prototype.md §5.1 (detail) | Partial | Some status indicators in prototype; full timeline view not present | Consider CR if timeline required |
| FR-14 | Export logs / reports (admin) | user-journey-maps.md §7.3 | `/admin/reports` | — | Not covered | No artefact found | Design needed |
| FR-15 | Manual override for handover exceptions | user-journey-maps.md §4.3 | `/handover` | ui-prototype.md §5.7 (exception modal?) | Partial | Prototype hints at exception handling but not explicit | Clarify in design |
| FR-16 | Retention / archive of parcel records | user-journey-maps.md §9.1 | `/admin/records` | — | Not covered | No route/prototype | Discuss retention policy & design |
| FR-17 | Audit trail for changes (admin) | user-journey-maps.md §7.4 | `/admin/audit` | — | Not covered | No artefact found | CR recommended |
| FR-18 | Acceptance criteria for feature X (finding) | user-journey-maps.md §X | relevant route | — | Open | Finding FR-18 in walkthrough; draft acceptance criteria needed | Create CR / acceptance criteria (R3 has draft) |
| FR-19 | Mobile/responsive interactions | user-journey-maps.md §2.4 | `/my-parcels` | ui-prototype.md (responsive notes) | Partial | Prototype includes responsive states for some screens | Review responsive completeness |
| FR-20 | Error handling & user messages | user-journey-maps.md §error | Various | ui-prototype.md (toasts/errors) | Partial | Prototype shows some messages; not exhaustive | Complete error messaging design |

Notes:
- Rows marked "Not covered" or "Partial" are the outcome of comparing the journey maps, page map and prototype; they indicate either a gap in the frontend-page-map or the prototype, or an incomplete interaction specification.
- FR-46 and FR-47 are represented above by FR-09 and FR-08/FR-07 respectively; both require follow-up design work (no screen/route found in the artefacts).

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
| v1.1 | Week 3 | Wording refined; added confirmation matrix and next steps | R2 |
| v1.0 | Week 3 | Initial requirement confirmation (written confirmation against artefacts) | R2 |
