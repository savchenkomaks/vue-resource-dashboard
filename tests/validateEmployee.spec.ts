import { describe, expect, it } from 'vitest'
import { isValid, validateEmployee } from '../src/composables/validateEmployee'
import type { EmployeeDraft } from '../src/types'

function draft(overrides: Partial<EmployeeDraft> = {}): EmployeeDraft {
  return {
    name: 'Иван',
    department: 'Engineering',
    role: 'Frontend',
    allocation: 50,
    rate: 40,
    status: 'active',
    ...overrides,
  }
}

describe('validateEmployee', () => {
  it('валидный черновик не даёт ошибок', () => {
    const errors = validateEmployee(draft())
    expect(isValid(errors)).toBe(true)
  })

  it('требует имя', () => {
    expect(validateEmployee(draft({ name: '' })).name).toBeTruthy()
  })

  it('ловит слишком короткое имя', () => {
    expect(validateEmployee(draft({ name: 'И' })).name).toBeTruthy()
  })

  it('требует роль', () => {
    expect(validateEmployee(draft({ role: '  ' })).role).toBeTruthy()
  })

  it('загрузка вне 0–100 — ошибка', () => {
    expect(validateEmployee(draft({ allocation: 120 })).allocation).toBeTruthy()
    expect(validateEmployee(draft({ allocation: -5 })).allocation).toBeTruthy()
  })

  it('отрицательная ставка — ошибка', () => {
    expect(validateEmployee(draft({ rate: -1 })).rate).toBeTruthy()
  })
})
