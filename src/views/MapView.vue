<script setup lang="ts">
import { onMounted } from 'vue'

import MapItem from '@/components/map/MapItem.vue'
import BasemapSelector from '@/components/map/BasemapSelector.vue'
import LayerSelector from '@/components/map/LayerSelector.vue'

import type { Layer } from '@/models/layer'
import { useAppStore } from '@/stores/app'
import { useMapStore } from '@/stores/map'

const appStore = useAppStore()
const mapStore = useMapStore()

const layersDictionary: Layer[] = [
  {
    id: 'wms1',
    layerDefinition: {
      type: 'wms',
      url: 'https://data.geopf.fr/wms-r/wms',
      name: 'INSEE.FILOSOFI.POPULATION'
    }
  }, {
    id: 'wms2',
    layerDefinition: {
      type: 'wms',
      url: 'https://www.geoportal.de/openurl/https/services.bgr.de/wms/boden/gmk1000r/',
      name: 'geoportal'
    }
  }, {
    id: 'xyz',
    layerDefinition: {
      type: 'xyz',
      url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB',
    }
  }
]

onMounted(() => {
  appStore.setLayersDictionary(layersDictionary)
  mapStore.setBaseLayer({
    id: 'base',
    isBaseLayer: true,
    layerDefinition: {
      type: 'xyz',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    }
  })
  mapStore.setLayersContext(layersDictionary)
  mapStore.setView({
    zoom: 5,
    center: [6, 48.5]
  })
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
