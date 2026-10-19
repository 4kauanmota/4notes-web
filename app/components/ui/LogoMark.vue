<script setup lang="ts">
/**
 * A marca do 4notes (o mesmo desenho do app): um "4" amarelo sobre roxo cuja ponta é o
 * canto dobrado de uma folha. `fold="load"` dobra o canto ao aparecer; `fold="hover"`,
 * ao passar o mouse (ou focar) no elemento pai que tem a classe .fold-trigger.
 */
const props = withDefaults(defineProps<{ size?: number | string; fold?: 'none' | 'load' | 'hover'; title?: string }>(), {
  size: 32,
  fold: 'none',
  title: '',
})
const id = useId()
const bg = `lm-bg-${id}`
const shine = `lm-shine-${id}`
const flap = `lm-flap-${id}`
</script>

<template>
  <svg
    class="logo-mark"
    :class="`fold-${props.fold}`"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    :role="title ? 'img' : undefined"
    :aria-label="title || undefined"
    :aria-hidden="title ? undefined : 'true'"
    focusable="false"
  >
    <defs>
      <linearGradient :id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8f72ff" />
        <stop offset="1" stop-color="#5a35e6" />
      </linearGradient>
      <linearGradient :id="shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".18" />
        <stop offset=".55" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <linearGradient :id="flap" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#ffe9a0" />
        <stop offset="1" stop-color="#f5b700" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" :fill="`url(#${bg})`" />
    <rect width="64" height="64" rx="16" :fill="`url(#${shine})`" />
    <path
      d="M31 10h1.5L43 20.5v13h9v9h-9V53H31V42.5H11v-9zM31 21v12.5H20.5z"
      fill="#ffd03d"
      fill-rule="evenodd"
      stroke="#ffd03d"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path class="lm-shadow" d="M32.5 20.5H43v2.8z" fill="#5c3500" opacity=".22" />
    <path class="lm-flap" d="M32.5 10 43 20.5H32.5z" :fill="`url(#${flap})`" :stroke="`url(#${flap})`" stroke-width="1.6" stroke-linejoin="round" />
  </svg>
</template>

<style scoped>
.logo-mark {
  flex: none;
  display: block;
  overflow: visible;
}

/*
 * A dobra: girar a ponta em torno da diagonal (32.5,10)→(43,20.5) projeta, no plano,
 * uma escala perpendicular a essa linha — de −1 (canto aberto) a 1 (canto dobrado).
 */
.lm-flap {
  transform-box: view-box;
  transform-origin: 32.5px 10px;
}
.fold-load .lm-flap {
  animation: lm-fold 760ms var(--ease-out) 260ms both;
}
.fold-load .lm-shadow {
  animation: lm-shadow 300ms ease 820ms both;
}
@keyframes lm-fold {
  0% {
    transform: rotate(45deg) scaleY(-1) rotate(-45deg);
    filter: brightness(0.92);
  }
  55% {
    filter: brightness(0.75);
  }
  100% {
    transform: rotate(45deg) scaleY(1) rotate(-45deg);
    filter: none;
  }
}
@keyframes lm-shadow {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.22;
  }
}

/*
 * Ao passar o mouse: a mesma lista de transformações nos dois estados (só o scaleY muda),
 * então a ponta gira sempre em torno da dobra. Com "none" aqui, o navegador interpolava
 * também os rotate() e a ponta torcia e esticava para baixo no caminho (até a 1.0.0).
 * Voltar é suave (sem passar do ponto); desdobrar tem um leve impulso (regra abaixo).
 */
.fold-hover .lm-flap {
  transform: rotate(45deg) scaleY(1) rotate(-45deg);
  transition: transform 380ms var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .fold-load .lm-flap,
  .fold-load .lm-shadow {
    animation: none;
  }
  .fold-hover .lm-flap {
    transition: none;
  }
}
</style>

<style>
/* Desdobra um pouco a ponta ao passar o mouse (ou focar) no elemento com .fold-trigger */
.fold-trigger:hover .logo-mark.fold-hover .lm-flap,
.fold-trigger:focus-visible .logo-mark.fold-hover .lm-flap {
  transform: rotate(45deg) scaleY(-0.55) rotate(-45deg);
  transition: transform 520ms var(--ease-spring);
}
@media (prefers-reduced-motion: reduce) {
  .fold-trigger:hover .logo-mark.fold-hover .lm-flap,
  .fold-trigger:focus-visible .logo-mark.fold-hover .lm-flap {
    transition: none;
  }
}
</style>
