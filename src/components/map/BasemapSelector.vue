<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/app'
import { useMapStore } from '@/stores/map'

const appStore = useAppStore()
const mapStore = useMapStore()

const { baseLayers: layers } = storeToRefs(appStore)
const { baseLayerContext } = storeToRefs(mapStore)
</script>

<template>
  <div id="basemap-selector" class="basemap-selector">
    <h3>Basemap selector</h3>
    <ul>
      <li v-for="layer in layers" :id="`layer-${layer.id}`">
        <input type="checkbox"
          :checked="baseLayerContext?.id === layer.id"
          @click="() => { if(baseLayerContext?.id !== layer.id) mapStore.setBaseLayer(layer) }" />
        <label @click="mapStore.setBaseLayer(layer)">
          {{ layer.name || layer.id }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.basemap-selector {
  @apply w-56 h-52 bg-white rounded-sm shadow-md;
}

ul {
  @apply m-0 p-0;
}

li {
  @apply m-0 p-0 list-none flex gap-2;
}
</style>