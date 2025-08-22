import { ref, computed, type Ref } from 'vue'
import { VALIDATION_RULES } from '@/constants'

interface ValidationRule {
  test: (value: any) => boolean
  message: string
}

interface UseValidationOptions {
  required?: boolean
  email?: boolean
  phone?: boolean
  cpf?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  custom?: ValidationRule[]
}

export function useValidation(
  value: Ref<string | number>,
  options: UseValidationOptions = {}
) {
  const {
    required = false,
    email = false,
    phone = false,
    cpf = false,
    minLength,
    maxLength,
    min,
    max,
    custom = [],
  } = options

  const errors = ref<string[]>([])
  const touched = ref(false)

  const rules: ValidationRule[] = []

  // Build validation rules
  if (required) {
    rules.push({
      test: (val) => val !== null && val !== undefined && val !== '',
      message: 'Este campo é obrigatório',
    })
  }

  if (email) {
    rules.push({
      test: (val) => !val || VALIDATION_RULES.EMAIL.test(String(val)),
      message: 'Email inválido',
    })
  }

  if (phone) {
    rules.push({
      test: (val) => !val || VALIDATION_RULES.PHONE.test(String(val)),
      message: 'Telefone inválido',
    })
  }

  if (cpf) {
    rules.push({
      test: (val) => !val || VALIDATION_RULES.CPF.test(String(val)),
      message: 'CPF inválido',
    })
  }

  if (minLength !== undefined) {
    rules.push({
      test: (val) => !val || String(val).length >= minLength,
      message: `Mínimo de ${minLength} caracteres`,
    })
  }

  if (maxLength !== undefined) {
    rules.push({
      test: (val) => !val || String(val).length <= maxLength,
      message: `Máximo de ${maxLength} caracteres`,
    })
  }

  if (min !== undefined) {
    rules.push({
      test: (val) => !val || Number(val) >= min,
      message: `Valor mínimo: ${min}`,
    })
  }

  if (max !== undefined) {
    rules.push({
      test: (val) => !val || Number(val) <= max,
      message: `Valor máximo: ${max}`,
    })
  }

  // Add custom rules
  rules.push(...custom)

  const validate = (): boolean => {
    touched.value = true
    errors.value = []

    for (const rule of rules) {
      if (!rule.test(value.value)) {
        errors.value.push(rule.message)
      }
    }

    return errors.value.length === 0
  }

  const isValid = computed(() => {
    if (!touched.value) return true
    return errors.value.length === 0
  })

  const hasErrors = computed(() => {
    return touched.value && errors.value.length > 0
  })

  const firstError = computed(() => {
    return errors.value[0] || null
  })

  const touch = () => {
    touched.value = true
    validate()
  }

  const reset = () => {
    touched.value = false
    errors.value = []
  }

  return {
    errors,
    touched,
    isValid,
    hasErrors,
    firstError,
    validate,
    touch,
    reset,
  }
}

// Utility validation functions
export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.test(email)
}

export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')
  
  if (cleaned.length !== 11) return false
  
  // Check for known invalid CPFs
  if (/^(\d)\1{10}$/.test(cleaned)) return false
  
  // Validate check digits
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  
  let checkDigit = 11 - (sum % 11)
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0
  if (checkDigit !== parseInt(cleaned.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  
  checkDigit = 11 - (sum % 11)
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0
  if (checkDigit !== parseInt(cleaned.charAt(10))) return false
  
  return true
}

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH
}
