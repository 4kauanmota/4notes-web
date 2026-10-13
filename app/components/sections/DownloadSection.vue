<script setup lang="ts">
import { downloadsConfig, type PlatformId } from '~/config/downloads'
import { renderNotes } from '~/lib/markdown'

const { release } = useRelease()
const platforms: PlatformId[] = ['windows', 'android']
const dateLabel = computed(() => formatDate(release.value.date))
// O título da seção já diz "Novidades": um "## Novidades" no começo das notas sai
const notesHtml = computed(() => renderNotes(release.value.notes.replace(/^\s*#{1,6}\s*novidades\s*\n/i, '')))
</script>

<template>
  <section id="baixar" class="section download" aria-labelledby="baixar-title">
    <div class="container">
      <h2 id="baixar-title" class="section-title">Baixe o 4notes</h2>
      <p class="section-lead">
        Versão {{ release.version }}<template v-if="dateLabel">, publicada em {{ dateLabel }}</template>. Depois de instalado, o próprio app
        avisa quando sair uma versão nova.
      </p>

      <div class="tiles">
        <article v-for="id in platforms" :key="id" class="tile" :aria-labelledby="`dl-${id}`">
          <div class="tile-head">
            <span class="tile-icon"><AppIcon :name="downloadsConfig.platforms[id].icon" :size="26" /></span>
            <div>
              <h3 :id="`dl-${id}`">{{ downloadsConfig.platforms[id].name }}</h3>
              <p class="req">{{ downloadsConfig.platforms[id].requirements }}</p>
            </div>
          </div>
          <p class="desc">{{ downloadsConfig.platforms[id].description }}</p>
          <DownloadButton :platform="id" primary detail class="tile-btn" />
          <p class="help">
            <AppIcon name="info" :size="16" />
            <span>{{ downloadsConfig.platforms[id].help }}</span>
          </p>
        </article>
      </div>

      <div class="after">
        <div v-if="release.notes" class="notes">
          <h3 class="notes-title">Novidades da versão {{ release.version }}</h3>
          <!-- eslint-disable-next-line vue/no-v-html -- texto escapado em lib/markdown.ts -->
          <div class="notes-body" v-html="notesHtml" />
        </div>
        <a class="all" :href="downloadsConfig.allReleasesUrl" rel="noopener" target="_blank">
          <AppIcon name="history" :size="18" />
          Todas as versões no GitHub
          <AppIcon name="external" :size="15" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2.4vw, 28px);
  margin-top: clamp(36px, 5vw, 56px);
}
.tile {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--r-2xl);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}
.tile-head {
  display: flex;
  align-items: center;
  gap: 16px;
}
.tile-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--r-xl);
  background: var(--primary-soft);
  color: var(--primary-text);
}
.tile h3 {
  font-size: var(--fs-xl);
}
.req {
  margin-top: 2px;
  color: var(--text-2);
  font-weight: 550;
}
.desc {
  color: var(--text-2);
  max-width: 48ch;
}
.tile-btn {
  align-self: flex-start;
  margin-top: auto;
}
.help {
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: var(--fs-sm);
  color: var(--text-3);
}
.help .app-icon {
  margin-top: 3px;
}

.after {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px 48px;
  margin-top: clamp(32px, 4vw, 48px);
}
.notes {
  flex: 1 1 420px;
  max-width: 720px;
}
.notes-title {
  font-size: var(--fs-lg);
  letter-spacing: -0.015em;
}
.notes-body {
  margin-top: 8px;
  color: var(--text-2);
}
.notes-body :deep(h4) {
  margin: 16px 0 6px;
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--text);
}
.notes-body :deep(ul) {
  display: grid;
  gap: 6px;
  padding-left: 20px;
}
.notes-body :deep(li)::marker {
  color: var(--accent-strong);
}
.notes-body :deep(strong) {
  color: var(--text);
}
.notes-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
}
.all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 2px;
  font-weight: 600;
  text-decoration: none;
}
.all:hover {
  text-decoration: underline;
}

@media (max-width: 760px) {
  .tiles {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
