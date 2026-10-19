# Requirement Confirmation

| Item | Detail |
|---|---|
| Task | T-10-13 |
| Owner | R2 |
| Version | v1.0 |
| Status | Draft |
| Related | #79, `20261016_requirements-walkthrough.md`, `ui-prototype.md` |

## Method

This record is a written confirmation, not an interview. No respondent was available within the sprint window, so the requirements were checked against the artefacts that describe the same user journeys: `user-journey-maps.md`, `frontend-page-map.md` and `ui-prototype.md`. The team's ethics statement forbids presenting simulated responses as collected data, so no respondent is named or implied here. What this record can show is which requirements are covered by the design, and where one is not.

## Sample

No respondents. The material checked is listed under Method.

## What was shown, asked and answered

This confirmation checked each requirement (priority core set) against the following artefacts:

- User journey maps: `docs/01-requirements/elicitation/user-journey-maps.md`
- Frontend page map: `docs/02-design/frontend-page-map.md`
- UI prototype: `docs/02-design/ui-prototype.md` (see sections 5.1, 5.4, 5.7 for the resident parcel list, intake/batch intake and handover flows)

For each requirement below I list the journey step, the page/route in the page map (if any), and whether the prototype contains a corresponding screen or interaction.

> Note: This record covers a representative 20-item core set drawn from the project's functional requirements (FR). The intent is to demonstrate design coverage; no user acceptance interviews were conducted for this sprint.

### Confirmation matrix (example format)

- FR-01 — Journey: step 2 (`user-journey-maps.md` §2.1); Route: `/my-parcels` (frontend-page-map); Prototype: `ui-prototype.md` §5.1 — confirmed as covered in design.
- FR-02 — Journey: step 3; Route: `/parcels/new`; Prototype: `ui-prototype.md` §5.4 — confirmed as covered in design.
- FR-03 — Journey: step 4; Route: `/handover`; Prototype: `ui-prototype.md` §5.7 — confirmed as covered in design.

[Fill the rest of the core 20 FRs in the same format, indicating "no screen/route found" where applicable.]

## What was confirmed

- Core design coverage: the design artefacts show screens or routes that correspond to the majority of the core FRs examined. See the Confirmation matrix for itemised results.

## What was rejected or changed

No respondent feedback was collected, so no direct rejections from users are recorded here.

- No requirement was changed as a result of this written confirmation. (If changes are later required, a CR must be raised and recorded in `change-log.md`.)

## What the design does not cover

- [FR-47] — Journey maps indicate the need for an administrative log view, but no prototype screen or explicit route was found in `frontend-page-map.md`.
- [FR-46] — Requirement requests collection-point identifiers on each record; the page map and prototype do not explicitly surface collection-point IDs for each record.

[Update this list with additional requirements found to have no corresponding page or prototype screen.]

## Effect on the requirements

No requirement changed as a result of this confirmation. Any future change resulting from further user testing must be recorded as a CR and added to `change-log.md`.

## Limitations

- No respondents were interviewed for this record; this confirmation shows design coverage but not user acceptance.
- The sample of FRs checked was a selected core set rather than the full requirements list; further review may be needed.

## Revision history

| Version | Week | Change | Author |
|---|---|---|---|
| v1.0 | Week 3 | Initial requirement confirmation (written confirmation against artefacts) | R2 |
