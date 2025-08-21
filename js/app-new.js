const { createApp } = Vue;

// Create the complete Vue application with all components
createApp({
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      items: [
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
      ],
      summaryItems: [
        { title: "Montante em Prêmios", amount: "R$ 100,00" },
        { title: "Saldo total", amount: "R$ 100,00" },
        { title: "Saldo total", amount: "R$ 100,00" },
        { title: "Saldo total", amount: "R$ 100,00" }
      ]
    }
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) return this.items.slice(0, 9);
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).slice(0, 9);
    }
  },
  template: `
    <div class="inventory-app">
      <!-- Header -->
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

      <!-- Main Content -->
      <main class="main-content">
        <!-- Welcome Section -->
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
                    <p class="bonus-amount">R$ 100,00</p>
                  </div>
                </div>
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/1ce833aa50ac6dea61d1dbb28de4142652c0e6a7?width=245" alt="Bonus illustration" class="bonus-illustration">
              </div>
            </div>
          </div>
        </section>

        <!-- Summary Cards -->
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

        <!-- Inventory Content - This is the main layout from Figma -->
        <section class="inventory-section">
          <div class="container">
            <div class="inventory-wrapper">
              <!-- Left side: Items Grid -->
              <div class="inventory-main">
                <div class="inventory-header">
                  <div class="tabs-container">
                    <div class="tab active">
                      <span>Meus itens</span>
                    </div>
                    <div class="tab">
                      <span>Bônus regulares</span>
                      <div class="notification-badge">1</div>
                    </div>
                  </div>
                  <div class="controls-container">
                    <div class="pagination-controls">
                      <button class="pagination-btn">
                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
                          <path d="M5.77056 1.08358C5.91747 1.22859 6 1.42524 6 1.63029C6 1.83533 5.91747 2.03198 5.77056 2.17699L1.89154 6.0047L5.77056 9.83241C5.91331 9.97826 5.99229 10.1736 5.99051 10.3763C5.98872 10.5791 5.90631 10.773 5.76101 10.9164C5.61572 11.0598 5.41917 11.1411 5.21371 11.1429C5.00824 11.1446 4.81029 11.0667 4.66249 10.9258L0.229439 6.55141C0.0825293 6.4064 0 6.20975 0 6.0047C0 5.79966 0.0825293 5.60301 0.229439 5.458L4.66249 1.08358C4.80945 0.938615 5.00873 0.857178 5.21653 0.857178C5.42432 0.857178 5.62361 0.938615 5.77056 1.08358Z" fill="#FAFAFA"/>
                        </svg>
                        Anterior
                      </button>
                      <div class="page-numbers">
                        <button class="page-btn active">1</button>
                        <button class="page-btn">2</button>
                        <button class="page-btn">3</button>
                      </div>
                      <button class="pagination-btn">
                        Próximo
                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
                          <path d="M0.229439 10.9164C0.0825295 10.7714 0 10.5748 0 10.3697C0 10.1647 0.0825295 9.96802 0.229439 9.82301L4.10846 5.9953L0.229439 2.16759C0.0866928 2.02174 0.00770617 1.82641 0.00949192 1.62366C0.0112772 1.42091 0.0936918 1.22697 0.238985 1.08359C0.384278 0.940223 0.580825 0.858899 0.786294 0.857138C0.991761 0.855376 1.18971 0.933317 1.33751 1.07418L5.77056 5.44859C5.91747 5.5936 6 5.79025 6 5.9953C6 6.20034 5.91747 6.39699 5.77056 6.542L1.33751 10.9164C1.19055 11.0614 0.991266 11.1428 0.783473 11.1428C0.57568 11.1428 0.376394 11.0614 0.229439 10.9164Z" fill="#FAFAFA"/>
                        </svg>
                      </button>
                    </div>
                    <div class="search-container">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.27904 10.5138C8.09636 11.3851 6.62814 11.7773 5.16853 11.6119C3.70892 11.4464 2.36572 10.7356 1.40803 9.62175C0.450332 8.5079 -0.0511224 7.07332 0.00412436 5.6054C0.0593712 4.13749 0.667238 2.74465 1.70595 1.70595C2.74465 0.667238 4.13749 0.0593712 5.6054 0.00412436C7.07332 -0.0511224 8.5079 0.450332 9.62175 1.40803C10.7356 2.36572 11.4464 3.70892 11.6119 5.16853C11.7773 6.62814 11.3851 8.09636 10.5138 9.27904L13.7231 12.4871C13.8089 12.5671 13.8778 12.6636 13.9255 12.7708C13.9733 12.8779 13.999 12.9936 14.001 13.1109C14.0031 13.2282 13.9815 13.3448 13.9376 13.4535C13.8936 13.5623 13.8282 13.6611 13.7453 13.7441C13.6623 13.8271 13.5635 13.8925 13.4547 13.9364C13.3459 13.9804 13.2294 14.0019 13.1121 13.9999C12.9948 13.9978 12.8791 13.9721 12.7719 13.9244C12.6647 13.8766 12.5683 13.8078 12.4883 13.7219L9.27904 10.5138ZM9.90226 5.82397C9.90226 6.90529 9.4727 7.94232 8.70809 8.70693C7.94349 9.47154 6.90646 9.90109 5.82514 9.90109C4.74382 9.90109 3.70679 9.47154 2.94218 8.70693C2.17757 7.94232 1.74802 6.90529 1.74802 5.82397C1.74802 4.74265 2.17757 3.70562 2.94218 2.94101C3.70679 2.17641 4.74382 1.74685 5.82514 1.74685C6.90646 1.74685 7.94349 2.17641 8.70809 2.94101C9.4727 3.70562 9.90226 4.74265 9.90226 5.82397Z" fill="#858585"/>
                      </svg>
                      <input v-model="searchQuery" type="text" placeholder="Pesquise..." class="search-input">
                    </div>
                  </div>
                </div>
                
                <!-- Items Grid - Exact 3x3 layout -->
                <div class="items-grid">
                  <div v-for="item in filteredItems" :key="item.id" class="item-card" :class="{ featured: item.featured }">
                    <div class="item-image-container">
                      <img v-if="item.image" :src="item.image" :alt="item.name" class="item-image">
                      <img v-if="item.secondaryImage" :src="item.secondaryImage" :alt="item.name" class="item-image-secondary">
                    </div>
                    <div class="item-info">
                      <h3 class="item-name">{{ item.name }}</h3>
                      <div class="item-details">
                        <div class="item-price">{{ item.price }}</div>
                        <div class="item-quantity">{{ item.quantity }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Right side: Scratch Card -->
              <div class="scratch-card-section">
                <div class="scratch-card-container">
                  <div class="scratch-card-illustration">
                    <div class="illustration-container">
                      <img src="https://api.builder.io/api/v1/image/assets/TEMP/07fa37c90e9f75fa7b40b167b05ea896912551d1?width=159" alt="Scratch card background" class="scratch-bg">
                      <img src="https://api.builder.io/api/v1/image/assets/TEMP/1098a3823ac554eb24082b5d3a91bedde004d547?width=307" alt="Scratch card front" class="scratch-front">
                      <img src="https://api.builder.io/api/v1/image/assets/TEMP/c8f93348e9dc38e59dca4689fc306a97368ae297?width=274" alt="Scratch card overlay" class="scratch-overlay">
                    </div>
                  </div>
                  <p class="scratch-card-text">
                    Escolha um item ou uma raspadinha para coletar de forma fácil e rápida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-info">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/6884273ae51e4590bf83a095b96435701536817c?width=312" alt="RaspaGreen Logo" class="footer-logo">
              <p class="footer-copyright">© 2025 raspagreen.com. Todos os direitos reservados.</p>
              <p class="footer-disclaimer">
                Raspadinhas e outros jogos de azar são regulamentados e cobertos pela nossa licença de jogos. 
                Jogue com responsabilidade.
              </p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4 class="footer-heading">Regulamentos</h4>
                <a href="#" class="footer-link">Jogo responsável</a>
                <a href="#" class="footer-link">Política de Privacidade</a>
                <a href="#" class="footer-link">Termos de Uso</a>
              </div>
              <div class="footer-column">
                <h4 class="footer-heading">Ajuda</h4>
                <a href="#" class="footer-link">Perguntas Frequentes</a>
                <a href="#" class="footer-link">Como Jogar</a>
                <a href="#" class="footer-link">Suporte Técnico</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `
}).mount('#app');
