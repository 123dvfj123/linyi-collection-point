import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../../src/stores/auth.js'

// The landing route per role is a rule in docs/02-design/frontend-page-map.md:
// a resident lands on /my-parcels, staff, owner and admin land on /dashboard.
describe('auth store landing route', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('sends a resident to /my-parcels', async () => {
    const auth = useAuthStore()
    const landing = await auth.login('resident', 'resident')
    expect(auth.role).toBe('resident')
    expect(landing).toBe('/my-parcels')
  })

  it.each([
    ['staff', '/dashboard'],
    ['owner', '/dashboard'],
    ['admin', '/dashboard'],
  ])('sends %s to %s', async (username, expected) => {
    const auth = useAuthStore()
    expect(await auth.login(username, username)).toBe(expected)
  })

  it('rejects a wrong password and stays signed out', async () => {
    const auth = useAuthStore()
    await expect(auth.login('resident', 'wrong')).rejects.toThrow(/Invalid username or password/)
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.landingRoute()).toBe('/login')
  })
})
