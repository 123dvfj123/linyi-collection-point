# Working agreement

Read this before your first commit.

## Branches

`main` always runs and is the version we demonstrate. It is protected, so
nobody pushes to it directly. Changes arrive through a pull request from a
`release/` or `hotfix/` branch.

`develop` is where work is integrated. It is protected too. Feature, fix and
documentation branches are merged into it.

Working branches come off `develop`:

- `feature/<module>-<short-name>` for new functionality, for example
  `feature/M3-location-recommend`
- `fix/<issue-number>-<short-name>` for defects, for example
  `fix/87-pickup-idempotency`
- `docs/<short-name>` for documentation, for example `docs/srs-v0.2`
- `release/v<major>.<minor>` for the end of a sprint
- `hotfix/<short-name>` for a fix needed right before a demonstration

## Commit messages

Use this form:

    <type>(<scope>): <subject> [TASK-ID]

Types we use: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `style`.

Examples:

    feat(pickup): generate one-time pickup code [M4-FR-4.1]
    fix(pickup): make handover idempotent under concurrent requests [M4-FR-4.4]
    docs(srs): add NFR-9 idempotency requirement [T-10-07]
    test(billing): add 20 fee calculation cases [M6-FR-6.2]

Two rules that matter:

1. Write the subject in English.
2. Always include the task or requirement ID. This is how we trace a commit
   back to the requirement it implements, and it is also how individual
   contribution is shown.

One commit should cover one thing, roughly 10 to 30 minutes of work. Do not
commit a whole week in a single push.

## Pull requests

1. Branch off the latest `develop`.
2. Commit as you go.
3. Push the branch.
4. Open a pull request with `develop` as the base branch and fill in the
   template.
5. One person other than the author approves it and CI must pass.
6. Delete the branch after merging.

## Every week

- At least two commits that each do something real.
- Update your own file under `docs/06-logbook/` and push it before 21:00 on
  Sunday.
- Write the logbook entry within 48 hours of doing the work. The commit
  timestamp is what shows the record was written at the time.
- Review at least one pull request from someone else.

## Do not commit

- `.env` files, passwords, API keys, tokens
- `node_modules/`, `dist/`, `build/`
- database files and log files
- Office lock files such as `~$report.docx`

## When you hit a conflict

```bash
git switch develop
git pull
git switch your-branch
git merge develop
# open the conflicted files, look for <<<<<<< and resolve them
git add .
git commit -m "chore: resolve merge conflict with develop"
git push
```

Do not use `git push --force`. If it is genuinely necessary, say so in the
group chat first and only force push your own branch.
