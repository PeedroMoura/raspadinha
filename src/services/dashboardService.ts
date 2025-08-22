import { apiClient } from './api'
import { API_ENDPOINTS } from '@/constants'
import type { SummaryItem, Transaction, User, PaginationParams, PaginatedResponse } from '@/types'

export class DashboardService {
  // Get dashboard summary data
  static async getSummaryData(): Promise<SummaryItem[]> {
    const response = await apiClient.get<SummaryItem[]>(API_ENDPOINTS.SUMMARY.OVERVIEW)
    return response.data
  }

  // Get user balance information
  static async getBalance(): Promise<{ balance: number; currency: string }> {
    const response = await apiClient.get<{ balance: number; currency: string }>(
      API_ENDPOINTS.SUMMARY.BALANCE
    )
    return response.data
  }

  // Get transactions with pagination
  static async getTransactions(params: Partial<PaginationParams> = {}): Promise<PaginatedResponse<Transaction>> {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.search) searchParams.set('search', params.search)
    if (params.sortBy) searchParams.set('sortBy', params.sortBy)
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)

    const endpoint = `${API_ENDPOINTS.SUMMARY.TRANSACTIONS}?${searchParams.toString()}`
    const response = await apiClient.get<PaginatedResponse<Transaction>>(endpoint)
    
    return response.data
  }

  // Get recent transactions (last 10)
  static async getRecentTransactions(): Promise<Transaction[]> {
    const params = new URLSearchParams({
      limit: '10',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    })

    const endpoint = `${API_ENDPOINTS.SUMMARY.TRANSACTIONS}?${params.toString()}`
    const response = await apiClient.get<PaginatedResponse<Transaction>>(endpoint)
    
    return response.data.data
  }

  // Mock data for development
  static async getMockSummaryData(): Promise<SummaryItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))

    return [
      {
        id: 'prizes',
        title: 'Montante em Prêmios',
        amount: 'R$ 1.250,00',
        type: 'prizes',
        trend: 'up',
        percentage: 12.5,
      },
      {
        id: 'balance',
        title: 'Saldo Disponível',
        amount: 'R$ 1.598,50',
        type: 'balance',
        trend: 'stable',
      },
      {
        id: 'earnings',
        title: 'Ganhos Mensais',
        amount: 'R$ 890,00',
        type: 'earnings',
        trend: 'up',
        percentage: 8.2,
      },
      {
        id: 'bonus',
        title: 'Bônus Acumulado',
        amount: 'R$ 245,00',
        type: 'bonus',
        trend: 'down',
        percentage: -3.1,
      },
    ]
  }

  static async getMockTransactions(): Promise<Transaction[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))

    return [
      {
        id: 'txn_001',
        type: 'prize',
        amount: 150.00,
        description: 'Prêmio Raspadinha Premium',
        status: 'completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
      },
      {
        id: 'txn_002',
        type: 'deposit',
        amount: 500.00,
        description: 'Depósito PIX',
        status: 'completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: 'txn_003',
        type: 'bonus',
        amount: 50.00,
        description: 'Bônus de Indicação',
        status: 'completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      },
      {
        id: 'txn_004',
        type: 'withdrawal',
        amount: -200.00,
        description: 'Saque para conta bancária',
        status: 'pending',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: 'txn_005',
        type: 'prize',
        amount: 75.00,
        description: 'Prêmio Raspadinha Classic',
        status: 'completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      },
    ]
  }

  // Get dashboard stats for analytics
  static async getDashboardStats(): Promise<{
    totalPrizes: number
    totalDeposits: number
    totalWithdrawals: number
    winRate: number
    favoriteCategory: string
  }> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      totalPrizes: 15,
      totalDeposits: 3,
      totalWithdrawals: 1,
      winRate: 0.65, // 65%
      favoriteCategory: 'electronics',
    }
  }
}
