import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// The guard in src/router/index.js is the executable form of the route rules in
// docs/02-design/frontend-page-map.md.
describe('route guard', () => {
  beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('sends an unauthenticated visitor to /login and remembers the target', async () => {
    const router = (await import('../../src/router/index.js')).default
    await router.push('/dashboard')
    expect(router.currentRoute.value.path).toBe('/login')
    expect(router.currentRoute.value.query.redirect).toBe('/dashboard')
  })

  it('sends a role that is not permitted to /403', async () => {
    const { useAuthStore } = await import('../../src/stores/auth.js')
    await useAuthStore().login('resident', 'resident')
    const router = (await import('../../src/router/index.js')).default
    await router.push('/dashboard')
    expect(router.currentRoute.value.path).toBe('/403')
  })

  it('lets a role that is permitted through', async () => {
    const { useAuthStore } = await import('../../src/stores/auth.js')
    await useAuthStore().login('staff', 'staff')
    const router = (await import('../../src/router/index.js')).default
    await router.push('/parcels')
    expect(router.currentRoute.value.path).toBe('/parcels')
  })
})