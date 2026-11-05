# Week 5 Functional Scope Baseline

| Item | Detail |
|---|---|
| Purpose | T-10-08 / issue scope evidence: distinguish current implementation evidence from release recommendations for the 32 Must FRs |
| Date | 2026-11-05 |
| Source baseline | `docs/01-requirements/RTM.md` v0.5, SRS Chapter 3, `docs/05-management/change-log.md` v1.23, CR-034–036 merged evidence |
| Decision status | Evidence and recommendations for R2/R6 review; this document does not approve a MoSCoW change or create a change record |

## Decision rule

The RTM's `designed` status means a requirement has design/contract coverage, not that code is delivered. `Implemented` means code is present; it does not by itself claim passing requirement-level tests. The table preserves the RTM status except where merged implementation evidence after the RTM baseline supports an update. A future-release recommendation for a Must is **not an approved priority change**: R2 must record and approve a scope CR before the SRS/backlog/RTM priorities or release commitment change. Where no existing CR authorizes that cut, the table says so rather than inventing a CR number.

For this review, count as evidenced implemented only the narrow, reachable paths confirmed in the repository: login/RBAC and single-parcel registration/shelving with a location. CR-034–036 are recorded as implemented after merge, with develop CI `41658317363` (87 tests, 0 skipped) and V4 5/5 as evidence. This does not establish that every adjacent FR is implemented or tested. Other items remain designed unless their implementation is evidenced; reserved test IDs are not proof that tests pass.

## Must FR scope table

| FR ID | Current status | Release decision | Reason / evidence | CR |
|---|---|---|---|---|
| FR-1 | implemented | This release — retain; verify in review CI | RTM already records implemented; login/authentication is present. | CR-009 (role/identity requirements) |
| FR-2 | designed | Recommend future; resident read path is not built. Must status remains unchanged pending approval. | `GET /my-parcels` is explicitly “specified and not built”; resident pages are placeholders. | CR-013 adds the contract only; it is not approval to defer. A scope CR is still required. |
| FR-3 | designed | Recommend future; resident read path is not built. Must status remains unchanged pending approval. | `GET /my-parcels/{id}` is explicitly “specified and not built”. | CR-013 (contract only); separate scope CR required. |
| FR-4 | designed | Recommend future; resident read path is not built. Must status remains unchanged pending approval. | Lifecycle vocabulary is designed, but the resident parcel read endpoint is not implemented. | CR-006 defines parcel states; CR-013 documents the unbuilt read path. Separate scope CR required. |
| FR-5 | designed | Recommend future; resident read path is not built. Must status remains unchanged pending approval. | Location data is modelled, but no resident detail endpoint delivers it. | CR-013 (contract only); separate scope CR required. |
| FR-6 | designed | Recommend future; notification feature is not evidenced in the API/model. Must status remains unchanged pending approval. | RTM says Notification entity and endpoint are absent; no claim of notification delivery is made. | No logged CR approves deferral; R2 scope CR required. |
| FR-7 | designed | Recommend future; notification feature is not evidenced in the API/UI. Must status remains unchanged pending approval. | RTM says no Notification entity, endpoint, or resident notification route. | No logged CR approves deferral; R2 scope CR required. |
| FR-8 | designed | Recommend future for the resident retrieval action; Must status remains unchanged pending approval. | CR-034 issues a code during staff registration/shelving, but resident `GET /my-parcels/{id}/pickup-code` remains specified and not built. Code issuance is not the resident read path. | CR-013 (contract only); CR-034 covers staff-side code issuance, not resident retrieval. Separate scope CR required. |
| FR-11 | designed | Recommend future unless role-scoped staff listing and its test are demonstrated before review; Must status remains unchanged pending approval. | RTM has no implementation evidence for staff parcel listing with collection-point isolation. | CR-021 establishes collection-point design, not delivery; scope CR required for deferral. |
| FR-12 | implemented | This release — retain; run/retain the registration test. | `POST /parcels` registration is implemented; CR-034's merged behavior registers with a location and shelves/issues a code in the transaction. | CR-034 (implemented; CI evidence recorded in change log). |
| FR-13 | designed | Recommend future; Must status remains unchanged pending approval. | RTM explicitly identifies no parcel-history endpoint. Audit storage alone does not provide a history read path. | CR-007 defines handover operator handling; no scope cut is logged. R2 scope CR required. |
| FR-14 | implemented | This release — retain; verify the reachable shelving path in CI. | CR-034 makes registration with `locationId` shelve the parcel, occupy the location and issue a code; CR-036 makes the location endpoint staff-authorized. | CR-006 (lifecycle), CR-034 and CR-036 (merged implementation). |
| FR-15 | designed | Recommend future unless location availability read behavior and test are demonstrated before review; Must status remains unchanged pending approval. | RTM names `GET /locations` but records the FR as designed; contract existence alone is not delivery evidence. | CR-034/036 address shelving reachability/authorization, not proof of the full availability requirement. Scope CR required for deferral. |
| FR-16 | designed | Recommend future for standalone manual assignment; Must status remains unchanged pending approval. | A parcel can be shelved during registration under CR-034, but RTM identifies the standalone reserve/cancel and post-registration assignment gaps. Do not equate the narrower CR-034 path with the whole FR. | CR-004 was superseded by CR-023 for recommendation priority; CR-034 covers create-with-shelving only. Separate scope CR required. |
| FR-17 | designed | Recommend future unless duplicate rejection and its CI test are demonstrated before review; Must status remains unchanged pending approval. | Unique constraint/contract are documented, but RTM status is designed; no linked passing evidence is asserted here. | No scope-cut CR logged; R2 scope CR required if deferred. |
| FR-18 | designed | Recommend future; Must status remains unchanged pending approval. | RTM reserves batch tests but records the feature as designed; TC-PARC-008 remains blocked, and reservation is not passing evidence. | CR-003 approves Must priority and CR-025 keeps the 50-item limit; neither approves deferral. New scope CR required. |
| FR-21 | designed | Recommend future unless end-to-end staff verification is demonstrated before review; Must status remains unchanged pending approval. | Pickup verification service/test artefacts exist, but the RTM still records designed and current CI summary alone does not establish this FR's linked test result. | CR-007 defines operator identity; CR-034 issues a code but does not alone prove verification. Scope CR required for deferral. |
| FR-22 | designed | Recommend future unless authenticated-session operator recording is demonstrated before review; Must status remains unchanged pending approval. | Operator identity is in the design/contract; this table does not infer a passing FR-specific test from design coverage. | CR-007. Scope CR required for deferral. |
| FR-25 | designed | Recommend future unless handover audit creation is demonstrated before review; Must status remains unchanged pending approval. | Audit schema and design are present; RTM status remains designed and no linked passing test evidence is cited here. | CR-007. Scope CR required for deferral. |
| FR-26 | designed | Recommend future; Must status remains unchanged pending approval. | RTM records no dashboard/report endpoint; owner reports are not evidenced as implemented. | CR-021 establishes collection-point model only. No scope-cut CR logged; R2 scope CR required. |
| FR-27 | designed | Recommend future; Must status remains unchanged pending approval. | `GET /parcels` contract mentions owner records, but RTM identifies missing owner-to-point query scope/join design; contract is not implementation. | CR-021 establishes collection-point model only. No scope-cut CR logged; R2 scope CR required. |
| FR-28 | designed | Recommend future; Must status remains unchanged pending approval. | RTM notes `collectionPointId` filter absent from the parcel query contract. | CR-021 establishes collection-point model only. No scope-cut CR logged; R2 scope CR required. |
| FR-29 | designed | Recommend future; Must status remains unchanged pending approval. | No overdue-report endpoint; RTM schedules it as design/work, not implementation. | CR-022 excludes online payment/settlement but does not defer fee/report calculation. No scope-cut CR logged; R2 scope CR required. |
| FR-32 | designed | Recommend future; Must status remains unchanged pending approval. | RTM identifies missing staff-to-point ownership link and no implemented owner staff-list path. | CR-021 establishes collection-point design only. No scope-cut CR logged; R2 scope CR required. |
| FR-34 | designed | Recommend future; Must status remains unchanged pending approval. | Owner query isolation depends on point membership/scope; RTM records a join/scope gap. | CR-021 establishes collection-point design only. No scope-cut CR logged; R2 scope CR required. |
| FR-35 | designed | Recommend future; Must status remains unchanged pending approval. | RTM identifies missing audit query/scope capability for owner-managed points. | CR-008 defines the audit requirement; no scope-cut CR logged. R2 scope CR required. |
| FR-40 | designed | Recommend future; Must status remains unchanged pending approval. | RTM identifies no administrator account-list endpoint. | No scope-cut CR logged; R2 scope CR required. |
| FR-42 | designed | Recommend future; Must status remains unchanged pending approval. | RTM identifies no administrator endpoint to disable accounts. | No scope-cut CR logged; R2 scope CR required. |
| FR-43 | designed | Recommend future; Must status remains unchanged pending approval. | CollectionPoint is designed, but RTM identifies no administrator create-point endpoint. | CR-021 establishes the entity, not the administrative workflow. No scope-cut CR logged; R2 scope CR required. |
| FR-45 | implemented | This release — retain; verify role authorization in CI. | RTM records implemented; authentication/security components and the endpoint authorization matrix are present. | CR-009 (role/access decision); CR-036 closes the staff shelving authorization gap. |
| FR-46 | designed | Recommend future unless migration and scoped-record enforcement are evidenced before review; Must status remains unchanged pending approval. | RTM identifies the collection-point migration as outstanding; ERD design alone is not implementation. | CR-021 (design decision); issue #127 tracks migration. A scope CR is required if deferred. |
| FR-47 | designed | Recommend future; Must status remains unchanged pending approval. | RTM identifies no administrator audit-query endpoint; audit storage is not cross-point log viewing. | CR-008 defines the admin-audit requirement. No scope-cut CR logged; R2 scope CR required. |

## Related scope areas outside the 32 Must FRs

- **Exceptions:** FR-23 and FR-24 are marked Should in the RTM, not Must. CR-010/011 standardize exception types and terminology; the API dependency document still marks `/exceptions` P1 Proposed. Recommend future for this release; do not describe the exception workflow as implemented or change its priority here.
- **Notifications:** FR-6/7 are Must and remain designed, with no notification entity/endpoint evidenced. Any deferral requires an explicit R2 scope CR; no such approval is claimed above.
- **Owner/admin reports:** Must report/admin read and management requirements are individually listed above. No dashboard/report or admin endpoints are evidenced in the RTM; recommend future only after the required scope CRs are approved.
- **Resident read path:** FR-2–5 and FR-8 remain specified but not built under CR-013. CR-034 delivers staff-side registration/shelving and code issuance; it does not deliver resident reads.

## RTM alignment note

This scope table is a single evidence artifact; it does not silently rewrite SRS MoSCoW priorities or claim that all 32 Must FRs are release commitments. To finish the separate RTM alignment, R8 should retain the three state meanings (`designed`, `implemented`, `tested`) and update only rows supported by implementation/test evidence after review. Do not label a row `tested` merely because its test ID is reserved or the overall CI workflow is green. R2 must create/approve scope CRs for the proposed future-release Must items before recording a Must-to-Could/Will-not-have change in the backlog, SRS, or RTM.

## Evidence references

- `docs/01-requirements/RTM.md` v0.5: FR status, design gaps, and reserved test IDs.
- `docs/01-requirements/specification/SRS.md` §§3.1–3.4: requirement definitions and existing MoSCoW values.
- `docs/03-api/openapi.yaml`: resident paths explicitly specified and not built; exceptions remain proposed; CR-034 registration contract.
- `docs/05-management/change-log.md` v1.23: CR-034–036 marked implemented; develop CI `41658317363` (87 tests, 0 skipped), V4 5/5.
- `docs/05-management/pr-requests/20261103_p0-reachability.md`: merged reachability evidence and remaining reviewer checks.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v0.1 | 2026-11-05 | Add evidence-based Week 5 Must-FR scope table; distinguish implementation evidence from provisional future-release recommendations and identify scope CRs still needed | R2 / review pending |
