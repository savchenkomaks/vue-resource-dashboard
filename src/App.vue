<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <RouterLink to="/" class="brand">📊 Resource Dashboard</RouterLink>
      <span class="topbar__hint">Vue 3 · TypeScript · Pinia</span>
    </header>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  --accent: #2b7a8b;
  --text: #1a1a1a;
  --muted: #6b7680;
  --line: #dbe1e4;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #f3f4f6;
  color: var(--text);
  font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.45;
}
.topbar {
  background: #fff;
  border-bottom: 1px solid var(--line);
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  font-size: 16px;
}
.topbar__hint {
  color: var(--muted);
  font-size: 13px;
}
.content {
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 24px 60px;
}
</style>
