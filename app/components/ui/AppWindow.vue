<script setup lang="ts">
/** Moldura das capturas do computador: a janela do 4notes, com cantos e sombra. A barra de título já vem na captura. */
</script>

<template>
  <div class="app-window">
    <slot />
  </div>
</template>

<style scoped>
.app-window {
  position: relative;
  border-radius: clamp(8px, 1.1vw, 14px);
  background: var(--frame);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--frame-border);
  overflow: hidden;
  isolation: isolate;
}
</style>
