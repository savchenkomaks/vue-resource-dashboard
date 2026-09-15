<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployeesStore } from '../stores/employees'
import { validateEmployee, isValid, type EmployeeErrors } from '../composables/validateEmployee'
import { DEPARTMENTS, STATUSES, STATUS_LABELS, type EmployeeDraft } from '../types'

const route = useRoute()
const router = useRouter()
const store = useEmployeesStore()

const editingId = computed(() => (route.params.id as string | undefined) ?? null)
const isEdit = computed(() => editingId.value !== null)

function emptyDraft(): EmployeeDraft {
  return {
    name: '',
    department: 'Engineering',
    role: '',
    allocation: 0,
    rate: 0,
    status: 'active',
  }
}

// Инициализируем форму: при редактировании — копией существующей записи.
const existing = editingId.value ? store.getById(editingId.value) : undefined
const form = reactive<EmployeeDraft>(existing ? { ...existing } : emptyDraft())

const errors = ref<EmployeeErrors>({})
const submitted = ref(false)

function onSubmit() {
  submitted.value = true
  errors.value = validateEmployee(form)
  if (!isValid(errors.value)) return

  if (isEdit.value && editingId.value) {
    store.update(editingId.value, { ...form })
    router.push(`/${editingId.value}`)
  } else {
    const created = store.add({ ...form })
    router.push(`/${created.id}`)
  }
}
</script>

<template>
  <div class="form-page">
    <RouterLink to="/" class="back">← К списку</RouterLink>
    <h1>{{ isEdit ? 'Редактирование' : 'Новый сотрудник' }}</h1>

    <form class="form" novalidate @submit.prevent="onSubmit">
      <label class="field">
        <span>Имя</span>
        <input v-model.trim="form.name" type="text" :class="{ invalid: errors.name }" />
        <small v-if="errors.name" class="err">{{ errors.name }}</small>
      </label>

      <label class="field">
        <span>Роль</span>
        <input v-model.trim="form.role" type="text" :class="{ invalid: errors.role }" />
        <small v-if="errors.role" class="err">{{ errors.role }}</small>
      </label>

      <div class="row">
        <label class="field">
          <span>Отдел</span>
          <select v-model="form.department">
            <option v-for="d in DEPARTMENTS" :key="d" :value="d">{{ d }}</option>
          </select>
        </label>

        <label class="field">
          <span>Статус</span>
          <select v-model="form.status">
            <option v-for="s in STATUSES" :key="s" :value="s">{{ STATUS_LABELS[s] }}</option>
          </select>
        </label>
      </div>

      <div class="row">
        <label class="field">
          <span>Загрузка, %</span>
          <input v-model.number="form.allocation" type="number" min="0" max="100" :class="{ invalid: errors.allocation }" />
          <small v-if="errors.allocation" class="err">{{ errors.allocation }}</small>
        </label>

        <label class="field">
          <span>Ставка, $/ч</span>
          <input v-model.number="form.rate" type="number" min="0" :class="{ invalid: errors.rate }" />
          <small v-if="errors.rate" class="err">{{ errors.rate }}</small>
        </label>
      </div>

      <div class="actions">
        <button type="submit" class="btn">{{ isEdit ? 'Сохранить' : 'Добавить' }}</button>
        <RouterLink to="/" class="btn btn--ghost">Отмена</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-page {
  max-width: 560px;
}
.back {
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
}
h1 {
  font-size: 24px;
  margin: 10px 0 20px;
}
.form {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.field span {
  font-size: 13px;
  color: var(--muted);
}
input,
select {
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
}
input:focus,
select:focus {
  outline: 2px solid var(--accent);
}
.invalid {
  border-color: #d0562e;
}
.err {
  color: #d0562e;
  font-size: 12.5px;
}
.row {
  display: flex;
  gap: 14px;
}
.actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}
.btn {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}
.btn--ghost {
  background: #fff;
  color: var(--text);
  border: 1px solid var(--line);
}
</style>
