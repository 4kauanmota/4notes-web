<script setup lang="ts">
/**
 * "Você decide o que você precisa", na prática: ligue e desligue os módulos e veja o menu
 * lateral mudar — como em Configurações › Módulos do app (desativar só tira do menu;
 * os dados ficam guardados e pelo menos um módulo continua ativo).
 */
import { MODULES, type SiteModule } from '~/config/modules'

type ModuleId = SiteModule['id']

const ALL = MODULES.map((module) => module.id)
const COMBOS: { label: string; ids: ModuleId[] }[] = [
  { label: 'Só anotar', ids: ['notes'] },
  { label: 'Estudos', ids: ['notes', 'tasks', 'timer'] },
  { label: 'Projetos', ids: ['notes', 'tasks', 'mindmap', 'links'] },
  { label: 'Tudo', ids: ALL },
]

const enabled = ref<ModuleId[]>([...ALL])
const iconsOnly = ref(false)

const isOn = (id: ModuleId) => enabled.value.includes(id)
const shown = computed(() => MODULES.filter((module) => isOn(module.id)))
const hidden = computed(() => MODULES.filter((module) => !isOn(module.id)))
const sameSet = (ids: ModuleId[]) => ids.length === enabled.value.length && ids.every(isOn)
/** O primeiro módulo do menu fica marcado como aberto (como no app). */
const firstOn = computed(() => shown.value[0]?.id ?? null)

/**
 * O que acabou de mudar em cada módulo ("on" ligou, "off" desligou): escolhe a animação
 * de conectar/desconectar da prévia. Ao abrir a página nada está marcado, então nada anima.
 */
const changed = reactive<Partial<Record<ModuleId, 'on' | 'off'>>>({})

function setEnabled(ids: readonly ModuleId[]) {
  const next = ALL.filter((id) => ids.includes(id))
  if (!next.length) return
  for (const id of ALL) if (next.includes(id) !== isOn(id)) changed[id] = next.includes(id) ? 'on' : 'off'
  enabled.value = next
}

function toggle(id: ModuleId) {
  if (isOn(id)) {
    if (enabled.value.length === 1) return // como no app: um módulo sempre fica ativo
    setEnabled(enabled.value.filter((item) => item !== id))
  } else {
    setEnabled([...enabled.value, id])
  }
}

const listFormat = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' })
const names = (list: SiteModule[]) => listFormat.format(list.map((module) => module.name))

const summaryOf = (on: SiteModule[]) =>
  on.length === MODULES.length ? 'As cinco ferramentas no menu.' : `${on.length} de ${MODULES.length} no menu: ${names(on)}.`
const restOf = (off: SiteModule[]) => (off.length ? `Fora do menu: ${names(off)}. Os dados continuam lá.` : 'Desligue o que não usa. Nada é apagado.')
const summary = computed(() => summaryOf(shown.value))
const rest = computed(() => restOf(hidden.value))

/**
 * Todos os textos possíveis da prévia (31 combinações). No celular a barra fica embaixo do
 * texto: com eles empilhados, invisíveis, no mesmo lugar, a prévia já tem a altura do mais
 * longo e a barra e os switches não pulam quando o texto ganha uma linha. Só no navegador
 * (fora do HTML gerado).
 */
const mounted = ref(false)
onMounted(() => (mounted.value = true))
const allTexts = computed(() => {
  if (!mounted.value) return []
  return Array.from({ length: 2 ** MODULES.length - 1 }, (_, index) => {
    const mask = index + 1
    const on = MODULES.filter((_, bit) => (mask >> bit) & 1)
    const off = MODULES.filter((_, bit) => !((mask >> bit) & 1))
    return { key: mask, title: summaryOf(on), rest: restOf(off) }
  })
})
</script>

<template>
  <section id="do-seu-jeito" class="section choose" aria-labelledby="escolha-title">
    <div class="container choose-grid">
      <div class="controls">
        <h2 id="escolha-title" class="section-title">Monte o seu 4notes</h2>
        <p class="section-lead">
          São cinco ferramentas e nenhuma é obrigatória. Ligue as que fazem parte da sua rotina; as outras saem do menu e esperam, com tudo
          guardado, até você precisar delas.
        </p>

        <div class="combos" role="group" aria-label="Combinações de exemplo">
          <span class="combos-label">Experimente:</span>
          <button v-for="combo in COMBOS" :key="combo.label" type="button" class="combo" :aria-pressed="sameSet(combo.ids)" @click="setEnabled(combo.ids)">
            {{ combo.label }}
          </button>
        </div>

        <ul class="switches">
          <li v-for="module in MODULES" :key="module.id" class="switch-row" :class="{ off: !isOn(module.id) }">
            <span class="row-icon"><AppIcon :name="module.icon" :size="20" /></span>
            <span class="row-text">
              <span class="row-name">{{ module.name }}</span>
              <span class="row-desc">{{ module.short }}</span>
            </span>
            <button
              type="button"
              role="switch"
              class="switch"
              :class="{ on: isOn(module.id) }"
              :aria-checked="isOn(module.id)"
              :aria-label="`${module.name} no menu`"
              :aria-disabled="isOn(module.id) && enabled.length === 1"
              :title="isOn(module.id) && enabled.length === 1 ? 'Pelo menos um módulo fica ativo' : undefined"
              @click="toggle(module.id)"
            >
              <span class="knob" />
            </button>
          </li>
        </ul>

        <div class="menu-style">
          <span id="estilo-menu">Menu lateral</span>
          <div class="seg" role="group" aria-labelledby="estilo-menu">
            <button type="button" :aria-pressed="!iconsOnly" @click="iconsOnly = false">Ícone e nome</button>
            <button type="button" :aria-pressed="iconsOnly" @click="iconsOnly = true">Só o ícone</button>
          </div>
        </div>

        <p class="note">
          No app é igual: em Configurações › Módulos ou no botão direito do menu lateral. Desativar um módulo não apaga nada, e a ordem do
          menu você muda arrastando.
        </p>
      </div>

      <!-- Prévia do menu lateral (a mesma mudança é anunciada no texto abaixo) -->
      <div class="preview dots">
        <div class="rail" :class="{ 'icons-only': iconsOnly }" aria-hidden="true">
          <LogoMark class="rail-logo" :size="30" />
          <!--
            Os cinco módulos ficam sempre aqui; o desligado se recolhe (e volta) por transições,
            então ligar e desligar no meio da animação continua de onde parou, sem saltos.
          -->
          <ul class="rail-list">
            <li
              v-for="module in MODULES"
              :key="module.id"
              class="rail-item"
              :class="[{ off: !isOn(module.id), active: module.id === firstOn }, changed[module.id] ? `just-${changed[module.id]}` : '']"
            >
              <span class="rail-clip">
                <span class="rail-inner">
                  <span class="rail-icon"><AppIcon :name="module.icon" :size="20" /></span>
                  <span class="rail-label">{{ module.name }}</span>
                </span>
              </span>
            </li>
          </ul>
          <div class="rail-foot">
            <AppIcon name="moon" :size="18" />
            <AppIcon name="help" :size="18" />
            <AppIcon name="settings" :size="18" />
          </div>
        </div>
        <div class="preview-text">
          <div class="preview-copy">
            <p class="preview-kicker">O seu 4notes</p>
            <p class="preview-names" aria-live="polite">{{ summary }}</p>
            <p class="preview-rest">{{ rest }}</p>
          </div>
          <div v-for="text in allTexts" :key="text.key" class="preview-copy preview-ghost" aria-hidden="true">
            <p class="preview-kicker">O seu 4notes</p>
            <p class="preview-names">{{ text.title }}</p>
            <p class="preview-rest">{{ text.rest }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.choose-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(36px, 6vw, 88px);
  align-items: center;
}

.combos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
}
.combos-label {
  margin-right: 4px;
  font-size: var(--fs-sm);
  color: var(--text-2);
}
.combo {
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  font-size: var(--fs-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
}
.combo:hover {
  background: var(--surface-3);
}
.combo[aria-pressed='true'] {
  background: var(--accent-soft);
  border-color: var(--accent-strong);
  color: var(--text);
}

/* Linhas com switch — o mesmo desenho de Configurações › Módulos */
.switches {
  display: grid;
  gap: 8px;
  margin-top: 20px;
  list-style: none;
}
.switch-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--surface);
  transition: background var(--t-med), border-color var(--t-med);
}
.switch-row.off {
  background: transparent;
  border-style: dashed;
}
.row-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: var(--r-md);
  background: var(--primary-soft);
  color: var(--primary-text);
  transition: background var(--t-med), color var(--t-med);
}
.switch-row.off .row-icon {
  background: var(--surface-3);
  color: var(--text-3);
}
.row-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  line-height: 1.35;
}
.row-name {
  font-weight: 650;
}
.row-desc {
  font-size: var(--fs-sm);
  color: var(--text-2);
}
.switch {
  position: relative;
  flex: none;
  width: 44px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--border-strong);
  cursor: pointer;
  transition: background var(--t-med) var(--ease-out);
}
.switch.on {
  background: var(--btn-primary);
}
.switch[aria-disabled='true'] {
  opacity: 0.55;
  cursor: not-allowed;
}
.switch:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform var(--t-med) var(--ease-spring);
}
.switch.on .knob {
  transform: translateX(18px);
}

.menu-style {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  margin-top: 16px;
  font-weight: 600;
}
.seg {
  display: inline-flex;
  padding: 4px;
  gap: 2px;
  border-radius: var(--r-lg);
  background: var(--surface-3);
  border: 1px solid var(--border);
}
.seg button {
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: var(--r-md);
  background: transparent;
  color: var(--text-2);
  font-size: var(--fs-sm);
  font-weight: 600;
  cursor: pointer;
}
.seg button[aria-pressed='true'] {
  background: var(--surface);
  color: var(--primary-text);
  box-shadow: var(--shadow-sm), 0 0 0 1px var(--border);
}
.note {
  margin-top: 18px;
  max-width: 54ch;
  font-size: var(--fs-sm);
  color: var(--text-2);
}

/* Prévia: o menu lateral do app, ampliado */
.preview {
  display: flex;
  align-items: stretch;
  gap: clamp(20px, 3vw, 36px);
  /* Cabe o menu com os cinco módulos: a altura não muda ao ligar e desligar (nada "pula") */
  min-height: 560px;
  padding: clamp(18px, 2.4vw, 28px);
  border: 1px solid var(--border);
  border-radius: var(--r-2xl);
  background-color: var(--surface-2);
}
.rail {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: stretch;
  width: 112px;
  padding: 14px 10px;
  border-radius: var(--r-xl);
  background: var(--bg);
  box-shadow: var(--shadow-md), 0 0 0 1px var(--border);
  transition: width var(--t-slow) var(--ease-out);
}
.rail.icons-only {
  width: 70px;
}
.rail-logo {
  align-self: center;
  margin-bottom: 14px;
}
.rail-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
}

/*
 * Ligar e desligar: o módulo fica sempre na lista e só se recolhe. A altura vai de 0 até a
 * altura de verdade (grid-template-rows 0fr ↔ 1fr) e a margem negativa desconta o espaço
 * entre os itens; como são transições, um clique no meio do caminho volta de onde parou.
 */
.rail-item {
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  transition:
    grid-template-rows 440ms var(--ease-out),
    margin 440ms var(--ease-out);
}
.rail-item.off {
  grid-template-rows: 0fr;
  margin-block: -3px;
  pointer-events: none;
  transition:
    grid-template-rows 380ms var(--ease-in-out) 60ms,
    margin 380ms var(--ease-in-out) 60ms;
}
.rail-clip {
  min-height: 0;
  /* Corta só na altura: a sombra e o brilho do ícone continuam visíveis dos lados */
  overflow-y: clip;
}
.rail-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: var(--r-lg);
  color: var(--text-2);
  transition:
    opacity 260ms var(--ease-out) 120ms,
    transform 560ms var(--ease-spring) 120ms,
    background var(--t-med),
    color var(--t-med),
    box-shadow var(--t-med);
}
/* Desligado: o ícone sai de lado, encolhendo (o contrário do encaixe) */
.rail-item.off .rail-inner {
  opacity: 0;
  transform: translateX(-26px) scale(0.85);
  transition:
    opacity 220ms ease-in,
    transform 320ms var(--ease-in-out),
    background var(--t-med),
    color var(--t-med),
    box-shadow var(--t-med);
}
.rail-item.active .rail-inner {
  background: var(--surface);
  color: var(--primary-text);
  box-shadow: var(--shadow-sm);
}
/* Indicador do módulo aberto (passa para o próximo quando o primeiro é desligado) */
.rail-item::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  width: 4px;
  height: 26px;
  border-radius: 0 4px 4px 0;
  background: var(--accent);
  translate: 0 -50%;
  opacity: 0;
  transition: opacity var(--t-med);
}
.rail-item.active::before {
  opacity: 1;
}
.rail-icon {
  display: grid;
  place-items: center;
}
.rail-label {
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity var(--t-med);
}
.icons-only .rail-label {
  display: none;
}
.rail-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 18px;
  color: var(--text-3);
}

/*
 * O "fio" (roxo → amarelo) que conecta o módulo ao menu e o brilho do encaixe. Só tocam no
 * módulo que acabou de mudar (just-on / just-off); trocar de uma classe para a outra
 * recomeça a animação.
 */
.rail-item::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  height: 2px;
  width: calc(100% + 10px);
  border-radius: 2px;
  background: linear-gradient(90deg, var(--purple-500), var(--yellow-400));
  transform-origin: left;
  opacity: 0;
  pointer-events: none;
}
.rail-item.just-on::after {
  animation: plug-wire 620ms var(--ease-out) both;
}
.rail-item.just-off::after {
  animation: plug-unwire 460ms var(--ease-in-out) both;
}
.rail-item.just-on .rail-inner {
  animation: plug-glow 640ms var(--ease-out) 260ms;
}
@keyframes plug-wire {
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  60% {
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 0;
  }
}
@keyframes plug-unwire {
  0% {
    transform: scaleX(1);
    opacity: 0;
  }
  35% {
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    opacity: 1;
  }
}
@keyframes plug-glow {
  45% {
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
}

.preview-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.preview-kicker {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--text-2);
}
.preview-names {
  margin-top: 8px;
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.preview-rest {
  margin-top: 12px;
  color: var(--text-2);
}
.preview-ghost {
  display: none;
}

@media (max-width: 899px) {
  /* Uma coluna: a prévia sobe para logo depois dos exemplos, perto dos switches */
  .choose-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .controls {
    display: contents;
  }
  .switches,
  .menu-style,
  .note {
    order: 2;
  }
  .preview {
    order: 1;
    margin-top: 20px;
  }
  /* No celular, o menu do app vira a barra de baixo — a prévia também */
  .preview {
    flex-direction: column-reverse;
    min-height: 0;
  }
  .rail,
  .rail.icons-only {
    flex-direction: row;
    align-items: center;
    width: auto;
    padding: 8px;
  }
  .rail-logo,
  .rail-foot {
    display: none;
  }
  .rail-list {
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
  }
  /*
   * Na barra, cada módulo tem a mesma parte do espaço, com o conteúdo (até 88 px) no meio
   * dela, como o space-around da 1.0.0. Ao desligar, a parte (flex-grow) e o limite do
   * conteúdo (max-width) vão a 0, então o recolhido não deixa espaço sobrando. Ligado, o
   * item nunca fica mais estreito que o nome ("Mapa mental" em telas de 344 a 390 px).
   */
  .rail-item,
  .rail-item.off {
    grid-template-rows: 1fr;
  }
  .rail-item {
    flex: 1 1 0;
    transition:
      flex-grow 440ms var(--ease-out),
      margin 440ms var(--ease-out);
  }
  .rail-item.off {
    flex-grow: 0;
    margin-block: 0;
    margin-inline: -3px;
    transition:
      flex-grow 380ms var(--ease-in-out) 60ms,
      margin 380ms var(--ease-in-out) 60ms;
  }
  .rail-clip {
    justify-self: center;
    width: 100%;
    min-height: auto;
    max-width: 88px;
    overflow-y: visible;
    overflow-x: clip;
    transition: max-width 440ms var(--ease-out);
  }
  .rail-item.off .rail-clip {
    max-width: 0;
    transition: max-width 380ms var(--ease-in-out) 60ms;
  }
  .rail-item.off .rail-inner {
    transform: translateY(10px) scale(0.85);
  }
  .rail-item::before,
  .rail-item::after {
    display: none;
  }
  .rail-label {
    font-size: 0.6875rem;
  }
  /* Altura do texto mais longo (ver allTexts); o texto atual fica no meio, como no computador */
  .preview-text {
    display: grid;
    align-items: center;
  }
  .preview-copy {
    grid-area: 1 / 1;
  }
  .preview-ghost {
    display: block;
    visibility: hidden;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rail-item,
  .rail-item.off,
  .rail-item .rail-clip,
  .rail-item.off .rail-clip,
  .rail-item .rail-inner,
  .rail-item.off .rail-inner {
    transition: none;
  }
  .rail-item.just-on::after,
  .rail-item.just-off::after,
  .rail-item.just-on .rail-inner {
    animation: none;
  }
}
</style>
