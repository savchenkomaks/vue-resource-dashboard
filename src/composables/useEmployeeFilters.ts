import { computed, ref, type Ref } from 'vue'
import type { Department, Employee, Status } from '../types'

export type SortKey = 'name' | 'department' | 'allocation' | 'rate'

/**
 * Composable инкапсулирует состояние фильтров/сортировки и отдаёт
 * реактивный отфильтрованный список. Логику держим отдельно от компонента —
 * так её удобно переиспользовать и покрывать unit-тестами.
 */
export function useEmployeeFilters(source: Ref<Employee[]>) {
  const search = ref('')
  const department = ref<Department | 'all'>('all')
  const status = ref<Status | 'all'>('all')
  const sortKey = ref<SortKey>('name')
  const sortDir = ref<'asc' | 'desc'>('asc')

  const filtered = computed<Employee[]>(() => {
    const query = search.value.trim().toLowerCase()

    const result = source.value.filter((e) => {
      const matchesSearch =
        !query ||
        e.name.toLowerCase().includes(query) ||
        e.role.toLowerCase().includes(query)
      const matchesDept =
        department.value === 'all' || e.department === department.value
      const matchesStatus = status.value === 'all' || e.status === status.value
      return matchesSearch && matchesDept && matchesStatus
    })

    return [...result].sort((a, b) => {
      const av = a[sortKey.value]
      const bv = b[sortKey.value]
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv))
      return sortDir.value === 'asc' ? cmp : -cmp
    })
  })

  function toggleSort(key: SortKey) {
    if (sortKey.value === key) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortDir.value = 'asc'
    }
  }

  function reset() {
    search.value = ''
    department.value = 'all'
    status.value = 'all'
  }

  return {
    search,
    department,
    status,
    sortKey,
    sortDir,
    filtered,
    toggleSort,
    reset,
  }
}
