import { apiClient } from './api'
import { API_ENDPOINTS } from '@/constants'
import type { Item, PaginationParams, PaginatedResponse, APIResponse } from '@/types'

export class InventoryService {
  // Get paginated items with optional search and filters
  static async getItems(params: Partial<PaginationParams> = {}): Promise<PaginatedResponse<Item>> {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.search) searchParams.set('search', params.search)
    if (params.sortBy) searchParams.set('sortBy', params.sortBy)
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)

    const endpoint = `${API_ENDPOINTS.INVENTORY.ITEMS}?${searchParams.toString()}`
    const response = await apiClient.get<PaginatedResponse<Item>>(endpoint)
    
    return response.data
  }

  // Get single item by ID
  static async getItem(id: string): Promise<Item> {
    const response = await apiClient.get<Item>(API_ENDPOINTS.INVENTORY.ITEM_DETAIL(id))
    return response.data
  }

  // Get item categories
  static async getCategories(): Promise<Array<{ id: string; name: string; count: number }>> {
    const response = await apiClient.get<Array<{ id: string; name: string; count: number }>>(
      API_ENDPOINTS.INVENTORY.CATEGORIES
    )
    return response.data
  }

  // Search items with debounced query
  static async searchItems(query: string, limit = 9): Promise<Item[]> {
    if (!query || query.trim().length < 2) {
      return []
    }

    const params = new URLSearchParams({
      search: query.trim(),
      limit: limit.toString(),
    })

    const endpoint = `${API_ENDPOINTS.INVENTORY.ITEMS}?${params.toString()}`
    const response = await apiClient.get<PaginatedResponse<Item>>(endpoint)
    
    return response.data.data
  }

  // Get featured items
  static async getFeaturedItems(limit = 3): Promise<Item[]> {
    const params = new URLSearchParams({
      featured: 'true',
      limit: limit.toString(),
    })

    const endpoint = `${API_ENDPOINTS.INVENTORY.ITEMS}?${params.toString()}`
    const response = await apiClient.get<PaginatedResponse<Item>>(endpoint)
    
    return response.data.data
  }

  // Mock data for development (remove when API is ready)
  static async getMockItems(): Promise<Item[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    return [
      {
        id: 1,
        name: 'Raspadinha Apple',
        price: 'R$ 150,00',
        quantity: '04',
        image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=300',
        secondaryImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
        category: 'electronics',
        rarity: 'rare',
        description: 'Raspadinha especial com tema Apple',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'iPhone 15',
        price: 'R$ 5.000,00',
        quantity: '05',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
        category: 'electronics',
        rarity: 'legendary',
        description: 'Smartphone iPhone 15 último modelo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'Caixa de som JBL',
        price: 'R$ 2.500,00',
        quantity: '08',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300',
        featured: true,
        category: 'electronics',
        rarity: 'epic',
        description: 'Caixa de som JBL com qualidade premium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: 'Copo Stanley rosa',
        price: 'R$ 165,00',
        quantity: '10',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
        category: 'home',
        rarity: 'common',
        description: 'Copo térmico Stanley na cor rosa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: 'Air Fryer',
        price: 'R$ 850,00',
        quantity: '12',
        image: 'https://images.unsplash.com/photo-1585515656473-aa22b5c17267?w=300',
        category: 'home',
        rarity: 'rare',
        description: 'Fritadeira elétrica sem óleo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 6,
        name: 'Fone de ouvido',
        price: 'R$ 170,00',
        quantity: '18',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300',
        category: 'electronics',
        rarity: 'common',
        description: 'Fone de ouvido bluetooth',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 7,
        name: 'Bola de futebol',
        price: 'R$ 500,00',
        quantity: '22',
        image: 'https://images.unsplash.com/photo-1614632537190-23045cc85c6d?w=300',
        category: 'sports',
        rarity: 'rare',
        description: 'Bola de futebol oficial',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 8,
        name: 'Camisa de time',
        price: 'R$ 350,00',
        quantity: '27',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300',
        category: 'fashion',
        rarity: 'common',
        description: 'Camisa oficial do time',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 9,
        name: 'Smartwatch D20 Shock',
        price: 'R$ 150,00',
        quantity: '31',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
        category: 'electronics',
        rarity: 'common',
        description: 'Smartwatch resistente com múltiplas funções',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }
}
