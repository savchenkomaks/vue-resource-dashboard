import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useEmployeeFilters } from '../src/composables/useEmployeeFilters'
import type { Employee } from '../src/types'

const sample: Employee[] = [
  { id: '1', name: 'Анна', department: 'Engineering', role: 'Frontend', allocation: 80, rate: 55, status: 'active' },
  { id: '2', name: 'Борис', department: 'Design', role: 'Designer', allocation: 40, rate: 45, status: 'bench' },
  { id: '3', name: 'Виктор', department: 'Engineering', role: 'Backend', allocation: 100, rate: 50, status: 'active' },
]

describe('useEmployeeFilters', () => {
  it('без фильтров возвращает всех, отсортированных по имени', () => {
    const { filtered } = useEmployeeFilters(ref(sample))
    expect(filtered.value.map((e) => e.name)).toEqual(['Анна', 'Борис', 'Виктор'])
  })

  it('фильтрует по поиску (имя или роль)', () => {
    const { search, filtered } = useEmployeeFilters(ref(sample))
    search.value = 'backend'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].name).toBe('Виктор')
  })

  it('фильтрует по отделу', () => {
    const { department, filtered } = useEmployeeFilters(ref(sample))
    department.value = 'Engineering'
    expect(filtered.value.map((e) => e.name)).toEqual(['Анна', 'Виктор'])
  })

  it('фильтрует по статусу', () => {
    const { status, filtered } = useEmployeeFilters(ref(sample))
    status.value = 'bench'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].name).toBe('Борис')
  })

  it('сортирует по числовому полю и переключает направление', () => {
    const { toggleSort, sortDir, filtered } = useEmployeeFilters(ref(sample))
    toggleSort('allocation')
    expect(sortDir.value).toBe('asc')
    expect(filtered.value.map((e) => e.allocation)).toEqual([40, 80, 100])
    toggleSort('allocation')
    expect(sortDir.value).toBe('desc')
    expect(filtered.value.map((e) => e.allocation)).toEqual([100, 80, 40])
  })

  it('reset очищает фильтры', () => {
    const { search, department, reset, filtered } = useEmployeeFilters(ref(sample))
    search.value = 'x'
    department.value = 'Design'
    reset()
    expect(filtered.value).toHaveLength(3)
  })
})
