# Frontend

Vue 3 and Vite client for the community parcel collection point system.

The architecture, the folder rules and the approved libraries are defined in
`docs/02-design/adr/ADR-003-frontend-architecture.md`. Read it before adding a
dependency or a new folder.

## Commands

```bash
npm install
npm run dev        # development server on http://localhost:5173
npm run lint       # ESLint (flat config, Vue 3)
npm run test       # Vitest in watch mode
npm run test:run   # Vitest once, for CI
npm run build      # production build into dist/
```

## Full-stack demo flow

Run the following from the repository root with Docker Desktop using Linux
containers:

```bash
docker compose --profile full up -d --build --wait --wait-timeout 300
```

Open `http://localhost`, then use the seeded staff account:

```text
username: demo_staff_1
password: password
```

Verify the primary staff workflow:

1. Open **Register parcel** and choose an available storage location.
2. Submit a parcel and confirm the success message shows both the location code
   and the newly issued pickup code. Record the tracking number and pickup code.
3. Reload the location board and confirm the selected location is `occupied`.
4. Open **Pickup**, enter the issued pickup code, and confirm the parcel and
   storage location shown are correct.
5. Confirm the handover and check that the page reports it as recorded. A
   repeated confirmation is idempotent and returns the same handover.

Repeat the register-success and pickup screens at a 375 px viewport and check
that the page has no horizontal scrolling and every action remains visible.

The 2026-11-05 verification of this flow is recorded in
`docs/04-testing/evidence/W05-R4/README.md`.

Stop the stack when the check is complete:

```bash
docker compose --profile full down
```

## API base path

The browser calls `/api`. ADR-003 fixes this base path, and the Vite dev server
proxies `/api` to the backend on `http://localhost:8080` (see `vite.config.js`),
so local development does not depend on CORS.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `/api` | Overrides the API base path for a deployed build. Set it only when the frontend and the backend are served from different origins. |

## Response and error shape

The contract (`docs/03-api/openapi.yaml`) returns a successful payload **flat**,
with no envelope, and wraps a failure inside an `error` object:

```text
success  200  { token, user }   or   { items, total, page, pageSize }
failure  4xx  { error: { code, message, requestId } }
```

`src/api/http.js` is the only file that knows this. It hands the payload
straight to the caller and rejects with `{ status, code, message, requestId }`,
so a page handles one error shape and never reads an axios error. A `401`
clears the session and sends the browser to `/login`.
## Current status

T-30-04 delivered the shell: application layout, routing, route guards, the
Pinia auth store, the single Axios wrapper and one placeholder view per page in
the frontend page map. Sprint 2 replaced the mock login with the real
`POST /api/auth/login` call and connected intake, locations and pickup to the
backend. The resident, owner and admin read pages are still placeholders and
are tracked in the page map.

Every route in `src/router/index.js` also appears in
`docs/02-design/frontend-page-map.md`, with the same path, view name and role
list. A view that is still a placeholder says so and names the role that will
implement it.
