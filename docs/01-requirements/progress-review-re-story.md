# Requirements engineering story for the progress review

| Item | Detail |
|---|---|
| Task | T-43-08 |
| Owner | R2, R3 |
| Version | v0.1 |
| Status | Draft for the 10-minute review |
| Use | R2 speaks slides 2 and 5; R3 speaks slides 4 and 6 |

This is the requirements-engineering spine of the review. It is deliberately
short: the review has about **3.5 minutes** for this material, and the rubric
rewards a clear process story more than a list of 47 requirements.

## 1. The one-sentence version

We elicited requirements from 29 responses across four roles, turned the
evidence into a prioritised SRS and traceability matrix, validated the
requirements against a prototype and a walkthrough, and used a change log to
correct the requirements when the design or the running system showed they were
wrong.

## 2. The four-step story

### Step 1 — Elicit, and state the limits

- Four role-specific questionnaires: 11 residents, 7 staff, 7 owners,
  4 administrators.
- Convenience sample, not a representative survey. The SRS and report call the
  numbers design targets, not population values.
- The evidence changed scope: batch intake was raised to Must (4 of 7 staff
  named it as the main delay, `CR-003`); location recommendation was demoted
  (0 of 7 staff requested it, `CR-004`); delegated collection was excluded
  (0 of 11 residents, `CR-005`).

**What to show:** the resident/staff pain-point table and the three CRs. Do not
read the table; point at the two numbers that changed the scope.

### Step 2 — Specify, prioritise and trace

- SRS: 47 functional requirements and 14 non-functional requirements, each with
  a rationale, MoSCoW priority and verification method.
- Product backlog ordered by business value, with Given/When/Then acceptance
  criteria.
- RTM: every Must maps to a design artefact and a reserved test identifier.
  Implementation status is a separate column, because “mapped” is not “built”.

**What to show:** one row of the RTM, not the whole matrix.

### Step 3 — Validate, not just write

- Internal requirements walkthrough: findings recorded and closed.
- Prototype confirmation with three respondents: 14 findings checked against the
  repository, not accepted as written.
- The validation changed the design: for example, the full-shelf fallback and
  the error vocabulary were corrected after the prototype/contract review.

**What to show:** the requirement-confirmation record and one finding that
changed a requirement or a design.

### Step 4 — Control change

Two stories are enough:

1. **CR-028 → CR-029.** A proposed `PENDING` storage slot could not be
   represented: `locations.parcel_id` holds one value per row, and the CHECK
   constraints assume one parcel per location. The requirement was corrected to
   “a parcel may be registered without a location; `locationId` is optional”.
   This is a requirements correction driven by a data-model constraint.
2. **CR-013 → CR-034.** CR-013 added the resident read paths to the contract
   because the resident view was missing from Sprint 2. The endpoints were never
   implemented; the contract now says “specified and not built”. CR-034 fixes the
   staff-side reachability gap (registration now shelves and issues a code).
   This is a scope/implementation correction driven by tracing the running path.

**What to show:** the before/after columns of CR-029; the OpenAPI “specified and
not built” note for CR-013. Say plainly that the resident pages are not built.

## 3. One traceability chain to put on a slide

Use FR-21 (verify an active pickup code before handover):

```
FR-21
  → docs/02-design/uml/sequence-resident-pickup.puml
  → POST /pickup/verify in openapi.yaml
  → PickupVerificationService.verify
  → PickupHandoverIntegrationTest (active, expired and used codes)
  → CI backend job
```

Then add the defect insight: the handover test used to create a `shelved` parcel
directly in SQL, so it passed while the application could not reach `shelved`.
That is why the test is necessary but not sufficient; the new system test starts
from the public API/UI.

## 4. What was hard, and what we learned

- **Hard:** the requirements were still moving after the design baseline. The
  SRS was revised in week 3, after coding had started.
- **Hard:** the same list was repeated in several documents, so the exception
  types and status values drifted. CR-010/011/012 single-sourced them.
- **Learned:** a contract is not an implementation. CR-013 looked like a
  delivered requirement until the OpenAPI “specified and not built” note and the
  running UI were checked.
- **Learned:** a test fixture can hide an unreachable state. The fix is a test
  that starts from the public boundary.
- **Learned:** a change record can be wrong; CR-029 correcting CR-028 is the
  process working, not a failure to hide.

## 5. Likely questions and short answers

| Question | Answer |
|---|---|
| Why only 29 responses? | Convenience sample; we state the limitation and use counts, not population percentages. The targets are design targets. |
| How did you validate? | Walkthrough, prototype confirmation with three respondents, and the RTM/test mapping. We did not run a full acceptance test with real users; that is a limitation. |
| Why are resident pages in the SRS but not built? | They are P0 in the SRS and were added to the contract by CR-013. The implementation is not complete; the contract marks three resident paths as specified and not built. We chose to be explicit rather than claim them. |
| What did you cut? | Recommendation, delegated collection, notifications/exceptions/stocktake/billing for this release; each has a CR or a backlog reason. |
| What is the most important requirement? | The staff intake-to-handover path: register, shelve, issue a code, verify, confirm, audit. It is the vertical slice the review demonstrates. |
| What would you do differently? | Freeze the requirements baseline earlier, write the RTM with the SRS, and add a public-API system test before calling the slice complete. |

## 6. Do not say

- “We implemented all 47 requirements.” You did not.
- “The resident pages are done.” They are placeholders.
- “Coverage is 85.9%.” That figure predates pickup and is not a current gate.
- “The tests prove the flow works.” They prove components; the public-API
  journey is the missing evidence.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v0.1 | 2026-11-03 | First version: four-step story, one traceability chain, CR-029/CR-013 examples and Q&A | R1 |
