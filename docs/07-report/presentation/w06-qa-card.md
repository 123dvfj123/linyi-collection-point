# W06 Q&A card — eight answers with evidence

| Item | Detail |
|---|---|
| Task | T-60-02 |
| Owner | R2 (Chan Yin Cho) |
| Version | v0.1 |
| Status | Draft — answers for the 13–17 November rehearsals |
| Rule | One evidence link per answer; no claim without a source; no number quoted from memory |

## 1. "Why only 29 responses?"

**Answer.** It is a convenience sample: 11 residents, 7 staff, 7 owners and 4 administrators, people
the team could reach in four days. We report counts and say so in the SRS, so the questionnaire
numbers are design targets, not population values. The administrator group is four responses and is
treated as directional only.

**Evidence.** `docs/01-requirements/elicitation/survey-results.md` section 1.1 (how to read these
results) and the "what may be claimed" list.

**Do not say.** "29 is a representative sample." It is not.

## 2. "Which Must did you cut, and who approved it?"

**Answer.** No Must was removed from the product baseline: 32 Must requirements were approved by R2
on 2026-11-08 as the product requirements baseline in `SRS.md` v0.11. What changed is the **release
decision per FR**, recorded row by row in the scope table — designed, implemented or deferred, each
with a reason and a CR where one exists. A priority change that is a real MoSCoW change goes through
the change log, for example `CR-023` demoting the recommendation panel from Should to Could.

**Evidence.** `SRS.md` v0.11 chapter 3 ("Approval scope") and revision row v0.11;
`docs/01-requirements/scope_table-re_baseline.md`; `change-log.md` `CR-023`.

**Do not say.** "We cut requirements quietly." Every deferral is a row with a reason.

## 3. "The resident pages are in the SRS — are they built?"

**Answer.** No. Three resident read paths were added to the contract by `CR-013` and are marked
*specified and not built* in `openapi.yaml`; the pages in the frontend are placeholders. The report
and the RTM say this rather than claiming delivery, and the demo shows the staff slice instead.

**Evidence.** `docs/03-api/openapi.yaml` ("specified and not built" notes on `GET /my-parcels`,
`GET /my-parcels/{id}`, `GET /my-parcels/{id}/pickup-code`); `RTM.md` v0.8 gap table; `CR-013`.

## 4. "What is your evidence that the main slice actually works?"

**Answer.** A system test that starts from the public API and runs the whole staff journey —
register with a location, verify the code, confirm the handover — with the request, response and
database state captured for each step. It passed in the recorded run: registration returned 201 with
the parcel already `shelved` and a code issued, verification returned 200, confirmation returned 200,
and the database showed the parcel `collected`, the code `used` and the location free.

**Evidence.** `docs/04-testing/reports/system-test-report-W05.md` (`ST-SYS-001`, PASS) and the four
files in `docs/04-testing/reports/evidence/ST-SYS-001-*.txt`.

**Do not say.** "The tests prove the flow." Component tests prove components; this system test is
the public-API evidence, and it is the one to name.

## 5. "FR-11 is Must, so why is `GET /parcels` not built?"

**Answer.** Because a Must is a product-level priority, not a delivery date. `GET /parcels` has no
controller; the RTM records it as a Sprint 3 implementation gap, and the backlog row for FR-11 says
the lookup is not delivered by this release. The requirement text was not weakened to match the
code — the gap is recorded instead.

**Evidence.** `RTM.md` v0.8 gap table (FR-11 `GET /parcels`); `product-backlog.md` v1.3 `BL-003`;
issue `#289` for the classification.

**Do not say.** "It is implemented in the backend." There is no mapping for it.

## 6. "What did you cut, and where is the user evidence?"

**Answer.** Three changes are traceable to a number: batch intake was raised to Must because 4 of 7
staff named bulk intake as their main delay (`CR-003`); automatic location recommendation was
demoted and then deferred because 0 of 7 staff selected it and 4 of 7 preferred manual control
(`CR-004`, `CR-023`); delegated collection was excluded because 0 of 11 residents wanted it
(`CR-005`). Notifications, exceptions, stocktake, billing and the admin console are out of this
release for the same reason: no evidence in the questionnaires, or a later sprint.

**Evidence.** `survey-results.md` sections 2 and 3; `change-log.md` `CR-003`, `CR-004`, `CR-005`,
`CR-023`; `product-backlog.md` v1.3 "Not this time" section.

## 7. "Why are the remaining gaps acceptable?"

**Answer.** Because each one is named, owned and checkable, and none is hidden behind a "done" claim.
The scope table gives every Must one of three states with a reason; the RTM carries the gap table
with an owner and a target; the backlog names the endpoint each acceptance criterion depends on. If
a gap is not acceptable to the audience, the disagreement is about priority, not about a missing
record — that is the thing to argue, not the evidence.

**Evidence.** `docs/01-requirements/scope_table-re_baseline.md` decision rule;
`docs/01-requirements/RTM.md` v0.8 gap table; `product-backlog.md` v1.3 acceptance criteria.

## 8. "What would you do differently, and what does the coverage number mean?"

**Answer.** Freeze the requirements baseline earlier, write the RTM alongside the SRS, and add a
public-API journey test before calling the slice complete — the handover test used to insert a
`shelved` row directly in SQL, which passed while the application could not reach that state. On
coverage: the last recorded full run is 90 backend tests with 88.78% of lines and 64.64% of branches
(`Coverage-Report3.md`, 2026-11-05). Coverage is a completeness signal, not evidence that a journey
works; that is what `ST-SYS-001` is for.

**Evidence.** `docs/04-testing/reports/Coverage-Report3.md`; `docs/04-testing/reports/system-test-report-W05.md`;
`docs/01-requirements/progress-review-re-story.md` section 4.

## Numbers to quote, and never to invent

| Claim | Figure | Source |
|---|---|---|
| Responses | 29 (11 / 7 / 7 / 4) | `survey-results.md` section 1 |
| Batch intake main delay | 4 of 7 staff | `survey-results.md` S3; `CR-003` |
| Automatic recommendation selected | 0 of 7 staff | `survey-results.md` S4; `CR-004` |
| Manual control preferred | 4 of 7 staff | `survey-results.md` S5; `CR-023` |
| Delegated collection | 0 of 11 residents | `survey-results.md` R5; `CR-005` |
| Approved Must requirements | 32 | `SRS.md` v0.11 |
| Last recorded backend run | 90 tests, 88.78% lines, 64.64% branches | `Coverage-Report3.md` |

The suite has grown since that report. If a fresher figure is needed, read it from the current
`develop` CI run and say which run it is.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v0.1 | 2026-11-11 | First version: eight answers covering sample size, scope decisions, resident gaps, the system-test evidence and the coverage caveat, each with an evidence link | R2 |
