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

function toggle(id: ModuleId) {
  if (isOn(id)) {
    if (enabled.value.length === 1) return // como no app: um módulo sempre fica ativo
    enabled.value = enabled.value.filter((item) => item !== id)
  } else {
    enabled.value = ALL.filter((item) => item === id || isOn(item))
  }
}

const listFormat = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' })
const names = (list: SiteModule[]) => listFormat.format(list.map((module) => module.name))

const summary = computed(() =>
  shown.value.length === MODULES.length ? 'As cinco ferramentas no menu.' : `${shown.value.length} de ${MODULES.length} no menu: ${names(shown.value)}.`,
)
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
          <button v-for="combo in COMBOS" :key="combo.label" type="button" class="combo" :aria-pressed="sameSet(combo.ids)" @click="enabled = [...combo.ids]">
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
          <TransitionGroup tag="ul" name="plug" class="rail-list">
            <li v-for="(module, index) in shown" :key="module.id" class="rail-item" :class="{ active: index === 0 }">
              <span class="rail-inner">
                <span class="rail-icon"><AppIcon :name="module.icon" :size="20" /></span>
                <span class="rail-label">{{ module.name }}</span>
              </span>
            </li>
          </TransitionGroup>
          <div class="rail-foot">
            <AppIcon name="moon" :size="18" />
            <AppIcon name="help" :size="18" />
            <AppIcon name="settings" :size="18" />
          </div>
        </div>
        <div class="preview-text">
          <p class="preview-kicker">O seu 4notes</p>
          <p class="preview-names" aria-live="polite">{{ summary }}</p>
          <p v-if="hidden.length" class="preview-rest">Fora do menu: {{ names(hidden) }}. Os dados continuam lá.</p>
          <p v-else class="preview-rest">Desligue o que não usa. Nada é apagado.</p>
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
  min-height: 520px;
  padding: clamp(18px, 2.4vw, 28px);
  border: 1px solid var(--border);
  border-radius: var(--r-2xl);
  background-color: var(--surface-2);
}
.rail {
  display: flex;
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
.rail-item {
  position: relative;
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
}
.rail-item.active .rail-inner {
  background: var(--surface);
  color: var(--primary-text);
  box-shadow: var(--shadow-sm);
}
.rail-item.active::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  width: 4px;
  height: 26px;
  border-radius: 0 4px 4px 0;
  background: var(--accent);
  translate: 0 -50%;
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

/* Ligar: o espaço abre, um fio roxo → amarelo cresce e o ícone encaixa. Desligar: o contrário. */
.plug-enter-active {
  animation: plug-open 620ms var(--ease-out) both;
}
.plug-enter-active .rail-inner {
  animation: plug-snap 620ms var(--ease-spring) 140ms both;
}
.plug-enter-active::after,
.plug-leave-active::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  height: 2px;
  width: calc(100% + 10px);
  background: linear-gradient(90deg, var(--purple-500), var(--yellow-400));
  transform-origin: left;
  border-radius: 2px;
}
.plug-enter-active::after {
  animation: plug-wire 620ms var(--ease-out) both;
}
.plug-leave-active {
  animation: plug-open 460ms var(--ease-in-out) reverse both;
}
.plug-leave-active .rail-inner {
  animation: plug-snap 360ms var(--ease-in-out) reverse both;
}
.plug-leave-active::after {
  animation: plug-wire 460ms var(--ease-in-out) reverse both;
}
.plug-enter-active,
.plug-leave-active {
  overflow: clip;
  overflow-clip-margin: 12px;
}
.plug-move {
  transition: transform 420ms var(--ease-out);
}
@keyframes plug-open {
  from {
    max-height: 0;
    margin-block: -3px;
  }
  to {
    max-height: 80px;
  }
}
@keyframes plug-snap {
  0% {
    opacity: 0;
    transform: translateX(-26px) scale(0.85);
  }
  70% {
    opacity: 1;
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
  100% {
    opacity: 1;
    transform: none;
  }
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
  .rail-item {
    flex: 1;
    max-width: 88px;
  }
  .rail-item.active::before {
    display: none;
  }
  .rail-label {
    font-size: 0.6875rem;
  }
  .plug-enter-active,
  .plug-leave-active {
    animation-name: plug-open-x;
  }
  .plug-enter-active::after,
  .plug-leave-active::after {
    display: none;
  }
  @keyframes plug-open-x {
    from {
      max-width: 0;
      flex-grow: 0;
    }
    to {
      max-width: 88px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .plug-enter-active,
  .plug-leave-active,
  .plug-enter-active .rail-inner,
  .plug-leave-active .rail-inner,
  .plug-enter-active::after,
  .plug-leave-active::after {
    animation: none;
  }
}
</style>
