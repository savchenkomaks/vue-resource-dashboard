import type { EmployeeDraft } from '../types'

export type EmployeeErrors = Partial<Record<keyof EmployeeDraft, string>>

/**
 * Чистая функция валидации черновика сотрудника.
 * Держим её отдельно от формы — легко тестировать без монтирования компонента.
 */
export function validateEmployee(draft: EmployeeDraft): EmployeeErrors {
  const errors: EmployeeErrors = {}

  if (!draft.name.trim()) {
    errors.name = 'Укажите имя'
  } else if (draft.name.trim().length < 2) {
    errors.name = 'Слишком короткое имя'
  }

  if (!draft.role.trim()) {
    errors.role = 'Укажите роль'
  }

  if (Number.isNaN(draft.allocation) || draft.allocation < 0 || draft.allocation > 100) {
    errors.allocation = 'Загрузка должна быть от 0 до 100'
  }

  if (Number.isNaN(draft.rate) || draft.rate < 0) {
    errors.rate = 'Ставка не может быть отрицательной'
  }

  return errors
}

export function isValid(errors: EmployeeErrors): boolean {
  return Object.keys(errors).length === 0
}
