/**
 * Markdown bem simples das notas de versão (## títulos, - itens, **negrito**, `código`, links).
 * Todo o texto é escapado antes: o resultado é seguro para v-html.
 */
const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function inline(text: string): string {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener" target="_blank">$1</a>')
}

export function renderNotes(markdown: string): string {
  const out: string[] = []
  let list = false
  const closeList = () => {
    if (list) out.push('</ul>')
    list = false
  }
  for (const raw of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trim()
    if (!line) {
      closeList()
      continue
    }
    const heading = /^#{1,6}\s+(.*)$/.exec(line)
    const item = /^[-*]\s+(.*)$/.exec(line)
    if (heading) {
      closeList()
      out.push(`<h4>${inline(heading[1]!)}</h4>`)
    } else if (item) {
      if (!list) out.push('<ul>')
      list = true
      out.push(`<li>${inline(item[1]!)}</li>`)
    } else {
      closeList()
      out.push(`<p>${inline(line)}</p>`)
    }
  }
  closeList()
  return out.join('')
}
