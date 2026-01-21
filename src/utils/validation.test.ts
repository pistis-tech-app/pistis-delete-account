import { describe, it, expect } from 'bun:test'
import { isValidEmail } from './validation'

describe('isValidEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.co')).toBe(true)
    expect(isValidEmail('user+tag@example.org')).toBe(true)
    expect(isValidEmail('a@b.co')).toBe(true)
  })

  it('should return false for invalid email addresses', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('invalid')).toBe(false)
    expect(isValidEmail('invalid@')).toBe(false)
    expect(isValidEmail('@domain.com')).toBe(false)
    expect(isValidEmail('user@')).toBe(false)
    expect(isValidEmail('user@domain')).toBe(false)
    expect(isValidEmail('user domain@test.com')).toBe(false)
  })

  it('should return false for emails with spaces', () => {
    expect(isValidEmail(' test@example.com')).toBe(false)
    expect(isValidEmail('test@example.com ')).toBe(false)
    expect(isValidEmail('test @example.com')).toBe(false)
  })
})
