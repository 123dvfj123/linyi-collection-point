# Intake to handover: which test proves which scenario

| Field | Detail |
|---|---|
| Date | 2026-11-02 |
| Baseline Commit | `develop` (`3300a84`) |
| Issue | `#239` (`T-42-08`) |
| Command | `./mvnw -B verify` (the integration tests use Testcontainers with PostgreSQL 16) |

---

## 1. The four scenarios and the tests that cover them

`#239` names four scenarios. Each has a test, and the table names the method rather than the directory
so a reviewer can read the assertion. The names below were taken from the source files, not from
memory.

| # | Scenario | Test class | Method |
|:--:|---|---|---|
| 1 | A parcel is registered | `ParcelRegistrationIntegrationTest` | `createsParcelAndWritesOneMaskedAuditEntry` |
| 1 | …and then reads as shelved | **none** | **see section 2** |
| 2 | A duplicate waybill is rejected | `ParcelRegistrationIntegrationTest` | `databaseUniqueConstraintRejectsADuplicateTrackingNo` |
| 3 | A pickup code is redeemed and the parcel reads as collected | `PickupHandoverIntegrationTest` | `confirmationUpdatesTheShelfSafelyAndWritesOneMaskedAuditEntry` |
| 4 | Two confirms sent together hand over exactly one parcel | `PickupHandoverIntegrationTest` | `concurrentConfirmationCreatesExactlyOneHandoverAndAuditEntry` |

**Also covered, because `#98` and `CR-033` turned them into contract obligations:**

| Behaviour | Test class | Method |
|---|---|---|
| Unknown, expired and used codes return the contract error codes | `PickupHandoverIntegrationTest` | `returnsContractErrorCodesForUnknownExpiredAndUsedCodes` |
| A code from another collection point is not usable | `PickupHandoverIntegrationTest` | `hidesCodesAndParcelsOwnedByAnotherCollectionPoint` |
| A parcel no longer on its recorded shelf is refused | `PickupHandoverIntegrationTest` | `rejectsAParcelWhoseLocationIsNoLongerOccupiedByIt` |
| A repeat confirmation is idempotent (`NFR-4`) | `PickupHandoverIntegrationTest` | `repeatConfirmationReturnsTheSameHandoverWithoutWritingMoreRows` |
| A location is disabled and re-enabled with an audit trail | `LocationManagementIntegrationTest` | `manuallyDisablesAndReenablesALocationWithAuditTrail` |
| A manually-managed location cannot be moved by hand | `LocationManagementIntegrationTest` | `cannotManuallyMoveAWorkflowManagedLocation` |

---

## 2. Scenario 1 is only half covered, and the reason is a missing endpoint

`createsParcelAndWritesOneMaskedAuditEntry` asserts this:

```java
.andExpect(jsonPath("$.status").value("registered"))
```

`Parcel.register(...)` sets `this.status = ParcelStatus.registered` unconditionally, whatever
`locationId` the request carries. `ParcelController` exposes only `POST /api/parcels` and
`POST /api/parcels/batch`, so there is no request that moves a parcel from `registered` to `shelved`.

The integration tests work because their fixtures insert the state directly:

```java
'status'::parcel_status, NULL, ?, NULL, 1, ?    // with 'shelved'
```

So scenario 3 and 4 pass against a parcel that a **test fixture** shelved, not a parcel the
**application** shelved.

**Consequence.** `#98` gap 1 was "a parcel that is already `registered` cannot be given a location".
`CR-029` answered the schema question (a parcel may be registered without a location, and
`locationId` is nullable) but no record assigns one afterwards, and no endpoint does it. The state
machine allows `registered → shelved`; the API does not.

**This is the honest gap for `#239` and for `#185`'s "explicitly carried forward with a reason".**

---

## 3. Scenario 4 and the transaction

`#239`'s first acceptance criterion has two halves, and the second one is the reason the issue exists:

> All four scenarios have tests, **and the concurrency one genuinely fails if the transaction is
> removed**.

The method exists and passes in CI. The second half verifies the test's own strength: comment out
`@Transactional` on `PickupConfirmationService`, run
`./mvnw -B test -Dtest=PickupHandoverIntegrationTest`, and confirm
`concurrentConfirmationCreatesExactlyOneHandoverAndAuditEntry` fails. If it still passes, the test is
asserting the wrong thing.

**Status: not yet performed, and it cannot be performed on a machine without Docker** — the class is
annotated `@Testcontainers(disabledWithoutDocker = true)`, so without Docker it is skipped rather than
run.

---

## 4. What is not claimed here

- The integration tests skip on a machine without Docker. They ran in CI, where Docker is available.
- The coverage figures live in `Coverage-Report1.md`; this file makes no coverage claim.
- `RTM.md` maps requirements to test classes. This file maps one issue's scenarios to test methods,
  because `#239` asks for the latter and the matrix answers a different question.
