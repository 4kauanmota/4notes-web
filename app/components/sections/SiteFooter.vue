<script setup lang="ts">
import { sections, site } from '~/config/site'

const year = 2026
</script>

<template>
  <footer class="site-footer">
    <div class="container foot">
      <div class="brand fold-trigger">
        <LogoMark :size="26" fold="hover" />
        <div>
          <p class="name">4notes</p>
          <p class="tag">{{ site.slogan }}</p>
        </div>
      </div>
      <nav aria-label="Rodapé" class="links">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">{{ section.label }}</a>
        <a v-for="link in site.footerLinks" :key="link.href" :href="link.href" rel="noopener" target="_blank">
          {{ link.label }}
          <AppIcon name="external" :size="13" />
        </a>
      </nav>
      <p class="copy">Feito por {{ site.author }}. © {{ year }}. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  padding-block: 40px 48px;
  font-size: var(--fs-sm);
  color: var(--text-2);
}
.foot {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px 32px;
  align-items: center;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.name {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.015em;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
}
.links a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--text-2);
  text-decoration: none;
}
.links a:hover {
  color: var(--text);
  text-decoration: underline;
}
.copy {
  grid-column: 1 / -1;
  color: var(--text-3);
}
@media (max-width: 760px) {
  .foot {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
