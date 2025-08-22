<template>
  <div class="not-found-view">
    <div class="container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1>Página não encontrada</h1>
        <p>A página que você está procurando não existe ou foi movida.</p>
        
        <div class="action-buttons">
          <router-link to="/" class="btn btn-primary">
            Voltar ao Início
          </router-link>
          <button @click="goBack" class="btn btn-secondary">
            Página Anterior
          </button>
        </div>
        
        <div class="suggestions">
          <h3>Você pode estar procurando por:</h3>
          <ul>
            <li><router-link to="/inventario">Inventário</router-link></li>
            <li><router-link to="/raspadinhas">Raspadinhas</router-link></li>
            <li><router-link to="/indicacoes">Indique e Ganhe</router-link></li>
            <li><router-link to="/transacoes">Transações</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  padding: 40px;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.not-found-content h1 {
  color: var(--text-color);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
}

.not-found-content p {
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 50px;
}

.suggestions {
  text-align: left;
  background: var(--background-color);
  border: 1px solid var(--box-border);
  border-radius: 12px;
  padding: 30px;
}

.suggestions h3 {
  color: var(--text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.suggestions li {
  background: var(--box-color);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.suggestions li:hover {
  background: rgba(38, 231, 2, 0.1);
}

.suggestions a {
  display: block;
  padding: 12px 16px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s ease;
}

.suggestions a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }
  
  .not-found-content h1 {
    font-size: 24px;
  }
  
  .not-found-content p {
    font-size: 16px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .suggestions ul {
    grid-template-columns: 1fr;
  }
}
</style>
