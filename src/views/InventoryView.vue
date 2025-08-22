<template>
  <div class="inventory-view">
    <!-- Welcome Section no topo -->
    <WelcomeSection />
    
    <!-- Summary Section com estatísticas -->
    <SummarySection :items="summaryItems" />
    
    <!-- Inventory Section principal -->
    <InventorySection
      :items="inventoryItems"
      :searchQuery="searchQuery"
      :currentPage="currentPage"
      @update:searchQuery="searchQuery = $event"
      @update:currentPage="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WelcomeSection from '@/components/WelcomeSection.vue'
import SummarySection from '@/components/SummarySection.vue'
import InventorySection from '@/components/InventorySection.vue'

// State
const searchQuery = ref('')
const currentPage = ref(1)

// Summary items (dados dos cards de estatísticas como na imagem)
const summaryItems = [
  {
    title: 'Montante em Prêmios',
    amount: 'R$ 100,00'
  },
  {
    title: 'Saldo total',
    amount: 'R$ 100,00'
  },
  {
    title: 'Saldo total',
    amount: 'R$ 100,00'
  },
  {
    title: 'Saldo total',
    amount: 'R$ 100,00'
  }
]

// Mock inventory items que correspondem exatamente à imagem
const allItems = [
  {
    id: 1,
    name: 'Raspadinha Apple',
    price: 'R$ 100,00',
    quantity: '04',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 2,
    name: 'iPhone 15',
    price: 'R$ 1.500,00',
    quantity: '06',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 3,
    name: 'Caixa de som JBL',
    price: 'R$ 500,00',
    quantity: '14',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 4,
    name: 'Copo Stanley rosa',
    price: 'R$ 165,00',
    quantity: '10',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 5,
    name: 'Air Fryer',
    price: 'R$ 800,00',
    quantity: '12',
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 6,
    name: 'Fone de ouvido',
    price: 'R$ 170,00',
    quantity: '18',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 7,
    name: 'Bola de futebol',
    price: 'R$ 520,00',
    quantity: '22',
    image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 8,
    name: 'Camisa de time',
    price: 'R$ 350,00',
    quantity: '27',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&crop=center',
    featured: false
  },
  {
    id: 9,
    name: 'Smartwatch D20 Shock',
    price: 'R$ 150,00',
    quantity: '31',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center',
    featured: false
  }
]

// Computed properties para paginação (exibe 9 itens por página como no grid 3x3)
const itemsPerPage = 9
const inventoryItems = computed(() => {
  let filtered = allItems

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query)
    )
  }

  // Get items for current page
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})
</script>

<style scoped>
.inventory-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0; /* Sem gap para manter espaçamento original dos componentes */
}

/* Remove qualquer estilo conflitante - usa estilos originais dos componentes */
</style>