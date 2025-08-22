<template>
  <div class="register-view">
    <div style="padding: 40px; text-align: center; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h1>📝 REGISTRO - FUNCIONANDO!</h1>
        <p>Esta é a página de registro</p>
        <div style="margin: 20px 0; padding: 20px; background: #262626; border-radius: 8px;">
          <h3>Formulário de registro aqui</h3>
          <router-link to="/" style="padding: 10px 20px; background: #26E702; color: black; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">Ir para Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
console.log('📝 RegisterView carregada!')
</script>

<style scoped>
.register-view {
  background: var(--background-variant);
}
</style>