import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useFormatter } from '@/composables/useFormatter'
import { useValidation, validateEmail, validateCPF } from '@/composables/useValidation'

describe('Composables', () => {
  describe('useFormatter', () => {
    const { formatCurrency, formatNumber, formatDate, formatPhone, formatCPF, parseCurrency } = useFormatter()

    it('should format currency', () => {
      expect(formatCurrency(1000)).toMatch(/R\$.*1\.000,00/)
      expect(formatCurrency(0)).toMatch(/R\$.*0,00/)
      expect(formatCurrency(-100)).toMatch(/-R\$.*100,00/)
    })

    it('should format numbers', () => {
      expect(formatNumber(1000)).toBe('1.000')
      expect(formatNumber(1000.5)).toBe('1.000,5')
    })

    it('should format phone numbers', () => {
      expect(formatPhone('11999999999')).toBe('(11) 99999-9999')
      expect(formatPhone('1199999999')).toBe('(11) 9999-9999')
    })

    it('should format CPF', () => {
      expect(formatCPF('11111111111')).toBe('111.111.111-11')
    })

    it('should parse currency', () => {
      expect(parseCurrency('R$ 1.000,50')).toBe(1000.5)
      expect(parseCurrency('1.000,50')).toBe(1000.5)
      expect(parseCurrency('invalid')).toBe(0)
    })
  })

  describe('useValidation', () => {
    it('should validate required fields', () => {
      const value = ref('')
      const validation = useValidation(value, { required: true })

      validation.touch()
      expect(validation.isValid.value).toBe(false)
      expect(validation.hasErrors.value).toBe(true)

      value.value = 'test'
      validation.validate()
      expect(validation.isValid.value).toBe(true)
      expect(validation.hasErrors.value).toBe(false)
    })

    it('should validate email', () => {
      const value = ref('invalid-email')
      const validation = useValidation(value, { email: true })

      validation.touch()
      expect(validation.isValid.value).toBe(false)

      value.value = 'test@example.com'
      validation.validate()
      expect(validation.isValid.value).toBe(true)
    })

    it('should validate minimum length', () => {
      const value = ref('12')
      const validation = useValidation(value, { minLength: 3 })

      validation.touch()
      expect(validation.isValid.value).toBe(false)

      value.value = '123'
      validation.validate()
      expect(validation.isValid.value).toBe(true)
    })

    it('should validate custom rules', () => {
      const value = ref('test')
      const validation = useValidation(value, {
        custom: [{
          test: (val) => val === 'valid',
          message: 'Must be "valid"'
        }]
      })

      validation.touch()
      expect(validation.isValid.value).toBe(false)
      expect(validation.firstError.value).toBe('Must be "valid"')

      value.value = 'valid'
      validation.validate()
      expect(validation.isValid.value).toBe(true)
    })
  })

  describe('validation utilities', () => {
    it('should validate email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })

    it('should validate CPF', () => {
      // Note: This is a simple format validation, not actual CPF validation
      expect(validateCPF('111.111.111-11')).toBe(false) // Invalid CPF (all same digits)
      expect(validateCPF('123.456.789-09')).toBe(true) // Valid format
      expect(validateCPF('invalid')).toBe(false)
    })
  })
})
