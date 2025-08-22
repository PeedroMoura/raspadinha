import { APP_CONFIG } from '@/constants'

export function useFormatter() {
  const formatCurrency = (amount: number | string): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d,.-]/g, '').replace(',', '.')) : amount
    
    if (isNaN(numericAmount)) return `${APP_CONFIG.CURRENCY.SYMBOL} 0,00`
    
    return new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
      style: 'currency',
      currency: 'BRL',
    }).format(numericAmount)
  }

  const formatNumber = (value: number | string): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value
    
    if (isNaN(numericValue)) return '0'
    
    return new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE).format(numericValue)
  }

  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    return new Intl.DateTimeFormat(APP_CONFIG.CURRENCY.LOCALE, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(dateObj)
  }

  const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    return new Intl.DateTimeFormat(APP_CONFIG.CURRENCY.LOCALE, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  }

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    
    return phone
  }

  const formatCPF = (cpf: string): string => {
    const cleaned = cpf.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/)
    
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`
    }
    
    return cpf
  }

  const parseCurrency = (currency: string): number => {
    return parseFloat(currency.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0
  }

  const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  }

  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(value / 100)
  }

  return {
    formatCurrency,
    formatNumber,
    formatDate,
    formatDateTime,
    formatPhone,
    formatCPF,
    parseCurrency,
    truncateText,
    formatPercentage,
  }
}
