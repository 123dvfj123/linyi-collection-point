# High fidelity pages: pickup, intake and dashboard

| Item | Detail |
|---|---|
| Task | T-20-12 (Sprint 1, week 2) |
| Owner | R4 Frontend Lead |
| Sources | `design-system.md` (visual language), `frontend/src/styles/tokens.css` (the tokens), `ui-prototype.md` (structure and states), `frontend-page-map.md` (routes and roles) |
| Rendered | Microsoft Edge, headless, 1440 px wide, device scale factor 2 |

## What this is

The three pages the task names, at high fidelity: the counter screens a staff
member uses all day.

| Image | Route | Source | What it shows |
|---|---|---|---|
| `dashboard.png` | `/dashboard` | `dashboard.html` | the staff variant: four metrics, the location board summary, alerts, and the recent parcel table |
| `intake.png` | `/parcels/new` | `intake.html` | mode A, one parcel: the form, the suggestion panel, and the suggestion-only rule (CR-004) |
| `pickup.png` | `/pickup` | `pickup.html` | the counter screen: the code field, the result panel, and recent handovers |

Every value is a design token. `hi-fi.css` links `frontend/src/styles/tokens.css`
instead of copying it, so these pages cannot drift from the design system.

Two cards that sit side by side share one height by default (`.split`), so a row never looks cut off. Intake is the exception: its suggestion panel is short, so `.split--top` leaves it at its natural height instead of stretching it into empty space. Dashboard and pickup keep the shared height, because their pairs (board beside alerts, code beside result) hold comparable amounts of content.

## Where the decisions come from

The course treats interface design as one of the four design activities, beside
architectural, database and component design (Lecture 2, "Design activities").
This task is that activity: the structure comes from the prototype, the visual
language from the design system, and the result is reviewed before any code is
written.

| Decision | Traces to |
|---|---|
| Interface design as a design activity | Lecture 2, Design activities |
| One primary action per screen, and the counter page fits one screen | `ui-prototype.md` 5.6 (3 steps, 3 minutes or less) |
| Consistency: colour, spacing and type come from tokens only | `design-system.md` 4, 5, 6, 7 |
| Recoverability and guidance: every field has a label, the error belongs under the field, one failing block does not empty the page | `design-system.md` 12; `ui-prototype.md` 5.3 states |
| Colour is never the only carrier of meaning | `design-system.md` 14 |
| The phone is the design target, the desktop only has to stay usable | `design-system.md` 13; survey section 7 |
| No person is named on a screen | `ui-prototype.md` 5.6, CR-009 |

Whatever the courseware does not cover was taken from the repository: the token
names, the component, table and form rules and the Element Plus boundary all come
from `design-system.md`, and the page content from `ui-prototype.md`.

## Two gaps found while building this, closed in the same pull request

1. `design-system.md` 7.3 named `--shadow-resting` and `--shadow-floating`, but
   `frontend/src/styles/tokens.css` did not define them. Both are defined now as
   elevation primitives, their values are recorded in `design-system.md` 7.3, and
   these pages use `--shadow-resting` on a card.
2. The token set had no inverse, or on-primary, text token, so the primary button
   label had to borrow `--color-surface`. `--color-on-primary` is a semantic token
   now and these pages use it.
## How to re-render

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1440,1150 \
  --screenshot=dashboard.png "file:///.../high-fidelity/dashboard.html"
```

## Known limitation

A 375 px render was attempted and is deliberately not shipped: in a static mockup
the content still renders wider than the viewport. The mobile rules exist
(design system 11 and 13), but they have to be verified against the built
components in Sprint 2, where the shell and the long counter labels are no longer
hard-coded.