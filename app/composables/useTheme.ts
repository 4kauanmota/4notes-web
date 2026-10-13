/**
 * Tema do site: segue o sistema até a pessoa escolher claro ou escuro (guardado no navegador).
 * O script no <head> (nuxt.config.ts) aplica o tema antes de a página aparecer; aqui ficam
 * o estado reativo e o botão de trocar.
 */
export type ThemePreference = 'system' | 'light' | 'dark'
export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = '4notes-web:theme'

export function useTheme() {
  // Começa em "system" no HTML gerado e na hidratação; a escolha guardada entra depois de montar.
  const preference = useState<ThemePreference>('theme-preference', () => 'system')
  const systemDark = useState<boolean>('theme-system-dark', () => false)
  const ready = useState<boolean>('theme-ready', () => false)

  const theme = computed<Theme>(() => {
    if (preference.value === 'system') return systemDark.value ? 'dark' : 'light'
    return preference.value
  })

  function init() {
    if (import.meta.server || ready.value) return
    ready.value = true
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = media.matches
    media.addEventListener('change', (event) => {
      systemDark.value = event.matches
    })
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved === 'light' || saved === 'dark') preference.value = saved
    } catch {
      // armazenamento bloqueado: segue o sistema
    }
    // Mantém o atributo do <html> igual à escolha (o CSS dos temas depende dele)
    watchEffect(() => {
      const root = document.documentElement
      if (preference.value === 'system') root.removeAttribute('data-theme')
      else root.dataset.theme = preference.value
    })
  }

  function toggle() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    // Voltou para o mesmo tema do sistema: deixa de guardar a escolha
    preference.value = next === (systemDark.value ? 'dark' : 'light') ? 'system' : next
    try {
      if (preference.value === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, preference.value)
    } catch {
      // armazenamento bloqueado: vale só nesta visita
    }
  }

  return { preference, theme, init, toggle }
}
