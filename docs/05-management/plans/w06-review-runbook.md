# W06 review environment and fallback

Task [T-60-10 / #331](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/issues/331). Review baseline `9d37391657146721285d2e7cb6559121d50b3bea`. All five jobs passed on the [develop push run](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42810910471). The [Docker smoke job](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42810910471/job/129811792428) verified direct and proxied health, demo staff login through port 80, rejection of the wrong password and four running services. The [Surefire artifact](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/actions/runs/42810910471/artifacts/13761449028) records five passing migration tests, including the V4 refresh and used-code preservation case.

## Start, stop and restore

Run in Git Bash from the review checkout with Docker running Linux containers. Use the default local demo configuration and free ports 80, 8080, 5432 and 6379. Use unused project names for the first start and each restore drill. Use a separate project on the same machine as the local fallback.

1. Select the review project with `export COMPOSE_PROJECT_NAME=w06-r10-review`.
2. Start with `docker compose --profile full up -d --build --wait`.
3. Run `docker compose --profile full ps` and save the four health states.
4. Run `curl -fsS http://localhost/api/health` and `curl -fsS http://localhost:8080/api/health`, then sign in at `http://localhost` as `demo_staff_1` with the seed password `password` and capture the signed-in page.
5. Create a local backup directory and timestamped path with `mkdir -p ../Tasks/W06/Evidence && dump="../Tasks/W06/Evidence/w06-r10-$(date +%Y%m%d-%H%M%S).dump"`.
6. Dump and inspect the archive with `docker compose exec -T postgres pg_dump -U lms -d lms -Fc > "$dump" && docker compose exec -T postgres pg_restore --list < "$dump"`. Record the path and `sha256sum "$dump"` after both succeed.
7. Free the ports and keep the source volume with `docker compose --profile full down`.
8. Select a fresh restore project and start its database with `export COMPOSE_PROJECT_NAME="w06-r10-restore-$(date +%Y%m%d%H%M%S)"; docker compose --profile full up -d --wait postgres`.
9. Restore and start with `docker compose exec -T postgres pg_restore --single-transaction --exit-on-error --no-owner -U lms -d lms < "$dump" && docker compose --profile full up -d --build --wait`.
10. Repeat steps 3 and 4, compare demo-code rows and Flyway history with the source, and stop the fallback with `docker compose --profile full down`. Select the original project and repeat step 2 to resume review.

Keep the dump in the local evidence directory outside the repository. See the [W05 recovery guide](compose-recovery.md) for the full recovery drill.

## Demo data and reset

An empty project volume runs Flyway V1–V4 and loads the accounts, parcels and pickup codes. For a refresh on an existing **local demo database**, capture the query output before and after running the checked-in V4 SQL with `ON_ERROR_STOP`. Take the backup first when preserving existing rehearsal data.

```bash
docker compose exec -T postgres psql -U lms -d lms -c "SELECT code, status, expires_at, used_at FROM pickup_codes WHERE code IN ('48210001','48210002','48210003') ORDER BY code"
docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U lms -d lms -f - < backend/src/main/resources/db/migration/V4__refresh_demo_pickup_codes.sql
docker compose exec -T postgres psql -U lms -d lms -c "SELECT code, status, expires_at, used_at FROM pickup_codes WHERE code IN ('48210001','48210002','48210003') ORDER BY code"
```

Verify unused demo codes have a future expiry and any used code retains its status and timestamps. To reset the demo data from seed, start a fresh isolated project and leave the existing volume available for recovery.

## 11 November review drill

On Docker Engine 29.8.2, all four review services became healthy. Edge signed in as `demo_staff_1` through port 80, and both direct and proxied health returned HTTP 200. Flyway V1–V4 succeeded. The seeded database contained six demo accounts and five parcels. In a rolled-back test transaction, V4 refreshed an expired demo code and preserved two used codes and their timestamps. V4 then refreshed the two unused codes in the review volume.

Restored the 11 November dump into the separate local project `w06-r10-restore-20261111153937`. Flyway checksums, pickup-code rows, parcel tracking and status, and usernames matched the source. The restored stack passed health and a fresh port-80 browser login. R10 retained the dump and its SHA-256 under `Tasks/W06/Evidence`.
