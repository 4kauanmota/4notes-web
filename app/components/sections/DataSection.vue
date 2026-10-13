<script setup lang="ts">
/** Os diferenciais: tudo ligado por menções e os dados como arquivos numa pasta sua. */
const tree = ref<HTMLElement | null>(null)
const treeVisible = useInView(tree, { threshold: 0.35 })

const mentionKinds = [
  { icon: 'notes', label: 'Notas' },
  { icon: 'graph', label: 'Mapas e suas notas' },
  { icon: 'tasks', label: 'Tarefas' },
  { icon: 'link', label: 'Links salvos' },
  { icon: 'timer', label: 'Registros do Timer' },
]

const lines: { text: string; comment?: string; depth: number; folder?: boolean }[] = [
  { text: 'Pessoal/', comment: 'o workspace: uma pasta com o nome que você deu', depth: 0, folder: true },
  { text: 'notes/', comment: 'uma nota, um arquivo .md', depth: 1, folder: true },
  { text: 'Estudos/', comment: 'cada categoria é uma pasta', depth: 2, folder: true },
  { text: 'Godot sinais e eventos.md', depth: 3 },
  { text: 'Lista de compras.md', depth: 2 },
  { text: 'tasks/tasks.json', comment: 'tarefas e categorias', depth: 1 },
  { text: 'mindmap/Jogo de plataforma/', comment: 'um mapa, uma pasta', depth: 1, folder: true },
  { text: 'links/links.json', comment: 'links e ícones dos sites', depth: 1 },
  { text: 'timer/timer.json', comment: 'sessões e histórico', depth: 1 },
  { text: 'attachments/', comment: 'biblioteca de imagens', depth: 1, folder: true },
  { text: '.4notes/', comment: 'configurações e backups', depth: 1, folder: true },
]

const points = [
  {
    icon: 'lock',
    title: 'Sem conta, sem login, sem servidor',
    text: 'Você escolhe a pasta onde tudo fica, e o 4notes lê e grava só ali. Suas notas não são enviadas para lugar nenhum.',
  },
  {
    icon: 'notes',
    title: 'Markdown e JSON',
    text: 'Notas são arquivos .md; tarefas, links e o Timer ficam em JSON. Tudo abre em qualquer editor de texto.',
  },
  {
    icon: 'copy',
    title: 'Backup é copiar a pasta',
    text: 'Levar para outro computador também. Crie quantos workspaces quiser, cada um com seus dados e configurações.',
  },
  {
    icon: 'undo',
    title: 'Nada some sem você pedir',
    text: 'Cada arquivo é gravado por inteiro, excluir manda para a Lixeira e as ações mais comuns têm Desfazer.',
  },
]
</script>

<template>
  <div class="data">
    <div class="data-bg dots" aria-hidden="true" />
    <div class="container">
      <!-- Menções -->
      <section id="conexoes" class="block connect" aria-labelledby="conexoes-title">
        <div class="copy">
          <h2 id="conexoes-title" class="title">Um @ e tudo se conecta</h2>
          <p class="lead">
            Numa nota ou tarefa, digite @ e escolha qualquer item do workspace. A menção vira um atalho: um clique abre o item no módulo dele,
            seja uma tarefa, um mapa ou um registro do Timer.
          </p>
          <ul class="kinds" aria-label="O que dá para mencionar">
            <li v-for="kind in mentionKinds" :key="kind.label">
              <AppIcon :name="kind.icon" :size="16" />
              {{ kind.label }}
            </li>
          </ul>
          <p class="note">
            Renomeou uma nota ou mudou ela de categoria pelo app? As menções acompanham. Nos Links e no Timer, “Ver menções” mostra onde cada
            item foi citado.
          </p>
        </div>
        <figure class="mention-shot">
          <div class="mention-frame">
            <ThemedShot name="mention" sizes="(min-width: 1240px) 560px, (min-width: 900px) 46vw, 94vw" />
          </div>
          <figcaption>Digitando “@god” numa nota: a lista mistura mapas, notas, links, tarefas e registros do Timer.</figcaption>
        </figure>
      </section>

      <!-- Arquivos -->
      <section id="seus-dados" class="block files" aria-labelledby="dados-title">
        <h2 id="dados-title" class="title wide">Seus dados são arquivos seus</h2>
        <div class="files-grid">
          <div ref="tree" class="tree data-tree" :class="{ in: treeVisible }" role="img" aria-label="Estrutura de um workspace: pastas notes, tasks, mindmap, links, timer, attachments e .4notes.">
            <div v-for="(line, index) in lines" :key="line.text" class="line" :style="{ '--i': index, '--depth': line.depth }" aria-hidden="true">
              <span class="name" :class="{ folder: line.folder }">
                <AppIcon :name="line.folder ? 'folder' : 'notes'" :size="15" />
                {{ line.text }}
              </span>
              <span v-if="line.comment" class="comment">{{ line.comment }}</span>
            </div>
          </div>
          <ul class="points">
            <li v-for="point in points" :key="point.title">
              <span class="point-icon"><AppIcon :name="point.icon" :size="20" /></span>
              <div>
                <h3>{{ point.title }}</h3>
                <p>{{ point.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.data {
  position: relative;
  padding-block: clamp(88px, 12vw, 160px);
  background: var(--deep);
  color: var(--deep-text);
  overflow: clip;
  isolation: isolate;
  --dots: rgba(214, 203, 255, 0.11);
}
.data-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  mask-image: radial-gradient(ellipse 80% 60% at 70% 20%, #000, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 70% 20%, #000, transparent 75%);
}
.block + .block {
  margin-top: clamp(96px, 13vw, 168px);
}
.title {
  font-size: var(--fs-2xl);
  max-width: 14ch;
  color: #fff;
}
.title.wide {
  max-width: 20ch;
}
.lead {
  margin-top: 18px;
  max-width: 48ch;
  font-size: var(--fs-md);
  color: var(--deep-text-2);
}

/* Menções */
.connect {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(36px, 6vw, 88px);
  align-items: center;
}
.kinds {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 26px;
  list-style: none;
}
.kinds li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--deep-border);
  font-size: var(--fs-sm);
  font-weight: 550;
  color: var(--deep-text);
}
.kinds .app-icon {
  color: var(--yellow-300);
}
.note {
  margin-top: 22px;
  max-width: 50ch;
  color: var(--deep-text-2);
}
.mention-shot {
  position: relative;
}
.mention-frame {
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: 0 40px 80px -24px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
}
figcaption {
  margin-top: 14px;
  font-size: var(--fs-sm);
  color: var(--deep-text-2);
}

/* Arquivos */
.files-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(36px, 6vw, 88px);
  margin-top: clamp(36px, 5vw, 56px);
  align-items: start;
}
.tree {
  padding: clamp(18px, 2.4vw, 28px);
  border-radius: var(--r-xl);
  background: #120d2b;
  border: 1px solid var(--deep-border);
  font-family: var(--font-mono);
  font-size: clamp(0.78rem, 0.72rem + 0.25vw, 0.9rem);
  line-height: 1.5;
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.7);
  overflow-x: auto;
}
.line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px 14px;
  padding: 5px 0 5px calc(var(--depth) * 22px);
  transition: opacity 420ms var(--ease-out), translate 520ms var(--ease-out);
  transition-delay: calc(var(--i) * 70ms);
}

.name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #f1edff;
  white-space: nowrap;
}
.name .app-icon {
  color: var(--purple-300);
}
.name.folder .app-icon {
  color: var(--yellow-300);
}
.comment {
  color: #9c90c9;
  font-size: 0.92em;
}

.points {
  display: grid;
  gap: 28px;
  list-style: none;
}
.points li {
  display: flex;
  gap: 16px;
}
.point-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--r-lg);
  background: rgba(255, 203, 43, 0.14);
  color: var(--yellow-300);
}
.points h3 {
  font-size: var(--fs-lg);
  letter-spacing: -0.015em;
  color: #fff;
}
.points p {
  margin-top: 6px;
  color: var(--deep-text-2);
  max-width: 46ch;
}

@media (max-width: 899px) {
  .connect,
  .files-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (prefers-reduced-motion: reduce) {
  .line {
    opacity: 1;
    translate: none;
  }
}
</style>

<style>
/* As linhas da pasta aparecem uma a uma quando ela entra na tela — só com JavaScript
   (html.js vem do script do <head>); sem ele, ficam visíveis desde o começo. */
html.js .data-tree:not(.in) .line {
  opacity: 0;
  translate: -10px 0;
}
@media (prefers-reduced-motion: reduce) {
  html.js .data-tree:not(.in) .line {
    opacity: 1;
    translate: none;
  }
}
</style>
