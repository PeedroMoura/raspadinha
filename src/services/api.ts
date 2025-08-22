import { API_BASE_URL, ERROR_MESSAGES } from '@/constants'
import type { APIResponse } from '@/types'

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestConfig extends RequestInit {
  timeout?: number
}

class ApiClient {
  private baseURL: string
  private defaultTimeout = 10000

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async makeRequest<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<APIResponse<T>> {
    const { timeout = this.defaultTimeout, ...fetchConfig } = config
    
    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const url = `${this.baseURL}${endpoint}`
      
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      // Get auth token from localStorage
      const token = localStorage.getItem('raspagreen_auth_token')
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(url, {
        ...fetchConfig,
        headers: {
          ...defaultHeaders,
          ...fetchConfig.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      const data = await response.json()
      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT')
      }
      
      if (error instanceof ApiError) {
        throw error
      }
      
      // Network or other errors
      throw new ApiError(ERROR_MESSAGES.NETWORK, 0, 'NETWORK_ERROR')
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = ERROR_MESSAGES.SERVER_ERROR
    let errorCode = 'UNKNOWN_ERROR'

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
      errorCode = errorData.code || errorCode
    } catch {
      // If we can't parse error response, use status-based message
      switch (response.status) {
        case 400:
          errorMessage = ERROR_MESSAGES.VALIDATION_ERROR
          errorCode = 'VALIDATION_ERROR'
          break
        case 401:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED
          errorCode = 'UNAUTHORIZED'
          // Clear stored tokens on 401
          localStorage.removeItem('raspagreen_auth_token')
          localStorage.removeItem('raspagreen_refresh_token')
          break
        case 403:
          errorMessage = ERROR_MESSAGES.FORBIDDEN
          errorCode = 'FORBIDDEN'
          break
        case 404:
          errorMessage = ERROR_MESSAGES.NOT_FOUND
          errorCode = 'NOT_FOUND'
          break
        case 500:
        default:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR
          errorCode = 'SERVER_ERROR'
          break
      }
    }

    throw new ApiError(errorMessage, response.status, errorCode)
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'DELETE' })
  }

  // File upload helper
  async uploadFile<T>(
    endpoint: string,
    file: File,
    fieldName = 'file',
    additionalFields?: Record<string, string>
  ): Promise<APIResponse<T>> {
    const formData = new FormData()
    formData.append(fieldName, file)

    if (additionalFields) {
      Object.entries(additionalFields).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
    })
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL)
export { ApiError }
