import { defineStore } from 'pinia'
import { TOKEN_KEY } from '../api/http'

// Mock accounts. The real POST /auth/login belongs to T-41-01 (R6).
// ADR-003 allows mock data until the corresponding endpoint is approved, so
// only login() changes when the backend arrives.
const MOCK_ACCOUNTS = {
  resident: { password: 'resident', role: 'resident', fullName: 'Mock Resident' },
  staff: { password: 'staff', role: 'staff', fullName: 'Mock Staff' },
  owner: { password: 'owner', role: 'owner', fullName: 'Mock Owner' },
  admin: { password: 'admin', role: 'admin', fullName: 'Mock Administrator' },
}

// Taken from the route rules in docs/02-design/frontend-page-map.md.
const LANDING_ROUTE = {
  resident: '/my-parcels',
  staff: '/dashboard',
  owner: '/dashboard',
  admin: '/dashboard',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || '',
    user: JSON.parse(localStorage.getItem('auth.user') || 'null'),
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    role: (state) => state.user?.role ?? null,
  },

  actions: {
    async login(username, password) {
      // TODO(T-41-01): replace the block below with
      //   const data = await http.post('/auth/login', { username, password })
      const account = MOCK_ACCOUNTS[username]
      if (!account || account.password !== password) {
        throw new Error('Invalid username or password')
      }
      this.token = `mock-token.${account.role}`
      this.user = { username, role: account.role, fullName: account.fullName }
      localStorage.setItem(TOKEN_KEY, this.token)
      localStorage.setItem('auth.user', JSON.stringify(this.user))
      return this.landingRoute()
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('auth.user')
    },

    landingRoute() {
      return LANDING_ROUTE[this.role] ?? '/login'
    },
  },
})