<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useEmployeesStore } from '../stores/employees'
import { useEmployeeFilters } from '../composables/useEmployeeFilters'
import StatCard from '../components/StatCard.vue'
import FilterBar from '../components/FilterBar.vue'
import EmployeeTable from '../components/EmployeeTable.vue'

const store = useEmployeesStore()
const { employees, total, activeCount, benchCount, avgAllocation } = storeToRefs(store)

const { search, department, status, sortKey, sortDir, filtered, toggleSort, reset } =
  useEmployeeFilters(employees)

function onRemove(id: string) {
  const emp = store.getById(id)
  if (emp && confirm(`Удалить сотрудника «${emp.name}»?`)) {
    store.remove(id)
  }
}
</script>

<template>
  <div>
    <div class="head">
      <div>
        <h1>Загрузка команды</h1>
        <p class="muted">Планирование ресурсов и аллокации по проектам.</p>
      </div>
      <RouterLink to="/new" class="btn">+ Добавить</RouterLink>
    </div>

    <div class="stats">
      <StatCard label="Всего сотрудников" :value="total" />
      <StatCard label="На проектах" :value="activeCount" accent />
      <StatCard label="Свободны" :value="benchCount" />
      <StatCard label="Средняя загрузка" :value="avgAllocation + '%'" />
    </div>

    <FilterBar
      v-model:search="search"
      v-model:department="department"
      v-model:status="status"
      @reset="reset"
    />

    <p class="muted count">Показано: {{ filtered.length }} из {{ total }}</p>

    <EmployeeTable
      :rows="filtered"
      :sort-key="sortKey"
      :sort-dir="sortDir"
      @sort="toggleSort"
      @remove="onRemove"
    />
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 22px;
}
h1 {
  margin: 0 0 4px;
  font-size: 26px;
}
.muted {
  color: var(--muted);
  margin: 0;
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}
.count {
  font-size: 13px;
  margin-bottom: 10px;
}
.btn {
  background: var(--accent);
  color: #fff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
}
</style>
