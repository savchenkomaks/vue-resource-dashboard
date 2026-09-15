import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Employee, EmployeeDraft } from '../types'
import { seedEmployees } from '../data/seed'

const STORAGE_KEY = 'resource-dashboard:employees'

function loadInitial(): Employee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Employee[]
  } catch {
    // localStorage может быть недоступен (приватный режим, тесты) — молча откатываемся к seed
  }
  return seedEmployees.map((e) => ({ ...e }))
}

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `e-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref<Employee[]>(loadInitial())

  const total = computed(() => employees.value.length)
  const activeCount = computed(
    () => employees.value.filter((e) => e.status === 'active').length,
  )
  const benchCount = computed(
    () => employees.value.filter((e) => e.status === 'bench').length,
  )
  const avgAllocation = computed(() => {
    if (!employees.value.length) return 0
    const sum = employees.value.reduce((acc, e) => acc + e.allocation, 0)
    return Math.round(sum / employees.value.length)
  })

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees.value))
    } catch {
      // запись недоступна — не критично для работы приложения
    }
  }

  function getById(id: string): Employee | undefined {
    return employees.value.find((e) => e.id === id)
  }

  function add(draft: EmployeeDraft): Employee {
    const employee: Employee = { ...draft, id: genId() }
    employees.value.push(employee)
    persist()
    return employee
  }

  function update(id: string, patch: Partial<EmployeeDraft>): void {
    const employee = employees.value.find((e) => e.id === id)
    if (!employee) return
    Object.assign(employee, patch)
    persist()
  }

  function remove(id: string): void {
    employees.value = employees.value.filter((e) => e.id !== id)
    persist()
  }

  return {
    employees,
    total,
    activeCount,
    benchCount,
    avgAllocation,
    getById,
    add,
    update,
    remove,
  }
})
