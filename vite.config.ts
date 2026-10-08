import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Vite + Vitest configuration in one file.
export default defineConfig({
  plugins: [vue()],
  base: process.env.GITHUB_ACTIONS ? '/vue-resource-dashboard/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
