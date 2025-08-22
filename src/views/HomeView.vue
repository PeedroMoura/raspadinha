<template>
  <div class="home-view">
    <SummarySection :items="summaryItems" />
    
    <!-- Quick Actions Section -->
    <section class="quick-actions-section">
      <div class="container">
        <h2>Ações Rápidas</h2>
        <div class="quick-actions-grid">
          <router-link to="/raspadinhas" class="action-card">
            <div class="action-icon">🎫</div>
            <h3>Jogar Raspadinhas</h3>
            <p>Teste sua sorte nas nossas raspadinhas</p>
          </router-link>
          
          <router-link to="/inventario" class="action-card">
            <div class="action-icon">📦</div>
            <h3>Ver Inventário</h3>
            <p>Confira seus itens e prêmios</p>
          </router-link>
          
          <router-link to="/indicacoes" class="action-card">
            <div class="action-icon">🎁</div>
            <h3>Indique e Ganhe</h3>
            <p>Convide amigos e ganhe bônus</p>
          </router-link>
          
          <router-link to="/transacoes" class="action-card">
            <div class="action-icon">💰</div>
            <h3>Minhas Transações</h3>
            <p>Veja seu histórico financeiro</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Items Section -->
    <section class="featured-items-section">
      <div class="container">
        <h2>Itens em Destaque</h2>
        <div class="featured-items-grid">
          <div v-for="item in featuredItems" :key="item.id" class="featured-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <div class="item-value">{{ formatCurrency(item.value) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useFormatter } from '@/composables/useFormatter'
import SummarySection from '@/components/SummarySection.vue'

const dashboardStore = useDashboardStore()
const { formatCurrency } = useFormatter()

// Summary items for SummarySection
const summaryItems = computed(() => dashboardStore.summaryItems)

// Featured items
const featuredItems = ref([
  {
    id: 1,
    name: "Raspadinha Premium",
    description: "Chance de ganhar até R$ 10.000",
    value: 50.00,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=200"
  },
  {
    id: 2,
    name: "Pacote de Moedas",
    description: "1000 moedas virtuais",
    value: 25.00,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200"
  },
  {
    id: 3,
    name: "Bônus de Indicação",
    description: "Ganhe R$ 10 por amigo indicado",
    value: 10.00,
    image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=200"
  }
])

// Load data on mount
onMounted(async () => {
  try {
    await dashboardStore.fetchSummaryData()
  } catch (error) {
    console.warn('Failed to load dashboard data:', error)
  }
})
</script>

<style scoped>
.home-view {
  width: 100%;
}

/* Quick Actions Section */
.quick-actions-section {
  padding: 40px 0;
}

.quick-actions-section h2 {
  color: var(--text-color);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.action-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 30px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 200px;
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(38, 231, 2, 0.2);
}

.action-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.action-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-color);
}

.action-card p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

/* Featured Items Section */
.featured-items-section {
  padding: 40px 0;
  background: var(--box-color);
  border-radius: 16px;
  margin: 20px 0;
}

.featured-items-section h2 {
  color: var(--text-color);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.featured-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.featured-item {
  background: var(--background-variant);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.featured-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.item-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  padding: 20px;
}

.item-info h3 {
  color: var(--text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.item-description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.item-value {
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .action-card {
    padding: 25px;
    min-height: 160px;
  }
  
  .action-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }
  
  .action-card h3 {
    font-size: 18px;
  }
  
  .featured-items-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .quick-actions-section h2,
  .featured-items-section h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .quick-actions-section,
  .featured-items-section {
    padding: 30px 0;
  }
  
  .action-card {
    padding: 20px;
    min-height: 140px;
  }
  
  .action-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
}
</style>