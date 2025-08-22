import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(
  value: Ref<T>,
  delay: number = 300
): { debouncedValue: Ref<T> } {
  const debouncedValue = ref<T>(value.value)
  let timeoutId: number | null = null

  watch(
    value,
    (newValue) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = window.setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: true }
  )

  return { debouncedValue }
}
