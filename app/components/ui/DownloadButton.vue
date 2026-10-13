<script setup lang="ts">
/** Botão de download de uma plataforma. O endereço vem de useRelease (GitHub ou config/downloads.ts). */
import { downloadsConfig, type PlatformId } from '~/config/downloads'

const props = withDefaults(defineProps<{ platform: PlatformId; primary?: boolean; detail?: boolean; small?: boolean }>(), {
  primary: false,
  detail: false,
  small: false,
})
const { release } = useRelease()
const info = computed(() => downloadsConfig.platforms[props.platform])
const file = computed(() => release.value[props.platform])
const available = computed(() => !!file.value.url)
const isDirectFile = computed(() => !!file.value.fileName)
const sizeLabel = computed(() => formatSize(file.value.size))
</script>

<template>
  <a
    v-if="available"
    class="btn download-btn"
    :class="{ 'btn-primary': primary, 'btn-sm': small, 'with-detail': detail }"
    :href="file.url"
    rel="noopener"
    :aria-label="`Baixar o 4notes ${release.version} para ${info.name}${isDirectFile && sizeLabel ? ` (${info.format}, ${sizeLabel})` : ''}`"
  >
    <AppIcon :name="info.icon" :size="small ? 16 : 20" />
    <span class="label">
      <span>Baixar para {{ info.name }}</span>
      <span v-if="detail" class="sub">{{ isDirectFile ? [info.format, sizeLabel].filter(Boolean).join(', ') : 'Página da versão no GitHub' }}</span>
    </span>
  </a>
  <span v-else class="btn download-btn" :class="{ 'btn-sm': small }" aria-disabled="true">
    <AppIcon :name="info.icon" :size="small ? 16 : 20" />
    <span class="label">{{ info.name }}: em breve</span>
  </span>
</template>

<style scoped>
.download-btn .label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.with-detail {
  min-height: 60px;
  padding-inline: 20px 24px;
}
.sub {
  font-size: var(--fs-xs);
  font-weight: 500;
}
</style>
