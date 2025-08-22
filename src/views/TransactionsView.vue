<template>
  <div class="transactions-view">
    <div class="page-header">
      <h1>💰 Minhas Transações</h1>
      <p>Acompanhe todo seu histórico financeiro</p>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card income">
        <div class="card-icon">📈</div>
        <div class="card-content">
          <span class="card-value">{{ formatCurrency(totalIncome) }}</span>
          <span class="card-label">Total de Ganhos</span>
        </div>
      </div>
      
      <div class="summary-card expense">
        <div class="card-icon">📉</div>
        <div class="card-content">
          <span class="card-value">{{ formatCurrency(totalExpense) }}</span>
          <span class="card-label">Total de Gastos</span>
        </div>
      </div>
      
      <div class="summary-card balance">
        <div class="card-icon">💳</div>
        <div class="card-content">
          <span class="card-value">{{ formatCurrency(currentBalance) }}</span>
          <span class="card-label">Saldo Atual</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar transações..."
        class="search-input"
      />
      
      <select v-model="selectedType" class="filter-select">
        <option value="">Todos os tipos</option>
        <option value="deposit">Depósitos</option>
        <option value="withdrawal">Saques</option>
        <option value="game">Jogos</option>
        <option value="bonus">Bônus</option>
      </select>
    </div>

    <!-- Transactions List -->
    <div v-if="filteredTransactions.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>Nenhuma transação encontrada</h3>
      <p>Você ainda não possui transações</p>
    </div>

    <div v-else class="transactions-list">
      <div
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        class="transaction-item"
        :class="transaction.type"
      >
        <div class="transaction-icon">
          {{ getTypeIcon(transaction.type) }}
        </div>
        
        <div class="transaction-details">
          <h4>{{ transaction.description }}</h4>
          <p class="transaction-date">{{ formatDate(transaction.date) }}</p>
          <span class="transaction-status" :class="transaction.status">
            {{ getStatusText(transaction.status) }}
          </span>
        </div>
        
        <div class="transaction-amount">
          <span
            class="amount"
            :class="{
              'positive': transaction.amount > 0,
              'negative': transaction.amount < 0
            }"
          >
            {{ transaction.amount > 0 ? '+' : '' }}{{ formatCurrency(Math.abs(transaction.amount)) }}
          </span>
          <span class="method">{{ transaction.method }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFormatter } from '@/composables/useFormatter'

const authStore = useAuthStore()
const { formatCurrency, formatDate } = useFormatter()

// State
const searchQuery = ref('')
const selectedType = ref('')

// Mock transactions data
const transactions = ref([
  {
    id: 1,
    date: new Date('2024-01-20T14:30:00'),
    type: 'deposit',
    description: 'Depósito via PIX',
    amount: 100.00,
    status: 'completed',
    method: 'PIX'
  },
  {
    id: 2,
    date: new Date('2024-01-20T15:15:00'),
    type: 'game',
    description: 'Raspadinha Fortuna Dourada',
    amount: -15.00,
    status: 'completed',
    method: 'Saldo'
  },
  {
    id: 3,
    date: new Date('2024-01-20T15:16:00'),
    type: 'game',
    description: 'Prêmio - Raspadinha Fortuna Dourada',
    amount: 250.00,
    status: 'completed',
    method: 'Saldo'
  },
  {
    id: 4,
    date: new Date('2024-01-19T10:20:00'),
    type: 'withdrawal',
    description: 'Saque para conta bancária',
    amount: -200.00,
    status: 'pending',
    method: 'Transferência'
  },
  {
    id: 5,
    date: new Date('2024-01-18T16:45:00'),
    type: 'bonus',
    description: 'Bônus de boas-vindas',
    amount: 50.00,
    status: 'completed',
    method: 'Saldo'
  }
])

// Computed Properties
const filteredTransactions = computed(() => {
  let filtered = [...transactions.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t =>
      t.description.toLowerCase().includes(query)
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(t => t.type === selectedType.value)
  }

  return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
})

const totalIncome = computed(() => {
  return transactions.value
    .filter(t => t.amount > 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalExpense = computed(() => {
  return Math.abs(transactions.value
    .filter(t => t.amount < 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0))
})

const currentBalance = computed(() => authStore.userBalance)

// Methods
const getTypeIcon = (type: string) => {
  const icons = {
    'deposit': '💰',
    'withdrawal': '🏧',
    'game': '🎮',
    'bonus': '🎁'
  }
  return icons[type] || '📄'
}

const getStatusText = (status: string) => {
  const texts = {
    'completed': 'Concluído',
    'pending': 'Pendente',
    'failed': 'Falhou'
  }
  return texts[status] || status
}
</script>

<style scoped>
.transactions-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  color: var(--text-color);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 16px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.summary-card.income {
  border-left: 4px solid var(--primary-color);
}

.summary-card.expense {
  border-left: 4px solid #ff6b6b;
}

.summary-card.balance {
  border-left: 4px solid #4dabf7;
}

.card-icon {
  font-size: 32px;
  width: 50px;
  text-align: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-value {
  color: var(--text-color);
  font-size: 20px;
  font-weight: 700;
}

.card-label {
  color: var(--text-secondary);
  font-size: 14px;
}

.filters-section {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-input,
.filter-select {
  padding: 12px 15px;
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: var(--text-color);
  font-size: 20px;
  margin-bottom: 10px;
}

.empty-state p {
  color: var(--text-secondary);
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transaction-item {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.transaction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.transaction-icon {
  font-size: 32px;
  width: 50px;
  text-align: center;
}

.transaction-details {
  flex: 1;
}

.transaction-details h4 {
  color: var(--text-color);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.transaction-date {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.transaction-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.transaction-status.completed {
  background: rgba(38, 231, 2, 0.2);
  color: var(--primary-color);
}

.transaction-status.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.transaction-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.amount {
  font-weight: 700;
  font-size: 18px;
}

.amount.positive {
  color: var(--primary-color);
}

.amount.negative {
  color: #ff6b6b;
}

.method {
  color: var(--text-secondary);
  font-size: 12px;
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-section {
    flex-direction: column;
  }
  
  .search-input {
    max-width: none;
  }
  
  .transaction-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .transaction-amount {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .transactions-view {
    padding: 0 15px;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .summary-card {
    padding: 15px;
  }
  
  .transaction-item {
    padding: 15px;
  }
}
</style>