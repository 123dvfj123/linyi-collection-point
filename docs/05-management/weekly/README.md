# Weekly evidence

## COMP 3500SEF Group 23

| Item | Detail |
|---|---|
| Owner | R1 |
| Task | T-00-06 |
| Status | Active |

This folder holds the weekly contribution screenshot. The project plan asks for
one screenshot per week, taken before the Sunday 21:00 logbook deadline, so that
the written logbooks can be checked against an independent record of who
actually committed.

## File naming

```
docs/05-management/weekly/YYYYMMDD_contributors-N.jpg
```

The date is the day the screenshot was taken, not the last day of the week. A
screenshot taken on Monday the 12th, covering the week that ended on the 11th,
is named `20261012_contributors-1.jpg`, because that is when the evidence was
captured.

`N` numbers the screenshots taken in that session. With ten members the
Contributors panel runs to more than one screen, so two images are expected
rather than one.

If a second capture is taken in the same week, for example after a late merge,
add a descriptive suffix:

```
20261012_contributors-1.jpg
20261012_contributors-after-merge-1.jpg
```

Lower case, hyphens, no spaces, as required by `CONTRIBUTING.md`.

### On the file extension

These files are JPEG images. They are named `.jpg` rather than `.png` so that
the extension matches what the file actually is. Naming a JPEG `.png` makes the
extension a lie, and a reader who opens the file properties will notice. The
extension is not what makes a file usable; the format is.

## How to take it

1. Open the repository on GitHub.
2. Go to **Insights**, then **Contributors**.
3. Confirm the date range shown covers the week being recorded.
4. Capture the full panel, including every member.
5. Commit before Sunday 21:00.

## What the screenshot is evidence of, and what it is not

A screenshot taken at a moment in time proves three things and no more.

| It does prove | It does not prove |
|---|---|
| That all ten members were active in the repository during the period shown | That the person who committed is the person who did the thinking |
| That the commit volume is real, and can be counted independently of the logbooks | That two members' contributions are comparable in value |
| That the work was spread across the team rather than concentrated in one pair of hands | That a low commit count means a low contribution |

The figures on the Contributors panel count commits to the default branch. A
merge commit counts once. Rebased and squashed commits are folded into their
result, so the panel number is lower than a tally of every push. The panel and a
raw commit count will therefore never agree exactly, and that is expected rather
than a discrepancy to chase.

## Index

| Week | Files | Date captured | Period covered |
|---|---|---|---|
| W01 | `20261012_contributors-1.jpg`, `20261012_contributors-2.jpg` | 2026-10-12 | 2026-09-28 to 2026-10-12 |

### What the W01 screenshot records

| Rank | Account | Member | Commits in the period shown |
|---|---|---|---|
| 1 | Django-coder6 | R1 Liu JiaHao | 18 |
| 2 | RookieVENENO | R4 Yuan Chong Jun | 15 |
| 3 | Christine049 | R5 Tan Yuan Ting | 7 |
| 4 | ohcyc246 | R2 Chan Yin Cho | 6 |
| 5 | smcheese9731-sys | R10 Chan Sung Ming | 4 |
| 6 | 123dvfj123 | R6 Hu Qing Kai | 4 |
| 7 | RavenG7 | R9 Guo Yuhui | 3 |
| 8 | Kennethli13 | R3 Li Cheuk Fung | 2 |
| 9 | fannaodawang | R8 Wu Kehao | 1 |
| 10 | Allen06914 | R7 Huang Wei Jia | 1 |

All ten members appear. This is the figure the minutes quote when they say that
every member shipped work in week one.

The lowest counts belong to the two members who had no issues assigned in week
one, and to the member who was absent from the week 1 meeting. A low count here
is a statement about the plan, not about the people. See the column on the right
in the table above.

## A note on not re-taking an old screenshot

A screenshot of a live panel is a dated artefact, not a maintained document. Do
not go back and retake an earlier week's screenshot to make the numbers look
better; the point of the evidence is that it was captured at the time.

If a screenshot was genuinely missed, record the gap in the index above rather
than reconstructing it.
