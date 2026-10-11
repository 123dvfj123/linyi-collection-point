# Frontend

Vue 3 and Vite client for the community parcel collection point system.

The architecture, the folder rules and the approved libraries are defined in
`docs/02-design/adr/ADR-003-frontend-architecture.md`. Read it before adding a
dependency or a new folder.

## Commands

```bash
npm install
npm run dev      # development server on http://localhost:5173
npm run build    # production build into dist/
```

## Skeleton status

T-30-04 delivers the shell only: application layout, routing, route guards, the
Pinia auth store and the single Axios wrapper. Feature pages are implemented in
Sprint 2 by R5, inside the standards R4 defines.

Sign-in currently uses mock accounts in `src/stores/auth.js`, because
`POST /auth/login` belongs to T-41-01. The store is the only file that changes
when the real endpoint lands.