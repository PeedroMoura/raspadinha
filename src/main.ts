import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Styles
import './style.css'
import './assets/styles/main.css'
import './assets/styles/figma-layout.css'
import './assets/styles/responsive.css'

// Create the Vue application
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  
  // In production, you might want to send this to an error reporting service
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(err)
  }
}

// Global warning handler (only in development)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, vm, trace) => {
    console.warn('Vue warning:', msg, trace)
  }
}

// Mount the app
app.mount('#app')

// Service Worker registration (for PWA in the future)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason)
  
  // In production, report to error service
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(event.reason)
  }
  
  // Prevent the default browser behavior
  event.preventDefault()
})
