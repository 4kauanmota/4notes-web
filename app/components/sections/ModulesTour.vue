<script setup lang="ts">
/**
 * Os cinco módulos, um de cada vez, com capturas reais. A lista de módulos imita o menu
 * lateral do app; dá para trocar também clicando no menu lateral da própria captura.
 */
import { MODULES, RAIL_HOTSPOTS, type SiteModule } from '~/config/modules'

const active = ref(0)
const device = ref<'desktop' | 'phone'>('desktop')
const phoneSeen = ref(false)
const tabs = ref<HTMLButtonElement[]>([])
const current = computed(() => MODULES[active.value]!)

watch(device, (value) => {
  if (value === 'phone') phoneSeen.value = true
})

function select(index: number, focus = false) {
  active.value = (index + MODULES.length) % MODULES.length
  if (focus) nextTick(() => tabs.value[active.value]?.focus())
}

function onKeydown(event: KeyboardEvent) {
  const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
  if (event.key in keys) select(active.value + keys[event.key]!, true)
  else if (event.key === 'Home') select(0, true)
  else if (event.key === 'End') select(MODULES.length - 1, true)
  else return
  event.preventDefault()
}

const hotspot = (module: SiteModule) => {
  const box = RAIL_HOTSPOTS[module.id]
  return { top: `${box.top}%`, left: `${box.left}%`, width: `${box.width}%`, height: `${box.height}%` }
}
</script>

<template>
  <section id="modulos" class="section tour-section" aria-labelledby="modulos-title">
    <div class="container">
      <div class="head">
        <div>
          <h2 id="modulos-title" class="section-title">Uma ferramenta para cada parte do dia</h2>
          <p class="section-lead">Veja o que cada módulo faz, no computador e no celular. Todos falam a mesma língua: a mesma interface, os mesmos atalhos e a mesma pasta.</p>
        </div>
        <div class="seg" role="group" aria-label="Ver as capturas do">
          <button type="button" :aria-pressed="device === 'desktop'" @click="device = 'desktop'">
            <AppIcon name="monitor" :size="16" />
            Computador
          </button>
          <button type="button" :aria-pressed="device === 'phone'" @click="device = 'phone'">
            <AppIcon name="phone" :size="16" />
            Celular
          </button>
        </div>
      </div>

      <div class="tour">
        <div class="rail" role="tablist" aria-label="Módulos do 4notes" aria-orientation="vertical" @keydown="onKeydown">
          <button
            v-for="(module, index) in MODULES"
            :id="`tab-${module.id}`"
            :key="module.id"
            ref="tabs"
            type="button"
            role="tab"
            class="rail-item"
            :aria-selected="index === active"
            :tabindex="index === active ? 0 : -1"
            aria-controls="modulos-painel"
            @click="select(index)"
          >
            <span class="rail-icon"><AppIcon :name="module.icon" :size="22" /></span>
            <span class="rail-text">
              <span class="rail-name">{{ module.name }}</span>
              <span class="rail-key" aria-hidden="true">Ctrl + {{ module.key }}</span>
            </span>
          </button>
        </div>

        <div id="modulos-painel" class="panel" role="tabpanel" :aria-labelledby="`tab-${current.id}`">
          <div class="stage" :class="device">
            <AppWindow v-show="device === 'desktop'" class="stage-window">
              <div class="stack">
                <ThemedShot
                  v-for="(module, index) in MODULES"
                  :key="module.id"
                  :name="module.desktop"
                  class="layer"
                  :class="{ on: index === active }"
                  :aria-hidden="index !== active"
                  sizes="(min-width: 1240px) 900px, (min-width: 900px) 72vw, 94vw"
                />
              </div>
              <div
                v-for="(module, index) in MODULES"
                :key="`hs-${module.id}`"
                class="hotspot"
                :class="{ on: index === active }"
                :style="hotspot(module)"
                :title="`Abrir ${module.name}`"
                @click="select(index)"
              />
            </AppWindow>
            <div v-if="phoneSeen" v-show="device === 'phone'" class="phone-pad dots">
              <PhoneFrame class="pad-phone">
                <div class="stack">
                  <ThemedShot
                    v-for="(module, index) in MODULES"
                    :key="module.id"
                    :name="module.phone"
                    class="layer"
                    :class="{ on: index === active }"
                    :aria-hidden="index !== active"
                    sizes="280px"
                  />
                </div>
              </PhoneFrame>
            </div>
          </div>

          <div class="detail" aria-live="polite">
            <div>
              <h3 class="detail-name">{{ current.name }}</h3>
              <p class="detail-lead">{{ current.lead }}</p>
            </div>
            <ul class="points">
              <li v-for="point in current.points" :key="point">
                <AppIcon name="check" :size="18" :stroke="2.2" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
          <p v-if="device === 'desktop'" class="hint">
            Dica: dá para trocar de módulo clicando no menu lateral da própria captura, como no app.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
  flex-wrap: wrap;
}

/* Alternador computador/celular — o mesmo desenho do controle segmentado do app */
.seg {
  display: inline-flex;
  padding: 4px;
  gap: 2px;
  border-radius: var(--r-lg);
  background: var(--surface-3);
  border: 1px solid var(--border);
}
.seg button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  border: 0;
  border-radius: var(--r-md);
  background: transparent;
  color: var(--text-2);
  font-size: var(--fs-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--t-fast), color var(--t-fast), box-shadow var(--t-fast);
}
.seg button[aria-pressed='true'] {
  background: var(--surface);
  color: var(--primary-text);
  box-shadow: var(--shadow-sm), 0 0 0 1px var(--border);
}

.tour {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: clamp(20px, 3vw, 40px);
  margin-top: clamp(36px, 5vw, 56px);
  align-items: start;
}

/* Menu de módulos — como o menu lateral do app (com o indicador amarelo) */
.rail {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rail-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: var(--r-xl);
  background: transparent;
  color: var(--text-2);
  text-align: left;
  cursor: pointer;
  transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast);
}
.rail-item:hover {
  background: var(--hover);
  color: var(--text);
}
.rail-item[aria-selected='true'] {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
  box-shadow: var(--shadow-sm);
}
.rail-item::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  width: 4px;
  height: 0;
  border-radius: 0 4px 4px 0;
  background: var(--accent);
  translate: 0 -50%;
  transition: height var(--t-slow) var(--ease-spring);
}
.rail-item[aria-selected='true']::before {
  height: 26px;
}
.rail-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--r-lg);
  background: var(--surface-3);
  color: var(--text-2);
  transition: background var(--t-fast), color var(--t-fast);
}
.rail-item[aria-selected='true'] .rail-icon {
  background: var(--primary-soft);
  color: var(--primary-text);
}
.rail-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.rail-name {
  font-weight: 650;
  font-size: var(--fs-base);
}
.rail-key {
  font-size: var(--fs-xs);
  color: var(--text-3);
}

/* Palco */
.stage {
  position: relative;
}
.stack {
  display: grid;
}
.layer {
  grid-area: 1 / 1;
  opacity: 0;
  visibility: hidden;
  transform: scale(1.012);
  transition: opacity 360ms var(--ease-out), transform 520ms var(--ease-out), visibility 0s linear 360ms;
}
.layer.on {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition: opacity 360ms var(--ease-out), transform 520ms var(--ease-out), visibility 0s;
}

.hotspot {
  position: absolute;
  z-index: 2;
  border-radius: 22%;
  cursor: pointer;
  transition: box-shadow var(--t-fast);
}
.hotspot:hover {
  box-shadow: 0 0 0 2px var(--primary);
}
.hotspot.on {
  cursor: default;
}

.phone-pad {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  border-radius: clamp(8px, 1.1vw, 14px);
  border: 1px solid var(--border);
  background-color: var(--surface-2);
  overflow: hidden;
}
.pad-phone {
  width: min(26%, 260px);
}

.detail {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 16px 40px;
  margin-top: 28px;
}
.detail-name {
  font-size: var(--fs-xl);
}
.detail-lead {
  margin-top: 8px;
  color: var(--text-2);
  font-size: var(--fs-md);
  line-height: 1.5;
}
.points {
  display: grid;
  gap: 10px;
  list-style: none;
}
.points li {
  display: flex;
  gap: 10px;
  line-height: 1.5;
}
.points .app-icon {
  margin-top: 2px;
  color: var(--primary);
}
.hint {
  margin-top: 24px;
  font-size: var(--fs-sm);
  color: var(--text-3);
}

@media (max-width: 899px) {
  .tour {
    grid-template-columns: minmax(0, 1fr);
  }
  .rail {
    position: static;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    margin-inline: calc(-1 * var(--gutter));
    padding: 4px var(--gutter) 8px;
    scrollbar-width: none;
  }
  .rail::-webkit-scrollbar {
    display: none;
  }
  .rail-item {
    flex: none;
    width: auto;
    padding: 8px 14px 8px 8px;
    gap: 10px;
  }
  .rail-item::before {
    display: none;
  }
  .rail-icon {
    width: 34px;
    height: 34px;
  }
  .rail-key {
    display: none;
  }
  .detail {
    grid-template-columns: minmax(0, 1fr);
  }
  .hint {
    display: none;
  }
  .phone-pad {
    aspect-ratio: auto;
    padding: 28px 0;
  }
  .pad-phone {
    width: min(62%, 280px);
  }
}
</style>
