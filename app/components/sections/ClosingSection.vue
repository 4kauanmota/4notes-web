<template>
  <section class="section closing" aria-labelledby="fim-title">
    <div class="container closing-inner">
      <div class="mark fold-trigger">
        <LogoMark size="100%" fold="hover" />
      </div>
      <div class="copy">
        <h2 id="fim-title" class="title">Comece com uma pasta vazia</h2>
        <p class="lead">
          Crie um workspace, dê um nome a ele e ligue só as ferramentas que fazem sentido para você. Se a rotina mudar, o 4notes muda junto: é só
          ligar outro módulo.
        </p>
        <div class="cta-row">
          <DownloadButton platform="windows" primary />
          <DownloadButton platform="android" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.closing-inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 6vw, 96px);
}
.mark {
  width: clamp(120px, 18vw, 230px);
  aspect-ratio: 1;
  filter: drop-shadow(0 30px 40px rgba(72, 40, 190, 0.3));
  rotate: -6deg;
  transition: rotate var(--t-slow) var(--ease-spring);
}
.mark:hover {
  rotate: -2deg;
}
.title {
  font-size: var(--fs-2xl);
  max-width: 16ch;
}
.lead {
  margin-top: 16px;
  max-width: 52ch;
  font-size: var(--fs-md);
  color: var(--text-2);
}
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
@media (max-width: 640px) {
  .closing-inner {
    grid-template-columns: minmax(0, 1fr);
  }
  .mark {
    width: 112px;
  }
}
@media (max-width: 480px) {
  .cta-row .btn {
    flex: 1 1 100%;
  }
}
</style>
