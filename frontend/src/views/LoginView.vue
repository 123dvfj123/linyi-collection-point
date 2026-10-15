<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  error.value = ''
  busy.value = true
  try {
    const landing = await auth.login(username.value.trim(), password.value)
    // Honour the route the user originally asked for, if there was one.
    const requested = typeof route.query.redirect === 'string' ? route.query.redirect : null
    await router.push(requested || landing)
  } catch (e) {
    error.value = e.message
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="page">
    <form class="card" @submit.prevent="submit">
      <h1 class="title">Sign in</h1>
      <p class="hint">Skeleton build. Use a mock account for now.</p>

      <label class="field">
        <span>Username</span>
        <input v-model="username" name="username" autocomplete="username" required />
      </label>

      <label class="field">
        <span>Password</span>
        <input v-model="password" type="password" name="password" autocomplete="current-password" required />
      </label>

      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <button type="submit" class="submit" :disabled="busy">
        {{ busy ? 'Signing in...' : 'Sign in' }}
      </button>

      <p class="mock">
        Mock accounts: resident / staff / owner / admin, password equals the username.
      </p>
    </form>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}
.card {
  width: 100%;
  max-width: 340px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.title {
  margin: 0;
  font-size: 20px;
}
.hint {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-muted);
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
}
.field input {
  font: inherit;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}
.error {
  margin: 0;
  font-size: 13px;
  color: var(--color-danger);
}
.submit {
  font: inherit;
  padding: 9px 12px;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  /* --color-on-primary, not a literal: it is the inverse-text token the
     design system defines for exactly this label. */
  color: var(--color-on-primary);
  cursor: pointer;
}
.submit[disabled] {
  opacity: 0.6;
  cursor: default;
}
.mock {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>