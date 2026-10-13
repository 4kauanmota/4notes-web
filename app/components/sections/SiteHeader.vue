<script setup lang="ts">
import { sections } from '~/config/site'

const { theme, toggle } = useTheme()
const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 8)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const themeLabel = computed(() => (theme.value === 'dark' ? 'Usar o tema claro' : 'Usar o tema escuro'))
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="container bar">
      <a class="brand fold-trigger" href="#inicio" aria-label="4notes, voltar ao início">
        <LogoMark :size="30" fold="hover" />
        <span class="brand-name" aria-hidden="true">4notes</span>
      </a>
      <nav class="nav" aria-label="Seções">
        <a v-for="section in sections.filter((s) => s.id !== 'baixar')" :key="section.id" :href="`#${section.id}`">{{ section.label }}</a>
      </nav>
      <div class="actions">
        <button type="button" class="icon-btn" :aria-label="themeLabel" :title="themeLabel" @click="toggle">
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="19" />
        </button>
        <a class="btn btn-primary btn-sm" href="#baixar">
          <AppIcon name="download" :size="16" />
          Baixar
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--t-med), background var(--t-med);
}
.site-header.scrolled {
  border-bottom-color: var(--border);
}
.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  text-decoration: none;
  border-radius: var(--r-md);
}
.brand-name {
  font-family: var(--font-display);
  font-size: 1.1875rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.nav {
  display: flex;
  gap: 4px;
  margin-left: 12px;
}
.nav a {
  padding: 8px 12px;
  border-radius: var(--r-md);
  color: var(--text-2);
  font-size: var(--fs-sm);
  font-weight: 550;
  text-decoration: none;
  transition: color var(--t-fast), background var(--t-fast);
}
.nav a:hover {
  color: var(--text);
  background: var(--hover);
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

@media (max-width: 760px) {
  .nav {
    display: none;
  }
}
</style>
