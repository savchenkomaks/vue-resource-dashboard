<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  accent?: boolean
}>()
</script>

<template>
  <div class="stat" :class="{ 'stat--accent': accent }">
    <span class="stat__value">{{ value }}</span>
    <span class="stat__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.stat {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat--accent {
  background: linear-gradient(180deg, #2b7a8b, #22646f);
  border-color: transparent;
  color: #fff;
}
.stat__value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}
.stat__label {
  font-size: 13px;
  color: var(--muted);
}
.stat--accent .stat__label {
  color: rgba(255, 255, 255, 0.85);
}
</style>
