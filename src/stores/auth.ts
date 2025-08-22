import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/authService'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')
  const userBalance = computed(() => user.value?.balance || 0)
  const userAvatar = computed(() => user.value?.avatar || '')

  // Actions
  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      // Use mock service for now
      const response = await AuthService.mockLogin(email, password)
      user.value = response.user

      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro no login'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
    cpf?: string
  }) => {
    try {
      loading.value = true
      error.value = null

      // Use mock service for now
      const response = await AuthService.mockRegister(userData)
      user.value = response.user

      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro no registro'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      await AuthService.logout()
    } catch (err) {
      console.warn('Logout error:', err)
    } finally {
      user.value = null
      error.value = null
      loading.value = false
    }
  }

  const loadUser = async () => {
    try {
      if (!AuthService.isAuthenticated()) {
        return
      }

      loading.value = true
      // For now, use mock user
      user.value = AuthService.getMockUser()
    } catch (err) {
      console.warn('Load user error:', err)
      await logout()
    } finally {
      loading.value = false
    }
  }

  const updateBalance = (newBalance: number) => {
    if (user.value) {
      user.value.balance = newBalance
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    try {
      loading.value = true
      error.value = null

      // In a real app, call AuthService.updateProfile
      if (user.value) {
        user.value = { ...user.value, ...userData }
      }

      return user.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar perfil'
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Initialize on store creation
  if (AuthService.isAuthenticated()) {
    loadUser()
  } else {
    // Auto-login with mock data for development
    const mockLogin = async () => {
      try {
        // Simulate being logged in for development
        localStorage.setItem('raspagreen_auth_token', 'mock_token_' + Date.now())
        user.value = AuthService.getMockUser()
      } catch (error) {
        console.warn('Mock login failed:', error)
      }
    }
    mockLogin()
  }

  return {
    // State
    user,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userName,
    userBalance,
    userAvatar,
    
    // Actions
    login,
    register,
    logout,
    loadUser,
    updateBalance,
    updateProfile,
    clearError,
  }
})
