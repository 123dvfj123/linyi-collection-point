# 7. Testing and validation

The test plan targets where this design could quietly go wrong: handover idempotency under
concurrency, one location per parcel, duplicate waybill rejection and single-use pickup codes.
Seventeen test classes hold seventy-four backend tests; the frontend adds sixty-eight. Coverage
reaches 85.9 per cent of lines and 62 per cent of branches, and the shortfall sits in branch edge
cases, not untested features. Each pull request runs five jobs: lint and tests on both sides,
commitlint, the Flyway migrations, and a Compose smoke test that signs in as a seeded account and
refuses a wrong password.
