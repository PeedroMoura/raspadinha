<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import WelcomeSection from './components/WelcomeSection.vue'
import SummarySection from './components/SummarySection.vue'
import InventorySection from './components/InventorySection.vue'
import AppFooter from './components/AppFooter.vue'

// Data
const searchQuery = ref('')
const currentPage = ref(1)

const items = ref([
  {
    id: 1,
    name: 'Raspadinha Apple',
    price: 'R$ 150,00',
    quantity: '04',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/616b4f8e1bcd3aca937c5e8edfe18b8ad555b715?width=161',
    secondaryImage: 'https://api.builder.io/api/v1/image/assets/TEMP/233e367be294cd2e067b43b24273c07c2d8732e5?width=206'
  },
  {
    id: 2,
    name: 'iPhone 15',
    price: 'R$ 5.000,00',
    quantity: '05',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/41cf3981a2bc385fa56baa6eca63542cbaa4c225?width=183'
  },
  {
    id: 3,
    name: 'Caixa de som JBL',
    price: 'R$ 2.500,00',
    quantity: '08',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/c61726435c28c0c436cf52af595ad35a3b8448d6?width=274',
    featured: true
  },
  {
    id: 4,
    name: 'Copo Stanley rosa',
    price: 'R$ 165,00',
    quantity: '10',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/46076df1227fd9bb90c29eb2df649253c260e433?width=127'
  },
  {
    id: 5,
    name: 'Air Fryer',
    price: 'R$ 850,00',
    quantity: '12',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/95b8fd6d5c219ca6fe609a8fef14820dfb739c6b?width=196'
  },
  {
    id: 6,
    name: 'Fone de ouvido',
    price: 'R$ 170,00',
    quantity: '18',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/7549e96c5d06755a7fabefbbf157563b3622539a?width=239'
  },
  {
    id: 7,
    name: 'Bola de futebol',
    price: 'R$ 500,00',
    quantity: '22',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/438ff798abe542bd022547f4e1da1e130da3da9d?width=216'
  },
  {
    id: 8,
    name: 'Camisa de time',
    price: 'R$ 350,00',
    quantity: '27',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/603e50be6fa04b7132d55bbe65d9d7d35223db79?width=158'
  },
  {
    id: 9,
    name: 'Smartwatch D20 Shock',
    price: 'R$ 150,00',
    quantity: '31',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/f4227df4e4dd66d638c093a3e4819b4a7ac033e1?width=194'
  }
])

const summaryItems = ref([
  { title: "Montante em Prêmios", amount: "R$ 100,00" },
  { title: "Saldo total", amount: "R$ 100,00" },
  { title: "Saldo total", amount: "R$ 100,00" },
  { title: "Saldo total", amount: "R$ 100,00" }
])

// Computed
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value.slice(0, 9)
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 9)
})
</script>

<template>
  <div class="inventory-app">
    <AppHeader />
    
    <main class="main-content">
      <WelcomeSection />
      <SummarySection :items="summaryItems" />
      <InventorySection 
        :items="filteredItems"
        v-model:search-query="searchQuery"
        v-model:current-page="currentPage"
      />
    </main>

    <AppFooter />
  </div>
</template>

<style>
@import './assets/styles/main.css';
@import './assets/styles/figma-layout.css';
@import './assets/styles/responsive.css';
</style>
