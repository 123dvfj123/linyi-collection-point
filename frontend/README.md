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
## Skeleton status

T-30-04 delivers the shell only: application layout, routing, route guards, the
Pinia auth store, the single Axios wrapper and one placeholder view per page in
the frontend page map.

Every route in `src/router/index.js` also appears in
`docs/02-design/frontend-page-map.md`, with the same path, view name and role
list. A view that is still a placeholder says so and names the role that will
implement it.

Sign-in currently uses mock accounts in `src/stores/auth.js`, because
`POST /auth/login` belongs to T-41-01. The store is the only file that changes
when the real endpoint lands.