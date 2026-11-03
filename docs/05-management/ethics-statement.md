# Ethics and Privacy Statement

## COMP 3500SEF Group 23

### Community Parcel Collection Point Management System

| Item | Detail |
|---|---|
| Task | T-00-01 |
| Owner | R9 |
| Version | v1.0 |
| Status | Active |
| Basis | Course material on professional ethics and codes of conduct |

## 1. Why this statement exists

Software engineers have responsibilities beyond the technical work: to the
people whose data the system handles, and to the profession. This statement
records what personal data the project collects, why, how it is protected, and
what the team has decided not to do.

It applies to two separate things: the data the finished system would handle,
and the data the team collected while doing the project.

## 2. Data the system handles

| Data | Why it is needed | How it is protected |
|---|---|---|
| Resident phone number | Identifies the recipient and is used at the counter when a pickup code has been lost | Masked in every list view as `138****8888`. Not written to application logs. Not returned by list endpoints |
| Recipient name | Confirms the parcel belongs to the person collecting it | Shown only on the single parcel detail screen to the staff member handling that parcel |
| Parcel waybill number | Links the parcel to the courier's record | Visible to staff and to the resident it belongs to |
| Pickup code | Verifies that the person collecting is entitled to the parcel | One-time use, expires, and is stored hashed rather than in plain text |
| Staff account details | Access control | Passwords stored with bcrypt and a per-user salt. Not visible to other staff |
| Audit log entries | Resolves disputes and shows who handled a parcel | Append only. Records the actor, action, target and time. Contains no phone numbers or full names |

### 2.1 Access rules

Access follows the four roles. A resident can see only their own parcels. A
staff member can see parcels at their own collection point. An owner can see
the parcels and the audit log for the points they own. An administrator
maintains accounts and configuration but does not take part in the parcel
workflow.

Any action that changes the state of a parcel or a storage location writes an
audit record. The record cannot be edited or deleted through the application.

## 3. Data the team collected during the project

The team ran four questionnaires, one per role, and received 29 responses.

| Item | Detail |
|---|---|
| What was collected | Parcel collection frequency, device used, main problems, expected notification delay, function preferences, and for staff and owners, operating scale and current record-keeping method |
| Personal identifiers | None. The forms did not ask for a name. Respondents were not asked for their phone number, address or student number |
| Response counts | Resident 11, staff 7, owner 7, administrator 4 |
| Where the raw responses are kept | In the team's form account, accessible to the members running the questionnaires. Exported copies are not committed to the repository |
| How they appear in project documents | Only as aggregate counts, for example "4 of 7 staff respondents". No individual response is quoted in a way that would identify the respondent |

### 3.1 Specific commitments about questionnaire data

1. No respondent's name, contact details or identity appears in any project
   document, in the report, or in the repository.
2. Results are reported only as counts. Percentages are avoided in the
   documents, because the sample is small and a percentage would overstate
   precision.
3. The sample is described as a convenience sample in every document that uses
   it. The team does not claim that the results represent the wider population.
4. Raw response files are not committed to the repository. The repository holds
   only the analysed summary in `docs/01-requirements/elicitation/survey-results.md`.

## 4. What the team decided not to do

Recording these decisions is part of the statement, because an ethical position
is defined as much by what is refused as by what is done.

| Not done | Reason |
|---|---|
| Collect any personal data beyond what the workflow requires | Data that is not collected cannot leak |
| Share any data with a third party | No commercial purpose exists, and no consent was sought for it |
| Build user profiles or behavioural analytics | Outside the system purpose, and would require consent the team has no mechanism to obtain |
| Use real personal data in the system or in tests | All demonstration data is generated. No real phone number, name or address is used |
| Keep questionnaire data after the course ends | The raw responses are deleted once the project is graded |
| Simulate interview or survey data and present it as collected | Where simulated material was produced during early exploration, it was not merged into the project branches and is not used as evidence. The requirements rest on the 29 real responses |

The last row is recorded deliberately. During week 1 an exploration branch
contained generated response files and a document naming itself as a
simulation. Those files were kept off the main branches, and the requirements
use only the real questionnaire data.

## 5. Legal and institutional context

The project is a course exercise and processes no real personal data in the
running system. The team therefore does not act as a data controller in the
sense of a data protection statute. The principles above are applied anyway,
because they are the same principles a production system would have to follow,
and because the course material expects them.

Where the system would handle real resident data in a real deployment, the
following would additionally be required, and are recorded here as known gaps:

- a stated lawful basis for processing, and a retention policy
- a way for a resident to see and correct their own data
- an incident process for a data breach
- an agreement with the collection point operator covering who is responsible
  for the data

## 6. How this statement is maintained

This statement is reviewed when the data model changes, when a new data field
is added, or at the end of each sprint, whichever comes first. A change is made
through a pull request like any other document.

## Revision history

| Version | Date | Change | Author |
|---|---|---|---|
| v1.0 | Week 2 | Initial statement, covering system data and questionnaire data | R9 |
