<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

// Entries come from docs/02-design/frontend-page-map.md. Only the routes that
// exist in the skeleton are listed here; R5 adds the rest as pages land.
const MENU = [
  { to: '/dashboard', label: 'Dashboard', roles: ['staff', 'owner', 'admin'] },
  { to: '/my-parcels', label: 'My parcels', roles: ['resident'] },
]

const menu = computed(() => MENU.filter((item) => item.roles.includes(auth.role)))

function signOut() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <p class="brand">Collection Point</p>
      <nav class="nav">
        <RouterLink v-for="item in menu" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="body">
      <header class="topbar">
        <span class="who">{{ auth.user?.fullName }}</span>
        <span class="role">{{ auth.role }}</span>
        <button type="button" class="signout" @click="signOut">Sign out</button>
      </header>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 220px;
  flex: 0 0 220px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  padding: 16px 12px;
}
.brand {
  margin: 0 0 16px;
  font-weight: 600;
  font-size: 15px;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-link {
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  text-decoration: none;
  font-size: 14px;
}
.nav-link.router-link-active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}
.who {
  font-size: 14px;
}
.role {
  font-size: 12px;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 1px 8px;
}
.signout {
  margin-left: auto;
  font: inherit;
  font-size: 13px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 4px 10px;
  cursor: pointer;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>