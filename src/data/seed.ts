import type { Employee } from '../types'

/** Стартовый набор данных — используется при первом запуске и в тестах. */
export const seedEmployees: Employee[] = [
  { id: 'e1', name: 'Анна Ковалёва', department: 'Engineering', role: 'Senior Frontend', allocation: 80, rate: 55, status: 'active' },
  { id: 'e2', name: 'Дмитрий Орлов', department: 'Engineering', role: 'Backend', allocation: 100, rate: 50, status: 'active' },
  { id: 'e3', name: 'Мария Соколова', department: 'Design', role: 'Product Designer', allocation: 60, rate: 45, status: 'active' },
  { id: 'e4', name: 'Игорь Лебедев', department: 'QA', role: 'QA Automation', allocation: 0, rate: 40, status: 'bench' },
  { id: 'e5', name: 'Елена Морозова', department: 'Product', role: 'Product Manager', allocation: 90, rate: 60, status: 'active' },
  { id: 'e6', name: 'Павел Волков', department: 'Analytics', role: 'Data Analyst', allocation: 50, rate: 48, status: 'vacation' },
  { id: 'e7', name: 'Ольга Зайцева', department: 'Engineering', role: 'Middle Frontend', allocation: 70, rate: 42, status: 'active' },
  { id: 'e8', name: 'Сергей Новиков', department: 'Design', role: 'UX Researcher', allocation: 0, rate: 44, status: 'bench' },
]
