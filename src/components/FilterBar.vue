<script setup lang="ts">
import { DEPARTMENTS, STATUSES, STATUS_LABELS } from '../types'
import type { Department, Status } from '../types'

/**
 * Контролируемый компонент фильтров. Значения приходят через props,
 * изменения уходят наружу через события — двусторонняя связь по паттерну v-model.
 */
defineProps<{
  search: string
  department: Department | 'all'
  status: Status | 'all'
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:department', value: Department | 'all'): void
  (e: 'update:status', value: Status | 'all'): void
  (e: 'reset'): void
}>()
</script>

<template>
  <div class="filters">
    <input
      class="filters__search"
      type="search"
      placeholder="Поиск по имени или роли…"
      :value="search"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <select
      :value="department"
      @change="emit('update:department', ($event.target as HTMLSelectElement).value as Department | 'all')"
    >
      <option value="all">Все отделы</option>
      <option v-for="d in DEPARTMENTS" :key="d" :value="d">{{ d }}</option>
    </select>

    <select
      :value="status"
      @change="emit('update:status', ($event.target as HTMLSelectElement).value as Status | 'all')"
    >
      <option value="all">Любой статус</option>
      <option v-for="s in STATUSES" :key="s" :value="s">{{ STATUS_LABELS[s] }}</option>
    </select>

    <button type="button" class="filters__reset" @click="emit('reset')">Сбросить</button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}
.filters__search {
  flex: 1 1 240px;
}
input,
select {
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
}
input:focus,
select:focus {
  outline: 2px solid var(--accent);
  outline-offset: 0;
}
.filters__reset {
  padding: 9px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}
.filters__reset:hover {
  background: #f1f4f5;
}
</style>
