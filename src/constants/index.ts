// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Inventory
  INVENTORY: {
    ITEMS: '/inventory/items',
    ITEM_DETAIL: (id: string) => `/inventory/items/${id}`,
    CATEGORIES: '/inventory/categories',
  },
  
  // Summary/Dashboard
  SUMMARY: {
    OVERVIEW: '/dashboard/summary',
    TRANSACTIONS: '/dashboard/transactions',
    BALANCE: '/dashboard/balance',
  },
  
  // Scratch Cards
  SCRATCH_CARDS: {
    LIST: '/scratch-cards',
    PLAY: (id: string) => `/scratch-cards/${id}/play`,
    HISTORY: '/scratch-cards/history',
  },
  
  // Financial
  FINANCIAL: {
    DEPOSIT: '/financial/deposit',
    WITHDRAWAL: '/financial/withdrawal',
    PROMO_CODE: '/financial/promo-code',
  },
} as const

// App Configuration
export const APP_CONFIG = {
  NAME: 'RaspaGreen',
  VERSION: '1.0.0',
  PAGINATION: {
    DEFAULT_LIMIT: 9,
    MAX_LIMIT: 50,
  },
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    DEBOUNCE_DELAY: 300,
  },
  CURRENCY: {
    SYMBOL: 'R$',
    LOCALE: 'pt-BR',
  },
  IMAGES: {
    PLACEHOLDER: '/images/placeholder.png',
    AVATAR_PLACEHOLDER: '/images/avatar-placeholder.png',
  },
} as const

// Navigation Items
export const NAV_ITEMS = [
  { name: 'Inicio', path: '/', icon: 'home' },
  { name: 'Raspadinhas', path: '/raspadinhas', icon: 'scratch-card' },
  { name: 'Indique e Ganhe', path: '/indicacoes', icon: 'gift' },
  { name: 'Inventario', path: '/inventario', icon: 'inventory', active: true },
] as const

// Theme Configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#26E702',
    BACKGROUND: '#181818',
    BACKGROUND_VARIANT: '#0b0d0c',
    BOX: '#262626',
    BOX_BORDER: '#383838',
    TEXT: '#fafafa',
    TEXT_SECONDARY: '#858585',
    RED: '#ff3b33',
  },
  BREAKPOINTS: {
    MOBILE: '480px',
    TABLET: '768px',
    DESKTOP: '1024px',
    LARGE: '1440px',
    ULTRA: '1920px',
  },
} as const

// Item Categories
export const ITEM_CATEGORIES = [
  { id: 'electronics', name: 'Eletrônicos', icon: 'smartphone' },
  { id: 'home', name: 'Casa e Decoração', icon: 'home' },
  { id: 'sports', name: 'Esportes', icon: 'soccer-ball' },
  { id: 'fashion', name: 'Moda', icon: 'tshirt' },
  { id: 'others', name: 'Outros', icon: 'package' },
] as const

// Item Rarities
export const ITEM_RARITIES = {
  COMMON: { name: 'Comum', color: '#858585', probability: 0.6 },
  RARE: { name: 'Raro', color: '#3b82f6', probability: 0.25 },
  EPIC: { name: 'Épico', color: '#8b5cf6', probability: 0.12 },
  LEGENDARY: { name: 'Lendário', color: '#f59e0b', probability: 0.03 },
} as const

// Transaction Types
export const TRANSACTION_TYPES = {
  DEPOSIT: { name: 'Depósito', color: '#10b981', icon: 'arrow-down' },
  WITHDRAWAL: { name: 'Saque', color: '#ef4444', icon: 'arrow-up' },
  PRIZE: { name: 'Prêmio', color: '#f59e0b', icon: 'trophy' },
  BONUS: { name: 'Bônus', color: '#8b5cf6', icon: 'gift' },
} as const

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  MIN_PASSWORD_LENGTH: 8,
  MIN_DEPOSIT: 10,
  MAX_DEPOSIT: 10000,
  MIN_WITHDRAWAL: 20,
  MAX_WITHDRAWAL: 5000,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Acesso negado.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro interno do servidor.',
  VALIDATION_ERROR: 'Dados inválidos.',
  INSUFFICIENT_BALANCE: 'Saldo insuficiente.',
  INVALID_PROMO_CODE: 'Código promocional inválido.',
  IMAGE_LOAD_ERROR: 'Erro ao carregar imagem.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  DEPOSIT_SUCCESS: 'Depósito realizado com sucesso!',
  WITHDRAWAL_SUCCESS: 'Saque solicitado com sucesso!',
  PROMO_CODE_SUCCESS: 'Código promocional aplicado!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  SCRATCH_CARD_WIN: 'Parabéns! Você ganhou!',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'raspagreen_auth_token',
  REFRESH_TOKEN: 'raspagreen_refresh_token',
  USER_PREFERENCES: 'raspagreen_user_prefs',
  THEME: 'raspagreen_theme',
  LANGUAGE: 'raspagreen_language',
} as const
