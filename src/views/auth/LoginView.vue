<template>
  <div class="login-view">
    <div style="padding: 40px; text-align: center; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h1>🔐 LOGIN - FUNCIONANDO!</h1>
        <p>Esta é a página de login</p>
        <div style="margin: 20px 0; padding: 20px; background: #262626; border-radius: 8px;">
          <h3>Formulário de login aqui</h3>
          <router-link to="/" style="padding: 10px 20px; background: #26E702; color: black; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">Ir para Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
console.log('🔐 LoginView carregada!')
</script>

<style scoped>
.login-view {
  background: var(--background-variant);
}
</style>