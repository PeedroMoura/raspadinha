import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { STORAGE_KEYS } from '@/constants'

// Lazy-loaded views for better performance
const HomeView = () => import('@/views/HomeView.vue')
const InventoryView = () => import('@/views/InventoryView.vue')
const ScratchCardsView = () => import('@/views/ScratchCardsView.vue')
const ReferralsView = () => import('@/views/ReferralsView.vue')
const TransactionsView = () => import('@/views/TransactionsView.vue')

// Auth views
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')

// Error views
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Início - RaspaGreen',
      requiresAuth: false,
    },
  },
  {
    path: '/inventario',
    name: 'inventory',
    component: InventoryView,
    meta: {
      title: 'Inventário - RaspaGreen',
      requiresAuth: true,
    },
  },
  {
    path: '/raspadinhas',
    name: 'scratch-cards',
    component: ScratchCardsView,
    meta: {
      title: 'Raspadinhas - RaspaGreen',
      requiresAuth: true,
    },
  },
  {
    path: '/indicacoes',
    name: 'referrals',
    component: ReferralsView,
    meta: {
      title: 'Indique e Ganhe - RaspaGreen',
      requiresAuth: true,
    },
  },
  {
    path: '/transacoes',
    name: 'transactions',
    component: TransactionsView,
    meta: {
      title: 'Transações - RaspaGreen',
      requiresAuth: true,
    },
  },
  // Auth routes
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Entrar - RaspaGreen',
      requiresAuth: false,
      hideForAuth: true, // Hide if user is already authenticated
    },
  },
  {
    path: '/registro',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Criar Conta - RaspaGreen',
      requiresAuth: false,
      hideForAuth: true,
    },
  },
  // Redirects
  {
    path: '/inventory',
    redirect: '/inventario',
  },
  {
    path: '/scratch-cards',
    redirect: '/raspadinhas',
  },
  {
    path: '/referrals',
    redirect: '/indicacoes',
  },
  {
    path: '/transactions',
    redirect: '/transacoes',
  },
  // 404 catch-all route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Página não encontrada - RaspaGreen',
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when changing routes
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  document.title = to.meta.title as string || 'RaspaGreen'
  
  // In development mode, skip auth checks for easier testing
  const isDevelopment = import.meta.env.DEV
  
  // Check if route requires authentication (skip in development)
  if (to.meta.requiresAuth && !isDevelopment) {
    const hasToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    
    if (!hasToken) {
      // Redirect to login if not authenticated
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
      return
    }
    
    // Load user if not already loaded
    if (!authStore.user && hasToken) {
      try {
        await authStore.loadUser()
      } catch (error) {
        console.error('Failed to load user:', error)
        // Clear invalid token and redirect to login
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
        next({
          name: 'login',
          query: { redirect: to.fullPath },
        })
        return
      }
    }
  }
  
  // Hide auth pages if user is already authenticated
  if (to.meta.hideForAuth && authStore.isAuthenticated) {
    next({ name: 'home' })
    return
  }
  
  next()
})

// Global error handler for navigation
router.onError((error) => {
  console.error('Router error:', error)
  
  // Handle chunk loading errors (when JS chunks fail to load)
  if (error.message.includes('Loading chunk')) {
    // Reload the page to refetch chunks
    window.location.reload()
  }
})

export default router

// Route helper functions
export const isActiveRoute = (routeName: string, currentRoute: string): boolean => {
  return currentRoute === routeName
}

export const getRouteByName = (name: string) => {
  return routes.find(route => route.name === name)
}

export const generateBreadcrumbs = (currentRoute: any) => {
  const breadcrumbs = []
  
  // Add home breadcrumb
  breadcrumbs.push({
    name: 'Início',
    path: '/',
    active: currentRoute.name === 'home',
  })
  
  // Add current route if not home
  if (currentRoute.name !== 'home') {
    const routeNames: Record<string, string> = {
      inventory: 'Inventário',
      'scratch-cards': 'Raspadinhas',
      referrals: 'Indique e Ganhe',
      transactions: 'Transações',
    }
    
    breadcrumbs.push({
      name: routeNames[currentRoute.name] || currentRoute.name,
      path: currentRoute.path,
      active: true,
    })
  }
  
  return breadcrumbs
}
