/**
 * Capturas de tela do 4notes usadas no site (pasta public/screens/).
 *
 * Todas são do app de verdade, com um workspace de demonstração, em dois temas.
 * Nome dos arquivos: `<id>-<light|dark>-<largura>.webp`. Para trocar uma captura,
 * substitua os arquivos mantendo o nome (e as larguras listadas em `widths`).
 */

export type ShotKind = 'desktop' | 'phone' | 'fold' | 'crop'

export interface Shot {
  /** Prefixo do arquivo (ex.: "desktop-notes"). */
  id: string
  kind: ShotKind
  /** Larguras disponíveis, em pixels (a maior é a original). */
  widths: readonly number[]
  /** Proporção largura / altura da imagem. */
  ratio: number
  alt: string
}

const desktop = (id: string, alt: string): Shot => ({ id: `desktop-${id}`, kind: 'desktop', widths: [960, 1600, 2560], ratio: 1280 / 800, alt })
const phone = (id: string, alt: string): Shot => ({ id: `phone-${id}`, kind: 'phone', widths: [360, 720], ratio: 390 / 844, alt })

export const SHOTS = {
  notes: desktop('notes', 'O módulo Notas: categorias na lateral, quatro notas abertas em abas e a nota “Godot sinais e eventos” com checklist, lista numerada e um bloco de código colorido.'),
  tasks: desktop('tasks', 'O módulo Tarefas: tarefas atrasadas, de hoje e próximas, com o painel da tarefa recorrente “Estudar Godot” aberto ao lado.'),
  mindmap: desktop('mindmap', 'O Mapa Mental “Jogo de plataforma”: notas em cards coloridos ligadas por setas.'),
  links: desktop('links', 'O módulo Links: links salvos com o endereço do site e a categoria de cada um.'),
  timer: desktop('timer', 'As estatísticas do Timer: tempo total, gráfico por dia comparado com a semana anterior e divisão por categoria e atividade.'),
  timerSession: desktop('timer-session', 'Uma sessão Pomodoro em andamento no Timer, com a atividade e a categoria escolhidas.'),
  settings: desktop('settings', 'As configurações dos módulos: cada módulo pode ser ligado, desligado e reordenado.'),

  phoneNotes: phone('notes', 'Lista de notas no celular, com as categorias e a barra de módulos embaixo.'),
  phoneNote: phone('note', 'Uma nota aberta no celular, com a barra de formatação acima do teclado.'),
  phoneTasks: phone('tasks', 'Tarefas pendentes no celular.'),
  phoneMindmap: phone('mindmap', 'O Mapa Mental no celular.'),
  phoneLinks: phone('links', 'Links salvos no celular.'),
  phoneTimer: phone('timer', 'Um Pomodoro em andamento no celular.'),

  fold: { id: 'fold-notes', kind: 'fold', widths: [690, 1380], ratio: 690 / 830, alt: 'O 4notes na tela interna de um celular dobrável: lista de notas e nota aberta lado a lado.' } as Shot,

  editor: { id: 'crop-editor', kind: 'crop', widths: [765, 1530], ratio: 765 / 450, alt: 'Um trecho selecionado numa nota com a barra de formatação aberta: negrito, itálico, sublinhado, tachado, cor, marca-texto, título, listas, código e link. Abaixo, um bloco de código colorido.' } as Shot,
  mention: { id: 'crop-mention', kind: 'crop', widths: [555, 1110], ratio: 555 / 408, alt: 'Digitando “@god” numa nota: a lista sugere mapas, notas, links, tarefas e registros do Timer, cada um com o lugar de onde vem.' } as Shot,
} satisfies Record<string, Shot>

export type ShotName = keyof typeof SHOTS

export function shotSrc(shot: Shot, theme: 'light' | 'dark', width = shot.widths.at(-1)!): string {
  return `/screens/${shot.id}-${theme}-${width}.webp`
}

export function shotSrcset(shot: Shot, theme: 'light' | 'dark'): string {
  return shot.widths.map((w) => `${shotSrc(shot, theme, w)} ${w}w`).join(', ')
}
