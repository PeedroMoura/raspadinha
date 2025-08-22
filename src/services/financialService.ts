import { apiClient } from './api'
import { API_ENDPOINTS } from '@/constants'
import type { Transaction, DepositForm, WithdrawalForm, PromoCodeForm } from '@/types'

interface DepositResponse {
  transaction: Transaction
  paymentUrl?: string
  qrCode?: string
  pixKey?: string
}

interface WithdrawalResponse {
  transaction: Transaction
  estimatedProcessingTime: string
}

interface PromoCodeResponse {
  bonusAmount: number
  description: string
  transaction: Transaction
}

export class FinancialService {
  // Process deposit
  static async deposit(depositData: DepositForm): Promise<DepositResponse> {
    const response = await apiClient.post<DepositResponse>(
      API_ENDPOINTS.FINANCIAL.DEPOSIT,
      depositData
    )
    return response.data
  }

  // Process withdrawal
  static async withdrawal(withdrawalData: WithdrawalForm): Promise<WithdrawalResponse> {
    const response = await apiClient.post<WithdrawalResponse>(
      API_ENDPOINTS.FINANCIAL.WITHDRAWAL,
      withdrawalData
    )
    return response.data
  }

  // Apply promo code
  static async applyPromoCode(promoData: PromoCodeForm): Promise<PromoCodeResponse> {
    const response = await apiClient.post<PromoCodeResponse>(
      API_ENDPOINTS.FINANCIAL.PROMO_CODE,
      promoData
    )
    return response.data
  }

  // Get available payment methods
  static async getPaymentMethods(): Promise<Array<{
    id: string
    name: string
    type: 'pix' | 'credit_card' | 'bank_transfer'
    minAmount: number
    maxAmount: number
    processingTime: string
    fees: number
  }>> {
    const response = await apiClient.get<Array<{
      id: string
      name: string
      type: 'pix' | 'credit_card' | 'bank_transfer'
      minAmount: number
      maxAmount: number
      processingTime: string
      fees: number
    }>>('/financial/payment-methods')
    
    return response.data
  }

  // Get withdrawal methods
  static async getWithdrawalMethods(): Promise<Array<{
    id: string
    name: string
    type: 'pix' | 'bank_transfer'
    minAmount: number
    maxAmount: number
    processingTime: string
    fees: number
  }>> {
    const response = await apiClient.get<Array<{
      id: string
      name: string
      type: 'pix' | 'bank_transfer'
      minAmount: number
      maxAmount: number
      processingTime: string
      fees: number
    }>>('/financial/withdrawal-methods')
    
    return response.data
  }

  // Validate promo code (check without applying)
  static async validatePromoCode(code: string): Promise<{
    valid: boolean
    bonusAmount?: number
    description?: string
    expiresAt?: string
  }> {
    const response = await apiClient.post<{
      valid: boolean
      bonusAmount?: number
      description?: string
      expiresAt?: string
    }>('/financial/validate-promo-code', { code })
    
    return response.data
  }

  // Mock implementations for development
  static async mockDeposit(depositData: DepositForm): Promise<DepositResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Basic validation
    if (!depositData.amount || depositData.amount < 10) {
      throw new Error('Valor mínimo para depósito é R$ 10,00')
    }

    if (depositData.amount > 10000) {
      throw new Error('Valor máximo para depósito é R$ 10.000,00')
    }

    const transaction: Transaction = {
      id: 'dep_' + Date.now(),
      type: 'deposit',
      amount: depositData.amount,
      description: `Depósito via ${depositData.method.toUpperCase()}`,
      status: depositData.method === 'pix' ? 'completed' : 'pending',
      createdAt: new Date().toISOString(),
    }

    const response: DepositResponse = {
      transaction,
    }

    // Add payment-specific data
    if (depositData.method === 'pix') {
      response.qrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      response.pixKey = '12345678901'
    } else if (depositData.method === 'credit_card') {
      response.paymentUrl = 'https://payment-gateway.example.com/pay/123'
    }

    return response
  }

  static async mockWithdrawal(withdrawalData: WithdrawalForm): Promise<WithdrawalResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Basic validation
    if (!withdrawalData.amount || withdrawalData.amount < 20) {
      throw new Error('Valor mínimo para saque é R$ 20,00')
    }

    if (withdrawalData.amount > 5000) {
      throw new Error('Valor máximo para saque é R$ 5.000,00')
    }

    // Simulate insufficient balance check
    const currentBalance = 1598.50 // This would come from user store
    if (withdrawalData.amount > currentBalance) {
      throw new Error('Saldo insuficiente')
    }

    const transaction: Transaction = {
      id: 'with_' + Date.now(),
      type: 'withdrawal',
      amount: -withdrawalData.amount,
      description: 'Saque para conta bancária',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    return {
      transaction,
      estimatedProcessingTime: '1-2 dias úteis',
    }
  }

  static async mockApplyPromoCode(promoData: PromoCodeForm): Promise<PromoCodeResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock promo codes
    const validPromoCodes = {
      'WELCOME10': { bonus: 10, description: 'Bônus de boas-vindas' },
      'LUCKY50': { bonus: 50, description: 'Bônus da sorte' },
      'FRIEND25': { bonus: 25, description: 'Bônus de indicação' },
    }

    const promoCode = validPromoCodes[promoData.code.toUpperCase()]
    
    if (!promoCode) {
      throw new Error('Código promocional inválido')
    }

    const transaction: Transaction = {
      id: 'promo_' + Date.now(),
      type: 'bonus',
      amount: promoCode.bonus,
      description: `Bônus: ${promoCode.description}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }

    return {
      bonusAmount: promoCode.bonus,
      description: promoCode.description,
      transaction,
    }
  }

  static async mockGetPaymentMethods() {
    await new Promise(resolve => setTimeout(resolve, 300))

    return [
      {
        id: 'pix',
        name: 'PIX',
        type: 'pix' as const,
        minAmount: 10,
        maxAmount: 10000,
        processingTime: 'Instantâneo',
        fees: 0,
      },
      {
        id: 'credit_card',
        name: 'Cartão de Crédito',
        type: 'credit_card' as const,
        minAmount: 10,
        maxAmount: 5000,
        processingTime: '1-2 dias úteis',
        fees: 0.049, // 4.9%
      },
      {
        id: 'bank_transfer',
        name: 'Transferência Bancária',
        type: 'bank_transfer' as const,
        minAmount: 50,
        maxAmount: 20000,
        processingTime: '1-3 dias úteis',
        fees: 0,
      },
    ]
  }

  static async mockGetWithdrawalMethods() {
    await new Promise(resolve => setTimeout(resolve, 300))

    return [
      {
        id: 'pix',
        name: 'PIX',
        type: 'pix' as const,
        minAmount: 20,
        maxAmount: 5000,
        processingTime: 'Instantâneo',
        fees: 0,
      },
      {
        id: 'bank_transfer',
        name: 'Transferência Bancária',
        type: 'bank_transfer' as const,
        minAmount: 50,
        maxAmount: 10000,
        processingTime: '1-2 dias úteis',
        fees: 0,
      },
    ]
  }
}
