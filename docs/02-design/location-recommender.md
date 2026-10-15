# Storage location recommender

| Item | Detail |
|---|---|
| Task | T-20-15 (pair task, decision D18) |
| Owners | R6 Backend Lead, R7 Backend Developer |
| Status | Agreed for Sprint 2. R7's rule table is the normative rule; the zone value set is still open with R7 |
| Contract | `POST /locations/recommend` in `docs/03-api/openapi.yaml` (FR-19, FR-20) |
| Decision | `ADR-004-location-recommendation.md` |
| Constraints | CRJ-001 (no complex scoring), CR-004 (never applied automatically) |
| Data | `Location` in `docs/02-design/database/ERD.md` |
| Evidence | `docs/01-requirements/elicitation/survey-results.md` S4 and S5 |
| Normative rule table | `docs/02-design/location-recommender-rules.md` - R7's rule table, merged in PR #122 and accepted on 2026-10-15. That file holds the rule; this document holds the ruling, the evidence and the rationale |

## 1. What the recommender is for

When a staff member registers an incoming parcel, the counter screen offers one
suggestion for where to put it. The suggestion saves the staff member from
scanning the location board by hand, and nothing more: the staff member decides,
and the system records the location that was actually chosen.

The rule behind `POST /locations/recommend` is R7's rule table in
`location-recommender-rules.md`. This document is the decision record around it:
the ruling R6 gave on that table, the evidence it rests on, and the reasoning
behind each choice. Section 4 reproduces the rule so that this document can be
read on its own, but the normative copy is the one in R7's file. The rule itself
is deliberately small, and section 2 explains why small is the correct answer
here rather than a compromise.

## 2. Why the rule is simple, from the evidence

Two survey questions asked staff about exactly this feature.

| Source | Result | What it means for the design |
|---|---|---|
| S4, most important function | Location recommendation **0 of 7**. Verification 3, handover 3, batch registration 1 | No staff member asked for this. It is a `Should`, approved by CR-004, not a headline feature |
| S5, how should locations be suggested | Always suggest 2; suggest but let me confirm 1; manual only 2; do not suggest 2 | 4 of 7 want to keep control or want no suggestion at all. The feature must be ignorable at no cost |
| CRJ-001 | No complex scoring algorithm | A rule that a tester can read off the page and reproduce |
| CR-004 | The suggestion is never applied automatically | The endpoint is a read. It does not reserve, assign or write |

The conclusion the team drew from the same numbers is in
`survey-results.md` conclusion 7: "Location recommendation is not a priority and
must not be automatic. Reduce to could-have or should-have. Keep the manual
override."

So the design goal is not "the best location". It is "a defensible location,
computed by a rule short enough to explain at the counter and to test with a
handful of fixtures". A weighted score would satisfy the same requirement while
being harder to explain, harder to test, and — from S5 — not wanted.

## 3. Input and output

Request body of `POST /locations/recommend`:

| Field | Required | Values | Note |
|---|---|---|---|
| `size` | yes | `small`, `medium`, `large` | taken from the parcel being registered |
| `zone` | no | a zone label | if the caller has a preference. See section 6 |

Response, always `200`:

| Field | Value |
|---|---|
| `recommendedLocation` | a `Location` object, or `null` when nothing is free |
| `reason` | a short string naming what decided the result, or `no_location_available` |

The contract keeps `reason` free-form, so the wording costs nothing to fix here.
Section 5 ruling 6 records the five values the implementation should use.

The response is a recommendation and nothing else. It carries no reservation, no
token, no expiry. The location is still `available` in the database after the
call.

## 4. The rule, reproduced from `location-recommender-rules.md`

Eight ordered steps. Step 1 is the whole candidate set; each later step narrows
or orders it; nothing is added up and nothing is weighted. This is the order R7
proposed in the rule table of PR #122, accepted here under section 5 ruling 1.
**The normative table is section 4 of `location-recommender-rules.md`.** The
table below repeats it so that this document reads on its own; the two are
changed together if the rule ever moves.

| # | Step | Effect |
|---|---|---|
| 1 | Candidate set: locations at the staff member's assigned collection point with `Location.status = available` (`FR-11`, `FR-15` scoping) | `reserved`, `occupied` and `disabled` are never suggested |
| 2 | Capacity filter: keep locations whose size rank is at least the parcel's (`small` = 1, `medium` = 2, `large` = 3) | a large parcel is never offered a small location; a small parcel may still be offered a large one |
| 3 | Zone preference: if a zone was supplied **and** eligible locations exist in it, keep only those; otherwise keep the whole set and treat the zone as not decisive | the preference never empties the candidate set |
| 4 | Exact-fit priority: prefer `rank(location) - rank(parcel) = 0`, then the smallest positive excess | small parcels fill the small slots, so the large slots stay free for the parcels that need them |
| 5 | Cold-zone rotation: when the zone was not decisive, prefer `cold`, then `normal`, then `hot` (section 7) | the load spreads across zones when the staff member has named no zone |
| 6 | Least recently updated: prefer the smallest `Location.updatedAt` | the shelf that has been left alone longest goes first. This is ADR-004's original rule and remains the practical last resort |
| 7 | Code tie-breaker: prefer the smaller `Location.code` | the order is total, so unchanged data always gives the same answer |
| 8 | Return the first candidate, with a short reason | the reason names the step that decided it |

Steps 6 and 7 carry ADR-004. Step 6 is the "least loaded" behaviour that
`ui-prototype.md` line 320 asks for, expressed as an ordering with no counter and
no score: a location that was just given a parcel has a newer `updatedAt`, so it
sorts last for the next parcel without any occupancy arithmetic. Step 7 exists so
that two locations with the same timestamp cannot produce a different answer on
two different days — without it the order is not total.

Step 4 replaced an earlier reading of this design. The first draft filtered by
size and then ordered by `updatedAt` alone. That reading fails one case: a small
parcel takes a large slot whenever that slot happens to be the oldest, so a large
parcel arriving later can find every large slot holding a small parcel, with no
step to prevent it. The exact-fit step costs one comparison and needs no weight.

The endpoint is a read. It performs no write, and in particular it does not move
the location to `reserved`. Reserving on a suggestion would mean that an ignored
suggestion has already locked a location, which is exactly the loss of control
S5 reports that 4 of 7 staff members want to avoid.

## 5. The ruling on the rule table proposed in PR #122

R7 asked R6, as the task's reviewer and the owner of the design decision, to rule
on five points. All six rows below are the ruling; they are what T-42-02
implements.

| # | Question | Ruling |
|---|---|---|
| 1 | Confirm the rule order: capacity filter, requested zone, exact-size fit, cold/normal/hot rotation, oldest `updatedAt`, location code | **Accepted as proposed**, and written out as section 4. R7's six rules are steps 2 to 7 there; steps 1 and 8 are the candidate set and the return, which the rule table leaves implicit. It refines ADR-004 instead of displacing it: the least-recently-updated rule stays as step 6 |
| 2 | Confirm the 20 % and 80 % occupancy thresholds | **Accepted**: cold `0.00`-`0.20` inclusive, normal above `0.20` and below `0.80`, hot `0.80`-`1.00` inclusive, with `disabled` excluded from the denominator (section 7). `PLAN.md` names hot and cold zones but fixes no cut-off, so a value had to be chosen and written down to be testable |
| 3 | Decide whether the rules require an ADR-004 amendment before implementation | **Required, and made in this change.** ADR-004's Decision held the five original steps and no exact-fit, zone-class or code rule, so it would otherwise disagree with the implementation. Its Decision now records the order in section 4 |
| 4 | Confirm the `LOCATION_UNAVAILABLE` conflict when a location is claimed after it was recommended | **Agreed as the right behaviour, and deliberately not added to the contract here.** The conflict happens on the write, and the write is `POST /parcels`, which accepts `locationId`; that operation documents `201` and a single `409` whose description names only `DUPLICATE_TRACKING_NO` (`openapi.yaml` lines 151-167), so a second `409` code means editing the response text of a frozen contract. **The ruling on the shape, for the change record to carry:** reuse the existing `409` with `code: LOCATION_UNAVAILABLE` on the shared `ErrorResponse` envelope (lines 716-727) - no new status, no new schema, because the envelope is already free-form and 409 already means "conflicts with the current state" here. `POST /parcels/batch` needs nothing: its `rejected[].reason` already reports a per-entry refusal. Until a change record approves the wording this is a dependency of T-42-02, not a contract claim (section 9) |
| 5 | Confirm the design stays optional, non-reserving and never auto-applied | **Confirmed, unchanged.** CR-004, and 4 of 7 staff in S5 |
| 6 | The `reason` wording, which the PR proposes but does not ask about | **Accepted**: `requested_zone`, `exact_size`, `cold_zone_rotation`, `least_recently_available`, `no_location_available`. The field is free-form in the contract, so no contract change is needed |

One rule must not be written down twice in two different orders. This ruling
settles the division of work: **`location-recommender-rules.md` is the normative
rule table and the file T-42-02 implements**, while this document is the ruling
and the evidence behind it. Section 4 above repeats the table for readability,
and ADR-004 records the same order. A change to the rule starts in R7's file,
and this document and ADR-004 move with it in the same change.

## 6. Zone values

`Location.zone` is a **free-form string** in the ERD and in the contract. There
is no enum, and this design does not invent one.

Two different example sets exist in the repository, and both are examples of a
label rather than a frozen value set:

| Where | Values used | Status |
|---|---|---|
| `docs/glossary.md` line 33, `docs/02-design/ui-prototype.md` line 99 | large-item, small-item, perishable, long-stay | named as examples of "a named group of storage locations" |
| `docs/02-design/high-fidelity/` pages | Zone A, Zone B, Zone C, Zone D | sample content for the mock screens |

Neither set is agreed, and neither is contradicted by the other: a zone is a
label the staff at a point choose. **R7 owns the zone values**: `PLAN.md` T-42-03
gives R7 storage location management, explicitly including zones, while the
recommender itself is R6's M3. The question is listed as an open point in section
12. This design works whichever set is chosen, because the rule never interprets
the value.

The zone rules are therefore:

- If the caller supplies a zone **and** eligible locations exist in that zone,
  prefer those (step 3). If it does not, fall through to the remaining steps
  rather than returning nothing.
- Compare zones by exact equality only. Never match by substring: with the
  example set above, a "contains" test would make `small-item` match
  `large-item`, which is the opposite of the intent.
- **Do not infer a zone from the parcel.** `Parcel` carries `size` and no zone
  field (`ERD.md`), so there is nothing to infer from, and a size-to-zone mapping
  would be a rule that no field in the model enforces. "small-item" is a naming
  convention, not a constraint on what a small parcel is put into.

## 7. Hot and cold zones

"Hot and cold" in `PLAN.md` T-20-15 means how full a zone is, not a scored
locality model and not an inference. Occupancy is computed each time the
recommendation is requested and is never stored:

```text
active = available + reserved + occupied
occupancyRatio = (reserved + occupied) / active
```

`disabled` locations are excluded from the denominator. A zone with no active
location has no candidate and no class.

| Zone class | Occupancy ratio | Rotation rank |
|---|---:|---:|
| cold | `0.00` to `0.20` inclusive | 0 |
| normal | above `0.20` and below `0.80` | 1 |
| hot | `0.80` to `1.00` inclusive | 2 |

This is step 5 of the rule: it decides only when the staff member named no zone,
or named one with no eligible location. An explicit zone preference wins even
when that zone is hot, because that is what the staff member asked for.

The zone classes do not need a new field, a counter or a background job. The same
fill information is already on the counter dashboard, where the location board
shows a fill bar per zone (`ui-prototype.md` lines 275-276). Adding an occupancy
criterion is the one part of this design that changes ADR-004 rule 4, which is
why the amendment in section 5 ruling 3 exists rather than a quiet edit here.

## 8. No location available

The endpoint still answers `200`, with `recommendedLocation` `null` and `reason`
`no_location_available`. This is the contract as frozen (ADR-004 and
`openapi.yaml`): a full shelf is a normal business state, not a server error, and
answering `404` would make the counter screen treat an ordinary day as a fault.
It is also the answer when a zone was named but no location is free anywhere,
because the zone is a preference and not a filter.

The frontend response is defined in `ui-prototype.md` section 5.4: offer the next
best zone and a location chosen by hand. The third option the prototype draws —
"shelve later", which keeps the parcel `registered` with no location — is **not
buildable against this contract**, because nothing in it can give a location to a
parcel that already exists. That is contract decision CD-1 and gap 1 of issue
#98, and it is recorded there rather than solved here.

## 9. Concurrency

Two staff members registering parcels at the same time may be offered the same
location. That is allowed, and it is the visible consequence of section 4's
read-only rule.

What makes it safe is the write path, not the suggestion:

- The location is assigned when the parcel is created, inside the `POST /parcels`
  transaction (see the note on `activity-parcel-intake.puml`), in the same
  transaction that moves the location out of `available` and sets its `parcelId`.
- `Location.parcelId` carries a unique partial constraint, which the ERD records
  as the defence for **RSK-08** (`ERD.md` line 129). A location therefore cannot
  end up holding two parcels: the second assignment cannot commit. **R6 confirms
  the shape for T-42-02: a partial unique index, `unique (parcelId) where
  parcelId is not null`, not an ordinary unique column and not an ordinary
  foreign key.** A plain unique column would allow only one location to be free,
  because free rows are exactly the rows whose `parcelId` is null.
- The losing staff member is re-prompted at the counter with a fresh suggestion
  rather than the write being silently retried against a different shelf, because
  the staff member, not the system, decides where a parcel goes (CR-004).

The conflict the losing call needs — R7's `LOCATION_UNAVAILABLE` — is the
behaviour this design wants. Section 5 ruling 4 fixes the shape it should take
(the existing `409` with `code: LOCATION_UNAVAILABLE` on `POST /parcels`), but it
is not in the contract and cannot enter one without a change record, so the
recheck behind the unique partial index is the safety property until then. The
practical effect on the frontend is bounded: the counter screen must treat the
suggestion as a hint and be ready to ask again, which section 4's read-only rule
already requires.

The index that carries that safety property is a schema item, not a contract
item, so it does not wait for the change record: it has to be written into the
first Flyway migration (`T-30-03`, R7), because a recommender that ships before
the index can shelve two parcels into one location, which is the failure RSK-08
records. The `LOCATION_UNAVAILABLE` wording and this index are independent - the
index is valid whether or not the conflict answer is ever documented.

For a batch intake, the same reasoning applies to every entry: each later entry
in the batch must exclude the locations already claimed by earlier entries in
that transaction, and no suggestion is assigned automatically. The exact
statement that enforces the constraint — a conditional update on `status` or a
plain insert that trips the index — is an implementation choice for R7 in
T-42-02. What this design fixes is the trade-off: no reservation means no lock to
expire and no orphaned reservation to clean up, at the cost of an occasional
second attempt at the counter.

## 10. Deliberately out of scope

| Not included | Why |
|---|---|
| Weighted or scored ranking, machine learning | CRJ-001 rules it out; there is no data to train on and no requirement to optimise |
| Automatic assignment | CR-004; and 4 of 7 staff in S5 want to keep control |
| Reserving or holding a location for a suggestion | would contradict CR-004 and create locks that outlive the suggestion |
| A zone enum or a fixed zone value list | not agreed and not needed; zone is an opaque label (section 6) |
| Storing the zone class, or a counter per zone | the ratio is derived per request; nothing in the requirement asks for a stored figure |
| Storing the suggestion, or reporting on acceptance rate | no requirement asks for it; suggestions are not records |
| Optimising walking distance, staff shifts or courier routes | not required; and each one turns the rule into a score |
| Changing the success response shape of `/locations/recommend` | the contract is frozen; the null case is already expressible |
| Suggesting a location when the point has no locations configured | that is `no_location_available` |

## 11. How this will be tested

The test-plan target is at least 80 % coverage for the recommender.

| Case | Expected |
|---|---|
| One small and one large location free, parcel is small | the small location, by step 4 |
| One small and one large location free, parcel is large | the large location only; the small one is filtered out at step 2 |
| An exact fit and a larger free location, equal otherwise | the exact fit wins, so a small parcel cannot occupy a large slot while a small slot is free |
| Zone supplied, a free same-zone location exists | a same-zone location, even when another zone is colder, because step 3 runs before step 5 |
| Zone supplied, no free location in that zone | a location from another zone, not `null` |
| No zone supplied, one cold and one hot exact fit | the cold one, by step 5 |
| Occupancy ratio exactly `0.20` | cold |
| Occupancy ratio exactly `0.80` | hot |
| Two candidates tie on every step above | the older `updatedAt` wins; equal timestamps are settled by the smaller `code` |
| No free location of any size | `200`, `recommendedLocation` `null`, `reason` `no_location_available` |
| A location is `reserved`, `occupied` or `disabled` | never returned |
| Two calls with unchanged data | the same location, because steps 6 and 7 make the order total |
| The recommendation is requested | nothing is written: the location is still `available` afterwards |
| Two staff members accepted the same suggestion; both register | one succeeds, the other is re-prompted; no location holds two parcels |
| An accepted assignment is saved | it follows `available -> reserved -> occupied` |

## 12. Open points

| Point | Who closes it | Why it is open |
|---|---|---|
| The zone values, and whether a zone set is fixed per collection point | R7 | Two example sets exist and neither is agreed (section 6) |
| `LOCATION_UNAVAILABLE` on a stale suggestion | R2, R1 with R6 | R6 fixed the shape on 2026-10-15: the existing `409` with `code: LOCATION_UNAVAILABLE` on `POST /parcels`, no new status and no new schema. It still needs a change record before it can enter `openapi.yaml`, because it edits the documented response of a frozen operation (section 5 ruling 4) |
| The ADR-004 refinement in ruling 3 needs a change-log row | R1 (R6 raised it) | ADR-004 changed after it was accepted, and the change log is R1's artefact. The refinement itself is recorded in ADR-004 and in this document |
| One-click ignore of the suggestion, and the wording of the no-location panel | R4, R5 | `ui-prototype.md` 5.4 draws it; the interaction detail is the frontend's |
| "Shelve later" depends on CD-1 / issue #98 gap 1 | R6, R2 | the contract cannot give a location to an existing parcel |
| How the survey evidence is cited in the report | R1 | S4 0 of 7 and S5 4 of 7 are the "we dropped a presumed feature" example |

Two points that were open when this document was drafted are now closed. PR #122
merged on 2026-10-15 with R7's file still `Status: Proposed`, because the table
was waiting on this ruling, so the same order briefly sat in two files. R6 ruled
on 2026-10-15 that `location-recommender-rules.md` moves to `Accepted` and is the
normative rule table - section 4 of that file is the order T-42-02 implements -
and that this document is the ruling and the rationale behind it. The rule is
written down once, in R7's file. The second point was the `PLAN.md` T-42-02 line
that described the recommender as including a "turnover score", which CRJ-001
rules out: R1 replaced that wording with the deterministic ordering from R7's
rule table in PR #124, which merged on 2026-10-15 before this pull request, so
the plan and the ruling now say the same thing.
