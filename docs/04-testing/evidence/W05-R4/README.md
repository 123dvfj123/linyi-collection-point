# W05 R4 browser-flow evidence

| Item | Detail |
|---|---|
| Date | 2026-11-05 |
| Baseline | `develop` `a5f8f24` |
| Environment | Full Docker Compose stack, Linux containers |
| Browser | Microsoft Edge, InPrivate |
| Account | `demo_staff_1` (staff) |
| Tracking number | `SF202611052120` |
| Pickup code | `92338129` |
| Shelf | `DEMO-A-01-3` |
| Result | Register, verify and confirm completed |

## Command evidence

`docker compose --profile full ps` reported `frontend`, `backend`, `postgres`
and `redis` as healthy. Both `http://localhost/api/health` and
`http://localhost:8080/api/health` returned:

```text
HTTP 200
{"status":"ok"}
```

The PostgreSQL state after confirmation was:

```text
tracking_no     | SF202611052120
parcel status   | collected
pickup code     | 92338129
pickup status   | used
handover result | collected
```

The shelf `DEMO-A-01-3` was visible as `Occupied` after registration in the
attached location-board screenshot and was released to `available` after the
handover completed.

## Screenshots

The binary screenshots are deliberately not tracked in the repository. The
complete nine-image attachment set is in [#287](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/issues/287#issuecomment-6708380334).

The set proves:

- staff authentication and the application shell
- registration success with tracking, location code and issued pickup code
- the selected shelf is occupied before pickup
- pickup verification resolves the correct parcel and shelf
- confirmation reports a recorded handover
- pickup and registration states fit the 375 x 812 responsive viewport
- the Console is clear after refresh and contains no red errors

The 375 px screenshots show no horizontal page overflow and keep the primary
control inside the viewport.

The responsive registration re-run used:

```text
tracking number | SF202611052121
pickup code     | 87133264
shelf           | DEMO-A-01-3
parcel status   | shelved
pickup status   | active
shelf status    | occupied
```

The DevTools Console was cleared and the page reloaded; the captured Console
contains no red errors.

## Cold-cache frontend verification

Repeated on 2026-11-07 against `develop` `f73d5b4`:

```text
npm ci                      passed
node_modules/.vite          absent after install
npm run lint                passed
npm run test:run            11 files, 68 tests passed
npm run build               passed
```

The test and build output was also linked on [#291](https://github.com/Django-coder6/3500SEF-Group23-Project-LMS/issues/291#issuecomment-6708382603).

## Finding

The handover page continued to display `Parcel status: shelved` after a successful
confirmation, while the database correctly held `collected`. The frontend status
refresh defect is fixed with a regression test in PR #303; this evidence
directory records the state observed during the browser run.
