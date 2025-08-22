<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore, useFinancialStore } from '@/stores'
import { useFormatter } from '@/composables/useFormatter'
import { NAV_ITEMS } from '@/constants'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const financialStore = useFinancialStore()
const { formatCurrency } = useFormatter()

// Profile menu state
const showProfileMenu = ref(false)

// Computed properties
const user = computed(() => authStore.user)
const balance = computed(() => formatCurrency(authStore.userBalance))
const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)

const navigationItems = computed(() => {
  return NAV_ITEMS.map(item => ({
    ...item,
    active: route.path === item.path || (item.path === '/' && route.name === 'home')
  }))
})

// Methods
const handleDeposit = () => {
  // TODO: Open deposit modal or navigate to deposit page
  console.log('Deposit clicked')
}

const handleWithdrawal = () => {
  // TODO: Open withdrawal modal or navigate to withdrawal page
  console.log('Withdrawal clicked')
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const navigateTo = (path: string) => {
  showProfileMenu.value = false
  router.push(path)
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const closeProfileMenu = () => {
  showProfileMenu.value = false
}

// Click outside to close profile menu
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const profileContainer = target.closest('.profile-container')
  if (!profileContainer && showProfileMenu.value) {
    closeProfileMenu()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <div class="header-left">
          <router-link to="/" class="logo-link">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/37b9bd37ddf58d3ff13c5cd45a33255e36637ea5?width=228" alt="RaspaGreen Logo" class="logo">
          </router-link>
          <nav class="header-nav">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="nav-link"
              :class="{ active: item.active }"
            >
              <span>{{ item.name }}</span>
              <div v-if="item.path === '/inventario'" class="icon-badge">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <rect x="0.907227" width="20" height="20" rx="4" fill="url(#paint0_linear_224_491)" fill-opacity="0.2"/>
                  <path d="M10.4073 11.0001V15H8.4074C8.00958 15 7.62806 14.842 7.34677 14.5607C7.06547 14.2794 6.90744 13.8979 6.90744 13.5V11.5001C6.90744 11.3675 6.96012 11.2403 7.05388 11.1466C7.14765 11.0528 7.27482 11.0001 7.40743 11.0001H10.4073ZM14.4072 11.0001C14.5398 11.0001 14.667 11.0528 14.7608 11.1466C14.8545 11.2403 14.9072 11.3675 14.9072 11.5001V13.5C14.9072 13.8979 14.7492 14.2794 14.4679 14.5607C14.1866 14.842 13.8051 15 13.4072 15H11.4073V11.0001H14.4072ZM13.1573 5.00029C13.4525 5.00023 13.743 5.07487 14.0016 5.21727C14.2602 5.35967 14.4787 5.56519 14.6365 5.8147C14.7943 6.06422 14.8865 6.34961 14.9044 6.64432C14.9222 6.93902 14.8652 7.23346 14.7387 7.50022H14.9072C15.1724 7.50022 15.4268 7.60557 15.6143 7.7931C15.8018 7.98064 15.9072 8.23498 15.9072 8.50019V9.00018C15.9072 9.26538 15.8018 9.51973 15.6143 9.70726C15.4268 9.89479 15.1724 10.0001 14.9072 10.0001H11.4073V7.50022H10.4073V10.0001H6.90744C6.64223 10.0001 6.38789 9.89479 6.20036 9.70726C6.01282 9.51973 5.90747 9.26538 5.90747 9.00018V8.50019C5.90747 8.23498 6.01282 7.98064 6.20036 7.7931C6.38789 7.60557 6.64223 7.50022 6.90744 7.50022H7.07594C6.96488 7.2658 6.90733 7.00963 6.90744 6.75024C6.90744 5.78377 7.69092 5.00029 8.64889 5.00029C9.52636 4.98529 10.3048 5.54628 10.8393 6.46725L10.9073 6.58875C11.4238 5.63177 12.1873 5.03179 13.0528 5.00129L13.1573 5.00029ZM8.65739 6.00026C8.45848 6.00026 8.26772 6.07928 8.12707 6.21993C7.98643 6.36058 7.90741 6.55134 7.90741 6.75024C7.90741 6.94915 7.98643 7.13991 8.12707 7.28056C8.26772 7.4212 8.45848 7.50022 8.65739 7.50022H10.2288C9.85835 6.54775 9.25437 5.99026 8.65739 6.00026ZM13.1488 6.00026C12.5588 5.99026 11.9563 6.54825 11.5858 7.50022H13.1573C13.3562 7.49909 13.5465 7.419 13.6863 7.27755C13.8262 7.13611 13.9041 6.9449 13.903 6.74599C13.9019 6.54709 13.8218 6.35677 13.6803 6.21692C13.5389 6.07707 13.3477 5.99914 13.1488 6.00026Z" fill="#26E702"/>
                  <defs>
                    <linearGradient id="paint0_linear_224_491" x1="10.9072" y1="0" x2="10.9072" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#26E702"/>
                      <stop offset="0.302629" stop-color="#1C8608"/>
                      <stop offset="0.500774" stop-color="#0F6000"/>
                      <stop offset="0.697611" stop-color="#1C8608"/>
                      <stop offset="1" stop-color="#26E702"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </router-link>
          </nav>
        </div>
        <div class="header-right">
          <div class="balance-container">
            <div class="balance-display">
              <span>{{ balance }}</span>
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                <path d="M1.17137 0.767679C1.34054 0.596284 1.56997 0.5 1.80919 0.5C2.04841 0.5 2.27783 0.596284 2.44701 0.767679L6.91267 5.2932L11.3783 0.767679C11.5485 0.601142 11.7764 0.508991 12.0129 0.511074C12.2495 0.513157 12.4757 0.609307 12.643 0.778816C12.8103 0.948325 12.9051 1.17763 12.9072 1.41734C12.9092 1.65705 12.8183 1.888 12.654 2.06042L7.5505 7.23232C7.38132 7.40372 7.15189 7.5 6.91267 7.5C6.67345 7.5 6.44403 7.40372 6.27485 7.23232L1.17137 2.06042C1.00224 1.88898 0.907227 1.65648 0.907227 1.41405C0.907227 1.17163 1.00224 0.939126 1.17137 0.767679Z" fill="#858585"/>
              </svg>
            </div>
            <button class="btn btn-primary" @click="handleDeposit">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.4 9.6V6.6M5.4 6.6V3.6M5.4 6.6H2.4M5.4 6.6H8.4" stroke="#181818" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Depositar
            </button>
            <button class="btn btn-primary" @click="handleWithdrawal">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.4 3.6V6.6M5.4 6.6V9.6M5.4 6.6H8.4M5.4 6.6H2.4" stroke="#181818" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Sacar
            </button>
          </div>
          <div class="profile-container" v-if="user">
            <div class="profile-dropdown" @click="toggleProfileMenu">
              <img 
                :src="userAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=38'" 
                :alt="userName" 
                class="profile-avatar"
              />
              <span class="profile-name">{{ userName.split(' ')[0] }}...</span>
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                <path d="M1.17137 0.767679C1.34054 0.596284 1.56997 0.5 1.80919 0.5C2.04841 0.5 2.27783 0.596284 2.44701 0.767679L6.91267 5.2932L11.3783 0.767679C11.5485 0.601142 11.7764 0.508991 12.0129 0.511074C12.2495 0.513157 12.4757 0.609307 12.643 0.778816C12.8103 0.948325 12.9051 1.17763 12.9072 1.41734C12.9092 1.65705 12.8183 1.888 12.654 2.06042L7.5505 7.23232C7.38132 7.40372 7.15189 7.5 6.91267 7.5C6.67345 7.5 6.44403 7.40372 6.27485 7.23232L1.17137 2.06042C1.00224 1.88898 0.907227 1.65648 0.907227 1.41405C0.907227 1.17163 1.00224 0.939126 1.17137 0.767679Z" fill="#858585"/>
              </svg>
              
              <!-- Profile Dropdown Menu -->
              <div v-if="showProfileMenu" class="profile-menu">
                <div class="profile-menu-header">
                  <img 
                    :src="userAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60'" 
                    :alt="userName" 
                    class="profile-menu-avatar"
                  />
                  <div class="profile-menu-info">
                    <span class="profile-menu-name">{{ userName }}</span>
                    <span class="profile-menu-email">{{ user.email }}</span>
                  </div>
                </div>
                
                <div class="profile-menu-divider"></div>
                
                <div class="profile-menu-items">
                  <button @click="navigateTo('/transacoes')" class="profile-menu-item">
                    📊 Minhas Transações
                  </button>
                  <button @click="navigateTo('/indicacoes')" class="profile-menu-item">
                    🎁 Indicações
                  </button>
                  <button class="profile-menu-item">
                    ⚙️ Configurações
                  </button>
                  <button class="profile-menu-item">
                    ❓ Ajuda
                  </button>
                </div>
                
                <div class="profile-menu-divider"></div>
                
                <button @click="handleLogout" class="profile-menu-item logout">
                  🚪 Sair
                </button>
              </div>
            </div>
          </div>
          
          <!-- Login button if not authenticated -->
          <div v-else class="auth-buttons">
            <router-link to="/login" class="btn btn-secondary">
              Entrar
            </router-link>
            <router-link to="/registro" class="btn btn-primary">
              Cadastrar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--background-variant);
  padding: 20px 0;
  border-bottom: 1px solid var(--box-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  height: 38px;
  width: auto;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-color);
}

.nav-link.active {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 18px;
}

.icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(38, 231, 2, 0.2) 0%, rgba(15, 96, 0, 0.2) 100%);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.balance-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.balance-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background-color: var(--box-color);
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.profile-name {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .header-nav {
    gap: 20px;
  }
  
  .nav-link {
    font-size: 14px;
  }
  
  .nav-link.active {
    font-size: 16px;
  }
}

/* Profile dropdown styles */
.profile-dropdown {
  position: relative;
  cursor: pointer;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 280px;
  background: var(--background-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
}

.profile-menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--box-color);
}

.profile-menu-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-menu-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-menu-name {
  color: var(--text-color);
  font-size: 16px;
  font-weight: 600;
}

.profile-menu-email {
  color: var(--text-secondary);
  font-size: 14px;
}

.profile-menu-divider {
  height: 1px;
  background: var(--box-border);
}

.profile-menu-items {
  padding: 10px 0;
}

.profile-menu-item {
  width: 100%;
  padding: 12px 20px;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-menu-item:hover {
  background: var(--box-color);
}

.profile-menu-item.logout {
  color: var(--red-color);
  margin: 0;
}

.profile-menu-item.logout:hover {
  background: rgba(255, 59, 51, 0.1);
}

/* Auth buttons */
.auth-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Logo link */
.logo-link {
  display: flex;
  align-items: center;
}

/* Router link active states */
.nav-link.router-link-active {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 18px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .header-nav {
    gap: 20px;
  }
  
  .nav-link {
    font-size: 14px;
  }
  
  .nav-link.active {
    font-size: 16px;
  }
  
  .profile-menu {
    width: 260px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .header-left {
    flex-direction: column;
    gap: 20px;
  }
  
  .header-nav {
    gap: 15px;
    justify-content: center;
  }
  
  .balance-container {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  
  .profile-menu {
    right: -20px;
    width: 250px;
  }
  
  .auth-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-nav {
    display: none; /* Hide nav on very small screens */
  }
  
  .balance-container {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  
  .profile-menu {
    right: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
    max-width: 280px;
  }
}
</style>