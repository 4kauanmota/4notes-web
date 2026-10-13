/**
 * A versão do 4notes para baixar: começa com os dados de config/downloads.ts (os que estão no
 * HTML gerado) e, no navegador, pergunta ao GitHub qual é a versão mais recente publicada.
 */
import { downloadsConfig, type DownloadFile, type PlatformId, type ReleaseInfo } from '~/config/downloads'

interface GithubAsset {
  name: string
  size: number
  browser_download_url: string
}
interface GithubRelease {
  tag_name: string
  html_url: string
  body?: string | null
  published_at?: string | null
  draft?: boolean
  prerelease?: boolean
  assets?: GithubAsset[]
}

export function releaseFromGithub(data: GithubRelease): ReleaseInfo | null {
  if (!data || typeof data.tag_name !== 'string' || data.draft || data.prerelease) return null
  const version = data.tag_name.replace(/^v/i, '')
  if (!/^\d+(\.\d+)*$/.test(version)) return null
  const asset = (platform: PlatformId): DownloadFile => {
    const found = (data.assets ?? []).find((item) => downloadsConfig.assetPatterns[platform].test(item.name))
    // Sem o arquivo dessa plataforma nesta versão: leva para a página da versão
    return found ? { url: found.browser_download_url, fileName: found.name, size: found.size } : { url: data.html_url, fileName: '', size: 0 }
  }
  return {
    version,
    date: (data.published_at ?? '').slice(0, 10) || downloadsConfig.fallback.date,
    pageUrl: data.html_url,
    notes: (data.body ?? '').trim() || '',
    windows: asset('windows'),
    android: asset('android'),
  }
}

export function useRelease() {
  const release = useState<ReleaseInfo>('release', () => structuredClone(downloadsConfig.fallback) as ReleaseInfo)
  const status = useState<'static' | 'loading' | 'live' | 'offline'>('release-status', () => 'static')

  async function refresh() {
    if (import.meta.server || !downloadsConfig.githubRepo || status.value !== 'static') return
    status.value = 'loading'
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 7000)
    try {
      const response = await fetch(`https://api.github.com/repos/${downloadsConfig.githubRepo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`)
      const latest = releaseFromGithub((await response.json()) as GithubRelease)
      if (!latest) throw new Error('Versão sem formato esperado')
      // Versão mais antiga que a conhecida (não deveria acontecer): fica com a conhecida
      if (compareVersions(latest.version, release.value.version) >= 0) {
        release.value = { ...latest, notes: latest.notes || (latest.version === release.value.version ? release.value.notes : '') }
      }
      status.value = 'live'
    } catch {
      status.value = 'offline'
    } finally {
      clearTimeout(timer)
    }
  }

  return { release, status, refresh }
}

export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff) return Math.sign(diff)
  }
  return 0
}

/** 112104129 → "107 MB"; 4077265 → "3,9 MB". */
export function formatSize(bytes: number): string {
  if (!bytes) return ''
  const mb = bytes / 1024 / 1024
  return `${mb >= 10 ? Math.round(mb) : mb.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`
}

/** "2026-10-13" → "13 de outubro de 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return ''
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
