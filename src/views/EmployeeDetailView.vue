<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useEmployeesStore } from '../stores/employees'
import { STATUS_LABELS } from '../types'

const route = useRoute()
const router = useRouter()
const store = useEmployeesStore()

const employee = computed(() => store.getById(route.params.id as string))

function onRemove() {
  if (employee.value && confirm(`Удалить сотрудника «${employee.value.name}»?`)) {
    store.remove(employee.value.id)
    router.push('/')
  }
}
</script>

<template>
  <div v-if="employee" class="detail">
    <RouterLink to="/" class="back">← К списку</RouterLink>

    <div class="card">
      <div class="card__head">
        <h1>{{ employee.name }}</h1>
        <span class="badge" :class="`badge--${employee.status}`">
          {{ STATUS_LABELS[employee.status] }}
        </span>
      </div>
      <p class="role">{{ employee.role }} · {{ employee.department }}</p>

      <dl class="props">
        <div><dt>Загрузка</dt><dd>{{ employee.allocation }}%</dd></div>
        <div><dt>Ставка</dt><dd>${{ employee.rate }}/ч</dd></div>
        <div><dt>Отдел</dt><dd>{{ employee.department }}</dd></div>
      </dl>

      <div class="actions">
        <RouterLink :to="`/${employee.id}/edit`" class="btn">Изменить</RouterLink>
        <button type="button" class="btn btn--danger" @click="onRemove">Удалить</button>
      </div>
    </div>
  </div>

  <div v-else class="missing">
    <p>Сотрудник не найден.</p>
    <RouterLink to="/" class="back">← К списку</RouterLink>
  </div>
</template>

<style scoped>
.detail {
  max-width: 520px;
}
.back {
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
}
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 24px;
  margin-top: 12px;
}
.card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
h1 {
  margin: 0;
  font-size: 24px;
}
.role {
  color: var(--muted);
  margin: 4px 0 20px;
}
.props {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 0 0 22px;
}
dt {
  font-size: 12.5px;
  color: var(--muted);
}
dd {
  margin: 2px 0 0;
  font-size: 18px;
  font-weight: 600;
}
.actions {
  display: flex;
  gap: 12px;
}
.btn {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}
.btn--danger {
  background: #fff;
  color: #b1502a;
  border: 1px solid #e3c3b6;
}
.badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
}
.badge--active { background: #e2f3e6; color: #1f7a3d; }
.badge--bench { background: #fbeae3; color: #b1502a; }
.badge--vacation { background: #e9edf5; color: #3a5a94; }
.missing {
  color: var(--muted);
}
</style>
