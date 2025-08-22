// Store exports for easy importing
export { useAuthStore } from './auth'
export { useInventoryStore } from './inventory'
export { useDashboardStore } from './dashboard'
export { useFinancialStore } from './financial'

// Store initialization helper
export function initializeStores() {
  // This function can be called in main.ts to initialize stores
  // with any required data or setup
  
  const authStore = useAuthStore()
  const inventoryStore = useInventoryStore()
  const dashboardStore = useDashboardStore()
  const financialStore = useFinancialStore()

  return {
    authStore,
    inventoryStore,
    dashboardStore,
    financialStore,
  }
}

// Store reset helper (useful for testing or logout)
export function resetAllStores() {
  // Reset all stores to initial state
  const authStore = useAuthStore()
  const inventoryStore = useInventoryStore()
  const dashboardStore = useDashboardStore()
  const financialStore = useFinancialStore()

  // Reset auth
  authStore.$reset()
  
  // Clear inventory
  inventoryStore.clearFilters()
  inventoryStore.clearError()
  
  // Clear dashboard
  dashboardStore.clearErrors()
  
  // Clear financial
  financialStore.clearErrors()
  financialStore.clearLastResponses()
}
