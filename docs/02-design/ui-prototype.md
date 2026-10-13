# UI Prototype: Pages for the Four Login Roles

- Status: Proposed
- Date: 2026-10-13
- Task: T-20-05 (Sprint 1, week 2)
- Owner: R5 Frontend Developer
- Reviewers: R4 Frontend Lead, R9 (usability review, T-20-10), R3 (requirement identifiers)
- Due: 2026-10-18
- Depends on: `frontend-page-map.md` (T-30-04), `glossary.md` (T-00-07),
  `backend-state-machines.md` (T-20-04), `ADR-003` (T-30-04),
  `survey-results.md`, `Personas.md`, `docs/02-design/prototype/` (PR #62)
- Covers: the in-scope functions of SRS section 1.5.2 (IS-1 to IS-12).
  Functional requirement identifiers are added once R3 publishes SRS chapter 3
  (issue #76); until then every mapping row below carries `FR: pending R3`.

## 1. Purpose

Sprint 1 has to end with a design baseline, and Sprint 2 has to start building
without making new design decisions. This document is the page-level prototype
for the four login roles. For every page it fixes the blocks, the fields, the
actions, the states and the number of steps the user needs.

It is low fidelity on purpose. Colours, type scale and spacing come from
`docs/02-design/design-system.md` (R4, T-20-06) once that document lands, and are
not repeated here. Routes, view file names and component names come from
`docs/02-design/frontend-page-map.md` and are not changed here. If this document
and the page map disagree, the page map wins and this document is corrected.

This document draws the pages the week 2 task asks for: the two resident pages,
the staff workbench with intake and batch intake, the storage location board,
pickup verification, and the admin pages. The other pages of the page map keep
their routes, views and owners there, and the high fidelity versions of pickup,
intake and dashboard belong to T-20-12.

### 1.1 Relation to the archived reference prototype

`docs/02-design/prototype/` (owner R4, PR #62) stays as design history. ADR-003
requires its structure to be converted into Vue components rather than copied,
and its README records what the team has since decided differently.

| Reused from the reference prototype | Must not appear in the Vue application |
|---|---|
| Screen structure (overview, parcels, exceptions, users, reports, audit, settings) | Cabinet hardware, 櫃機 and 格口 records |
| Table and filter patterns | A courier as a login role |
| Status pill treatment | Cabinet door faults as an exception type |
| Overview cards above the detail tables | Chinese interface text |
| | One fixed navigation set for a single operator |

## 2. Page inventory by role

| Role | Landing route | Pages in this prototype | Primary owner |
|---|---|---|---|
| Resident | `/my-parcels` | 5.1 my parcel list, 5.2 parcel detail | R5 |
| Staff | `/dashboard` | 5.3 dashboard (staff variant), 5.4 intake and batch intake, 5.5 storage location board, 5.6 pickup verification | R5, R4 for 5.5 and 5.6 |
| Owner | `/dashboard` | 5.3 dashboard (owner variant) | R5 |
| Admin | `/dashboard` | 5.3 dashboard (admin variant), 5.7 users, 5.8 collection point settings | R5 |

Route access, role names and the landing rules are taken from the page map:
Resident to `/my-parcels`, Staff, Owner and Admin to `/dashboard`, `/login` is
the only public route, and any other route redirects to 403 or 404.

## 3. Terminology

Interface text and repository content are English. The Chinese column exists
because the team discusses in Chinese; it is never displayed in the application.
Spelling follows `docs/glossary.md` exactly.

| Term used in the screens | Chinese | Meaning in this project |
|---|---|---|
| collection point | 代收點 | The site. One site, several storage locations |
| storage location | 庫位 | A numbered position on a shelf, not a physical locker |
| zone | 分區 | Large-item, small-item, perishable, long-stay |
| shelving | 上架 | Placing a parcel at a storage location |
| handover | 核銷 | Confirming the parcel reached the right person |
| pickup code | 取件碼 | One-time code the resident shows at the counter |
| waybill number | 運單號 | Courier tracking number, recognised by its prefix |
| retention period | 免費保管期 | Three days by default, configurable per point |
| overdue parcel | 逾期包裹 | Held longer than the retention period |

The other glossary terms these screens need — carrier, delegated collection
code, exception parcel, receiver sheet — are used exactly as `glossary.md`
defines them and are not repeated here. The retired words of `glossary.md`
section 7 (櫃機, 格口, 開箱 and the older product names) appear on no screen, and
neither does a courier account, which the reference prototype README retires.

## 4. Application shell

Shared by every authenticated page, implemented as `AppLayout.vue`.

```
┌──────────────────┬──────────────────────────────────────────────────────┐
│ Collection Point │  top bar: user name │ role chip │ Sign out           │
├──────────────────┼──────────────────────────────────────────────────────┤
│ > Dashboard      │  PageHeader: title, description, primary actions     │
│ > My parcels     ├──────────────────────────────────────────────────────┤
│ > Parcels        │                                                      │
│ > Locations      │  page content                                        │
│ > Pickup         │                                                      │
│ > Exceptions     │                                                      │
│ > Reports        │                                                      │
│ > Users          │                                                      │
│ > Settings       │                                                      │
│ > Audit          │                                                      │
└──────────────────┴──────────────────────────────────────────────────────┘
   220 px sidebar
```

1. One menu list, filtered by role, lives in `AppLayout.vue`. A page never adds
   its own navigation.
2. Every page starts with `PageHeader`: title, one line description, actions on
   the right.
3. The menu shows only pages the role may open, following the access column of
   the page map; the router still enforces the rule with `meta.roles`.
4. At 640 px and below the sidebar becomes a single row above the content, as
   already noted in `frontend/src/style.css`. Below 641 px the resident pages are
   the design target.

## 5. Page prototypes

Each page below lists its route, access, owner, the in-scope function it serves,
a wireframe, the fields where a form is involved, the states it must handle, and
the number of steps the main task takes.

### 5.1 Resident parcel list — `/my-parcels` — resident — R5 — IS-6 (FR: pending R3)

This is the landing page for a resident, so it is drawn as a phone card list and
not as a wide table. Survey finding: 9 of the 11 resident respondents use a
phone, and mobile support is specified as usable from 375 px.

```
┌────────────────────────────────────────┐
│ My parcels           [ All statuses v] │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ SF1234567890        [ Shelved    ] │ │
│ │ Storage  A-03-2                    │ │
│ │ Pickup code  4821                  │ │
│ │ Held 1 day                         │ │
│ │                        [ Open  ]   │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ YT9876543210        [ Shelved    ] │ │
│ │ Storage  B-01-4                    │ │
│ │ Pickup code  shown when ready      │ │
│ │ Held 2 days                        │ │
│ │                        [ Open  ]   │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ JD5566778899        [ Shelved    ] │ │
│ │ Storage  A-01-3   Overdue 4 days   │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

| Element | Detail |
|---|---|
| One card per parcel | waybill, status pill, storage location, pickup code, days held, open action |
| Pickup code | shown only when the parcel is `shelved`; otherwise the line reads "shown when ready" |
| Filter | one status filter, default all |
| Sort | newest first |

States:

- empty: "No parcels are waiting for you", with one line explaining that the
  resident is told when a parcel arrives (survey: notification is the highest
  priority resident function)
- loading: three skeleton cards
- error: `ErrorState` with the API message and a retry action
- overdue: the card of an overdue parcel is marked and shows the days held, so
  the resident does not need to open it to notice

Steps to the pickup code: 2 (open the list, open the parcel). Target duration for
the whole collection task, including the counter handover: 3 to 5 minutes.

### 5.2 Resident parcel detail — `/my-parcels/:id` — resident — R5 — IS-6 (FR: pending R3)

```
┌────────────────────────────────────────┐
│ < Back to my parcels                   │
│ SF1234567890            [ Shelved    ] │
├────────────────────────────────────────┤
│ PICKUP CODE                            │
│ 4 8 2 1                                │
│ Show this at the counter. Valid for    │
│ 1 more day.                            │
├────────────────────────────────────────┤
│ Where to collect                       │
│ Front desk, Block A · Zone A · A-03-2  │
│ Opening hours 09:00 - 21:00            │
├────────────────────────────────────────┤
│ Progress                               │
│ Registered ✓  Shelved ✓  Collected ○   │
├────────────────────────────────────────┤
│ Facts                                  │
│ Carrier SF Express · Size M            │
│ Shelved 12 Oct 18:40 · Fee none        │
├────────────────────────────────────────┤
│ Lost your code? Bring your phone       │
│ number and surname to the counter.     │
└────────────────────────────────────────┘
```

The progress labels are the screen labels of section 6, so the words on this
screen and the state machine use the same vocabulary.

States:

- loading: skeleton blocks in the same order
- error: `ErrorState`, with back navigation that still works
- by parcel state: `registered` hides the code and explains when it appears;
  `shelved` shows the code and the validity; `collected` shows a completed
  progress row and the handover time; an open exception ticket replaces the code
  block with a message that the site will contact the resident
- overdue: adds the days held and states whether a fee applies, or that no fee
  rule is active yet

Steps to read the code: 1 (the code is above the fold). The fallback path uses
the survey decision "phone number plus surname, recorded as an alternative
verification method".

### 5.3 Dashboard — `/dashboard` — staff, owner, admin — R4 + R5 — IS-2, IS-6, IS-7, IS-10, IS-11, IS-12 (FR: pending R3)

One route, three variants, chosen by the signed-in role.

Staff variant (the landing page of the workday):

```
┌───────────┬───────────┬───────────┬───────────┐
│ Received  │ Waiting   │ Handovers │ Open      │
│ today  12 │ 34        │ today   9 │ exceptions│
├───────────┴───────────┴───────────┴───────────┤
│ Location board summary        │ Alerts        │
│ Zone A  ▓▓▓░  Zone B ▓▓░░     │ · shelf full  │
│ Zone C  ▓░░░  Zone D ▓▓▓▓     │ · due today   │
├───────────────────────────────┴───────────────┤
│ Recent parcels (waybill, status, location)    │
└───────────────────────────────────────────────┘
```

The first card of the staff variant carries the batch intake shortcut, because
batch registration is the largest recorded source of delay at the counter
(survey staff finding S3, chosen by 4 of 7).

Owner variant: the first card is the overdue parcel count, because the most
important report for an owner is the overdue list (survey: chosen by 6 of the 7
owner respondents). Then received and collected volume for the period, then the
same alert block.

Admin variant: open exceptions, accounts and collection points, plus the audit
shortcut. No parcel volume.

States: loading (skeletons in each block); error (the failing block shows
`ErrorState` while the other blocks stay usable, so one slow endpoint does not
empty the page); empty (a new site with no data yet shows `EmptyState` with the
first useful action, for example "register the first parcel"); permission (a role
that is not allowed is redirected to 403 by the router, never shown a blank
dashboard).

Steps for the owner's main question "are any parcels overdue": 1 (the count is on
the landing page; the detail is one click away).

### 5.4 Intake and batch intake — `/parcels/new` — staff — R5 — IS-2, IS-3 (FR: pending R3)

This is the highest priority staff function in week 2, and it is the page that
decides how long a courier drop takes. It has two modes on one route.

Mode A, single parcel:

```
┌────────────────────────────────┬──────────────────────────────┐
│ Waybill *    [_______________] │ Suggested storage location    │
│ Carrier      (from the prefix) │ ┌──────────────────────────┐ │
│ Resident phone * [___________] │ │ Zone A · A-03-2          │ │
│ Resident name    [___________] │ │ size fits · zone priority│ │
│ Size *       [ S ] [ M ] [ L ] │ │ least loaded in zone     │ │
│ Note         [_______________] │ └──────────────────────────┘ │
│                                │ [ Accept ]  [ Choose ... ]    │
│ [ Register parcel ]            │                              │
└────────────────────────────────┴──────────────────────────────┘
```

Mode B, batch (one courier drop, from the receiver sheet):

```
┌───────────────────────────────────────────────────────────────┐
│ Batch intake            [ single ] [ batch ]                 │
├───────────────────────────────────────────────────────────────┤
│ Scan or paste waybills, one per line                          │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ SF1234567890                                              │ │
│ │ YT9876543210                                              │ │
│ │ SF1234567999                                              │ │
│ └───────────────────────────────────────────────────────────┘ │
│ Resident phone for this drop [_______________]  (optional)     │
│ [ Check 3 parcels ]                                           │
├───────────────────────────────────────────────────────────────┤
│ Waybill        Size  Suggested location   Issue               │
│ SF1234567890   M     Zone A · A-03-2      ok                  │
│ YT9876543210   S     Zone B · B-01-4      ok                  │
│ SF1234567999   L     none                 no free large slot  │
├───────────────────────────────────────────────────────────────┤
│ [ Register 2 parcels ]   [ Review the 1 problem ]             │
└───────────────────────────────────────────────────────────────┘
```

| Field | Control | Validation | Note |
|---|---|---|---|
| waybill | text | required, unique | the carrier is derived from the prefix and may be corrected |
| resident phone | text | required in single mode, optional in batch mode | matches the resident account |
| resident name | text | required when no account matched | |
| size | segmented control | required | drives the storage location filter |
| note | textarea | optional | |

States:

- loading: while the suggested location is being computed, the suggestion panel
  shows a placeholder and the register button stays disabled
- error, duplicate waybill: a field level error on that waybill, never a generic
  page error
- full shelf: no free storage location in the required size class; the panel
  offers the next best zone and a "shelve later" option that keeps the parcel
  `registered` with a visible flag, instead of blocking the counter
- partial batch failure: the successful rows are registered and the failures stay
  in the table with their reason, so staff never re-scan the whole drop
- empty batch: the check action is disabled until at least one waybill is present

Steps: single parcel, 2 fields plus one accept click after the waybill is typed;
batch, one check action per drop and at most one decision per problem row. Target:
the whole ten parcel drop is recorded in under three minutes.

### 5.5 Storage location board — `/locations` — staff, owner, admin — R4 — IS-3, IS-4 (FR: pending R3)

```
┌───────────────────────────────────────────────────────────────┐
│ Storage locations      zone [ All v ]   [ + Add location ]     │
├───────────────────────────────────────────────────────────────┤
│ Zone A  (full-shelf warning: 0 free)                          │
│  A-01-1 occupied  A-01-2 occupied  A-01-3 occupied            │
│  A-02-1 occupied  A-02-2 reserved  A-02-3 occupied            │
│ Zone B                                                        │
│  B-01-1 available B-01-2 occupied  B-01-3 disabled            │
├───────────────────────────────────────────────────────────────┤
│ selected: A-02-2   [ Assign parcel ] [ Disable ] [ Clear ]     │
└───────────────────────────────────────────────────────────────┘
```

States: empty (no locations configured, with the add action); full shelf (a zone
where every location is occupied or reserved carries a warning banner, because
the intake page depends on it); loading (grid skeleton); error (`ErrorState` with
retry); a disabled location is visually distinct and cannot be assigned.

Steps to answer "is there room for a large parcel": 2 (open the board, read the
zone row).

### 5.6 Pickup verification — `/pickup` — staff — R4 — IS-7 (FR: pending R3)

This is the counter screen and the fastest path in the system: the staff member
must finish a handover in three minutes or less.

```
┌───────────────────────────────────────────────────────────────┐
│ Verify a pickup code                                          │
│  ┌─────────────────────────────┐                              │
│  │ 4 8 2 1                     │   keyboard or scanner         │
│  └─────────────────────────────┘                              │
│  [ Verify ]         Resident lost the code? Use identity       │
├───────────────────────────────────────────────────────────────┤
│ Result                                                        │
│ SF1234567890 · resident Emily Chen · Zone A · A-03-2           │
│ [ Confirm handover ]                                          │
├───────────────────────────────────────────────────────────────┤
│ last: 4821 handed over 19:14 by staff1                        │
└───────────────────────────────────────────────────────────────┘
```

States:

- idle: empty input, verify disabled
- verifying: the button shows progress and the field is locked
- success: parcel summary plus `Confirm handover`, which opens
  `ConfirmDialog` because the action is irreversible
- invalid code: "This code is not recognised", with the attempt count kept low
  and no hint about which digits are wrong
- expired or already used: the reason is stated and the next action is offered
  (issue a new code, or hand over after the identity fallback)
- delegated code: the parcel and the authorised person are shown so staff can
  confirm the name before the handover
- identity fallback: phone number plus surname, recorded as an alternative
  verification method, per the survey decision; the screen says the fallback is
  recorded in the audit trail

Steps: 3 for the happy path (scan or type the code, verify, confirm). Target: three
minutes or less per handover, and no more than two screens.

### 5.7 Users — `/users` — owner, admin — R5 — IS-11 (FR: pending R3)

```
┌───────────────────────────────────────────────────────────────┐
│ Users            [ + Create staff ]  [ + Create resident ]     │
├───────────────────────────────────────────────────────────────┤
│ role [ v ]  status [ v ]  keyword [ name / phone ]             │
├───────────────────────────────────────────────────────────────┤
│ Name │ Role │ Phone │ Status │ Last sign in │ actions          │
│      actions: edit · reset password · disable                  │
└───────────────────────────────────────────────────────────────┘
```

States: empty (a new site with no staff account besides the creator);
loading; error; create dialog validation (phone format, role choice, duplicate
account); disable requires `ConfirmDialog` and states that the account keeps its
history and its audit trail.

Owner and Admin differ: an Owner manages the accounts of their own collection
points, an Admin manages every account. The screen states which scope is shown,
otherwise the Owner wonders why other sites are missing.

Steps to disable a staff account: 3 (find, open the row action, confirm).

### 5.8 Collection point settings — `/settings` — admin — R5 — IS-12 (IS-11) (FR: pending R3)

```
┌───────────────────────────────────────────────────────────────┐
│ Settings                                                      │
│ [ Collection points ] [ Retention ] [ Notifications ] [ System]│
├───────────────────────────────────────────────────────────────┤
│ Collection points                                             │
│ name, address, opening hours, contact, storage locations count │
├───────────────────────────────────────────────────────────────┤
│ banner: values marked read only are filled in by <task id>     │
└───────────────────────────────────────────────────────────────┘
```

| Tab | Content | Rule owner |
|---|---|---|
| Collection points | name, address, opening hours, contact | IS-11 |
| Retention | retention period, default three days, per point | survey decision |
| Notifications | which events notify a resident | T-43-01, R7 |
| System | pickup code length and expiry, overdue display | SRS OI-3 |

The survey showed that administrators do not want fee configuration (0 of 4 chose
it), so this page does not configure fees; it only controls how the days held are
displayed. Billing belongs to T-44-01 and is out of the must-have scope.

States: read only until the owning backend task is merged, with a banner naming
that task; validation errors per field; save confirmation; error with retry.

Steps to change the retention period: 3 (open the tab, edit, save).

## 6. Status labels used on the screens

States come from `docs/02-design/backend-state-machines.md`, so the prototype, the
database and the API use the same words. Labels are English, matching the rest of
the repository.

| Kind | State | Label on screen | Tone |
|---|---|---|---|
| Parcel | registered | Registered | info |
| Parcel | shelved | Shelved | success |
| Parcel | collected | Collected | neutral |
| Storage location | available | Available | success |
| Storage location | reserved | Reserved | warning |
| Storage location | occupied | Occupied | info |
| Storage location | disabled | Disabled | neutral |
| Pickup code | active | Active | success |
| Pickup code | used | Used | neutral |
| Pickup code | expired | Expired | warning |
| Pickup code | revoked | Revoked | danger |
| Exception ticket | open | Open | danger |
| Exception ticket | processing | Processing | warning |
| Exception ticket | resolved | Resolved | success |

An exception is not a parcel state (CR-006): an open ticket describes the problem
while the parcel keeps the status it had, so no screen shows "Exception" as a
parcel status tag. The pickup code and storage location states are unchanged.

`overdue` is not a state either: it is derived from the days held and is shown as
a marker on the resident card and in the overdue block of the dashboard, never as
a status tag.

## 7. Step counts and time budgets

The non-functional targets are checked against the prototype here, before any
code exists. "Steps" counts user actions, not clicks on every control.

| Task | Page | Steps | Target |
|---|---|---|---|
| Resident finds the pickup code | 5.1 then 5.2 | 2 | 3 to 5 minutes for the whole collection task |
| Resident reads the code in the detail screen | 5.2 | 1 | code above the fold |
| Staff records one parcel at the counter | 5.4 | 3 | under 1 minute per parcel |
| Staff records a courier drop of ten parcels | 5.4 | 1 check plus one decision per problem | under 3 minutes per drop |
| Staff hands one parcel over | 5.6 | 3 | 3 minutes or less |
| Owner checks whether anything is overdue | 5.3 | 1 | immediate on the landing page |
| Admin disables a staff account | 5.7 | 3 | under 1 minute |

## 8. Responsive rules

| Width | Layout |
|---|---|
| 375 px (primary target) | one column; resident pages are card lists; forms are single column; no horizontal scrolling anywhere; touch targets at least 44 px |
| 641 px to 1023 px | sidebar stays; tables drop to their priority columns; secondary facts move into the row detail |
| 1024 px and above | desktop layout with full tables and two column forms; desktop only has to remain usable |

The mobile target comes from the survey: 9 of 11 resident respondents use a phone,
and the agreed requirement is "usable from 375 px width, primary design target is a
phone screen". Staff and admin screens are desktop first but must not break at
375 px, because a staff member may check a parcel on a phone.

## 9. Traceability

| Page | In-scope function (SRS 1.5.2) | FR identifier | Sprint task (PLAN.md) |
|---|---|---|---|
| 5.1 my parcel list | IS-6, with IS-5 in the empty state | pending R3 | none named; the integration pass is T-42-09 |
| 5.2 parcel detail | IS-6 | pending R3 | none named; the integration pass is T-42-09 |
| 5.3 dashboard | IS-2, IS-6, IS-7 (staff), IS-10 (owner), IS-11, IS-12 (admin) | pending R3 | T-44-03 |
| 5.4 intake and batch intake | IS-2, IS-3 | pending R3 | T-42-07 |
| 5.5 storage location board | IS-3, IS-4 | pending R3 | T-42-06; high fidelity version in T-20-12 |
| 5.6 pickup verification | IS-7 | pending R3 | T-42-05 (page, R4), T-42-04 (backend) |
| 5.7 users | IS-11 | pending R3 | T-43-05 |
| 5.8 collection point settings | IS-12, with IS-11 | pending R3 | T-43-05 |

## 10. Open points

1. Functional requirement identifiers. SRS chapter 3 was not published when this
   document was written (issue #76, due 2026-10-17), so the mapping uses the
   in-scope functions of section 1.5.2 and the FR column says "pending R3". This
   is filled in before the review.
2. Pickup code visibility. This prototype hides the code until the parcel is
   `shelved` and shows the identity fallback instead. Confirm with R6 and R2,
   because it changes the resident detail screen and the notification wording
   in IS-5.
3. The resident pages have no named Sprint 2 task in `PLAN.md`; T-42-09 only wires
   existing pages to the API. Raise with R1 and R4 while sprint 2 is still being
   planned, otherwise the two resident pages fall between the tasks.
4. Batch intake scope. IS-2 covers single and batch registration, and week 2 calls
   batch the highest priority staff function, but no Sprint 2 task names it.
   Confirm with R1 whether 5.4 mode B is built in Sprint 2.
5. Owner as staff (SRS OI-2). It changes the Owner menu and 5.3. This prototype
   assumes an owner does not work the counter.
6. Retention period default. Three days is an assumption from the survey, not a
   measured value; it is displayed as a configurable default in 5.8. No fee amount
   is shown anywhere until T-44-01 is merged; the screens show the days held
   instead.

## 11. Self-check against the week 2 acceptance list

| Acceptance item for T-20-05 | Where it is satisfied |
|---|---|
| Every role has usable prototype pages | section 2: Resident, Staff, Owner and Admin each have at least one page, and section 5 draws each of them |
| Empty, loading, error and abnormal states are covered | the states list under each page in section 5, including the full shelf state in 5.4 and 5.5 |
| Every page points back to a requirement | section 9, with `pending R3` where the FR identifier does not exist yet |
| Mobile first at 375 px | section 8, plus the card layouts chosen in 5.1 and 5.2 |
| Terminology matches the glossary | section 3 |
| Step counts support the NFR targets | section 7: resident 3 to 5 minutes, staff handover 3 minutes or less |

Issue #83 also carries acceptance criteria for T-20-09 (the conventions
document) and T-20-10 (the ten-heuristic usability review by R9). Those two are
not part of this document and are not claimed here.
