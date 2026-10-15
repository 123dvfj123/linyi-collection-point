# ADR-004: Location Recommendation

- Status: Accepted
- Accepted: 2026-10-12
- Date: 2026-10-10
- Owners: R6 Backend Lead, R7 Backend Developer

## Context

When a staff member registers an incoming parcel, the system should suggest an available location based on parcel size and current occupancy.

## Decision

Implement the recommendation as a deterministic service rule:

1. Find locations with status `available`.
2. Filter locations whose size is at least the parcel size.
3. Prefer the same zone as the last similar parcel if supplied.
4. Prefer the least recently updated available location.
5. Return one recommended location with a short reason.

If no location is available:

- Return HTTP 200 with `recommendedLocation = null`.
- Return `reason = "no_location_available"`.
- Let the frontend show a no-available-location message and offer manual assignment.

## Alternatives Considered

### Complex scoring algorithm

Rejected for the first release. A deterministic rule is easier to test and explain.

### Returning an error when no location is available

Rejected. "No location available" is a normal business state, not a server error.

## Consequences

- The recommendation is predictable and testable.
- The frontend does not need to know business rules.
- The endpoint remains stable even if the ordering rules change later.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 1 | Initial decision: a deterministic rule, not a complex scoring algorithm | R6 |
| v1.1 | Week 2 | Consequences section reworded: the rule is an ordering, not a score. Confirmed against CRJ-001 and `location-recommender-rules.md` (CR-016) | R1 |
