# Sprint 2 review and retrospective

| Field | Detail |
|---|---|
| Version | v1.0 |
| Sprint | Sprint 2, weeks 3 and 4 |
| Dates | 2026-10-20 to 2026-11-02 |
| Release | `v0.2.0`, annotated tag `9ee368d`, commit `3300a84` |
| Tracker | issue `#185` |
| Owner | R1 |
| Status | Final |

## Why this record exists and why it is not a meeting

**No meeting was convened for this review.** Sprint 2 ended on 2 November and the increment was
assessed from the repository rather than from a discussion, for the same reason `20261022_sprint1-review.md`
gives: the evidence is the artefacts, and a minute of a meeting nobody held would add nothing to them.

Issue `#185`'s definition of done asks for three things in one line — *what the increment
demonstrated, what was said about it, and what the team agreed to change*. Sections 1 to 3 answer
those three in order. Section 4 is the retrospective, which the definition of done does not ask for
but which Sprint 1 established as worth keeping.

**Nothing below is a claim about intent.** Every statement is traceable to a commit, a pull request,
a change record or a file, and the reference is given.

---

## 1. What the increment demonstrated

### Delivered and verifiable

**`PLAN.md` v1.5 schedules 19 tasks across weeks 3 and 4.** At the close, **18 are closed and one is
deferred** — `T-42-02`, the storage location recommender, out of Sprint 2 under `CR-023` rather than
out of the plan.

| Week | Tasks | Closed |
|---|---|---|
| 3 | 11 — `T-30-02`, `T-30-03`, `T-30-05`, `T-30-06`, `T-41-01`, `T-41-02`, `T-41-03`, `T-41-04`, `T-42-05`, `T-42-06`, `T-42-07` | 11 |
| 4 | 5 — `T-42-01`, `T-42-03`, `T-42-04`, `T-42-08`, `T-42-09` | 5 |
| — | 1 — `T-42-02` | deferred under `CR-023` |

**What that produced, counted from the repository rather than from memory:**

- **71 pull requests merged** into `develop` between 19 October and 2 November, numbered `#166` to `#271`.
- **85 Java source files** under `backend/src/main/java`, in nine packages that were `.gitkeep` files
  on 20 October.
- **19 backend test classes holding 86 tests**, and **68 frontend tests**.
- **Measure coverage 85.9 per cent of lines and 62 per cent of branches**, recorded in
  `docs/04-testing/reports/Coverage-Report1.md` against baseline `512efc9`.
- **11 change records**, `CR-023` to `CR-033`, each with the alternatives it rejected.
- **The project report: nine chapters totalling 947 words** against a limit of 1000, with every
  chapter's count recorded against its allocation in `chapters/00-outline.md` v0.5.

**The five behaviours the sprint existed to deliver are all present and all tested:**

| Behaviour | Where |
|---|---|
| A parcel is registered, singly or in a batch of up to 50 | `POST /api/parcels`, `POST /api/parcels/batch` |
| A registered parcel is placed on a storage location | `PATCH /api/parcels/{id}/location` (`#271`) |
| A storage location carries one of four states and manual override is limited to two | `PATCH /api/locations/{id}/status` |
| A pickup code is verified and a handover is confirmed idempotently | `POST /api/pickup/verify`, `POST /api/pickup/confirm` |
| Two confirms sent together hand over exactly one parcel | `concurrentConfirmationCreatesExactlyOneHandoverAndAuditEntry` |

### Released

**`v0.2.0` is tagged at `3300a84`**, the merge of `#262`, with all five CI jobs successful at that
commit. The release record is `docs/05-management/plans/v0.2.0-release-checklist.md`, which now carries
the SHA, the release notes and two acceptance items left unticked with their reasons.

**The tag is deliberately not moved.** `#271`, which supplies the shelving operation described in
observation 5, merged after the tag. Moving `v0.2.0` forward would make the tag mean "the last commit
of week 4" rather than "what Sprint 2 closed on", and the second is the useful meaning.

### Not delivered

**Four things, each with a reason rather than an excuse:**

1. **`T-42-02`, the storage location recommender.** Deferred under `CR-023`. `FR-19` and `FR-20` are
   `Could`, `openapi.yaml` marks `/locations/recommend` as "specified and not built", and the trigger
   to bring the task back is a measured delay at intake rather than a preference.
2. **The identity fallback for a lost pickup code.** Out of Sprint 2 under `CR-030`. The decision had
   been in `ui-prototype.md` section 8 since the prototype review and had never reached the change
   log; `CR-030` wrote it down, which is why `T-42-04` had a record to build against.
3. **`#239`'s second acceptance criterion** — that the concurrency test *genuinely fails if the
   transaction is removed*. The test exists and passes. The verification that it would fail without
   the transaction was never performed, because it needs Docker and no member had it locally where
   the check was raised. `docs/04-testing/reports/handover-test-coverage.md` section 3 records this as
   *not yet performed* rather than as done.
4. **The real-stack journey verification** in the release checklist's fourth acceptance item.
   `docker-smoke` proves the Compose stack starts, serves health, signs in a seeded account and
   refuses a wrong password. It does not drive a parcel through intake, storage, pickup and handover.
   Those four are covered by Testcontainers tests against PostgreSQL 16, which is a real database but
   not the composed stack.

**One deliberate omission inside `#271`:** the new endpoint does not take `expectedVersion`, so two
staff members shelving two parcels into the same location at the same instant could both pass the
`available` check. The correct fix is optimistic locking on `locations`, which is a schema change and
is recorded in that pull request rather than smuggled into a week-4 patch.

---

## 2. What the stakeholders said

**The external input for Sprint 2 came from the `#170` round, whose record is
`docs/01-requirements/elicitation/20261019_requirement-confirmation.md`: fourteen verified findings and
three scope questions, with the respondents' observations checked against the files rather than
accepted as written.**

**Three of the findings set the sprint's scope, and all three became records rather than opinions:**

- **`CR-023`** demoted the recommendation panel from `Should` to `Could` and deferred `T-42-02`.
- **`CR-024`** deferred the full-shelf fallback.
- **`CR-025`** kept the 50-parcel batch cap and ruled out a queue.

**`#98` also came out of that round**, and it outlived the sprint that raised it. It was opened on
15 October, carried a third gap added on 21 October, and closed on 1 November when `#263` merged. Its
answer is not one record but six: `CR-028` proposed a `PENDING` holding slot, `CR-029` withdrew it
because `locations.parcel_id` holds one value per row, `CR-030` put gaps 2a and 3 out of scope, and
`CR-031` and `CR-033` fixed the error vocabulary. **A fifteen-day gap answered by six records is the
process working, not the process failing.**

**No stakeholder reviewed the increment itself.** No external party saw `v0.2.0`. That is a limitation
of a course project rather than a choice, and it is recorded here so that the absence is not read as
approval.

---

## 3. What was changed as a result

**Only changes that were made and recorded are listed. Each has a change record and a merged pull
request.**

| Change | Record | Delivered by |
|---|---|---|
| The recommendation panel is `Could`, and `T-42-02` leaves Sprint 2 | `CR-023` | `#191` |
| The full-shelf fallback is deferred | `CR-024` | `#191` |
| The 50-parcel batch cap stays, with no queue | `CR-025` | `#191` |
| `Setting.key` is unique per collection point, matching the migration | `CR-026` | `#200` |
| The tooling replaced the pre-scaffold premise instead of adding to it | `CR-027` | `#230`, `#234` |
| A full shelf no longer invents a storage state | `CR-028`, then `CR-029` | `#245`, `#247` |
| `ErrorResponse.code` becomes a stable vocabulary | `CR-031`, `CR-033` | `#248`, `#262` |
| CI stops running every push twice | `CR-032` | `#264` |

**Two things were deliberately not changed.** The fourteen `#170` findings are recorded but not all
fixed: seven were prototype contradictions that `#195` and `#207` closed, and the rest are findings
about screens whose endpoints are deferred to Sprint 3. And `T-42-02`'s design document stays in the
repository, because `CR-023` deferred the task, not the design.

---

## 4. Retrospective: what the sprint taught

### Observation 1 — the same defect as Sprint 1, in three new places

**Sprint 1's review recorded seven instances of one pattern: *a check compares two things that need
not agree, and passes because they agree today*.** Sprint 2 produced three more, and none of them was
caught by a check:

- **`CR-028` specified a `pending` location state that `V1__baseline.sql` cannot represent** —
  `locations.parcel_id` holds one value per row and the table carries two CHECK constraints that
  assume it. The record passed review, `SRS.md` 3.5 was edited to state it as settled, and it took a
  contract judgement on `#98` to withdraw it as `CR-029`.
- **`CR-031` recorded `ErrorResponse.code` as an enum.** For four days the record said so and
  `openapi.yaml` still declared `type: string`. The `sanity` job checked that the document's version
  header matched its revision history, which it did, and said nothing about whether the body agreed
  with the record.
- **`#239` closed with one of its two acceptance criteria unperformed**, because the criterion was a
  sentence in the issue body and the checkbox script only looked at whether the tests existed.

**The pattern is stable enough to name.** Every check in this repository compares one artefact with
another artefact. None of them compares an artefact with the world. `check_doc_versions.py` compares a
header with a history; `check_table_columns.py` compares a row with a header; `commitlint` compares a
message with a grammar. **The defect that keeps escaping is a document that agrees with every other
document and is still wrong.**

### Observation 2 — a change record's number is a shared resource, and it collided four times

**`CR-018`, `CR-026` and `CR-027` collided during Sprint 1 and are recorded in section 1.3 of
`change-log.md`, which states the rule: a number is taken when it appears in the section 2 table, not
when it is mentioned in an issue.**

**`CR-032` collided on 31 October.** R10 wrote it for the CI trigger change in `#264`; R4 wrote it for
the error vocabulary in `#262`. Both were correct, both were `Proposed`, and both were based on the
same `develop`. `#264` merged first, and `#262` became conflicting — the file it touched was already
different.

**The rule existed and was not applied**, which is the same failure mode as observation 1: the rule is
written down, so the existence of the rule was mistaken for its practice.

**What was done about it:** `CR-033` renumbered R4's record, `change-log.md` moved to `v1.20` and then
`v1.21`, and both were approved in `#270`. **What was not done:** any mechanism that would prevent a
fifth collision. Two people selecting "the next free number" from their own branch will collide again.

### Observation 3 — the web editor's default commit message is the largest single source of red builds

**Eighteen commits across `#249` and `#253` failed `commitlint` for one reason: the GitHub web editor
writes `Update <filename>` and nobody replaced it.** `#249` carried six such commits, then seven more;
`#253` carried three, then two more.

**Every one of them had correct content.** The coverage report was right, the test-plan figures were
right, the chapter paragraphs were right. **The repository spent a maintainer's evening rewriting
histories with `git reset --soft` so that the content could be merged.**

**The lesson is not "contributors should read the contributing guide".** It is that a rule enforced
only at the point of entry will be broken by the tool that entry uses. The web editor has a commit
message box and a default; the default wins unless something makes it lose.

### Observation 4 — CI ran every pull request twice, and the fix costs something real

**`ci.yml` triggered on `on.push.branches: ['**']` and on `on.pull_request`.** A push to a
pull-request branch therefore produced two full runs of the same commit, each building the complete
Compose stack.

**On `#249` this produced a false red.** The `push` run passed every `docker-smoke` step. The
`pull_request` run of the same commit failed "Start the full stack" after 31 seconds — a runner-side
transient, not a defect — and because GitHub reports the latest run per check name, the pull request
stayed `mergeable: unstable` while its content was never at fault.

**`CR-032` restricted `push` to `main` and `develop`.** The trade-off is real and was accepted
deliberately: **a push to a branch with no pull request now runs no CI at all.** The fix was verified
the same evening — the two week-4 documentation branches produced exactly one `pull_request` run each
and no `push` run for the same commits.

### Observation 5 — the contract's own paths went unbuilt, and the tests hid it

**This is the most consequential finding of the sprint.**

**`PATCH /parcels/{id}/status` has been declared in `openapi.yaml` since week 2. At the end of Sprint 2
it still had no controller method.** `ParcelController` exposed two POST endpoints and nothing else.

**Worse, the state machine's `registered → shelved` edge had no API at all.** `Parcel.register` sets
`registered` unconditionally, and `Parcel.collect` requires `shelved`. **A parcel created through the
running application could therefore never be collected.** The handover tests passed because their
fixtures wrote `shelved` into the database directly, so the tests were asserting that handover works
on a state the application cannot produce.

**This was found while mapping issue `#239`'s four scenarios to their test methods**, not by any check.
It was fixed in `#271`, one commit after the release tag, which is why the tag stays where it is.

**The general form of the defect:** a test that constructs its own precondition can pass while the
application cannot reach that precondition. **The fixture is the blind spot.**

---

## Revision history

| Version | Week | Change | Author |
|---|---|---|---|
| v1.0 | Week 4 | First version. Records the increment, the stakeholder input, the eight changes made and five retrospective observations, including the unbuilt contract path that the fixtures concealed | R1 |
