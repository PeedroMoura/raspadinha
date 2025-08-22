// Core Types and Interfaces

export interface User {
  id: string
  name: string
  email: string
  balance: number
  avatar?: string
}

export interface Item {
  id: number
  name: string
  price: string
  quantity: string
  image: string
  secondaryImage?: string
  featured?: boolean
  category?: string
  description?: string
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  createdAt?: string
  updatedAt?: string
}

export interface SummaryItem {
  id: string
  title: string
  amount: string
  type: 'prizes' | 'balance' | 'earnings' | 'bonus'
  icon?: string
  trend?: 'up' | 'down' | 'stable'
  percentage?: number
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'prize' | 'bonus'
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface ScratchCard {
  id: string
  name: string
  price: number
  prizes: Prize[]
  image: string
  description: string
  active: boolean
}

export interface Prize {
  id: string
  name: string
  value: number
  probability: number
  type: 'money' | 'item' | 'bonus'
}

export interface APIResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
  timestamp: string
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Loading and Error States
export interface LoadingState {
  items: boolean
  summary: boolean
  user: boolean
  transactions: boolean
}

export interface ErrorState {
  items: string | null
  summary: string | null
  user: string | null
  transactions: string | null
  general: string | null
}

// Form Types
export interface DepositForm {
  amount: number
  method: 'pix' | 'credit_card' | 'bank_transfer'
}

export interface WithdrawalForm {
  amount: number
  bankAccount: string
  pixKey?: string
}

export interface PromoCodeForm {
  code: string
}

// Navigation Types
export interface NavItem {
  name: string
  path: string
  icon?: string
  badge?: number
  active?: boolean
}

// Theme Types
export interface Theme {
  name: string
  colors: {
    primary: string
    background: string
    backgroundVariant: string
    boxColor: string
    boxBorder: string
    textColor: string
    textSecondary: string
    redColor: string
  }
}
