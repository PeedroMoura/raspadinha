// Inventory Items Component
const InventoryItems = {
  data() {
    return {
      currentPage: 1,
      searchQuery: '',
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
      ]
    }
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) return this.items;
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  template: `
    <section class="inventory-section">
      <div class="container">
        <div class="inventory-content">
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
  `,
  styles: `
    <style scoped>
    .inventory-section {
      padding: 0 100px;
      margin-bottom: 60px;
    }
    
    .inventory-content {
      display: flex;
      gap: 50px;
      max-width: 1480px;
      margin: 0 auto;
    }
    
    .inventory-main {
      flex: 1;
      max-width: 808px;
    }
    
    .inventory-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .tabs-container {
      display: flex;
      gap: 30px;
    }
    
    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-bottom: 16px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-secondary);
      border-bottom: 2px solid transparent;
    }
    
    .tab.active {
      color: var(--primary-color);
      font-weight: 600;
      border-bottom-color: var(--primary-color);
    }
    
    .notification-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background-color: var(--red-color);
      color: var(--text-color);
      border-radius: 50%;
      font-size: 10px;
      font-weight: 600;
    }
    
    .controls-container {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    
    .pagination-controls {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    
    .pagination-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: transparent;
      border: none;
      color: var(--text-color);
      font-size: 12px;
      cursor: pointer;
      border-radius: 8px;
    }
    
    .page-numbers {
      display: flex;
      gap: 8px;
    }
    
    .page-btn {
      width: 38px;
      padding: 12px 14px;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 14px;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .page-btn.active {
      background-color: rgba(38, 231, 2, 0.1);
      color: var(--primary-color);
      font-weight: 600;
    }
    
    .search-container {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 10px;
      border: 1px solid var(--box-border);
      border-radius: 8px;
      width: 452px;
    }
    
    .search-input {
      background: transparent;
      border: none;
      color: var(--text-color);
      font-size: 12px;
      flex: 1;
      outline: none;
    }
    
    .search-input::placeholder {
      color: var(--text-secondary);
    }
    
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
      gap: 20px;
    }
    
    .item-card {
      display: flex;
      flex-direction: column;
      width: 256px;
      height: 256px;
      padding: 24px 14px 14px 14px;
      border-radius: 10px;
      border: 1px solid var(--box-color);
      background: linear-gradient(180deg, rgba(38, 38, 38, 0.04) 72.74%, rgba(74, 255, 25, 0.04) 100%);
      justify-content: space-between;
      align-items: center;
    }
    
    .item-card.featured {
      border-color: var(--box-border);
      background: linear-gradient(180deg, rgba(24, 24, 24, 0.4) 55.58%, rgba(9, 22, 7, 0.28) 84.42%, rgba(38, 231, 2, 0) 123.71%);
    }
    
    .item-image-container {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    
    .item-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    .item-image-secondary {
      position: absolute;
      bottom: 0;
      max-width: 100%;
      max-height: 70%;
      object-fit: contain;
    }
    
    .item-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
    
    .item-name {
      color: var(--text-color);
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }
    
    .item-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .item-price {
      background-color: var(--text-color);
      color: var(--background-color);
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
    }
    
    .item-quantity {
      background-color: rgba(38, 231, 2, 0.1);
      color: var(--primary-color);
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      min-width: 38px;
      text-align: center;
    }
    
    .scratch-card-section {
      width: 452px;
      min-width: 394px;
      flex-shrink: 0;
    }
    
    .scratch-card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 50px;
      padding: 50px 20px;
      border-radius: 10px;
      border: 1px dashed var(--box-border);
      background-color: var(--background-color);
      height: 808px;
      justify-content: center;
    }
    
    .scratch-card-illustration {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }
    
    .illustration-container {
      position: relative;
      width: 210px;
      height: 214px;
    }
    
    .scratch-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 79px;
      height: 88px;
    }
    
    .scratch-front {
      position: absolute;
      top: 54px;
      left: 56px;
      width: 153px;
      height: 160px;
    }
    
    .scratch-overlay {
      position: absolute;
      top: 54px;
      left: 72px;
      width: 137px;
      height: 140px;
    }
    
    .scratch-card-text {
      color: var(--text-color);
      text-align: center;
      font-size: 22px;
      font-weight: 600;
      line-height: 30px;
      max-width: 385px;
      margin: 0;
    }
    
    @media (max-width: 1200px) {
      .inventory-section {
        padding: 0 20px;
      }
      
      .inventory-content {
        flex-direction: column;
        gap: 30px;
      }
      
      .scratch-card-section {
        width: 100%;
        min-width: auto;
      }
      
      .search-container {
        width: 300px;
      }
    }
    
    @media (max-width: 768px) {
      .inventory-header {
        flex-direction: column;
        gap: 20px;
        align-items: stretch;
      }
      
      .controls-container {
        flex-direction: column;
        gap: 15px;
      }
      
      .search-container {
        width: 100%;
      }
      
      .pagination-controls {
        justify-content: center;
      }
      
      .items-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 15px;
      }
      
      .item-card {
        width: 100%;
      }
      
      .scratch-card-container {
        height: auto;
        padding: 30px 15px;
      }
    }
    </style>
  `
};

// Footer Component
const FooterComponent = {
  template: `
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
  `,
  styles: `
    <style scoped>
    .app-footer {
      background-color: var(--background-variant);
      padding: 60px 0;
      margin-top: 60px;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 60px;
      max-width: 1252px;
      margin: 0 auto;
    }
    
    .footer-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 482px;
    }
    
    .footer-logo {
      width: 156px;
      height: auto;
    }
    
    .footer-copyright {
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
    
    .footer-disclaimer {
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin: 0;
    }
    
    .footer-links {
      display: flex;
      gap: 60px;
    }
    
    .footer-column {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .footer-heading {
      color: var(--text-color);
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }
    
    .footer-link {
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 400;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .footer-link:hover {
      color: var(--text-color);
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: 40px;
      }
      
      .footer-links {
        gap: 40px;
      }
      
      .footer-info {
        text-align: center;
      }
    }
    
    @media (max-width: 480px) {
      .footer-links {
        flex-direction: column;
        gap: 30px;
      }
    }
    </style>
  `
};
