# ERD - Community Parcel Collection Point System

- Status: Draft
- Date: 2026-10-10
- Owners: R6 Backend Lead, R7 Backend Developer
- Database: PostgreSQL 16
- ORM: Spring Data JPA

## Entities

### User

- id: UUID
- username: string, unique
- passwordHash: string
- fullName: string
- role: enum(resident, staff, owner, admin)
- phone: string
- active: boolean
- createdAt: timestamp
- updatedAt: timestamp

### Parcel

- id: UUID
- trackingNo: string, unique
- carrier: string
- recipientName: string
- recipientPhone: string
- size: enum(small, medium, large)
- status: enum(registered, shelved, collected)
- locationId: FK -> Location
- registeredById: FK -> User
- pickupCodeId: FK -> PickupCode
- expectedVersion: long
- createdAt: timestamp
- updatedAt: timestamp

The three status values are the ones ruled by CR-006 and confirmed as decision
D3 in the week 1 review. `out_for_delivery`, `ready_for_pickup` and `returned`
described courier and logistics stages, and SRS section 1.5 puts dispatch and
delivery tracking outside the system boundary, so they are not parcel states.
An exception is not a parcel state either; see `ParcelException` below.

### Location

- id: UUID
- code: string, unique
- zone: string
- size: enum(small, medium, large)
- status: enum(available, reserved, occupied, disabled)
- parcelId: FK -> Parcel, nullable
- updatedAt: timestamp

### PickupCode

- id: UUID
- parcelId: FK -> Parcel
- code: string, unique
- status: enum(active, used, expired, revoked)
- expiresAt: timestamp
- usedAt: timestamp
- createdAt: timestamp

### Handover

- id: UUID
- parcelId: FK -> Parcel
- pickupCodeId: FK -> PickupCode
- operatorId: FK -> User
- result: enum(collected, returned, exception)
- auditId: FK -> AuditLog
- createdAt: timestamp

### ParcelException (entity `ExceptionRecord`)

The exception flow is separate from the parcel lifecycle, as ruled by CR-006 and
recorded as decision D5 in the week 1 review: `ParcelException` is the class and
`ExceptionRecord` is the persisted entity. A parcel keeps its
`registered / shelved / collected` status while an open exception ticket
describes the problem, so an exception never adds a value to `Parcel.status`.

- id: UUID
- parcelId: FK -> Parcel
- type: enum(overdue, damaged, wrong_recipient, refused, lost)
- status: enum(open, processing, resolved)
- note: string
- assigneeId: FK -> User
- resolvedAt: timestamp
- createdAt: timestamp

### AuditLog

- id: UUID
- actorId: FK -> User
- action: string
- targetType: string
- targetId: UUID
- before: jsonb
- after: jsonb
- createdAt: timestamp

### Setting

- id: UUID
- key: string, unique
- value: string
- description: string
- updatedById: FK -> User
- updatedAt: timestamp

## Relationships

- User 1 --- N Parcel (registeredBy)
- Location 1 --- 0..1 Parcel (occupied location)
- Parcel 1 --- 0..1 PickupCode
- PickupCode 1 --- 0..1 Handover
- Parcel 1 --- 0..N ParcelException
- User 1 --- 0..N Handover (operator)
- User 1 --- 0..N AuditLog

## Concurrency Notes

- `Parcel.status` changes are guarded by `expectedVersion` optimistic locking. A
  client sends the version it read; if the row has moved on, the update is
  rejected instead of silently overwriting a newer state.
- `Parcel.trackingNo` is unique, so the same waybill cannot be registered twice.
- `PickupCode.code` has a unique constraint.
- `Location.parcelId` has a unique partial constraint, so one location cannot
  hold two parcels at once. This is the defence for RSK-08.
- `Handover` is idempotent by `pickupCodeId`. The confirm step runs as one
  transaction that marks the pickup code used and writes the handover row. A
  repeated confirm finds the code already used and returns the recorded result
  instead of writing a second handover, and two staff members confirming the
  same code at the same time cannot both succeed because the update on the code
  row holds the row for the length of the transaction.

## Status Value Notes

- `Parcel.status` uses the three lifecycle values from CR-006:
  `registered`, `shelved`, `collected`.
- `Location.status` (`available`, `reserved`, `occupied`, `disabled`) and
  `PickupCode.status` (`active`, `used`, `expired`, `revoked`) are deliberately
  kept as they are. They describe the state of records inside the system rather
  than courier stages, so the CR-006 reduction does not apply to them. They
  already agree with the state machines and with the OpenAPI enums.
- `Handover.result` (`collected`, `returned`, `exception`) is the outcome of one
  handover, not a parcel status.
