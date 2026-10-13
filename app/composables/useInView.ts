/** `visible` vira true (uma vez só) quando o elemento entra na tela. Sem IntersectionObserver: já visível. */
export function useInView(target: Ref<HTMLElement | null>, options: { threshold?: number; rootMargin?: string } = {}) {
  const visible = ref(false)
  let observer: IntersectionObserver | null = null
  onMounted(() => {
    if (!target.value || !('IntersectionObserver' in window)) {
      visible.value = true
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          visible.value = true
          observer?.disconnect()
        }
      },
      { threshold: options.threshold ?? 0.25, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
    )
    observer.observe(target.value)
  })
  onBeforeUnmount(() => observer?.disconnect())
  return visible
}
