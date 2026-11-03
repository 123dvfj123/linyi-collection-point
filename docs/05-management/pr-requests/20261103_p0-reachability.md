# PR request: close the intake-to-handover reachability gap

| Item | Detail |
|---|---|
| Branch | `fix/p0-reachability` |
| Base | `develop` |
| Title | `fix: close the intake-to-handover reachability gap [T-42-04]` |
| Reviewers | R6 @123dvfj123, R10 @smcheese9731-sys; R2 @ohcyc246 for the product behaviour; R8 @fannaodawang for the test evidence |
| Labels | `type: code`, `prio: high` |
| Milestone | Sprint 3 (create it first; the repo currently has Sprint 1 and Sprint 2 only) |

## Compare link

https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/compare/develop...fix/p0-reachability?expand=1

## PR body

### Summary

This PR closes the reachability gap found in the Week 4 review: a parcel created
through the staff intake screen could not be shelved or collected, production
code never issued a pickup code, and the Compose frontend could not reach the
API because Nginx had no `/api` proxy.

The change makes the staff vertical slice actually reachable:

- `POST /api/parcels` with a `locationId` registers, shelves and occupies the
  location in one transaction, then issues a pickup code.
- `POST /api/parcels` without a `locationId` still creates a `registered`
  parcel for later shelving.
- `PATCH /api/parcels/{id}/location` is now authorised for staff; it was falling
  through to `denyAll`.
- The frontend shows the issued pickup code and refreshes the location list
  after a successful registration.
- The production frontend image now includes an Nginx config that proxies
  `/api/` to `backend:8080`; `docker-smoke` checks health and login through
  port 80.
- A V4 migration refreshes the two expired demo pickup codes without editing
  the applied V2 checksum.

### Commits

- `153057b` — backend: shelve intake and issue pickup codes
- `b29504f` — deploy/frontend: Nginx proxy and pickup-code display
- `e9aaa92` — docs: defect log, report numbers, process model and 12-day plan
- `aa6c81b` — compose: start frontend after backend health

The branch also contains documentation commits that added and then removed the
private Week 5 task sheets. Those files are deliberately not in the final PR.

### Tests run locally

- `backend`: `./mvnw -B verify` — BUILD SUCCESS; 91 test methods, 27
  Testcontainers integration tests skipped because the local machine has no
  Docker.
- `frontend`: `npm run lint`, `npm run test:run` (68/68), `npm run build` —
  all pass, including a cold-cache test run.
- `python scripts/check_doc_versions.py .` — 37 documents, all agree.
- `python scripts/check_table_columns.py .` — all tables valid.
- `git diff --check` — clean.

### CI

Run `41633115022` on PR #283 is green: all five jobs (`commitlint`, `sanity`,
`backend`, `frontend`, `docker-smoke`) completed successfully. The backend job
runs the Testcontainers tests; `docker-smoke` logs in through
`http://localhost:80`, so the Nginx proxy path is exercised.

### Verification still owned by reviewers

- [ ] R6: review the transaction and migration diff rather than repeating the
      CI run; flag any missing edge case.
- [ ] R10: review the Compose/Nginx change; the CI smoke test covers the happy
      path, not a volume restore.
- [ ] R2: confirm that registration with a location should produce `shelved`
      directly (CR-034).
- [ ] R8: review the test evidence and the defect log entries.

### Risk and rollout

- API response gains an optional `pickupCode` field, populated only on the
  response that issues the code. List/detail/verification responses omit it.
- New migration `V4__refresh_demo_pickup_codes.sql`; it does not modify V2.
- New Nginx config is required for the production frontend; without it the
  browser cannot reach `/api`.
- No new feature scope. Notifications, exceptions, stocktake, billing and admin
  pages remain deferred.

### Review checklist

- [ ] Transaction boundary: parcel, location and pickup code commit together.
- [ ] `locations.status` becomes `occupied` and `locations.parcel_id` is set.
- [ ] Pickup code is unique, active and has a future expiry.
- [ ] A repeat registration with the same waybill still returns 409.
- [ ] `PATCH /location` is staff-only, not 403 for staff.
- [ ] No pickup code in list/detail responses.
- [ ] V4 applies on both a clean and an existing database.
- [ ] `http://localhost:80` can log in through the Nginx proxy.

### Status

PR #283 is already open:
https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/pull/283

Use the title and body in this file to keep the PR description current. Do not
open a second PR. Do not merge until the reviewers have resolved the “Verification
still owned by reviewers” section.
