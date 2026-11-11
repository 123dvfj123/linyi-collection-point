# W06 speaker notes — slides 2 (users and evidence) and 5 (prioritisation and scope)

| Item | Detail |
|---|---|
| Task | T-60-02 |
| Owner | R2 (Chan Yin Cho) |
| Version | v0.1 |
| Status | Draft — content only, no slides before 13 November |
| Use | R2 speaks slides 2 and 5 of the 10-minute review (shared with `progress-review-re-story.md`) |

These notes are the content of the two slides, not the slides. The deck itself is built with R1
and R9 on 13 November, so anything here that assumes a layout is marked. Timing assumes about
1:50 for both slides: 50 seconds on slide 2 and 60 seconds on slide 5.

## Slide 2 — who we built for, and how we know (about 50 s)

**Say this, in this order:**

1. "We wrote four role-specific questionnaires and collected **29 responses**: 11 residents,
   7 staff, 7 collection-point owners and 4 system administrators."
2. "This is a convenience sample, not a representative survey. We use the counts to choose scope,
   and the SRS calls the numbers design targets rather than population values."
3. "Two numbers changed the product. **Four of seven staff named bulk intake as their main source
   of delay**, so batch registration became Must (`CR-003`). **Zero of seven staff selected
   automatic location recommendation**, so that panel was demoted and then deferred
   (`CR-004`, `CR-023`)."
4. "One number closed a feature: **zero of eleven residents wanted delegated collection**, so it
   left the release (`CR-005`)."

**Point at, do not read:** the resident/staff pain-point table (survey findings sections 2 and 3)
and the three CR identifiers. Two numbers are enough; the table supports them.

**If asked what the 29 responses cannot support:** anything phrased as a population percentage. The
report and the SRS both say counts, not rates.

**Evidence**

- `docs/01-requirements/elicitation/survey-results.md` — section 1 table (11 / 7 / 7 / 4), section 2
  (R4, R5), section 3 (S3, S4, S5) and the "what may be claimed" list.
- `docs/05-management/change-log.md` — `CR-003`, `CR-004`, `CR-005`, `CR-023`.
- `docs/01-requirements/specification/SRS.md` v0.11 — chapter 1 scope and the priority baseline
  heading in chapter 3.

## Slide 5 — what we promised, what we cut, and why it is defensible (about 60 s)

**Say this, in this order:**

1. "We have **32 Must requirements approved as a product baseline** (`SRS.md` v0.11). That is a
   product-level promise, not a Sprint 3 delivery promise; the approval text says the release
   baseline comes from the scope table and the RTM gaps."
2. "The release baseline is the staff intake-to-handover slice: register, shelve, issue a code,
   verify, confirm, audit. That slice is what the demo shows and what the system test covers
   end to end (`ST-SYS-001`)."
3. "Everything else is named, not hidden. **FR-11 `GET /parcels`** has no controller and is recorded
   as a Sprint 3 gap in `#289`; the resident read paths are in the contract and marked
   *specified and not built* under `CR-013`; recommendation is `Could` and deferred by `CR-023`."
4. "Each cut has a record, not a preference: `CR-003`, `CR-004`, `CR-005` and `CR-023` carry the
   numbers from slide 2, and the scope table gives every Must one of designed, implemented or
   deferred with the reason."

**If asked "which Must did you cut":** none was cut from the product baseline. What changed is the
release decision per FR, recorded row by row in `docs/01-requirements/scope_table-re_baseline.md`.
The one sentence to keep: **a Must that is not delivered is a gap with a number, not a silent drop.**

**Guardrail:** never say "we implemented all 47 requirements". The honest form is "the slice is
implemented and system-tested; the rest is designed, deferred or recorded as a gap".

**Evidence**

- `docs/01-requirements/specification/SRS.md` v0.11 — chapter 3 approval scope and the 32
  `Must (approved)` labels; revision row v0.11.
- `docs/01-requirements/specification/product-backlog.md` v1.3 — `BL-001` to `BL-010` with the
  MoSCoW, sprint and acceptance criteria; `BL-006` is `Could` / `Deferred — CR-023`.
- `docs/01-requirements/scope_table-re_baseline.md` — one row per Must: current status, release
  decision, reason, CR.
- `docs/01-requirements/RTM.md` v0.8 — implementation status column and the gap table, including
  `GET /parcels` (FR-11) and the three resident paths.
- `docs/04-testing/reports/system-test-report-W05.md` — `ST-SYS-001` PASS, with evidence files.

## Numbers that are safe to quote

| Claim | Figure | Source of record |
|---|---|---|
| Questionnaire responses | 29 (11 residents, 7 staff, 7 owners, 4 administrators) | `survey-results.md` section 1 |
| Staff naming bulk intake as the main delay | 4 of 7 | `survey-results.md` S3; `CR-003` |
| Staff selecting automatic recommendation | 0 of 7 | `survey-results.md` S4; `CR-004`, `CR-023` |
| Staff preferring manual control | 4 of 7 | `survey-results.md` S5; `CR-023` |
| Residents wanting delegated collection | 0 of 11 | `survey-results.md` R5; `CR-005` |
| Approved Must requirements | 32 | `SRS.md` v0.11 chapter 3 |
| Last recorded full backend run | 90 tests, 88.78% lines / 64.64% branches | `docs/04-testing/reports/Coverage-Report3.md` (2026-11-05) |

The test and coverage figures move as the suite grows. Quote `Coverage-Report3.md` as the report of
record, and if a fresher number is wanted, read it from the current `develop` CI run rather than
restating an older one.

## What not to say

- "We implemented all 47 requirements." We did not.
- "The resident pages are done." They are not built; the contract says so.
- "Coverage is 85.9%." That figure predates pickup and is not current.
- "The tests prove the flow works." Component tests prove components; `ST-SYS-001` is the evidence
  that the public-API journey works, and it is the one to cite.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v0.1 | 2026-11-11 | First version: slide 2 and slide 5 notes with evidence per claim, the safe-number table and the wording guardrails | R2 |
