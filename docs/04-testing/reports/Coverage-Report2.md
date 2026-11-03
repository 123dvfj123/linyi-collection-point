# Test Coverage Report — post-merge

| Field | Detail |
|---|---|
| Date | 2026-11-03 |
| Baseline | `develop` `b6011b5` (merge of PR #294) |
| CI run | `41658317363` |
| Tool | JaCoCo 0.8.12 |
| Command | `./mvnw -B verify` (backend job) |
| Artifact | `jacoco-report` |

## 1. Results

| Metric | Covered | Total | Coverage |
|---|---:|---:|---:|
| Lines | 807 | 909 | **88.78%** |
| Branches | 170 | 263 | **64.64%** |
| Instructions | 3,346 | 3,762 | **88.94%** |

This run includes the pickup, location and migration test classes that were
missing from the earlier 85.92% and 87.14% reports.

## 2. Test execution

- 87 backend tests, 0 failures, 0 errors, **0 skipped**.
- The 27 Testcontainers integration tests ran against PostgreSQL 16.
- `DemoDataMigrationIntegrationTest`: 5/5 passed.
- `ParcelRegistrationIntegrationTest`: 6/6 passed, including
  `registersAndShelvesWithPickupCodeInOneRequest`.
- Frontend: 68/68 tests passed in the same workflow.
- `docker-smoke`: health and login through `http://localhost:80` passed.

## 3. What this report does not claim

- The POM has no `jacoco:check` rule. 60% remains a target, not a CI gate.
- Line coverage is not a substitute for the missing system, performance and
  acceptance evidence; those are tracked separately in the test report.
- The coverage figure is tied to commit `b6011b5`; it must be recalculated after
  any later product-code change.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | 2026-11-03 | First post-merge report: 88.78% lines, 64.64% branches, 87 tests, 0 skipped | R1 |
