import { ref, type Ref } from 'vue'
import type { APIResponse } from '@/types'

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useApi<T>(
  apiCall: () => Promise<APIResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options

  const data: Ref<T | null> = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async (): Promise<T | null> => {
    try {
      loading.value = true
      error.value = null

      const response = await apiCall()
      
      if (response.status === 'success') {
        data.value = response.data
        onSuccess?.(response.data)
        return response.data
      } else {
        throw new Error(response.message || 'API Error')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      onError?.(err instanceof Error ? err : new Error(errorMessage))
      return null
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
  }

  // Execute immediately if requested
  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
