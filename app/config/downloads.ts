/**
 * Downloads do 4notes — tudo o que o site precisa saber sobre as versões, num lugar só.
 *
 * Como funciona:
 *  1. Ao abrir a página, o site pergunta ao GitHub qual é a versão mais recente publicada em
 *     `githubRepo` (a mesma que o app usa para se atualizar: package.json → "updates"."github").
 *     Os botões passam a apontar para o instalador (.exe) e o APK dessa versão.
 *  2. Se o GitHub não responder (sem internet, limite de requisições…), valem os dados de
 *     `fallback` abaixo — que também são os que aparecem no HTML gerado.
 *
 * Ao publicar uma versão nova com `npm run release` no projeto do 4notes, o site se atualiza
 * sozinho. Atualize o `fallback` de vez em quando (versão, links e tamanhos) para o HTML
 * inicial não ficar desatualizado.
 *
 * Para usar outro endereço (ex.: um site próprio de downloads), preencha `url` em
 * `fallback.windows` / `fallback.android` e deixe `githubRepo` vazio.
 */

export type PlatformId = 'windows' | 'android'

export interface DownloadFile {
  /** Endereço do arquivo. Vazio = ainda não disponível (o botão aparece desativado). */
  url: string
  /** Nome do arquivo (ex.: 4notes-Setup-1.6.2.exe). */
  fileName: string
  /** Tamanho em bytes (0 = não mostrar). */
  size: number
}

export interface ReleaseInfo {
  /** Versão sem o "v" (ex.: "1.6.2"). */
  version: string
  /** Data de publicação (AAAA-MM-DD). */
  date: string
  /** Página da versão no GitHub. */
  pageUrl: string
  /** Notas da versão em Markdown simples (## títulos, - itens, **negrito**). */
  notes: string
  windows: DownloadFile
  android: DownloadFile
}

export const downloadsConfig = {
  /** "usuario/repositorio" público com os instaladores (GitHub Releases). Vazio = não consultar. */
  githubRepo: '4kauanmota/4notes-app',

  /** Página com todas as versões. */
  allReleasesUrl: 'https://github.com/4kauanmota/4notes-app/releases',

  /** Como reconhecer cada arquivo entre os anexos da versão no GitHub. */
  assetPatterns: {
    windows: /^4notes-Setup-.*\.exe$/i,
    android: /\.apk$/i,
  } satisfies Record<PlatformId, RegExp>,

  /** Versão publicada mais recente conhecida (usada no HTML gerado e se o GitHub não responder). */
  fallback: {
    version: '1.6.2',
    date: '2026-10-13',
    pageUrl: 'https://github.com/4kauanmota/4notes-app/releases/tag/v1.6.2',
    notes: `## Novidades
- **Atualizações automáticas**: ao abrir, o 4notes procura uma versão nova e pergunta se você quer instalar (Windows e Android).
- "Agora não" guarda a atualização em Configurações › Geral › Atualizações, para instalar quando quiser.
- Download com andamento; no Windows o app fecha, instala e abre de novo sozinho.

## Observações
- Suas notas, tarefas e configurações não são alteradas pela atualização.
- No Android, na primeira vez, é preciso permitir que o 4notes instale apps.`,
    windows: {
      url: 'https://github.com/4kauanmota/4notes-app/releases/download/v1.6.2/4notes-Setup-1.6.2.exe',
      fileName: '4notes-Setup-1.6.2.exe',
      size: 112_104_129,
    },
    android: {
      url: 'https://github.com/4kauanmota/4notes-app/releases/download/v1.6.2/4notes-1.6.2.apk',
      fileName: '4notes-1.6.2.apk',
      size: 4_077_265,
    },
  } satisfies ReleaseInfo,

  /** O que aparece em cada opção de download. */
  platforms: {
    windows: {
      name: 'Windows',
      icon: 'monitor',
      requirements: 'Windows 10 ou 11 (64 bits)',
      format: 'Instalador .exe',
      description: 'Instala só para o seu usuário, sem pedir administrador, e pergunta se você quer um atalho na área de trabalho.',
      help: 'O instalador ainda não tem assinatura digital. Se o Windows avisar, clique em “Mais informações” e depois em “Executar assim mesmo”.',
    },
    android: {
      name: 'Android',
      icon: 'phone',
      requirements: 'Android 7 ou mais recente',
      format: 'Arquivo .apk',
      description: 'Abra o arquivo no celular e permita a instalação quando o Android pedir. A interface se adapta a celulares, dobráveis e tablets.',
      help: 'Na primeira abertura, o 4notes pede acesso aos arquivos: é assim que o workspace fica numa pasta escolhida por você.',
    },
  } satisfies Record<PlatformId, { name: string; icon: string; requirements: string; format: string; description: string; help: string }>,
} as const
