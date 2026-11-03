# 5. Architectural and database design

Four ADRs record the architecture and rejected options. ADR-002 and ADR-003 fix the shape of the
backend and the frontend, ADR-005 selects Spring Boot against the alternatives, and ADR-004 defines
the recommendation rule. The database is one Flyway baseline of nine tables and nineteen foreign keys,
so the schema is versioned rather than grown. The parcel status model reduced seven statuses to
three, because the others described courier stages outside the SRS system boundary (CR-006).
