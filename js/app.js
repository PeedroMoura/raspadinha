const { createApp } = Vue;

// Header Component
const HeaderComponent = {
  template: `
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="header-left">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/37b9bd37ddf58d3ff13c5cd45a33255e36637ea5?width=228" alt="RaspaGreen Logo" class="logo">
            <nav class="header-nav">
              <a href="#" class="nav-link">Inicio</a>
              <a href="#" class="nav-link">Raspadinhas</a>
              <a href="#" class="nav-link">Indique e Ganhe</a>
              <a href="#" class="nav-link active">
                <span>Inventario</span>
                <div class="icon-badge">
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
              </a>
            </nav>
          </div>
          <div class="header-right">
            <div class="balance-container">
              <div class="balance-display">
                <span>R$ 1598,50</span>
                <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                  <path d="M1.17137 0.767679C1.34054 0.596284 1.56997 0.5 1.80919 0.5C2.04841 0.5 2.27783 0.596284 2.44701 0.767679L6.91267 5.2932L11.3783 0.767679C11.5485 0.601142 11.7764 0.508991 12.0129 0.511074C12.2495 0.513157 12.4757 0.609307 12.643 0.778816C12.8103 0.948325 12.9051 1.17763 12.9072 1.41734C12.9092 1.65705 12.8183 1.888 12.654 2.06042L7.5505 7.23232C7.38132 7.40372 7.15189 7.5 6.91267 7.5C6.67345 7.5 6.44403 7.40372 6.27485 7.23232L1.17137 2.06042C1.00224 1.88898 0.907227 1.65648 0.907227 1.41405C0.907227 1.17163 1.00224 0.939126 1.17137 0.767679Z" fill="#858585"/>
                </svg>
              </div>
              <button class="btn btn-primary">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M5.4 9.6V6.6M5.4 6.6V3.6M5.4 6.6H2.4M5.4 6.6H8.4" stroke="#181818" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Depositar
              </button>
              <button class="btn btn-primary">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M5.4 9.6V6.6M5.4 6.6V3.6M5.4 6.6H2.4M5.4 6.6H8.4" stroke="#181818" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Sacar
              </button>
            </div>
            <div class="profile-container">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/f4227df4e4dd66d638c093a3e4819b4a7ac033e1?width=38" alt="Profile" class="profile-avatar">
              <span class="profile-name">Pedro N...</span>
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                <path d="M1.17137 0.767679C1.34054 0.596284 1.56997 0.5 1.80919 0.5C2.04841 0.5 2.27783 0.596284 2.44701 0.767679L6.91267 5.2932L11.3783 0.767679C11.5485 0.601142 11.7764 0.508991 12.0129 0.511074C12.2495 0.513157 12.4757 0.609307 12.643 0.778816C12.8103 0.948325 12.9051 1.17763 12.9072 1.41734C12.9092 1.65705 12.8183 1.888 12.654 2.06042L7.5505 7.23232C7.38132 7.40372 7.15189 7.5 6.91267 7.5C6.67345 7.5 6.44403 7.40372 6.27485 7.23232L1.17137 2.06042C1.00224 1.88898 0.907227 1.65648 0.907227 1.41405C0.907227 1.17163 1.00224 0.939126 1.17137 0.767679Z" fill="#858585"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: `
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
      }
      
      .balance-container {
        flex-wrap: wrap;
        gap: 10px;
      }
    }
    </style>
  `
};

// Welcome Section Component
const WelcomeSection = {
  template: `
    <section class="welcome-section">
      <div class="container">
        <div class="welcome-content">
          <div class="welcome-header">
            <div class="user-avatar">
              <svg width="86" height="86" viewBox="0 0 86 86" fill="none">
                <g clip-path="url(#clip0_224_551)">
                  <path d="M60.7064 78.8742C73.9152 72.3423 83 58.7331 83 43C83 20.9086 65.0914 3 43 3C20.9086 3 3 20.9086 3 43C3 58.7331 12.0848 72.3423 25.2936 78.8742H60.7064Z" fill="#1DD882"/>
                  <path d="M81.8085 33.2819L60.3872 11.8402L60.0416 11.5149L54.1946 34.3666L31.6071 11.7585L31.3427 11.5149L26.5188 55.9794L28.4365 57.8971L32.16 56.7482L49.9491 58.8861L60.706 78.8721C73.9147 72.3408 82.9999 58.733 82.9999 43C82.9999 39.648 82.5852 36.3933 81.8085 33.2819Z" fill="#0CAA5F"/>
                  <path d="M34.9654 24.4096C34.9654 33.7427 32.1381 44.2536 28.6504 44.2536C25.1628 44.2536 22.3354 33.7427 22.3354 24.4096C22.3354 15.0764 25.1628 10.4552 28.6504 10.4552C32.1381 10.4552 34.9654 15.0764 34.9654 24.4096Z" fill="#E9EDF5"/>
                  <path d="M51.0344 24.4096C51.0344 33.7427 53.8618 44.2536 57.3494 44.2536C60.8371 44.2536 63.6644 33.7427 63.6644 24.4096C63.6644 15.0764 60.8371 10.4552 57.3494 10.4552C53.8618 10.4554 51.0344 15.0764 51.0344 24.4096Z" fill="#CDD2E1"/>
                  <path d="M31.7967 75.4288C31.7967 69.2414 36.8126 64.2255 43 64.2255C49.1873 64.2255 54.2033 69.2414 54.2033 75.4288V81.4069C56.449 80.7538 58.6326 79.9037 60.7287 78.8664L57.072 54.4614H28.928L25.2712 78.8664C27.3674 79.9037 29.551 80.7538 31.7967 81.4069V75.4288Z" fill="#E9EDF5"/>
                  <path d="M62.6158 47.8713C62.6158 57.4091 53.8335 60.9194 43.0001 60.9194C32.1666 60.9194 23.3843 57.4091 23.3843 47.8713C23.3843 38.3335 32.1666 27.3397 43.0001 27.3397C53.8335 27.3397 62.6158 38.3336 62.6158 47.8713Z" fill="white"/>
                </g>
                <path d="M43 1.5C65.9198 1.5 84.5 20.0802 84.5 43C84.5 65.9198 65.9198 84.5 43 84.5C20.0802 84.5 1.5 65.9198 1.5 43C1.5 20.0802 20.0802 1.5 43 1.5Z" stroke="url(#paint0_linear_224_551)" stroke-width="3"/>
                <defs>
                  <linearGradient id="paint0_linear_224_551" x1="43" y1="3" x2="43" y2="83" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#009447"/>
                    <stop offset="1" stop-color="#054222"/>
                  </linearGradient>
                  <clipPath id="clip0_224_551">
                    <path d="M3 43C3 20.9086 20.9086 3 43 3C65.0914 3 83 20.9086 83 43C83 65.0914 65.0914 83 43 83C20.9086 83 3 65.0914 3 43Z" fill="white"/>
                  </clipPath>
                </defs>
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
                <p class="bonus-amount">R$ 100,00</p>
              </div>
            </div>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/1ce833aa50ac6dea61d1dbb28de4142652c0e6a7?width=245" alt="Bonus illustration" class="bonus-illustration">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
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
  `
};

// Summary Cards Component
const SummaryCards = {
  data() {
    return {
      summaryItems: [
        { title: "Montante em Prêmios", amount: "R$ 100,00" },
        { title: "Saldo total", amount: "R$ 100,00" },
        { title: "Saldo total", amount: "R$ 100,00" },
        { title: "Saldo total", amount: "R$ 100,00" }
      ]
    }
  },
  template: `
    <section class="summary-section">
      <div class="container">
        <div class="summary-grid">
          <div v-for="(item, index) in summaryItems" :key="index" class="summary-card">
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
  `,
  styles: `
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
  `
};

// Main Inventory App Component
const InventoryApp = {
  components: {
    HeaderComponent,
    WelcomeSection,
    SummaryCards,
    InventoryItems,
    FooterComponent
  },
  template: `
    <div class="inventory-app">
      <HeaderComponent />
      <main class="main-content">
        <WelcomeSection />
        <SummaryCards />
        <InventoryItems />
      </main>
      <FooterComponent />
    </div>
  `,
  styles: `
    <style scoped>
    .inventory-app {
      min-height: 100vh;
      background-color: var(--background-variant);
    }

    .main-content {
      padding: 60px 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 60px;
    }
    </style>
  `
};

// Create and mount the Vue app
createApp({
  components: {
    InventoryApp
  }
}).mount('#app');
