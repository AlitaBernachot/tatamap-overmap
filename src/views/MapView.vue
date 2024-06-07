<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import type { MapContextView } from '@geospatial-sdk/core'

import MapItem from '@/components/map/MapItem.vue'
import BasemapSelector from '@/components/map/BasemapSelector.vue'
import LayerSelector from '@/components/map/LayerSelector.vue'

import type { Layer } from '@/models/layer'
import { useAppStore } from '@/stores/app'
import { useMapStore } from '@/stores/map'

import jsonLayersDictionary from '@/data/layersDictionary.json'
import jsonMapConfig from '@/data/mapConfig.json'

const appStore = useAppStore()
const mapStore = useMapStore()

const { baseLayers } = storeToRefs(appStore)
const { mapIsInitialized } = storeToRefs(mapStore)

const layersDictionary = <Layer[]>(jsonLayersDictionary.layersDictionary)
const mapConfig = jsonMapConfig.mapConfig

onMounted(() => {
  appStore.setLayersDictionary(layersDictionary)
  mapStore.setBaseLayer(baseLayers.value[0])
  mapStore.setLayersContext([])
  mapStore.setView(<MapContextView>mapConfig.MapContextView)

  mapIsInitialized.value = true
})
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
  @apply absolute z-10 left-3 px-4 py-2 w-auto;
  height: calc(100% - var(--top-nav-height) - 20px);
  top: calc(10px + var(--top-nav-height))
}

main:deep(.basemap-selector) {
  @apply absolute z-10 bottom-3 right-3 px-4 py-2;
}
</style>
