<script setup lang="ts">
/** Compara a mesma tela nos temas claro e escuro: arraste (ou use as setas) para mover a divisória. */
import { SHOTS, shotSrc, shotSrcset } from '~/config/screens'

const position = ref(50)
const shot = SHOTS.notes
const sizes = '(min-width: 1240px) 640px, (min-width: 900px) 52vw, 94vw'
const fallback = shot.widths[1]!
</script>

<template>
  <div class="compare" :style="{ '--pos': `${position}%` }">
    <img
      class="side dark"
      :src="shotSrc(shot, 'dark', fallback)"
      :srcset="shotSrcset(shot, 'dark')"
      :sizes="sizes"
      :width="fallback"
      :height="Math.round(fallback / shot.ratio)"
      alt="O módulo Notas no tema escuro."
      loading="lazy"
      decoding="async"
      draggable="false"
    />
    <img
      class="side light"
      :src="shotSrc(shot, 'light', fallback)"
      :srcset="shotSrcset(shot, 'light')"
      :sizes="sizes"
      :width="fallback"
      :height="Math.round(fallback / shot.ratio)"
      alt="O módulo Notas no tema claro."
      loading="lazy"
      decoding="async"
      draggable="false"
    />
    <div class="divider" aria-hidden="true">
      <span class="knob"><AppIcon name="chevron-left" :size="14" :stroke="2.4" /><AppIcon name="chevron-right" :size="14" :stroke="2.4" /></span>
    </div>
    <span class="tag tag-light" aria-hidden="true">Claro</span>
    <span class="tag tag-dark" aria-hidden="true">Escuro</span>
    <input v-model.number="position" class="range" type="range" min="0" max="100" step="1" aria-label="Divisória entre o tema claro e o escuro" :aria-valuetext="`${position}% no tema claro`" />
  </div>
</template>

<style scoped>
.compare {
  position: relative;
  border-radius: clamp(8px, 1.1vw, 14px);
  overflow: hidden;
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--frame-border);
  aspect-ratio: 1280 / 800;
  background: #121016;
  user-select: none;
  touch-action: pan-y;
}
.side {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.light {
  clip-path: inset(0 calc(100% - var(--pos)) 0 0);
}
.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--pos);
  width: 2px;
  margin-left: -1px;
  background: var(--accent);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
  pointer-events: none;
}
.knob {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  translate: -50% -50%;
  transition: scale var(--t-fast) var(--ease-out);
}
.tag {
  position: absolute;
  top: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: var(--fs-xs);
  font-weight: 650;
  pointer-events: none;
}
.tag-light {
  left: 12px;
  background: rgba(255, 255, 255, 0.92);
  color: #1f1a2b;
  box-shadow: 0 0 0 1px rgba(31, 26, 43, 0.12);
}
.tag-dark {
  right: 12px;
  background: rgba(25, 23, 31, 0.92);
  color: #ece9f3;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
}
.range {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: ew-resize;
  -webkit-appearance: none;
  appearance: none;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 48px;
  height: 100vh;
}
.range::-moz-range-thumb {
  width: 48px;
  height: 2000px;
  border: 0;
}
.compare:has(.range:focus-visible) .knob {
  box-shadow: 0 0 0 4px var(--bg), 0 0 0 7px var(--primary);
}
.compare:has(.range:active) .knob {
  scale: 1.08;
}
</style>
