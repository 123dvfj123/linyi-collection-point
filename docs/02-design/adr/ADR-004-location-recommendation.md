# ADR-004: Location Recommendation

| Version | v1.1 |
|---|---|
| Status | Accepted |
| Accepted | 2026-10-12 |
| Date | 2026-10-10 |
| Amended | 2026-10-15 (T-20-15): steps 4, 5 and 7 were added and step 3 was restated when R7's rule table, merged in PR #122, was accepted for implementation. The normative rule table is `docs/02-design/location-recommender-rules.md` section 4, and the ruling that accepted it is `docs/02-design/location-recommender.md` section 5 |
| Owners | R6 Backend Lead, R7 Backend Developer |

## Context

When a staff member registers an incoming parcel, the system should suggest an available location based on parcel size and current occupancy.

## Decision

Implement the recommendation as a deterministic service rule:

1. Candidate set: locations at the staff member's assigned collection point with
   status `available`. `reserved`, `occupied` and `disabled` are never suggested.
2. Capacity filter: keep locations whose size rank is at least the parcel's
   (`small` = 1, `medium` = 2, `large` = 3).
3. Zone preference: if a zone was supplied and eligible locations exist in it,
   keep only those; otherwise keep the whole set and treat the zone as not
   decisive, so the preference never empties the candidate set.
4. Exact-fit priority: prefer `rank(location) - rank(parcel) = 0`, then the
   smallest positive excess, so a small parcel cannot occupy a large slot while
   a small slot is free.
5. Cold-zone rotation: when the zone was not decisive, prefer `cold`, then
   `normal`, then `hot`, by the occupancy ratio in
   `location-recommender-rules.md` section 5.
6. Prefer the least recently updated available location (the smallest
   `Location.updatedAt`).
7. Code tie-breaker: prefer the smaller `Location.code`, so the order is total
   and unchanged data always gives the same answer.
8. Return one recommended location with a short reason.

If no location is available:

- Return HTTP 200 with `recommendedLocation = null`.
- Return `reason = "no_location_available"`.
- Let the frontend show a no-available-location message and offer manual assignment.

The endpoint is a read. It performs no write, does not reserve the location and
never applies the suggestion automatically.

## Alternatives Considered

### Complex scoring algorithm

Rejected for the first release. A deterministic rule is easier to test and explain.

### Returning an error when no location is available

Rejected. "No location available" is a normal business state, not a server error.

## Consequences

- The recommendation is predictable and testable.
- The frontend does not need to know business rules.
- The endpoint remains stable even if the ordering rules change later.
- Because a step can order the set but never widen it, the amendment in the
  Amended row above keeps every original guarantee: the rules stay deterministic,
  weighted scoring is still excluded (CRJ-001), and the suggestion is still
  advisory and never applied automatically (CR-004).

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Initial decision: a deterministic rule instead of a weighted scoring algorithm | R6 |
| v1.1 | Week 2 | Decision amended to R7's rule table, merged in PR #122 and accepted as `location-recommender-rules.md` section 4: steps 4, 5 and 7 added, step 3 restated. The consequences were reworded so the rule reads as an ordering rather than a score (CR-016) | R6 |
