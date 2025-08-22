// Environment configuration
export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'RaspaGreen',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  
  // Feature Flags
  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true' || import.meta.env.DEV,
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true' || import.meta.env.DEV,
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // External Services
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  POSTHOG_KEY: import.meta.env.VITE_POSTHOG_KEY,
  
  // Payment Integration (for future)
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  PAGSEGURO_APP_ID: import.meta.env.VITE_PAGSEGURO_APP_ID,
  MERCADOPAGO_PUBLIC_KEY: import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY,
  
  // CDN
  IMAGE_CDN_URL: import.meta.env.VITE_IMAGE_CDN_URL || 'https://images.unsplash.com',
  
  // Debug Options
  DEBUG_API_CALLS: import.meta.env.VITE_DEBUG_API_CALLS === 'true',
  DEBUG_STORES: import.meta.env.VITE_DEBUG_STORES === 'true',
  SHOW_PERFORMANCE_METRICS: import.meta.env.VITE_SHOW_PERFORMANCE_METRICS === 'true',
} as const

// Validation function to check required environment variables
export function validateEnvironment(): boolean {
  const required = [
    // Add required environment variables here
    // 'API_BASE_URL',
  ]
  
  const missing = required.filter(key => !ENV[key as keyof typeof ENV])
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing)
    return false
  }
  
  return true
}

// Log environment info in development
if (ENV.IS_DEV) {
  console.group('🌍 Environment Configuration')
  console.log('Environment:', ENV.NODE_ENV)
  console.log('API Base URL:', ENV.API_BASE_URL)
  console.log('Mock API Enabled:', ENV.ENABLE_MOCK_API)
  console.log('Dev Tools Enabled:', ENV.ENABLE_DEV_TOOLS)
  console.groupEnd()
}
