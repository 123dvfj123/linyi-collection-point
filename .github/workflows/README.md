# Continuous integration

`ci.yml` currently checks the repository structure and looks for committed
environment files. It should stay green from week 1.

From week 7 the backend and frontend jobs are uncommented and extended to run
lint, tests with coverage, and a production build. Each extension of the
pipeline is its own commit with a `chore(ci):` prefix.
