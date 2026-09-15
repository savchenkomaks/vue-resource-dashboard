<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Employee } from '../types'
import { STATUS_LABELS } from '../types'
import type { SortKey } from '../composables/useEmployeeFilters'

defineProps<{
  rows: Employee[]
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  (e: 'sort', key: SortKey): void
  (e: 'remove', id: string): void
}>()

const columns: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Сотрудник' },
  { key: 'department', label: 'Отдел' },
  { key: 'allocation', label: 'Загрузка' },
  { key: 'rate', label: 'Ставка' },
]
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          class="table__th"
          @click="emit('sort', col.key)"
        >
          {{ col.label }}
          <span v-if="sortKey === col.key" class="table__arrow">
            {{ sortDir === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
        <th class="table__th table__th--status">Статус</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in rows" :key="e.id">
        <td>
          <RouterLink :to="`/${e.id}`" class="table__name">{{ e.name }}</RouterLink>
          <div class="table__role">{{ e.role }}</div>
        </td>
        <td>{{ e.department }}</td>
        <td>
          <div class="bar">
            <div class="bar__fill" :style="{ width: e.allocation + '%' }"></div>
            <span class="bar__label">{{ e.allocation }}%</span>
          </div>
        </td>
        <td>${{ e.rate }}/ч</td>
        <td>
          <span class="badge" :class="`badge--${e.status}`">{{ STATUS_LABELS[e.status] }}</span>
        </td>
        <td class="table__actions">
          <RouterLink :to="`/${e.id}/edit`" class="link">Изменить</RouterLink>
          <button type="button" class="link link--danger" @click="emit('remove', e.id)">
            Удалить
          </button>
        </td>
      </tr>
      <tr v-if="!rows.length">
        <td colspan="6" class="table__empty">Ничего не найдено — измените фильтры.</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
}
.table__th {
  text-align: left;
  padding: 12px 14px;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}
.table__th--status {
  cursor: default;
}
.table__arrow {
  font-size: 10px;
}
td {
  padding: 12px 14px;
  border-bottom: 1px solid #eef1f2;
  font-size: 14px;
  vertical-align: middle;
}
.table__name {
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}
.table__role {
  font-size: 12.5px;
  color: var(--muted);
}
.bar {
  position: relative;
  background: #eef1f2;
  border-radius: 999px;
  height: 18px;
  min-width: 120px;
}
.bar__fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--accent);
  border-radius: 999px;
}
.bar__label {
  position: relative;
  font-size: 11.5px;
  color: #1a1a1a;
  padding-left: 8px;
  line-height: 18px;
}
.badge {
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 999px;
}
.badge--active {
  background: #e2f3e6;
  color: #1f7a3d;
}
.badge--bench {
  background: #fbeae3;
  color: #b1502a;
}
.badge--vacation {
  background: #e9edf5;
  color: #3a5a94;
}
.table__actions {
  white-space: nowrap;
  text-align: right;
}
.link {
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  font-size: 13.5px;
  padding: 0 6px;
  text-decoration: none;
}
.link--danger {
  color: #b1502a;
}
.table__empty {
  text-align: center;
  color: var(--muted);
  padding: 28px;
}
</style>
