import { apiClient } from './api'
import { API_ENDPOINTS, STORAGE_KEYS } from '@/constants'
import type { User, APIResponse } from '@/types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  cpf?: string
}

interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    )

    if (response.data) {
      // Store tokens
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.accessToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken)
    }

    return response.data
  }

  // Register new user
  static async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    )

    if (response.data) {
      // Store tokens
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.accessToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken)
    }

    return response.data
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } finally {
      // Always clear local storage
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES)
    }
  }

  // Refresh access token
  static async refreshToken(): Promise<{ accessToken: string; expiresIn: number }> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await apiClient.post<{ accessToken: string; expiresIn: number }>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    )

    if (response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.accessToken)
    }

    return response.data
  }

  // Get current user profile
  static async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE)
    return response.data
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>(API_ENDPOINTS.AUTH.PROFILE, userData)
    return response.data
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    
    if (!token) return false

    try {
      // Basic JWT token validation (check if not expired)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      
      return payload.exp > now
    } catch {
      return false
    }
  }

  // Get stored auth token
  static getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  // Mock authentication for development
  static async mockLogin(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simple validation
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios')
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }

    const mockUser: User = {
      id: 'user_123',
      name: 'Pedro Nunes',
      email: email,
      balance: 1598.50,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    }

    const mockTokens = {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 3600, // 1 hour
    }

    const authResponse: AuthResponse = {
      user: mockUser,
      ...mockTokens,
    }

    // Store tokens
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockTokens.accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockTokens.refreshToken)

    return authResponse
  }

  static async mockRegister(userData: RegisterData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Nome, email e senha são obrigatórios')
    }

    if (userData.password !== userData.confirmPassword) {
      throw new Error('Senhas não coincidem')
    }

    if (userData.password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }

    const mockUser: User = {
      id: 'user_' + Date.now(),
      name: userData.name,
      email: userData.email,
      balance: 0,
    }

    const mockTokens = {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 3600,
    }

    const authResponse: AuthResponse = {
      user: mockUser,
      ...mockTokens,
    }

    // Store tokens
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockTokens.accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockTokens.refreshToken)

    return authResponse
  }

  static getMockUser(): User {
    return {
      id: 'user_123',
      name: 'Pedro Nunes',
      email: 'pedro@example.com',
      balance: 1598.50,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    }
  }
}
