/**
 * Os cinco módulos do 4notes como aparecem no site. Os textos descrevem só o que o app faz
 * de verdade (README e tutoriais do app); as capturas vêm de config/screens.ts.
 */
import type { ShotName } from './screens'

export interface SiteModule {
  id: 'notes' | 'tasks' | 'mindmap' | 'links' | 'timer'
  name: string
  icon: string
  /** Tecla do atalho Ctrl+<tecla> no app. */
  key: string
  /** Uma linha sobre o módulo — a mesma das Configurações do app (lib/modules.ts). */
  short: string
  /** Para que serve, numa frase. */
  lead: string
  points: string[]
  desktop: ShotName
  phone: ShotName
}

export const MODULES: SiteModule[] = [
  {
    id: 'notes',
    name: 'Notas',
    icon: 'notes',
    key: '1',
    short: 'Anotações rápidas em abas, com categorias e formatação.',
    lead: 'Anotações rápidas em abas, com formatação de verdade. Cada nota é um arquivo na sua pasta.',
    points: [
      'Categorias com cor, ícone ou foto — arraste a nota até uma delas.',
      'Títulos que começam igual viram pastas na lista, sem mexer nos arquivos.',
      'Notas numeradas, como “4notes 1.6.1”, ganham atalhos para a versão anterior e a próxima.',
      'Exporte em TXT ou PDF pelo botão direito.',
    ],
    desktop: 'notes',
    phone: 'phoneNote',
  },
  {
    id: 'tasks',
    name: 'Tarefas',
    icon: 'tasks',
    key: '2',
    short: 'Lista de tarefas com categorias, datas e repetição.',
    lead: 'Sua lista do dia, com datas, categorias e tarefas que voltam sozinhas.',
    points: [
      '“Revisar amanhã #estudos” já define a data e a categoria.',
      'Repetição diária, semanal, mensal ou a cada tantos dias depois de concluir.',
      'O que venceu com o app fechado aparece em Atrasadas quando você abre.',
      'A descrição tem a mesma formatação das notas: listas, checklists, negrito.',
    ],
    desktop: 'tasks',
    phone: 'phoneTasks',
  },
  {
    id: 'mindmap',
    name: 'Mapa mental',
    icon: 'graph',
    key: '3',
    short: 'Notas permanentes ligadas entre si, num mapa.',
    lead: 'Ideias como notas ligadas entre si, num mapa que você monta arrastando.',
    points: [
      'Shift + arrastar liga uma nota a outra; soltar no vazio cria uma nota já conectada.',
      '“Reorganizar” arruma o mapa evitando cruzamentos.',
      'Selecione várias notas para mover, colorir ou excluir de uma vez.',
      'Vários mapas, e cada nó é uma nota que você abre e edita.',
    ],
    desktop: 'mindmap',
    phone: 'phoneMindmap',
  },
  {
    id: 'links',
    name: 'Links',
    icon: 'link',
    key: '4',
    short: 'Links salvos com o ícone do site, em categorias.',
    lead: 'Cole um endereço: o título e o ícone do site chegam sozinhos.',
    points: [
      'Categorias com cor, ícone ou foto, e busca na lista inteira.',
      'Ordene por recentes, de A a Z ou pelo endereço.',
      'Importe os favoritos do navegador com poucos cliques.',
      'Links repetidos são reconhecidos e não entram duas vezes.',
    ],
    desktop: 'links',
    phone: 'phoneLinks',
  },
  {
    id: 'timer',
    name: 'Timer',
    icon: 'timer',
    key: '5',
    short: 'Cronômetro, temporizador e Pomodoro, com histórico e estatísticas.',
    lead: 'Cronômetro, temporizador e Pomodoro, com histórico e estatísticas do seu tempo.',
    points: [
      'A contagem vem do relógio: trocar de módulo ou fechar o app não atrapalha.',
      'Categoria e atividade opcionais, como “Estudo” e “Estudando Godot”.',
      'Gráficos por dia, por categoria e por atividade.',
      'Compare com a semana ou o mês anterior para ver o que mudou.',
    ],
    desktop: 'timer',
    phone: 'phoneTimer',
  },
]

/**
 * Onde ficam os botões dos módulos no menu lateral das capturas do computador (1280 × 800),
 * em porcentagem — para trocar de módulo clicando no próprio app da imagem.
 */
export const RAIL_HOTSPOTS: Record<SiteModule['id'], { top: number; left: number; width: number; height: number }> = {
  notes: { top: 43 / 8, left: 6 / 12.8, width: 52 / 12.8, height: 58 / 8 },
  tasks: { top: 107 / 8, left: 6 / 12.8, width: 52 / 12.8, height: 58 / 8 },
  mindmap: { top: 171 / 8, left: 6 / 12.8, width: 52 / 12.8, height: 58 / 8 },
  links: { top: 235 / 8, left: 6 / 12.8, width: 52 / 12.8, height: 58 / 8 },
  timer: { top: 299 / 8, left: 6 / 12.8, width: 52 / 12.8, height: 58 / 8 },
}
