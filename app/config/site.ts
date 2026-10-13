/** Textos e endereços gerais do site. O endereço público vem do nuxt.config.ts (runtimeConfig.public.siteUrl). */
export const site = {
  name: '4notes',
  title: '4notes — Você decide o que você precisa',
  slogan: 'Você decide o que você precisa.',
  description:
    'Notas, tarefas, mapas mentais, links e timer num só app. Você liga as ferramentas que usa, organiza do seu jeito e guarda tudo numa pasta sua. Para Windows e Android, sem conta e sem login.',
  author: 'Kauan',
  /** Links do rodapé (só os que existem de verdade). */
  footerLinks: [{ label: 'Versões no GitHub', href: 'https://github.com/4kauanmota/4notes-app/releases' }],
} as const

/** As seções da página (menu do topo e rodapé). */
export const sections = [
  { id: 'do-seu-jeito', label: 'Do seu jeito' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'recursos', label: 'Recursos' },
  { id: 'seus-dados', label: 'Seus dados' },
  { id: 'baixar', label: 'Baixar' },
] as const
