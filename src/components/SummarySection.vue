<script setup lang="ts">
interface SummaryItem {
  title: string
  amount: string
}

defineProps<{
  items: SummaryItem[]
}>()
</script>

<template>
  <section class="summary-section">
    <div class="container">
      <div class="summary-grid">
        <div v-for="(item, index) in items" :key="index" class="summary-card">
          <div class="summary-content">
            <div class="summary-text">
              <h3 class="summary-title">{{ item.title }}</h3>
              <p class="summary-amount">
                <span class="primary-text">R$</span>{{ item.amount.replace('R$', '') }}
              </p>
            </div>
            <div class="summary-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M0 12.8C0 8.31958 0 6.07937 0.871948 4.36808C1.63893 2.86278 2.86278 1.63893 4.36808 0.871948C6.07937 0 8.31958 0 12.8 0H27.2C31.6804 0 33.9206 0 35.6319 0.871948C37.1372 1.63893 38.3611 2.86278 39.128 4.36808C40 6.07937 40 8.31958 40 12.8V27.2C40 31.6804 40 33.9206 39.128 35.6319C38.3611 37.1372 37.1372 38.3611 35.6319 39.128C33.9206 40 31.6804 40 27.2 40H12.8C8.31958 40 6.07937 40 4.36808 39.128C2.86278 38.3611 1.63893 37.1372 0.871948 35.6319C0 33.9206 0 31.6804 0 27.2V12.8Z" fill="#262626"/>
                <path d="M19.4 25C19.4 24.779 19.3052 24.567 19.1364 24.4107C18.9676 24.2545 18.7387 24.1667 18.5 24.1667C18.2613 24.1667 18.0324 24.2545 17.8636 24.4107C17.6948 24.567 17.6 24.779 17.6 25H14.6C14.4409 25 14.2883 24.9415 14.1757 24.8373C14.0632 24.7331 14 24.5918 14 24.4444V15.5556C14 15.4082 14.0632 15.2669 14.1757 15.1627C14.2883 15.0585 14.4409 15 14.6 15H17.6C17.6 15.221 17.6948 15.433 17.8636 15.5893C18.0324 15.7455 18.2613 15.8333 18.5 15.8333C18.7387 15.8333 18.9676 15.7455 19.1364 15.5893C19.3052 15.433 19.4 15.221 19.4 15H25.4C25.5591 15 25.7117 15.0585 25.8243 15.1627C25.9368 15.2669 26 15.4082 26 15.5556V18.6111C25.6022 18.6111 25.2206 18.7574 24.9393 19.0179C24.658 19.2784 24.5 19.6316 24.5 20C24.5 20.3684 24.658 20.7216 24.9393 20.9821C25.2206 21.2426 25.6022 21.3889 26 21.3889V24.4444C26 24.5918 25.9368 24.7331 25.8243 24.8373C25.7117 24.9415 25.5591 25 25.4 25H19.4ZM18.5 19.1667C18.7387 19.1667 18.9676 19.0789 19.1364 18.9226C19.3052 18.7663 19.4 18.5543 19.4 18.3333C19.4 18.1123 19.3052 17.9004 19.1364 17.7441C18.9676 17.5878 18.7387 17.5 18.5 17.5C18.2613 17.5 18.0324 17.5878 17.8636 17.7441C17.6948 17.9004 17.6 18.1123 17.6 18.3333C17.6 18.5543 17.6948 18.7663 17.8636 18.9226C18.0324 19.0789 18.2613 19.1667 18.5 19.1667ZM18.5 22.5C18.7387 22.5 18.9676 22.4122 19.1364 22.2559C19.3052 22.0996 19.4 21.8877 19.4 21.6667C19.4 21.4457 19.3052 21.2337 19.1364 21.0774C18.9676 20.9211 18.7387 20.8333 18.5 20.8333C18.2613 20.8333 18.0324 20.9211 17.8636 21.0774C17.6948 21.2337 17.6 21.4457 17.6 21.6667C17.6 21.8877 17.6948 22.0996 17.8636 22.2559C18.0324 22.4122 18.2613 22.5 18.5 22.5Z" fill="#26E702"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary-section {
  padding: 20px 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
}

.summary-card {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--box-border);
  background-color: var(--background-color);
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-title {
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.summary-amount {
  color: var(--text-color);
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.summary-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--box-color);
  border-radius: 8px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .summary-card {
    padding: 15px;
  }
  
  .summary-amount {
    font-size: 24px;
  }
}
</style>