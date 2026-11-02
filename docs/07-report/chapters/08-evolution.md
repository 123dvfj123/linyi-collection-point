# 8. Software evolution

Change is recorded rather than remembered: thirty-three change records carry every decision this
project made. Five of them show the process working. CR-013 added the resident endpoints that the
specification listed as must-have while the contract lacked them. CR-010 and CR-011 corrected the
exception types to five values, because CR-006 had only governed parcel status. CR-012 single-sourced
an exception list that seven documents each restated. CR-029 corrected CR-028, which had invented a
pending storage slot that the schema cannot represent given one parcel per location row. CR-033 made
handover confirmation idempotent, matching the ERD and NFR-4 against a task description that claimed
the opposite. Each was raised, recorded with the alternatives it rejected, and approved before the
code moved. Two smaller cases completed the set: a case-sensitivity regression between `personas.md`
and `Personas.md` was fixed by rewriting the link check to compare exactly, and the risk register
closes a risk only with evidence and records the rest as blocked, reviewed every sprint.
