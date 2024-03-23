<script setup lang="ts">
import MapItem from '../components/map/MapItem.vue'
import BasemapSelector from '../components/map/BasemapSelector.vue'
import LayerSelector from '../components/map/LayerSelector.vue'
</script>

<template>
  <main>
    <LayerSelector />
    <BasemapSelector />
    <MapItem />
  </main>
</template>

<style scoped>
main {
  @apply w-full h-full relative;
}

main:deep(.ol-viewport) {
  top: var(--top-nav-height);
  height: calc(100% - var(--top-nav-height)) !important;
}

main:deep(.layer-selector) {
  @apply absolute z-10 left-3 px-4 py-2;
  height: calc(100% - var(--top-nav-height) - 20px);
  top: calc(10px + var(--top-nav-height))
}

main:deep(.basemap-selector) {
  @apply absolute z-10 bottom-3 right-3 px-4 py-2;
}
</style>
