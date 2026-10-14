# Changelog

## [Unreleased]

### Added
- repository scaffold, working agreement, issue and pull request templates (week 1)

## [v0.1.0] - week 3, 14 October 2026

Sprint 1, the requirements and design baseline. Tagged on `develop`.

### Added
- SRS chapters 1 and 2, the user journey maps, the personas and the survey records
- ERD, the OpenAPI contract v0.2.0-draft, the four ADRs and the backend state machines
- UML baseline: two use case, three sequence, one class, two activity and four state machine sources, twelve `.puml` files in total (PR #95, PR #103, PR #106)
- frontend design system and the design tokens as CSS custom properties (PR #102, PR #104)
- UI prototype for the four roles (PR #94)
- frontend skeleton: router with a role guard, Pinia auth store, one Axios wrapper, ESLint and eleven unit tests (PR #97)
- Docker Compose for PostgreSQL, Redis and the frontend, with the backend behind a profile until its build files land (PR #93)

### Changed
- the parcel status model reduced to `registered`, `shelved` and `collected`, with an exception handled as a separate flow (CR-006)
- the handover operator moved to the authenticated session (CR-007)
- the exception types fixed at five values (CR-010, CR-011)
- the glossary named as the single source for term lists (CR-012)

### Known gaps at this tag
- SRS chapter 3 onwards does not exist yet (issue #76)
- `backend/` holds no code: no `pom.xml` and no Maven wrapper (issue #75)
- the resident read path, `/my-parcels`, has no endpoint; the scope ruling is CR-013, status Proposed
- the traceability matrix and the product backlog do not exist (issue #77, issue #78)

## Planned releases

| Version | When | Sprint | Contents |
|---|---|---|---|
| v0.0.1 | week 1 | Sprint 0 | repository scaffold, working agreement and templates |
| v0.1.0 | week 2 | Sprint 1 | requirements and design baseline |
| v0.2.0 | week 4 | Sprint 2 | intake, shelving and pickup working end to end |
| v0.3.0 | week 6 | Sprint 3 | notifications, exceptions, stocktake, admin |
| v0.4.0 | week 7 | Sprint 4 | reports, audit and tests passing |
| v1.0.0 | week 8 | closure | report, logbooks, deployed environment |
