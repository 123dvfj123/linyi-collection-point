import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    // The OpenAPI server is `/api` (ADR-003). In development the browser calls
    // /api on the Vite origin and the dev server forwards it to the backend, so
    // local development never depends on CORS and the frontend uses the same
    // path in development and in a deployed build.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  test: {
    // Unit tests run in jsdom so that localStorage, window and crypto exist.
    environment: 'jsdom',
    include: ['tests/**/*.spec.js'],
  },
})