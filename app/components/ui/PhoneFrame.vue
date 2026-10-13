<script setup lang="ts">
/** Moldura genérica de celular para as capturas do Android (a tela vem inteira na captura). */
</script>

<template>
  <div class="phone-frame">
    <div class="phone-screen">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.phone-frame {
  --bezel: clamp(5px, 0.75vw, 9px);
  position: relative;
  padding: var(--bezel);
  border-radius: calc(var(--bezel) * 5.2);
  background: var(--phone-bezel);
  box-shadow: var(--shadow-lg), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.phone-screen {
  border-radius: calc(var(--bezel) * 4.1);
  overflow: hidden;
  background: var(--surface);
}
</style>
