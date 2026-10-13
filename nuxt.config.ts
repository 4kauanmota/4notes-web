// Site do 4notes — Nuxt 4 gerado como site estático (`nuxt generate`), pronto para a Vercel.
// Docs: https://nuxt.com/docs/api/nuxt-config
import { site } from './app/config/site'

/**
 * Endereço público do site (para as imagens de compartilhamento e o link canônico).
 * Na Vercel ele vem sozinho do domínio de produção do projeto; para um domínio próprio,
 * defina NUXT_PUBLIC_SITE_URL (ex.: https://4notes.app) nas variáveis de ambiente.
 */
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/+$/, '')

/** Antes de desenhar a página: aplica o tema escolhido (evita piscar claro → escuro) e marca que há JavaScript. */
const themeScript = `(function(){var r=document.documentElement;r.classList.add('js');try{var t=localStorage.getItem('4notes-web:theme');if(t==='light'||t==='dark')r.dataset.theme=t}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  telemetry: false,

  // Componentes pelo nome do arquivo (<HeroSection />), em qualquer subpasta
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/tokens.css', '~/assets/css/base.css'],

  runtimeConfig: {
    public: { siteUrl },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: site.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: site.description },
        { name: 'author', content: site.author },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#efedf5', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#121016', media: '(prefers-color-scheme: dark)' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: site.name },
        { property: 'og:title', content: site.title },
        { property: 'og:description', content: site.description },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'A marca do 4notes, o slogan “Você decide o que você precisa” e o app aberto no módulo Notas.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: site.title },
        { name: 'twitter:description', content: site.description },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [{ innerHTML: themeScript, tagPosition: 'head' }],
    },
  },

  nitro: {
    prerender: { routes: ['/'], crawlLinks: false },
  },

  routeRules: {
    // Capturas e ícones: cache de 1 dia (podem ser trocados mantendo o nome)
    '/screens/**': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } },
  },

  typescript: { strict: true },

  vite: {
    build: { cssMinify: true },
  },
})
