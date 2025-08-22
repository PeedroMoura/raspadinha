import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useInventoryStore } from '@/stores/inventory'

describe('Stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('useAuthStore', () => {
    it('should initialize with default state', () => {
      const authStore = useAuthStore()
      
      expect(authStore.user).toBe(null)
      expect(authStore.loading).toBe(false)
      expect(authStore.error).toBe(null)
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should update balance', () => {
      const authStore = useAuthStore()
      
      // Mock user
      authStore.user = {
        id: 'test',
        name: 'Test User',
        email: 'test@example.com',
        balance: 100
      }
      
      expect(authStore.userBalance).toBe(100)
      
      authStore.updateBalance(200)
      expect(authStore.userBalance).toBe(200)
    })

    it('should clear error', () => {
      const authStore = useAuthStore()
      authStore.error = 'Test error'
      
      expect(authStore.error).toBe('Test error')
      
      authStore.clearError()
      expect(authStore.error).toBe(null)
    })
  })

  describe('useInventoryStore', () => {
    it('should initialize with default state', () => {
      const inventoryStore = useInventoryStore()
      
      expect(inventoryStore.items).toEqual([])
      expect(inventoryStore.loading).toBe(false)
      expect(inventoryStore.error).toBe(null)
      expect(inventoryStore.searchQuery).toBe('')
      expect(inventoryStore.currentPage).toBe(1)
    })

    it('should update search query', () => {
      const inventoryStore = useInventoryStore()
      
      inventoryStore.searchItems('test')
      expect(inventoryStore.searchQuery).toBe('test')
      expect(inventoryStore.currentPage).toBe(1) // Should reset to page 1
    })

    it('should set category filter', () => {
      const inventoryStore = useInventoryStore()
      
      inventoryStore.setCategory('electronics')
      expect(inventoryStore.selectedCategory).toBe('electronics')
      expect(inventoryStore.currentPage).toBe(1) // Should reset to page 1
    })

    it('should handle pagination', () => {
      const inventoryStore = useInventoryStore()
      
      inventoryStore.setPage(2)
      expect(inventoryStore.currentPage).toBe(2)
      
      inventoryStore.nextPage()
      expect(inventoryStore.currentPage).toBe(3)
      
      inventoryStore.prevPage()
      expect(inventoryStore.currentPage).toBe(2)
    })

    it('should clear filters', () => {
      const inventoryStore = useInventoryStore()
      
      inventoryStore.searchQuery = 'test'
      inventoryStore.selectedCategory = 'electronics'
      inventoryStore.currentPage = 3
      
      inventoryStore.clearFilters()
      
      expect(inventoryStore.searchQuery).toBe('')
      expect(inventoryStore.selectedCategory).toBe('')
      expect(inventoryStore.currentPage).toBe(1)
    })

    it('should add and remove items', () => {
      const inventoryStore = useInventoryStore()
      
      const testItem = {
        id: 1,
        name: 'Test Item',
        price: 'R$ 100,00',
        quantity: '1',
        image: 'test.jpg'
      }
      
      inventoryStore.addItem(testItem)
      expect(inventoryStore.items).toHaveLength(1)
      expect(inventoryStore.items[0]).toEqual(testItem)
      
      inventoryStore.removeItem(1)
      expect(inventoryStore.items).toHaveLength(0)
    })

    it('should update item', () => {
      const inventoryStore = useInventoryStore()
      
      const testItem = {
        id: 1,
        name: 'Test Item',
        price: 'R$ 100,00',
        quantity: '1',
        image: 'test.jpg'
      }
      
      inventoryStore.addItem(testItem)
      inventoryStore.updateItem(1, { name: 'Updated Item' })
      
      expect(inventoryStore.items[0].name).toBe('Updated Item')
    })

    it('should get item by ID', () => {
      const inventoryStore = useInventoryStore()
      
      const testItem = {
        id: 1,
        name: 'Test Item',
        price: 'R$ 100,00',
        quantity: '1',
        image: 'test.jpg'
      }
      
      inventoryStore.addItem(testItem)
      const foundItem = inventoryStore.getItemById(1)
      
      expect(foundItem).toEqual(testItem)
      expect(inventoryStore.getItemById(999)).toBeUndefined()
    })
  })
})
