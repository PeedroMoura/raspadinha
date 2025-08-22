import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { FinancialService } from '@/services/financialService'
import { useAuthStore } from './auth'
import { useDashboardStore } from './dashboard'
import type { DepositForm, WithdrawalForm, PromoCodeForm } from '@/types'

export const useFinancialStore = defineStore('financial', () => {
  // State
  const loading = ref({
    deposit: false,
    withdrawal: false,
    promoCode: false,
    paymentMethods: false,
  })
  
  const error = ref({
    deposit: null as string | null,
    withdrawal: null as string | null,
    promoCode: null as string | null,
    paymentMethods: null as string | null,
  })

  const paymentMethods = ref<Array<{
    id: string
    name: string
    type: 'pix' | 'credit_card' | 'bank_transfer'
    minAmount: number
    maxAmount: number
    processingTime: string
    fees: number
  }>>([])

  const withdrawalMethods = ref<Array<{
    id: string
    name: string
    type: 'pix' | 'bank_transfer'
    minAmount: number
    maxAmount: number
    processingTime: string
    fees: number
  }>>([])

  const lastDepositResponse = ref<any>(null)
  const lastWithdrawalResponse = ref<any>(null)
  const lastPromoResponse = ref<any>(null)

  // Get other stores
  const authStore = useAuthStore()
  const dashboardStore = useDashboardStore()

  // Getters
  const availablePaymentMethods = computed(() => {
    return paymentMethods.value.filter(method => {
      // Filter based on user conditions, balance, etc.
      return true // For now, all methods are available
    })
  })

  const availableWithdrawalMethods = computed(() => {
    return withdrawalMethods.value.filter(method => {
      const userBalance = authStore.userBalance
      return userBalance >= method.minAmount
    })
  })

  const minDepositAmount = computed(() => {
    return Math.min(...paymentMethods.value.map(method => method.minAmount))
  })

  const maxDepositAmount = computed(() => {
    return Math.max(...paymentMethods.value.map(method => method.maxAmount))
  })

  const minWithdrawalAmount = computed(() => {
    return Math.min(...withdrawalMethods.value.map(method => method.minAmount))
  })

  const maxWithdrawalAmount = computed(() => {
    const userBalance = authStore.userBalance
    const methodMax = Math.max(...withdrawalMethods.value.map(method => method.maxAmount))
    return Math.min(userBalance, methodMax)
  })

  // Actions
  const fetchPaymentMethods = async () => {
    try {
      loading.value.paymentMethods = true
      error.value.paymentMethods = null

      const methods = await FinancialService.mockGetPaymentMethods()
      paymentMethods.value = methods

      const withdrawalMethods = await FinancialService.mockGetWithdrawalMethods()
      withdrawalMethods.value = withdrawalMethods

    } catch (err) {
      error.value.paymentMethods = err instanceof Error ? err.message : 'Erro ao carregar métodos de pagamento'
      console.error('Failed to fetch payment methods:', err)
    } finally {
      loading.value.paymentMethods = false
    }
  }

  const processDeposit = async (depositData: DepositForm) => {
    try {
      loading.value.deposit = true
      error.value.deposit = null

      // Validate deposit amount
      if (depositData.amount < minDepositAmount.value) {
        throw new Error(`Valor mínimo para depósito é R$ ${minDepositAmount.value.toFixed(2)}`)
      }

      if (depositData.amount > maxDepositAmount.value) {
        throw new Error(`Valor máximo para depósito é R$ ${maxDepositAmount.value.toFixed(2)}`)
      }

      const response = await FinancialService.mockDeposit(depositData)
      lastDepositResponse.value = response

      // Add transaction to dashboard
      dashboardStore.addTransaction(response.transaction)

      // Update user balance if deposit is completed
      if (response.transaction.status === 'completed') {
        const newBalance = authStore.userBalance + depositData.amount
        authStore.updateBalance(newBalance)
      }

      return response

    } catch (err) {
      error.value.deposit = err instanceof Error ? err.message : 'Erro ao processar depósito'
      throw err
    } finally {
      loading.value.deposit = false
    }
  }

  const processWithdrawal = async (withdrawalData: WithdrawalForm) => {
    try {
      loading.value.withdrawal = true
      error.value.withdrawal = null

      // Validate withdrawal amount
      if (withdrawalData.amount < minWithdrawalAmount.value) {
        throw new Error(`Valor mínimo para saque é R$ ${minWithdrawalAmount.value.toFixed(2)}`)
      }

      if (withdrawalData.amount > maxWithdrawalAmount.value) {
        throw new Error(`Valor máximo para saque é R$ ${maxWithdrawalAmount.value.toFixed(2)}`)
      }

      if (withdrawalData.amount > authStore.userBalance) {
        throw new Error('Saldo insuficiente')
      }

      const response = await FinancialService.mockWithdrawal(withdrawalData)
      lastWithdrawalResponse.value = response

      // Add transaction to dashboard
      dashboardStore.addTransaction(response.transaction)

      // Update user balance (subtract withdrawal amount)
      const newBalance = authStore.userBalance - withdrawalData.amount
      authStore.updateBalance(newBalance)

      return response

    } catch (err) {
      error.value.withdrawal = err instanceof Error ? err.message : 'Erro ao processar saque'
      throw err
    } finally {
      loading.value.withdrawal = false
    }
  }

  const applyPromoCode = async (promoData: PromoCodeForm) => {
    try {
      loading.value.promoCode = true
      error.value.promoCode = null

      const response = await FinancialService.mockApplyPromoCode(promoData)
      lastPromoResponse.value = response

      // Add transaction to dashboard
      dashboardStore.addTransaction(response.transaction)

      // Update user balance with bonus
      const newBalance = authStore.userBalance + response.bonusAmount
      authStore.updateBalance(newBalance)

      return response

    } catch (err) {
      error.value.promoCode = err instanceof Error ? err.message : 'Erro ao aplicar código promocional'
      throw err
    } finally {
      loading.value.promoCode = false
    }
  }

  const validatePromoCode = async (code: string) => {
    try {
      // For mock, just check against known codes
      const validCodes = ['WELCOME10', 'LUCKY50', 'FRIEND25']
      const isValid = validCodes.includes(code.toUpperCase())
      
      if (!isValid) {
        return { valid: false }
      }

      const bonusAmounts = {
        'WELCOME10': 10,
        'LUCKY50': 50,
        'FRIEND25': 25,
      }

      return {
        valid: true,
        bonusAmount: bonusAmounts[code.toUpperCase() as keyof typeof bonusAmounts],
        description: `Bônus de ${code}`,
      }

    } catch (err) {
      console.error('Failed to validate promo code:', err)
      return { valid: false }
    }
  }

  const getPaymentMethodById = (id: string) => {
    return paymentMethods.value.find(method => method.id === id)
  }

  const getWithdrawalMethodById = (id: string) => {
    return withdrawalMethods.value.find(method => method.id === id)
  }

  const calculateFees = (amount: number, methodId: string, type: 'deposit' | 'withdrawal' = 'deposit') => {
    const methods = type === 'deposit' ? paymentMethods.value : withdrawalMethods.value
    const method = methods.find(m => m.id === methodId)
    
    if (!method) return 0
    
    return amount * method.fees
  }

  const getNetAmount = (amount: number, methodId: string, type: 'deposit' | 'withdrawal' = 'deposit') => {
    const fees = calculateFees(amount, methodId, type)
    return type === 'deposit' ? amount - fees : amount - fees
  }

  const clearErrors = () => {
    error.value.deposit = null
    error.value.withdrawal = null
    error.value.promoCode = null
    error.value.paymentMethods = null
  }

  const clearLastResponses = () => {
    lastDepositResponse.value = null
    lastWithdrawalResponse.value = null
    lastPromoResponse.value = null
  }

  // Initialize payment methods on store creation
  fetchPaymentMethods()

  return {
    // State
    loading,
    error,
    paymentMethods,
    withdrawalMethods,
    lastDepositResponse,
    lastWithdrawalResponse,
    lastPromoResponse,

    // Getters
    availablePaymentMethods,
    availableWithdrawalMethods,
    minDepositAmount,
    maxDepositAmount,
    minWithdrawalAmount,
    maxWithdrawalAmount,

    // Actions
    fetchPaymentMethods,
    processDeposit,
    processWithdrawal,
    applyPromoCode,
    validatePromoCode,
    getPaymentMethodById,
    getWithdrawalMethodById,
    calculateFees,
    getNetAmount,
    clearErrors,
    clearLastResponses,
  }
})
