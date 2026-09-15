import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useEmployeesStore } from '../src/stores/employees'

describe('employees store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('стартует с сид-данными', () => {
    const store = useEmployeesStore()
    expect(store.total).toBe(8)
  })

  it('считает активных и среднюю загрузку', () => {
    const store = useEmployeesStore()
    expect(store.activeCount).toBe(5)
    expect(store.avgAllocation).toBe(56) // (80+100+60+0+90+50+70+0)/8 = 56.25 -> 56
  })

  it('добавляет сотрудника и возвращает его с id', () => {
    const store = useEmployeesStore()
    const created = store.add({
      name: 'Тест Тестов',
      department: 'Engineering',
      role: 'Frontend',
      allocation: 40,
      rate: 30,
      status: 'active',
    })
    expect(created.id).toBeTruthy()
    expect(store.total).toBe(9)
    expect(store.getById(created.id)).toEqual(created)
  })

  it('обновляет существующего сотрудника', () => {
    const store = useEmployeesStore()
    store.update('e1', { allocation: 10 })
    expect(store.getById('e1')?.allocation).toBe(10)
  })

  it('удаляет сотрудника', () => {
    const store = useEmployeesStore()
    store.remove('e1')
    expect(store.getById('e1')).toBeUndefined()
    expect(store.total).toBe(7)
  })

  it('сохраняет изменения в localStorage', () => {
    const store = useEmployeesStore()
    store.add({
      name: 'Персист Тест',
      department: 'QA',
      role: 'QA',
      allocation: 0,
      rate: 20,
      status: 'bench',
    })
    const raw = localStorage.getItem('resource-dashboard:employees')
    expect(raw).toContain('Персист Тест')
  })
})
