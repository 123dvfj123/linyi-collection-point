<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <h1 class="code">404</h1>
    <p class="note">That page does not exist.</p>
    <button type="button" class="back" @click="router.push('/')">Back to the application</button>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  padding: 24px;
}
.code {
  margin: 0;
  font-size: 40px;
}
.note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
}
.back {
  font: inherit;
  font-size: 13px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: none;
  padding: 5px 12px;
  cursor: pointer;
}
</style>