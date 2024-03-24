<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { Map as OlMap } from 'ol'

import { computeMapContextDiff } from '@geospatial-sdk/core'
import { applyContextDiffToMap, createMapFromContext } from '@geospatial-sdk/openlayers'

import { useMapStore } from '@/stores/map'

const mapElement = ref<HTMLElement>()
const mapStore = useMapStore()
const { mapContext, mapIsInitialized } = storeToRefs(mapStore)
let map: OlMap

watch(
  [mapContext, mapIsInitialized],
  ([newMapContext, newIsInitialized], [oldMapContext, oldIsInitialized]) => {
  if (newIsInitialized === false) {
    return
  }

  applyContextDiffToMap(map, computeMapContextDiff(newMapContext, oldMapContext))
}, {immediate: false})

onMounted(() => {
  map = createMapFromContext(mapContext.value, mapElement.value)
})
</script>

<template>
  <div id="map" class="map" ref="mapElement"></div>
</template>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
}
</style>