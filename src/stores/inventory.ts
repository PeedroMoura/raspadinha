import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { InventoryService } from '@/services/inventoryService'
import { useDebounce } from '@/composables/useDebounce'
import type { Item, PaginationParams } from '@/types'

export const useInventoryStore = defineStore('inventory', () => {
  // State
  const items = ref<Item[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(9)
  const totalItems = ref(0)
  const selectedCategory = ref<string>('')
  const sortBy = ref<string>('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')

  // Debounced search
  const { debouncedValue: debouncedSearchQuery } = useDebounce(searchQuery, 300)

  // Getters
  const filteredItems = computed(() => {
    let filtered = [...items.value]

    // Filter by search query
    if (debouncedSearchQuery.value.trim()) {
      const query = debouncedSearchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory.value) {
      filtered = filtered.filter(item => item.category === selectedCategory.value)
    }

    // Sort items
    filtered.sort((a, b) => {
      let valueA: any = a[sortBy.value as keyof Item]
      let valueB: any = b[sortBy.value as keyof Item]

      // Handle price sorting (remove currency symbol)
      if (sortBy.value === 'price') {
        valueA = parseFloat(valueA.replace(/[^\d,.-]/g, '').replace(',', '.'))
        valueB = parseFloat(valueB.replace(/[^\d,.-]/g, '').replace(',', '.'))
      }

      // Handle quantity sorting
      if (sortBy.value === 'quantity') {
        valueA = parseInt(valueA)
        valueB = parseInt(valueB)
      }

      // Handle string sorting
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (sortOrder.value === 'asc') {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

    return filtered
  })

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return filteredItems.value.slice(startIndex, endIndex)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage.value)
  })

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  const featuredItems = computed(() => {
    return items.value.filter(item => item.featured)
  })

  const categoryCounts = computed(() => {
    const counts: Record<string, number> = {}
    items.value.forEach(item => {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1
      }
    })
    return counts
  })

  // Actions
  const fetchItems = async (params?: Partial<PaginationParams>) => {
    try {
      loading.value = true
      error.value = null

      // Use mock service for now
      const mockItems = await InventoryService.getMockItems()
      items.value = mockItems
      totalItems.value = mockItems.length

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar itens'
      console.error('Failed to fetch items:', err)
    } finally {
      loading.value = false
    }
  }

  const searchItems = async (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page when searching
  }

  const setCategory = (category: string) => {
    selectedCategory.value = category
    currentPage.value = 1 // Reset to first page when filtering
  }

  const setSorting = (field: string, order: 'asc' | 'desc' = 'asc') => {
    sortBy.value = field
    sortOrder.value = order
  }

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  const getItemById = (id: number): Item | undefined => {
    return items.value.find(item => item.id === id)
  }

  const addItem = (item: Item) => {
    items.value.push(item)
    totalItems.value++
  }

  const updateItem = (id: number, updates: Partial<Item>) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...updates }
    }
  }

  const removeItem = (id: number) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
      totalItems.value--
    }
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = ''
    currentPage.value = 1
  }

  const clearError = () => {
    error.value = null
  }

  const refreshItems = () => {
    return fetchItems()
  }

  return {
    // State
    items,
    loading,
    error,
    searchQuery,
    currentPage,
    itemsPerPage,
    totalItems,
    selectedCategory,
    sortBy,
    sortOrder,

    // Getters
    filteredItems,
    paginatedItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
    featuredItems,
    categoryCounts,
    debouncedSearchQuery,

    // Actions
    fetchItems,
    searchItems,
    setCategory,
    setSorting,
    setPage,
    nextPage,
    prevPage,
    getItemById,
    addItem,
    updateItem,
    removeItem,
    clearFilters,
    clearError,
    refreshItems,
  }
})
