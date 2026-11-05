# Test Coverage Report — 90-test baseline

| Field | Detail |
|---|---|
| Date | 2026-11-05 |
| Baseline | `develop` `b336754` (PR #298 and #299 merged) |
| CI run | `41977146617` |
| Tool | JaCoCo 0.8.12 |
| Command | `./mvnw -B verify` (backend job) |
| Artifact | `jacoco-report` |

## 1. Results

| Metric | Covered | Total | Coverage |
|---|---:|---:|---:|
| Lines | 807 | 909 | **88.78%** |
| Branches | 170 | 263 | **64.64%** |
| Instructions | 3,346 | 3,762 | **88.94%** |

The figures are unchanged from the 87-test baseline in
`Coverage-Report2.md`: #299 added concurrency tests but no new production lines
that JaCoCo counts, so the denominator and the covered count stayed the same.

## 2. Test execution

- 90 backend tests, 0 failures, 0 errors, **0 skipped**.
- 35 Testcontainers tests in seven classes:
  - audit 1, location 5, migration 5, registration 6, shelving 8, pickup 7,
    user 3.
- `ParcelShelvingIntegrationTest` grew from 5 to 8 tests: same-location
  concurrency, same-parcel concurrency, and rollback without an orphan code.
- Frontend: 68/68 tests passed in the same workflow.
- `docker-smoke`: health and login through `http://localhost:80` passed.

## 3. What this report does not claim

- The POM has no `jacoco:check` rule; 60% remains a target, not a CI gate.
- Line coverage is not a substitute for the system, performance and acceptance
  evidence tracked in the test report.
- The concurrency tests prove the locking behaviour under the tested schedule;
  they do not prove the absence of every possible deadlock under production
  load.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | 2026-11-05 | First 90-test report: 88.78% lines, 64.64% branches, 35 Testcontainers tests | R1 |
