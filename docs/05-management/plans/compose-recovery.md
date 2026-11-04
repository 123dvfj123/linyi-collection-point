# W05 full-stack verification and recovery

Use Git Bash in the repository root with Docker Desktop running Linux containers. These commands assume the default local demo configuration. Use an unused project name and free ports 80, 8080, 5432 and 6379. Keep the same shell for the restore drill.

## Fresh and existing volume

```bash
export COMPOSE_PROJECT_NAME=w05-r10
docker volume ls --filter "label=com.docker.compose.project=$COMPOSE_PROJECT_NAME"
# For the fresh run the list must be empty. Choose another project if needed.
docker compose --profile full up -d --build --wait --wait-timeout 300
docker compose --profile full ps
curl -fsS http://localhost:8080/api/health
curl -fsS http://localhost/api/health
docker compose exec -T postgres psql -U lms -d lms -c 'SELECT version,checksum,success FROM flyway_schema_history ORDER BY installed_rank'
docker compose exec -T postgres psql -U lms -d lms -c "SELECT code,status,expires_at > now() AS future FROM pickup_codes WHERE code IN ('48210001','48210002') ORDER BY code"
```

Check all four health states, successful V1–V4 rows and two active demo codes with future expiry. In a browser at `http://localhost`, sign in as `demo_staff_1` with password `password`. Register a uniquely named parcel with an available location. Record its tracking number and issued pickup code, verify that code on the pickup page, then confirm the handover. Capture the signed-in page, registration result, verified parcel and confirmed handover. Use demo recipient data.

```bash
docker compose --profile full down
docker compose --profile full up -d --wait --wait-timeout 300
docker compose --profile full ps
docker compose exec -T postgres psql -U lms -d lms -c 'SELECT version,checksum,success FROM flyway_schema_history ORDER BY installed_rank'
```

Compare the migration rows and checksums with the fresh run. The used pickup code must still be used. The separate V4 re-execution test is `DemoDataMigrationIntegrationTest.rerunningV4RefreshesAnExpiredCodeAndLeavesUsedCodesUsed`.

## Back up and restore to a separate volume

```bash
# Choose a local directory outside the repository for the dump.
backup_dir="../backups/w05"
mkdir -p "$backup_dir"
dump="$backup_dir/w05-r10-$(date +%Y%m%d-%H%M%S).dump"
docker compose exec -T postgres pg_dump -U lms -d lms -Fc > "$dump" &&
  docker compose exec -T postgres pg_restore --list < "$dump" > /dev/null
```

Continue only after both commands succeed. Keep the dump local. Stop the source stack to free its ports, keeping its volume. Use a new restore project and an empty database before starting the application.

```bash
docker compose --profile full down
export COMPOSE_PROJECT_NAME=w05-r10-restore-$(date +%Y%m%d%H%M%S)
docker compose --profile full up -d --wait postgres
docker compose exec -T postgres pg_restore --single-transaction --exit-on-error --no-owner -U lms -d lms < "$dump" &&
  docker compose --profile full up -d --build --wait --wait-timeout 300
docker compose --profile full ps
docker compose exec -T postgres psql -U lms -d lms -c 'SELECT tracking_no,status FROM parcels WHERE status = '\''collected'\'' ORDER BY tracking_no'
```

Match the original tracking number in the result. Open a private browser window, sign in again through port 80 and capture the signed-in page. Record the dump filename, volume names and SQL results. To inspect a failed startup, use `docker compose --profile full logs` before retrying.
