# Frontend Reference Prototype

| Item | Detail |
|---|---|
| Status | Archived |
| Task | T-30-04 |
| Owner | R4 Frontend Lead |
| Kind | Throw-away prototype, retained as design history |
| Produced with | AI assistance (OpenAI Codex), reviewed by the author before use |

## What this is

An early usability prototype of the management console, written as a single
static HTML page with plain CSS and JavaScript. It was produced in week 1 so
that the team had something concrete to look at while the requirements survey
was still running. That is the design use of a prototype described in
Sommerville chapter 2: prototypes are used "in design processes to explore
options and develop a UI design".

It is kept for two reasons. It is evidence that the interface design was
explored rather than assumed, and it still shows the intended screen structure:
overview, parcel management, exceptions, users, reports, audit and settings.

**It is not the application.** There is no Vue, no router, no state store and no
API layer. Sommerville chapter 2 is explicit that a throw-away prototype "should
be discarded after development as [it is] not a good basis for a production
system", and ADR-003 states the same rule for this project: the reference HTML
"must be converted into Vue components rather than copied directly".

## What is superseded

The prototype was built before the scope and the role model were settled.
Several parts of it now contradict decisions the team has since recorded, and
none of them may be carried into the Vue application.

| In the prototype | The settled decision | Where it is recorded |
|---|---|---|
| 柜机 and 柜格, with cabinet status and a cabinet door fault exception | The system controls no hardware. It manages collection points and storage locations on shelves. | Glossary, list of terms no longer used; SRS 1.5 |
| Couriers managed as user accounts alongside residents | The courier is an external actor with no account. Staff record what the courier delivers. | `survey-results.md`, conclusion 1 |
| Cabinet door faults as an exception type | No hardware, so no door faults. The exception types are overdue, damaged, wrong recipient and other. | `ERD.md` |
| Chinese interface text | Repository content, documents and the report are written in English. | Team charter, section 5.3 |
| One fixed navigation set for a single operator | Routing is by role. Resident, Staff, Owner and Administrator each see a different set of pages. | `frontend-page-map.md` |

What does survive from it: the page structure, the table and filter patterns,
the status pill treatment, and the overall console layout.

## Opening it

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve docs/02-design/prototype
```

There is no build step and no backend. All data lives in memory in `app.js`, so
reloading the page restores the demo data.

## Files

| File | Contents |
|---|---|
| `index.html` | Entry point |
| `styles.css` | Layout, tables, status pills and responsive rules |
| `app.js` | Rendering and the in-memory demo data |
| `vendor/lucide.min.js` | Vendored icon library, so the prototype opens with no network access |

## Note for the documentation owner

The glossary lists 柜机, 格口 and 开门 as terms that must not appear in code,
comments, commits, documents or the report. This folder is an archived artifact
rather than a live document, and its text is the historical record of what was
built in week 1, so it is left exactly as it was written. The glossary may need a
one-line carve-out for archived prototypes; that is raised with R9 rather than
settled here.