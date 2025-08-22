<template>
  <div class="scratch-cards-view">
    <div class="page-header">
      <h1>🎫 Raspadinhas</h1>
      <p>Teste sua sorte e ganhe prêmios incríveis!</p>
    </div>

    <!-- Balance Display -->
    <div class="balance-section">
      <div class="balance-card">
        <span class="balance-label">Seu Saldo:</span>
        <span class="balance-value">{{ formatCurrency(userBalance) }}</span>
      </div>
      <router-link to="/transacoes" class="balance-link">
        Ver Histórico
      </router-link>
    </div>

    <!-- Scratch Cards Grid -->
    <div class="scratch-cards-grid">
      <div
        v-for="card in availableCards"
        :key="card.id"
        class="scratch-card"
        :class="{ 'can-afford': userBalance >= card.price, 'disabled': userBalance < card.price }"
        @click="selectCard(card)"
      >
        <div class="card-header">
          <h3>{{ card.name }}</h3>
          <span class="card-rarity" :class="card.rarity">{{ card.rarity }}</span>
        </div>
        
        <div class="card-image">
          <img :src="card.image" :alt="card.name" />
          <div class="card-overlay">
            <div class="play-icon">🎮</div>
          </div>
        </div>
        
        <div class="card-info">
          <div class="price-info">
            <span class="price">{{ formatCurrency(card.price) }}</span>
            <span class="max-prize">Prêmio máximo: {{ formatCurrency(card.maxPrize) }}</span>
          </div>
          <div class="odds-info">
            <span>Chance de ganhar: {{ card.winChance }}%</span>
          </div>
        </div>
        
        <button 
          :disabled="userBalance < card.price"
          class="play-button"
          @click.stop="playCard(card)"
        >
          {{ userBalance >= card.price ? 'Jogar' : 'Saldo Insuficiente' }}
        </button>
      </div>
    </div>

    <!-- Game Modal -->
    <div v-if="selectedCard && showGameModal" class="game-modal-overlay" @click="closeGameModal">
      <div class="game-modal" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedCard.name }}</h2>
          <button @click="closeGameModal" class="close-btn">×</button>
        </div>
        
        <div class="game-area">
          <div class="scratch-surface" ref="scratchSurface">
            <canvas
              ref="scratchCanvas"
              :width="canvasWidth"
              :height="canvasHeight"
              @mousedown="startScratch"
              @mousemove="scratch"
              @mouseup="endScratch"
              @touchstart="startScratch"
              @touchmove="scratch"
              @touchend="endScratch"
            ></canvas>
            
            <!-- Hidden result -->
            <div class="scratch-result" :class="{ revealed: scratchRevealed }">
              <div v-if="gameResult" class="result-content">
                <div class="result-icon">{{ gameResult.isWin ? '🎉' : '😔' }}</div>
                <h3>{{ gameResult.isWin ? 'PARABÉNS!' : 'Que pena!' }}</h3>
                <p v-if="gameResult.isWin">
                  Você ganhou {{ formatCurrency(gameResult.prize) }}!
                </p>
                <p v-else>
                  Tente novamente! A sorte pode estar te esperando.
                </p>
              </div>
            </div>
          </div>
          
          <div class="game-instructions">
            <p>Raspe a superfície para revelar o resultado!</p>
            <div class="scratch-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: scratchProgress + '%' }"></div>
              </div>
              <span>{{ Math.round(scratchProgress) }}% revelado</span>
            </div>
          </div>
        </div>
        
        <div v-if="gameResult && scratchRevealed" class="modal-footer">
          <button @click="closeGameModal" class="btn btn-secondary">
            Fechar
          </button>
          <button @click="playAgain" class="btn btn-primary">
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>

    <!-- Results History -->
    <div class="results-section">
      <h2>Seus Últimos Resultados</h2>
      <div v-if="recentResults.length === 0" class="no-results">
        <p>Nenhum jogo realizado ainda. Comece jogando uma raspadinha!</p>
      </div>
      <div v-else class="results-grid">
        <div
          v-for="result in recentResults"
          :key="result.id"
          class="result-card"
          :class="{ 'win': result.isWin }"
        >
          <div class="result-header">
            <span class="result-icon">{{ result.isWin ? '✅' : '❌' }}</span>
            <span class="result-date">{{ formatDate(result.date) }}</span>
          </div>
          <div class="result-body">
            <h4>{{ result.cardName }}</h4>
            <span class="result-amount" :class="{ 'win': result.isWin }">
              {{ result.isWin ? '+' : '-' }}{{ formatCurrency(result.amount) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFormatter } from '@/composables/useFormatter'

const authStore = useAuthStore()
const { formatCurrency, formatDate } = useFormatter()

// State
const selectedCard = ref(null)
const showGameModal = ref(false)
const scratchCanvas = ref(null)
const scratchSurface = ref(null)
const gameResult = ref(null)
const scratchRevealed = ref(false)
const scratchProgress = ref(0)
const isScratching = ref(false)

// Canvas dimensions
const canvasWidth = 400
const canvasHeight = 300

// Computed
const userBalance = computed(() => authStore.userBalance)

// Available cards data
const availableCards = ref([
  {
    id: 1,
    name: "Sorte Básica",
    price: 5.00,
    maxPrize: 100.00,
    winChance: 25,
    rarity: "common",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300"
  },
  {
    id: 2,
    name: "Fortuna Dourada",
    price: 15.00,
    maxPrize: 500.00,
    winChance: 20,
    rarity: "rare",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300"
  },
  {
    id: 3,
    name: "Tesouro Real",
    price: 50.00,
    maxPrize: 2000.00,
    winChance: 15,
    rarity: "epic",
    image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=300"
  },
  {
    id: 4,
    name: "Mega Jackpot",
    price: 100.00,
    maxPrize: 10000.00,
    winChance: 10,
    rarity: "legendary",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300"
  }
])

// Recent results
const recentResults = ref([])

// Methods
const selectCard = (card) => {
  if (userBalance.value >= card.price) {
    selectedCard.value = card
  }
}

const playCard = (card) => {
  if (userBalance.value < card.price) return
  
  selectedCard.value = card
  showGameModal.value = true
  scratchRevealed.value = false
  scratchProgress.value = 0
  
  // Generate game result
  const random = Math.random() * 100
  const isWin = random <= card.winChance
  
  gameResult.value = {
    isWin,
    prize: isWin ? Math.random() * card.maxPrize : 0,
    cardName: card.name,
    amount: card.price
  }
  
  // Initialize scratch canvas
  setTimeout(() => {
    initScratchCanvas()
  }, 100)
}

const initScratchCanvas = () => {
  if (!scratchCanvas.value) return
  
  const canvas = scratchCanvas.value
  const ctx = canvas.getContext('2d')
  
  // Fill canvas with scratch-off surface
  ctx.fillStyle = '#c0c0c0'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  
  // Add texture pattern
  ctx.fillStyle = '#a0a0a0'
  for (let i = 0; i < 100; i++) {
    ctx.fillRect(Math.random() * canvasWidth, Math.random() * canvasHeight, 2, 2)
  }
  
  // Add "RASPE AQUI" text
  ctx.fillStyle = '#666'
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('RASPE AQUI', canvasWidth / 2, canvasHeight / 2)
}

const startScratch = (e) => {
  isScratching.value = true
  e.preventDefault()
}

const scratch = (e) => {
  if (!isScratching.value || !scratchCanvas.value) return
  
  const canvas = scratchCanvas.value
  const ctx = canvas.getContext('2d')
  const rect = canvas.getBoundingClientRect()
  
  let x, y
  if (e.type.includes('touch')) {
    x = e.touches[0].clientX - rect.left
    y = e.touches[0].clientY - rect.top
  } else {
    x = e.clientX - rect.left
    y = e.clientY - rect.top
  }
  
  // Scale coordinates
  x = (x / rect.width) * canvasWidth
  y = (y / rect.height) * canvasHeight
  
  // Create scratch effect
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, 20, 0, 2 * Math.PI)
  ctx.fill()
  
  // Update scratch progress
  updateScratchProgress()
  
  e.preventDefault()
}

const endScratch = () => {
  isScratching.value = false
}

const updateScratchProgress = () => {
  if (!scratchCanvas.value) return
  
  const canvas = scratchCanvas.value
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  const pixels = imageData.data
  
  let transparentPixels = 0
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) transparentPixels++
  }
  
  const progress = (transparentPixels / (canvasWidth * canvasHeight)) * 100
  scratchProgress.value = progress
  
  // Auto-reveal if enough is scratched
  if (progress > 70 && !scratchRevealed.value) {
    scratchRevealed.value = true
    
    // Deduct balance and add result
    authStore.updateBalance(userBalance.value - selectedCard.value.price)
    if (gameResult.value.isWin) {
      authStore.updateBalance(userBalance.value + gameResult.value.prize)
    }
    
    // Add to recent results
    recentResults.value.unshift({
      id: Date.now(),
      ...gameResult.value,
      date: new Date()
    })
    
    // Keep only last 10 results
    if (recentResults.value.length > 10) {
      recentResults.value = recentResults.value.slice(0, 10)
    }
  }
}

const closeGameModal = () => {
  showGameModal.value = false
  selectedCard.value = null
  gameResult.value = null
}

const playAgain = () => {
  closeGameModal()
  setTimeout(() => {
    playCard(selectedCard.value)
  }, 300)
}

// Lifecycle
onMounted(() => {
  // Load recent results from localStorage
  const saved = localStorage.getItem('scratch_results')
  if (saved) {
    recentResults.value = JSON.parse(saved).map(result => ({
      ...result,
      date: new Date(result.date)
    }))
  }
})

onUnmounted(() => {
  // Save recent results to localStorage
  localStorage.setItem('scratch_results', JSON.stringify(recentResults.value))
})
</script>

<style scoped>
.scratch-cards-view {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Page Header */
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

/* Balance Section */
.balance-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 40px;
}

.balance-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.balance-label {
  color: var(--text-secondary);
  font-size: 14px;
}

.balance-value {
  color: var(--primary-color);
  font-size: 24px;
  font-weight: 700;
}

.balance-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.balance-link:hover {
  text-decoration: underline;
}

/* Cards Grid */
.scratch-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.scratch-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.scratch-card.can-afford:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(38, 231, 2, 0.2);
}

.scratch-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.card-header {
  padding: 20px 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  color: var(--text-color);
  font-size: 18px;
  font-weight: 600;
}

.card-rarity {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.card-rarity.common {
  background: rgba(155, 155, 155, 0.2);
  color: #9b9b9b;
}

.card-rarity.rare {
  background: rgba(38, 231, 2, 0.2);
  color: var(--primary-color);
}

.card-rarity.epic {
  background: rgba(138, 43, 226, 0.2);
  color: #8a2be2;
}

.card-rarity.legendary {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scratch-card.can-afford:hover .card-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 48px;
}

.card-info {
  padding: 20px;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.price {
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
}

.max-prize {
  color: var(--text-secondary);
  font-size: 12px;
}

.odds-info {
  color: var(--text-secondary);
  font-size: 14px;
}

.play-button {
  width: 100%;
  padding: 15px;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.play-button:hover:not(:disabled) {
  background: #20c002;
}

.play-button:disabled {
  background: var(--box-border);
  color: var(--text-secondary);
  cursor: not-allowed;
}

/* Game Modal */
.game-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.game-modal {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid var(--box-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  color: var(--text-color);
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--background-variant);
  color: var(--text-color);
}

.game-area {
  padding: 30px;
}

.scratch-surface {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 20px;
  border-radius: 12px;
  overflow: hidden;
}

.scratch-surface canvas {
  width: 100%;
  height: auto;
  display: block;
  cursor: crosshair;
}

.scratch-result {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color), #20c002);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 12px;
}

.scratch-result.revealed {
  opacity: 1;
}

.result-content {
  text-align: center;
  color: var(--background-color);
}

.result-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.result-content h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.result-content p {
  font-size: 16px;
  font-weight: 600;
}

.game-instructions {
  text-align: center;
  color: var(--text-secondary);
}

.scratch-progress {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--box-border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid var(--box-border);
  display: flex;
  gap: 15px;
}

.modal-footer .btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--primary-color);
  color: var(--background-color);
}

.btn-primary:hover {
  background: #20c002;
}

.btn-secondary {
  background: var(--background-variant);
  color: var(--text-color);
}

.btn-secondary:hover {
  background: #333;
}

/* Results Section */
.results-section {
  margin-top: 60px;
}

.results-section h2 {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.no-results {
  text-align: center;
  color: var(--text-secondary);
  padding: 40px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.result-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.result-card.win {
  border-color: var(--primary-color);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.result-icon {
  font-size: 20px;
}

.result-date {
  color: var(--text-secondary);
  font-size: 12px;
}

.result-body h4 {
  color: var(--text-color);
  font-size: 16px;
  margin-bottom: 8px;
}

.result-amount {
  font-size: 18px;
  font-weight: 700;
  color: var(--red-color);
}

.result-amount.win {
  color: var(--primary-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .scratch-cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .balance-section {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .game-area {
    padding: 20px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .scratch-cards-view {
    padding: 0 15px;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .balance-value {
    font-size: 20px;
  }
  
  .card-header {
    padding: 15px;
  }
  
  .card-info {
    padding: 15px;
  }
  
  .game-area {
    padding: 15px;
  }
}
</style>