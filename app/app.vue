<script setup lang="ts">
const { init } = useTheme()
// Endereços absolutos (compartilhamento e link canônico) — runtimeConfig.public.siteUrl, ver nuxt.config.ts
const siteUrl = useRuntimeConfig().public.siteUrl
useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
  meta: [
    { property: 'og:url', content: `${siteUrl}/` },
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
  ],
})
const { refresh } = useRelease()

onMounted(() => {
  init()
  void refresh()
})
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
