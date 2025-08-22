import { ref, computed } from 'vue'
import { APP_CONFIG } from '@/constants'

export function useImageLoader(src: string, fallbackSrc?: string) {
  const loading = ref(true)
  const error = ref(false)
  const currentSrc = ref(src)

  const imageUrl = computed(() => {
    if (error.value && fallbackSrc) {
      return fallbackSrc
    }
    if (error.value) {
      return APP_CONFIG.IMAGES.PLACEHOLDER
    }
    return currentSrc.value
  })

  const onLoad = () => {
    loading.value = false
    error.value = false
  }

  const onError = () => {
    loading.value = false
    error.value = true
    
    // Try fallback if available and not already tried
    if (fallbackSrc && currentSrc.value !== fallbackSrc) {
      currentSrc.value = fallbackSrc
      loading.value = true
      error.value = false
    }
  }

  const retry = () => {
    loading.value = true
    error.value = false
    currentSrc.value = src
  }

  return {
    loading,
    error,
    imageUrl,
    onLoad,
    onError,
    retry,
  }
}

// Preload images utility
export function useImagePreloader() {
  const preloadedImages = new Set<string>()

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (preloadedImages.has(src)) {
        resolve()
        return
      }

      const img = new Image()
      img.onload = () => {
        preloadedImages.add(src)
        resolve()
      }
      img.onerror = reject
      img.src = src
    })
  }

  const preloadImages = async (sources: string[]): Promise<void> => {
    const promises = sources.map(src => preloadImage(src))
    await Promise.allSettled(promises)
  }

  return {
    preloadImage,
    preloadImages,
    preloadedImages: computed(() => Array.from(preloadedImages)),
  }
}
