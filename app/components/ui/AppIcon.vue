<script setup lang="ts">
/** Ícones do 4notes (SVG 24×24, traço) — os mesmos desenhos do app. Lista em lib/icons.ts. */
import { ICONS } from '~/lib/icons'

const props = withDefaults(defineProps<{ name: string; size?: number | string; stroke?: number }>(), { size: 20, stroke: 1.8 })
const body = computed(() => ICONS[props.name] ?? ICONS.info!)
</script>

<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="body"
  />
</template>

<style scoped>
.app-icon {
  flex: none;
}
</style>
