import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DashboardService } from '@/services/dashboardService'
import type { SummaryItem, Transaction } from '@/types'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const summaryItems = ref<SummaryItem[]>([])
  const transactions = ref<Transaction[]>([])
  const loading = ref({
    summary: false,
    transactions: false,
    balance: false,
  })
  const error = ref({
    summary: null as string | null,
    transactions: null as string | null,
    balance: null as string | null,
  })

  // Getters
  const totalBalance = computed(() => {
    const balanceItem = summaryItems.value.find(item => item.type === 'balance')
    return balanceItem ? parseFloat(balanceItem.amount.replace(/[^\d,.-]/g, '').replace(',', '.')) : 0
  })

  const totalPrizes = computed(() => {
    const prizesItem = summaryItems.value.find(item => item.type === 'prizes')
    return prizesItem ? parseFloat(prizesItem.amount.replace(/[^\d,.-]/g, '').replace(',', '.')) : 0
  })

  const monthlyEarnings = computed(() => {
    const earningsItem = summaryItems.value.find(item => item.type === 'earnings')
    return earningsItem ? parseFloat(earningsItem.amount.replace(/[^\d,.-]/g, '').replace(',', '.')) : 0
  })

  const totalBonus = computed(() => {
    const bonusItem = summaryItems.value.find(item => item.type === 'bonus')
    return bonusItem ? parseFloat(bonusItem.amount.replace(/[^\d,.-]/g, '').replace(',', '.')) : 0
  })

  const recentTransactions = computed(() => {
    return transactions.value
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  })

  const pendingTransactions = computed(() => {
    return transactions.value.filter(transaction => transaction.status === 'pending')
  })

  const completedTransactions = computed(() => {
    return transactions.value.filter(transaction => transaction.status === 'completed')
  })

  const transactionsByType = computed(() => {
    const groups: Record<string, Transaction[]> = {}
    transactions.value.forEach(transaction => {
      if (!groups[transaction.type]) {
        groups[transaction.type] = []
      }
      groups[transaction.type].push(transaction)
    })
    return groups
  })

  const monthlyStats = computed(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthlyTransactions = transactions.value.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt)
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear
    })

    const deposits = monthlyTransactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0)

    const withdrawals = monthlyTransactions
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const prizes = monthlyTransactions
      .filter(t => t.type === 'prize')
      .reduce((sum, t) => sum + t.amount, 0)

    const bonuses = monthlyTransactions
      .filter(t => t.type === 'bonus')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      deposits,
      withdrawals,
      prizes,
      bonuses,
      netGain: deposits + prizes + bonuses - withdrawals,
      transactionCount: monthlyTransactions.length,
    }
  })

  // Actions
  const fetchSummaryData = async () => {
    try {
      loading.value.summary = true
      error.value.summary = null

      // Use mock service for now
      const data = await DashboardService.getMockSummaryData()
      summaryItems.value = data

    } catch (err) {
      error.value.summary = err instanceof Error ? err.message : 'Erro ao carregar dados do dashboard'
      console.error('Failed to fetch summary data:', err)
    } finally {
      loading.value.summary = false
    }
  }

  const fetchTransactions = async () => {
    try {
      loading.value.transactions = true
      error.value.transactions = null

      // Use mock service for now
      const data = await DashboardService.getMockTransactions()
      transactions.value = data

    } catch (err) {
      error.value.transactions = err instanceof Error ? err.message : 'Erro ao carregar transações'
      console.error('Failed to fetch transactions:', err)
    } finally {
      loading.value.transactions = false
    }
  }

  const addTransaction = (transaction: Transaction) => {
    transactions.value.unshift(transaction) // Add to beginning
    
    // Update summary based on transaction type
    updateSummaryFromTransaction(transaction)
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const index = transactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      transactions.value[index] = { ...transactions.value[index], ...updates }
    }
  }

  const updateSummaryFromTransaction = (transaction: Transaction) => {
    // Update balance
    const balanceIndex = summaryItems.value.findIndex(item => item.type === 'balance')
    if (balanceIndex !== -1) {
      const currentBalance = parseFloat(
        summaryItems.value[balanceIndex].amount.replace(/[^\d,.-]/g, '').replace(',', '.')
      )
      const newBalance = currentBalance + transaction.amount
      summaryItems.value[balanceIndex].amount = `R$ ${newBalance.toFixed(2).replace('.', ',')}`
    }

    // Update specific summaries based on transaction type
    if (transaction.type === 'prize') {
      const prizesIndex = summaryItems.value.findIndex(item => item.type === 'prizes')
      if (prizesIndex !== -1) {
        const currentPrizes = parseFloat(
          summaryItems.value[prizesIndex].amount.replace(/[^\d,.-]/g, '').replace(',', '.')
        )
        const newPrizes = currentPrizes + transaction.amount
        summaryItems.value[prizesIndex].amount = `R$ ${newPrizes.toFixed(2).replace('.', ',')}`
      }
    } else if (transaction.type === 'bonus') {
      const bonusIndex = summaryItems.value.findIndex(item => item.type === 'bonus')
      if (bonusIndex !== -1) {
        const currentBonus = parseFloat(
          summaryItems.value[bonusIndex].amount.replace(/[^\d,.-]/g, '').replace(',', '.')
        )
        const newBonus = currentBonus + transaction.amount
        summaryItems.value[bonusIndex].amount = `R$ ${newBonus.toFixed(2).replace('.', ',')}`
      }
    }
  }

  const refreshDashboard = async () => {
    await Promise.all([
      fetchSummaryData(),
      fetchTransactions(),
    ])
  }

  const clearErrors = () => {
    error.value.summary = null
    error.value.transactions = null
    error.value.balance = null
  }

  const getTransactionById = (id: string): Transaction | undefined => {
    return transactions.value.find(transaction => transaction.id === id)
  }

  const filterTransactionsByDate = (startDate: Date, endDate: Date): Transaction[] => {
    return transactions.value.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  const filterTransactionsByType = (type: Transaction['type']): Transaction[] => {
    return transactions.value.filter(transaction => transaction.type === type)
  }

  return {
    // State
    summaryItems,
    transactions,
    loading,
    error,

    // Getters
    totalBalance,
    totalPrizes,
    monthlyEarnings,
    totalBonus,
    recentTransactions,
    pendingTransactions,
    completedTransactions,
    transactionsByType,
    monthlyStats,

    // Actions
    fetchSummaryData,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    refreshDashboard,
    clearErrors,
    getTransactionById,
    filterTransactionsByDate,
    filterTransactionsByType,
  }
})
