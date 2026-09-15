export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'QA',
  'Analytics',
] as const

export type Department = (typeof DEPARTMENTS)[number]

export const STATUSES = ['active', 'bench', 'vacation'] as const

export type Status = (typeof STATUSES)[number]

export interface Employee {
  id: string
  name: string
  department: Department
  role: string
  /** Текущая загрузка на проектах, % (0–100) */
  allocation: number
  /** Ставка, $/час */
  rate: number
  status: Status
}

export type EmployeeDraft = Omit<Employee, 'id'>

export const STATUS_LABELS: Record<Status, string> = {
  active: 'На проекте',
  bench: 'Свободен',
  vacation: 'Отпуск',
}
