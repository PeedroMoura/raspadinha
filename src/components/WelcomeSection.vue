<script setup lang="ts">
const bonusAmount = "R$ 100,00"
</script>

<template>
  <section class="welcome-section">
    <div class="container">
      <div class="welcome-content">
        <div class="welcome-header">
          <div class="user-avatar">
            <svg width="86" height="86" viewBox="0 0 86 86" fill="none">
              <g clip-path="url(#clip0_224_551)">
                <path d="M60.7064 78.8742C73.9152 72.3423 83 58.7331 83 43C83 20.9086 65.0914 3 43 3C20.9086 3 3 20.9086 3 43C3 58.7331 12.0848 72.3423 25.2936 78.8742H60.7064Z" fill="#1DD882"/>
                <path d="M81.8085 33.2819L60.3872 11.8402L60.0416 11.5149L54.1946 34.3666L31.6071 11.7585L31.3427 11.5149L26.5188 55.9794L28.4365 57.8971L32.16 56.7482L49.9491 58.8861L60.706 78.8721C73.9147 72.3408 82.9999 58.733 82.9999 43C82.9999 39.648 82.5852 36.3933 81.8085 33.2819Z" fill="#0CAA5F"/>
              </g>
            </svg>
          </div>
          <div class="welcome-text">
            <h1>Bem vindo ao <span class="primary-text">inventario</span></h1>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/fc3a7339a3e010ceaa5397dacced1b4dcf9133ef?width=861" alt="Progress bar" class="progress-bar">
          </div>
        </div>
        <div class="promo-section">
          <div class="promo-input">
            <button class="promo-button">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M6.51467 12C6.51467 11.7348 6.40088 11.4804 6.19834 11.2929C5.9958 11.1054 5.7211 11 5.43467 11C5.14823 11 4.87353 11.1054 4.67099 11.2929C4.46845 11.4804 4.35467 11.7348 4.35467 12H0.754668C0.563712 12 0.380577 11.9298 0.245551 11.8047C0.110525 11.6797 0.034668 11.5101 0.034668 11.3333V0.666667C0.034668 0.489856 0.110525 0.320286 0.245551 0.195262C0.380577 0.0702379 0.563712 0 0.754668 0H4.35467C4.35467 0.265216 4.46845 0.519571 4.67099 0.707107C4.87353 0.894643 5.14823 1 5.43467 1C5.7211 1 5.9958 0.894643 6.19834 0.707107C6.40088 0.519571 6.51467 0.265216 6.51467 0H13.7147C13.9056 0 14.0888 0.0702379 14.2238 0.195262C14.3588 0.320286 14.4347 0.489856 14.4347 0.666667V4.33333C13.9573 4.33333 13.4994 4.50893 13.1619 4.82149C12.8243 5.13405 12.6347 5.55797 12.6347 6C12.6347 6.44203 12.8243 6.86595 13.1619 7.17851C13.4994 7.49107 13.9573 7.66667 14.4347 7.66667V11.3333C14.4347 11.5101 14.3588 11.6797 14.2238 11.8047C14.0888 11.9298 13.9056 12 13.7147 12H6.51467ZM5.43467 5C5.7211 5 5.9958 4.89464 6.19834 4.70711C6.40088 4.51957 6.51467 4.26522 6.51467 4C6.51467 3.73478 6.40088 3.48043 6.19834 3.29289C5.9958 3.10536 5.7211 3 5.43467 3C5.14823 3 4.87353 3.10536 4.67099 3.29289C4.46845 3.48043 4.35467 3.73478 4.35467 4C4.35467 4.26522 4.46845 4.51957 4.67099 4.70711C4.87353 4.89464 5.14823 5 5.43467 5ZM5.43467 9C5.7211 9 5.9958 8.89464 6.19834 8.70711C6.40088 8.51957 6.51467 8.26522 6.51467 8C6.51467 7.73478 6.40088 7.48043 6.19834 7.29289C5.9958 7.10536 5.7211 7 5.43467 7C5.14823 7 4.87353 7.10536 4.67099 7.29289C4.46845 7.48043 4.35467 7.73478 4.35467 8C4.35467 8.26522 4.46845 8.51957 4.67099 8.70711C4.87353 8.89464 5.14823 9 5.43467 9Z" fill="#181818"/>
              </svg>
              Insira o código promocional
            </button>
            <div class="bonus-info">
              <p class="bonus-label">Total do bónus solicitado:</p>
              <p class="bonus-amount">{{ bonusAmount }}</p>
            </div>
          </div>
          <img src="https://api.builder.io/api/v1/image/assets/TEMP/1ce833aa50ac6dea61d1dbb28de4142652c0e6a7?width=245" alt="Bonus illustration" class="bonus-illustration">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  background-color: var(--background-color);
  padding: 50px 0;
  border-radius: 14px;
  margin: 0 16px;
}

.welcome-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 50px;
  border-radius: 22px;
  border: 1px solid var(--box-border);
  background: linear-gradient(180deg, rgba(38, 38, 38, 0.4) 0%, rgba(38, 231, 2, 0.4) 298.42%);
}

.welcome-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  flex-shrink: 0;
}

.welcome-text h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.progress-bar {
  height: 42px;
  width: auto;
  max-width: 100%;
}

.promo-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
}

.promo-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.promo-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.bonus-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bonus-label {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.bonus-amount {
  color: var(--text-color);
  font-size: 22px;
  font-weight: 700;
}

.bonus-illustration {
  width: 122px;
  height: 122px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .welcome-content {
    padding: 20px 20px;
  }
  
  .welcome-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .promo-section {
    flex-direction: column;
    gap: 30px;
  }
  
  .bonus-illustration {
    width: 80px;
    height: 80px;
  }
}
</style>