<template>
  <div class="referrals-view">
    <div class="page-header">
      <h1>🎁 Indique e Ganhe</h1>
      <p>Convide seus amigos e ganhe recompensas incríveis por cada indicação!</p>
    </div>

    <!-- Referral Stats -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <span class="stat-value">{{ totalReferrals }}</span>
            <span class="stat-label">Amigos Indicados</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <span class="stat-value">{{ formatCurrency(totalEarnings) }}</span>
            <span class="stat-label">Total Ganho</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <span class="stat-value">{{ referralLevel }}</span>
            <span class="stat-label">Nível Atual</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <span class="stat-value">{{ activeReferrals }}</span>
            <span class="stat-label">Ativos Este Mês</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral Link Section -->
    <div class="referral-link-section">
      <div class="link-card">
        <h2>Seu Link de Indicação</h2>
        <p>Compartilhe este link com seus amigos para começar a ganhar!</p>
        
        <div class="link-container">
          <input
            ref="linkInput"
            :value="referralLink"
            readonly
            class="link-input"
          />
          <button @click="copyLink" class="copy-btn" :class="{ copied: linkCopied }">
            {{ linkCopied ? '✓ Copiado!' : '📋 Copiar' }}
          </button>
        </div>
        
        <div class="share-buttons">
          <button @click="shareWhatsApp" class="share-btn whatsapp">
            📱 WhatsApp
          </button>
          <button @click="shareTelegram" class="share-btn telegram">
            ✈️ Telegram
          </button>
          <button @click="shareEmail" class="share-btn email">
            📧 Email
          </button>
          <button @click="shareGeneric" class="share-btn generic">
            🔗 Compartilhar
          </button>
        </div>
      </div>
    </div>

    <!-- Rewards Program -->
    <div class="rewards-section">
      <h2>Programa de Recompensas</h2>
      <div class="rewards-grid">
        <div 
          v-for="reward in rewardTiers" 
          :key="reward.id"
          class="reward-card"
          :class="{ 
            'achieved': totalReferrals >= reward.required,
            'current': getCurrentTier() === reward.id 
          }"
        >
          <div class="reward-icon">{{ reward.icon }}</div>
          <h3>{{ reward.title }}</h3>
          <p class="reward-requirement">
            {{ reward.required }} {{ reward.required === 1 ? 'indicação' : 'indicações' }}
          </p>
          <div class="reward-benefits">
            <div class="benefit">
              <span class="benefit-value">{{ formatCurrency(reward.bonus) }}</span>
              <span class="benefit-label">Bônus por indicação</span>
            </div>
            <div v-if="reward.extraBonus" class="benefit">
              <span class="benefit-value">{{ formatCurrency(reward.extraBonus) }}</span>
              <span class="benefit-label">Bônus especial</span>
            </div>
          </div>
          <div class="reward-status">
            <span v-if="totalReferrals >= reward.required" class="status achieved">
              ✅ Conquistado
            </span>
            <span v-else class="status progress">
              {{ Math.max(0, reward.required - totalReferrals) }} restantes
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral History -->
    <div class="history-section">
      <h2>Histórico de Indicações</h2>
      
      <div v-if="referralHistory.length === 0" class="empty-history">
        <div class="empty-icon">📋</div>
        <h3>Nenhuma indicação ainda</h3>
        <p>Comece compartilhando seu link com amigos e familiares!</p>
      </div>
      
      <div v-else class="history-table">
        <div class="table-header">
          <span>Amigo</span>
          <span>Status</span>
          <span>Data</span>
          <span>Ganho</span>
        </div>
        
        <div 
          v-for="referral in referralHistory" 
          :key="referral.id"
          class="table-row"
        >
          <div class="referral-info">
            <div class="referral-avatar">
              {{ referral.name.charAt(0).toUpperCase() }}
            </div>
            <div class="referral-details">
              <span class="referral-name">{{ referral.name }}</span>
              <span class="referral-email">{{ maskEmail(referral.email) }}</span>
            </div>
          </div>
          
          <div class="referral-status">
            <span 
              class="status-badge" 
              :class="referral.status"
            >
              {{ getStatusText(referral.status) }}
            </span>
          </div>
          
          <div class="referral-date">
            {{ formatDate(referral.date) }}
          </div>
          
          <div class="referral-earnings">
            <span 
              class="earnings-amount"
              :class="{ 'positive': referral.earnings > 0 }"
            >
              {{ referral.earnings > 0 ? '+' : '' }}{{ formatCurrency(referral.earnings) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Perguntas Frequentes</h2>
      <div class="faq-list">
        <div 
          v-for="faq in faqs" 
          :key="faq.id"
          class="faq-item"
          :class="{ open: openFaq === faq.id }"
          @click="toggleFaq(faq.id)"
        >
          <div class="faq-question">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle">{{ openFaq === faq.id ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFormatter } from '@/composables/useFormatter'

const authStore = useAuthStore()
const { formatCurrency, formatDate } = useFormatter()

// State
const linkCopied = ref(false)
const openFaq = ref(null)
const linkInput = ref(null)

// Mock data - em produção viria de um store ou API
const totalReferrals = ref(5)
const totalEarnings = ref(250.00)
const activeReferrals = ref(3)

// Computed
const referralLevel = computed(() => {
  if (totalReferrals.value >= 50) return 'Diamante'
  if (totalReferrals.value >= 20) return 'Platina'
  if (totalReferrals.value >= 10) return 'Ouro'
  if (totalReferrals.value >= 5) return 'Prata'
  return 'Bronze'
})

const referralLink = computed(() => {
  const userId = authStore.user?.id || 'user123'
  return `https://raspagreen.com/join?ref=${userId}`
})

// Reward tiers data
const rewardTiers = [
  {
    id: 1,
    title: 'Bronze',
    required: 1,
    icon: '🥉',
    bonus: 10.00,
    extraBonus: null
  },
  {
    id: 2,
    title: 'Prata',
    required: 5,
    icon: '🥈',
    bonus: 15.00,
    extraBonus: 50.00
  },
  {
    id: 3,
    title: 'Ouro',
    required: 10,
    icon: '🥇',
    bonus: 20.00,
    extraBonus: 100.00
  },
  {
    id: 4,
    title: 'Platina',
    required: 20,
    icon: '💎',
    bonus: 25.00,
    extraBonus: 200.00
  },
  {
    id: 5,
    title: 'Diamante',
    required: 50,
    icon: '👑',
    bonus: 30.00,
    extraBonus: 500.00
  }
]

// Referral history mock data
const referralHistory = ref([
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    status: 'active',
    date: new Date('2024-01-15'),
    earnings: 15.00
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    status: 'pending',
    date: new Date('2024-01-10'),
    earnings: 0
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    status: 'active',
    date: new Date('2024-01-05'),
    earnings: 15.00
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana@email.com',
    status: 'active',
    date: new Date('2023-12-28'),
    earnings: 10.00
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos@email.com',
    status: 'inactive',
    date: new Date('2023-12-20'),
    earnings: 10.00
  }
])

// FAQ data
const faqs = [
  {
    id: 1,
    question: 'Como funciona o programa de indicações?',
    answer: 'Você ganha uma recompensa toda vez que um amigo se cadastra usando seu link e faz sua primeira compra. O valor varia conforme seu nível no programa.'
  },
  {
    id: 2,
    question: 'Quando recebo o pagamento das indicações?',
    answer: 'Os ganhos são creditados automaticamente na sua conta assim que seu amigo completa sua primeira transação e ela é confirmada.'
  },
  {
    id: 3,
    question: 'Existe limite de indicações?',
    answer: 'Não há limite! Você pode indicar quantos amigos quiser e ganhar com todas as indicações ativas.'
  },
  {
    id: 4,
    question: 'Como subir de nível no programa?',
    answer: 'Seu nível aumenta automaticamente conforme o número de indicações bem-sucedidas. Cada nível oferece recompensas maiores por indicação.'
  },
  {
    id: 5,
    question: 'Posso indicar a mesma pessoa mais de uma vez?',
    answer: 'Não, cada pessoa pode ser indicada apenas uma vez. O sistema identifica indicações duplicadas automaticamente.'
  }
]

// Methods
const getCurrentTier = () => {
  for (let i = rewardTiers.length - 1; i >= 0; i--) {
    if (totalReferrals.value >= rewardTiers[i].required) {
      return rewardTiers[i].id
    }
  }
  return 1
}

const copyLink = async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(referralLink.value)
    } else {
      // Fallback for older browsers
      linkInput.value?.select()
      document.execCommand('copy')
    }
    
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}

const shareWhatsApp = () => {
  const message = `Oi! Acabei de descobrir a RaspaGreen, uma plataforma incrível de raspadinhas online! 🎫✨

Use meu link especial para se cadastrar: ${referralLink.value}

Você vai adorar! 😄`
  
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

const shareTelegram = () => {
  const message = `🎉 Venha jogar na RaspaGreen comigo!

Use meu link especial: ${referralLink.value}

🎫 Raspadinhas online incríveis te esperando!`
  
  const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink.value)}&text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

const shareEmail = () => {
  const subject = '🎫 Convite especial para RaspaGreen'
  const body = `Olá!

Quero te convidar para conhecer a RaspaGreen, uma plataforma incrível de raspadinhas online!

Use meu link especial para se cadastrar: ${referralLink.value}

É muito divertido e você pode ganhar prêmios incríveis!

Abraços! 😊`
  
  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(url)
}

const shareGeneric = () => {
  if (navigator.share) {
    navigator.share({
      title: 'RaspaGreen - Raspadinhas Online',
      text: 'Venha jogar raspadinhas online comigo na RaspaGreen!',
      url: referralLink.value
    })
  } else {
    copyLink()
  }
}

const maskEmail = (email: string) => {
  const [username, domain] = email.split('@')
  const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2)
  return `${maskedUsername}@${domain}`
}

const getStatusText = (status: string) => {
  const statusMap = {
    'active': 'Ativo',
    'pending': 'Pendente',
    'inactive': 'Inativo'
  }
  return statusMap[status] || status
}

const toggleFaq = (id: number) => {
  openFaq.value = openFaq.value === id ? null : id
}
</script>

<style scoped>
.referrals-view {
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 36px;
  width: 60px;
  height: 60px;
  background: var(--background-variant);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-value {
  color: var(--primary-color);
  font-size: 24px;
  font-weight: 700;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 14px;
}

/* Referral Link Section */
.referral-link-section {
  margin-bottom: 50px;
}

.link-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
}

.link-card h2 {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.link-card > p {
  color: var(--text-secondary);
  margin-bottom: 25px;
}

.link-container {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.link-input {
  flex: 1;
  padding: 12px 15px;
  background: var(--background-variant);
  border: 1px solid var(--box-border);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
  font-family: monospace;
}

.copy-btn {
  padding: 12px 20px;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background: #20c002;
}

.copy-btn.copied {
  background: #00a000;
}

.share-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.share-btn {
  padding: 12px 20px;
  border: 1px solid var(--box-border);
  border-radius: 8px;
  background: var(--background-variant);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.share-btn.whatsapp:hover {
  border-color: #25d366;
  background: rgba(37, 211, 102, 0.1);
}

.share-btn.telegram:hover {
  border-color: #0088cc;
  background: rgba(0, 136, 204, 0.1);
}

.share-btn.email:hover {
  border-color: #ea4335;
  background: rgba(234, 67, 53, 0.1);
}

/* Rewards Section */
.rewards-section {
  margin-bottom: 50px;
}

.rewards-section h2 {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.reward-card {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 16px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.reward-card.achieved {
  border-color: var(--primary-color);
  background: rgba(38, 231, 2, 0.05);
}

.reward-card.current {
  transform: scale(1.05);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(38, 231, 2, 0.2);
}

.reward-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.reward-card h3 {
  color: var(--text-color);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.reward-requirement {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.reward-benefits {
  margin-bottom: 20px;
}

.benefit {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 15px;
}

.benefit-value {
  color: var(--primary-color);
  font-size: 18px;
  font-weight: 700;
}

.benefit-label {
  color: var(--text-secondary);
  font-size: 12px;
}

.reward-status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status.achieved {
  background: rgba(38, 231, 2, 0.2);
  color: var(--primary-color);
}

.status.progress {
  background: var(--background-variant);
  color: var(--text-secondary);
}

/* History Section */
.history-section {
  margin-bottom: 50px;
}

.history-section h2 {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.empty-history {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-history h3 {
  color: var(--text-color);
  font-size: 20px;
  margin-bottom: 10px;
}

.history-table {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
  background: var(--background-variant);
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
  border-top: 1px solid var(--box-border);
  align-items: center;
}

.referral-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.referral-avatar {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: var(--background-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.referral-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.referral-name {
  color: var(--text-color);
  font-weight: 600;
  font-size: 14px;
}

.referral-email {
  color: var(--text-secondary);
  font-size: 12px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: rgba(38, 231, 2, 0.2);
  color: var(--primary-color);
}

.status-badge.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.status-badge.inactive {
  background: rgba(108, 117, 125, 0.2);
  color: #6c757d;
}

.referral-date {
  color: var(--text-secondary);
  font-size: 14px;
}

.earnings-amount {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-secondary);
}

.earnings-amount.positive {
  color: var(--primary-color);
}

/* FAQ Section */
.faq-section {
  margin-bottom: 50px;
}

.faq-section h2 {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--box-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: var(--primary-color);
}

.faq-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  font-weight: 600;
}

.faq-toggle {
  font-size: 20px;
  color: var(--primary-color);
  font-weight: 700;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.open .faq-answer {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 20px 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .link-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .share-buttons {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .rewards-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 15px;
    text-align: left;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row {
    padding: 15px;
  }
  
  .referral-info {
    grid-column: 1 / -1;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .referrals-view {
    padding: 0 15px;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .stat-card {
    padding: 20px;
    flex-direction: column;
    text-align: center;
  }
  
  .stat-icon {
    margin-bottom: 10px;
  }
  
  .link-card {
    padding: 20px;
  }
  
  .share-buttons {
    grid-template-columns: 1fr;
  }
  
  .reward-card {
    padding: 20px;
  }
}
</style>