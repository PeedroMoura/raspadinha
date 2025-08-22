import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: {
    serializer?: {
      read: (value: string) => T
      write: (value: T) => string
    }
  } = {}
): [Ref<T>, (value: T) => void, () => void] {
  const { serializer = JSON } = options

  const storedValue = ref<T>(defaultValue)

  // Read from localStorage
  const read = (): T => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      return serializer.read(item)
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  }

  // Write to localStorage
  const write = (value: T): void => {
    try {
      localStorage.setItem(key, serializer.write(value))
      storedValue.value = value
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove from localStorage
  const remove = (): void => {
    try {
      localStorage.removeItem(key)
      storedValue.value = defaultValue
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Initialize with stored value
  storedValue.value = read()

  // Watch for changes and sync to localStorage
  watch(
    storedValue,
    (newValue) => {
      write(newValue)
    },
    { deep: true }
  )

  return [storedValue, write, remove]
}

// Specialized composables for common use cases
export function useStoredRef<T>(key: string, defaultValue: T) {
  const [storedValue] = useLocalStorage(key, defaultValue)
  return storedValue
}

export function useAuthToken() {
  return useLocalStorage('auth_token', null as string | null)
}

export function useUserPreferences() {
  return useLocalStorage('user_preferences', {
    theme: 'dark',
    language: 'pt-BR',
    notifications: true,
    autoSave: true,
  })
}
