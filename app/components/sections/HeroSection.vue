<script setup lang="ts">
const { release } = useRelease()
</script>

<template>
  <section id="inicio" class="hero" aria-labelledby="hero-title">
    <div class="hero-bg dots" aria-hidden="true" />
    <div class="container hero-top">
      <h1 id="hero-title" class="hero-title">
        <span class="wordmark" aria-hidden="true">
          <LogoMark class="wordmark-mark" size="0.82em" fold="load" />
          <span class="wordmark-text">notes</span>
        </span>
        <span class="sr-only">4notes:</span>
        <span class="slogan"><span>Você decide</span> <span>o que você precisa.</span></span>
      </h1>
      <div class="hero-copy">
        <p class="lead">
          Notas, tarefas, mapas mentais, links e timer num só app. Ligue as ferramentas que fazem sentido para você, organize do seu jeito
          e guarde tudo numa pasta sua.
        </p>
        <div class="cta-row">
          <DownloadButton platform="windows" primary />
          <DownloadButton platform="android" />
        </div>
        <p class="meta">
          Versão {{ release.version }} para Windows 10 e 11 e Android 7 ou mais recente. Sem conta e sem login.
        </p>
      </div>
    </div>

    <div class="container">
      <div class="stage">
        <AppWindow class="stage-window">
          <ThemedShot name="notes" eager sizes="(min-width: 1280px) 1100px, 92vw" />
        </AppWindow>
        <PhoneFrame class="stage-phone">
          <ThemedShot name="phoneTasks" sizes="(min-width: 1280px) 240px, 24vw" />
        </PhoneFrame>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: clamp(40px, 7vw, 104px);
  padding-bottom: clamp(56px, 8vw, 112px);
  overflow: clip;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  mask-image: linear-gradient(to bottom, #000 0%, #000 45%, transparent 85%);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 45%, transparent 85%);
}

.hero-top {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  align-items: end;
  gap: clamp(28px, 5vw, 72px);
}

.wordmark {
  display: flex;
  align-items: center;
  gap: 0.06em;
  font-size: var(--fs-hero);
  font-weight: 750;
  line-height: 0.92;
  letter-spacing: -0.058em;
  color: var(--text);
}
.wordmark-mark {
  translate: 0 0.02em;
  filter: drop-shadow(0 0.05em 0.08em rgba(72, 40, 190, 0.28));
}
.wordmark-text {
  padding-bottom: 0.06em;
}
/* O slogan: logo abaixo da marca, grande, com um traço amarelo que se estende ao abrir a página */
.slogan {
  position: relative;
  display: block;
  margin-top: clamp(18px, 2.4vw, 30px);
  padding-left: clamp(16px, 1.6vw, 22px);
  font-size: var(--fs-slogan);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--text);
}
.slogan::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.12em;
  bottom: 0.1em;
  width: clamp(4px, 0.45vw, 6px);
  border-radius: 4px;
  background: var(--accent);
  transform-origin: top;
  animation: slogan-bar 700ms var(--ease-out) 700ms both;
}
.slogan > span {
  display: block;
}
@keyframes slogan-bar {
  from {
    transform: scaleY(0);
  }
}

.hero-copy {
  padding-bottom: 6px;
}
.lead {
  max-width: 46ch;
  font-size: var(--fs-md);
  color: var(--text-2);
}
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.meta {
  margin-top: 16px;
  max-width: 46ch;
  font-size: var(--fs-sm);
  color: var(--text-3);
}

/* Palco: a janela do app e o celular por cima */
.stage {
  position: relative;
  margin-top: clamp(48px, 7vw, 96px);
  padding-right: 7%;
}
.stage-window {
  animation: hero-rise 1000ms var(--ease-out) 120ms both;
}
.stage-phone {
  position: absolute;
  right: 0;
  bottom: -9%;
  width: 21%;
  animation: hero-phone 1000ms var(--ease-out) 320ms both;
}
@keyframes hero-rise {
  from {
    transform: translateY(56px) scale(0.985);
  }
  to {
    transform: none;
  }
}
@keyframes hero-phone {
  from {
    transform: translate(18%, 12%) rotate(4deg);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@media (max-width: 900px) {
  .hero-top {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }
}
@media (max-width: 480px) {
  .cta-row .btn {
    flex: 1 1 100%;
  }
}
@media (max-width: 640px) {
  .stage {
    padding-right: 0;
    padding-bottom: 18%;
  }
  .stage-phone {
    width: 34%;
    bottom: 0;
    right: -2%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .stage-window,
  .stage-phone,
  .slogan::before {
    animation: none;
  }
}
</style>
