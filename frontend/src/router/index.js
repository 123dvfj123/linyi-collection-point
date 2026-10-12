import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppLayout from '../components/AppLayout.vue'

// One router configuration for the whole application. ADR-003 requires this.
// Only the routes the skeleton needs are registered; R5 adds the remaining
// pages from docs/02-design/frontend-page-map.md inside the same layout.
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { roles: ['staff', 'owner', 'admin'] },
      },
      {
        path: 'my-parcels',
        name: 'my-parcels',
        component: () => import('../views/MyParcelListView.vue'),
        meta: { roles: ['resident'] },
      },
    ],
  },
  { path: '/403', name: 'forbidden', component: () => import('../views/Error403View.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Three rules, in the order the page map states them: unauthenticated users go
// to the login page, a signed-in user never sees the login page again, and a
// role that is not permitted goes to 403.
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.public) {
    return auth.isAuthenticated ? auth.landingRoute() : true
  }

  if (!auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/') {
    return auth.landingRoute()
  }

  const allowed = to.meta.roles
  if (allowed && !allowed.includes(auth.role)) {
    return '/403'
  }

  return true
})

export default router