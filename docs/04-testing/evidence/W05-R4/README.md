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

The shelf `DEMO-A-01-3` was visible as `Occupied` after registration
(`03-location-board-occupied.png`) and was released to `available` after the
handover completed.

## Screenshots

| File | What it proves |
|---|---|
| `01-signed-in-dashboard.png` | Staff authentication and application shell |
| `02-register-success.png` | Registration success shows tracking, location code and issued pickup code |
| `03-location-board-occupied.png` | The selected shelf is occupied before pickup |
| `04-verify-success.png` | Pickup code resolves to the correct parcel and shelf |
| `05-handover-recorded.png` | Confirmation reports a recorded handover |
| `06-pickup-375-handover.png` | Pickup result fits the 375 x 812 responsive viewport |
| `07-register-375.png` | Registration form fits the 375 x 812 responsive viewport |

The 375 px screenshots show no horizontal page overflow and keep the primary
control inside the viewport. A 375 px *registration-success* screenshot and a
captured Console panel with zero errors were not obtained, so they are not
claimed as passed here.

## Finding

The handover page continued to display `Parcel status: shelved` after a successful
confirmation, while the database correctly held `collected`. The frontend status
refresh defect is fixed with a regression test in PR #303; this evidence
directory records the state observed during the browser run.
