<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore, useInventoryStore, useDashboardStore } from '@/stores'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

// Initialize route and stores
const route = useRoute()
const authStore = useAuthStore()
const inventoryStore = useInventoryStore()
const dashboardStore = useDashboardStore()

// Check if current route is an auth route
const isAuthRoute = computed(() => {
  return route.name === 'login' || route.name === 'register'
})

// Load initial data when app starts
onMounted(async () => {
  console.log('🚀 App.vue montado!')
  console.log('📍 Rota atual:', route.name, route.path)
  
  // Load user if token exists
  if (authStore.isAuthenticated) {
    try {
      await authStore.loadUser()
    } catch (error) {
      console.warn('Failed to load user on app start:', error)
    }
  }
  
  // Load initial data for better UX (only if not on auth pages)
  if (!isAuthRoute.value) {
    try {
      await Promise.all([
        inventoryStore.fetchItems(),
        dashboardStore.fetchSummaryData(),
      ])
    } catch (error) {
      console.warn('Failed to load initial data:', error)
    }
  }
})
</script>

<template>
  <div class="raspagreen-app">
    <!-- Header (shown on all pages except auth) -->
    <AppHeader v-if="!isAuthRoute" />

    <!-- Main content area with router views -->
    <main class="main-content" :class="{ 'auth-layout': isAuthRoute }">
      <div class="content-container" v-if="!isAuthRoute">
        <router-view v-slot="{ Component, route }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
      <!-- Auth pages get full width -->
      <router-view v-else v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- Footer (shown on all pages except auth) -->
    <AppFooter v-if="!isAuthRoute" />
  </div>
</template>

<style>
/* Main app container */
.raspagreen-app {
  min-height: 100vh;
  background-color: var(--background-variant);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}

/* Main content area */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Content container for regular pages */
.content-container {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 20px 0 20px;
  max-width: 1520px;
  margin: 0 auto;
  width: 100%;
}

/* Auth layout (full width for login/register) */
.main-content.auth-layout {
  padding: 0;
}

/* Loading states */
.app-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  flex-direction: column;
  gap: 20px;
}

.app-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--box-border);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.app-loading-text {
  color: var(--text-secondary);
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error states */
.app-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  text-align: center;
}

.app-error-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.app-error-title {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.app-error-message {
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.6;
  max-width: 500px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-container {
    gap: 40px;
    padding: 40px 15px 0 15px;
  }
}

@media (max-width: 480px) {
  .content-container {
    gap: 30px;
    padding: 30px 10px 0 10px;
  }
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Focus management for accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: var(--background-color);
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  z-index: 1000;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Print styles */
@media print {
  .raspagreen-app {
    background: white !important;
    color: black !important;
  }
  
  .main-content {
    padding: 0 !important;
  }
  
  .content-container {
    padding: 0 !important;
    gap: 20px !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .raspagreen-app {
    background: black;
    color: white;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
  
  .app-loading-spinner {
    animation: none;
  }
}
</style>
