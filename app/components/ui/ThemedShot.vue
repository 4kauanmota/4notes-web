<script setup lang="ts">
/**
 * Uma captura real do 4notes no tema do site. Enquanto o site segue o sistema, o próprio
 * navegador escolhe a versão clara ou escura (<source media>); se a pessoa escolheu um tema,
 * vale a escolha dela.
 */
import { SHOTS, shotSrc, shotSrcset, type ShotName } from '~/config/screens'

const props = withDefaults(defineProps<{ name: ShotName; sizes?: string; eager?: boolean; alt?: string }>(), {
  sizes: '100vw',
  eager: false,
  alt: undefined,
})
const { preference } = useTheme()
const shot = computed(() => SHOTS[props.name])
const forced = computed(() => (preference.value === 'system' ? null : preference.value))
const fallbackWidth = computed(() => shot.value.widths[Math.min(1, shot.value.widths.length - 1)])
const height = computed(() => Math.round(fallbackWidth.value! / shot.value.ratio))
</script>

<template>
  <picture class="themed-shot">
    <source v-if="!forced" media="(prefers-color-scheme: dark)" :srcset="shotSrcset(shot, 'dark')" :sizes="sizes" />
    <img
      :src="shotSrc(shot, forced ?? 'light', fallbackWidth)"
      :srcset="shotSrcset(shot, forced ?? 'light')"
      :sizes="sizes"
      :width="fallbackWidth"
      :height="height"
      :alt="alt ?? shot.alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      draggable="false"
    />
  </picture>
</template>

<style scoped>
.themed-shot,
.themed-shot img {
  display: block;
  width: 100%;
  height: auto;
}
.themed-shot img {
  user-select: none;
  -webkit-user-drag: none;
}
</style>
