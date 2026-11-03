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
- `970f52e` — docs: Week 5 role task sheets and issue specifications

### Tests run locally

- `backend`: `./mvnw -B verify` — BUILD SUCCESS; 91 test methods, 27
  Testcontainers integration tests skipped because the local machine has no
  Docker.
- `frontend`: `npm run lint`, `npm run test:run` (68/68), `npm run build` —
  all pass, including a cold-cache test run.
- `python scripts/check_doc_versions.py .` — 37 documents, all agree.
- `python scripts/check_table_columns.py .` — all tables valid.
- `git diff --check` — clean.

### Not yet verified (must be done before merge)

- [ ] R6: `cd backend && ./mvnw -B verify` with Docker, so the 27
      Testcontainers tests run.
- [ ] R10: `docker compose --profile full up -d --build --wait`, then
      `http://localhost:80` login and `/api/health` through Nginx.
- [ ] R8: the full browser flow (register → pickup code → verify → confirm)
      and the test report.
- [ ] R2: confirm that registration with a location should produce `shelved`
      directly (CR-034).

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

### How to open it

```bash
git push -u origin fix/p0-reachability
```

Then open the compare link above, use the title and body in this file, add the
reviewers and labels, and create the PR. Do not merge until R6 and R10 have
checked the two boxes under “Not yet verified”.
