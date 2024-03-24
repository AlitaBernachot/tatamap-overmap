<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { Layer } from '@/models/layer'
import { useAppStore } from '@/stores/app'
import { useMapStore } from '@/stores/map'

const appStore = useAppStore()
const mapStore = useMapStore()

const { layers } = storeToRefs(appStore)

function toggleLayer(layerId: string, layer?: Layer): void {
  mapStore.toggleLayer(layerId, layer)
}
</script>

<template>
  <div id="layer-selector" class="layer-selector">
    <h3>Layer selector</h3>
    <ul>
      <li v-for="layer in layers" :id="`layer-${layer.id}`">
        <input type="checkbox" :checked="mapStore.hasLayer(layer.id)" @click="toggleLayer(layer.id, layer)" />
        <label @click="toggleLayer(layer.id, layer)">
          {{ layer.name || layer.id }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.layer-selector {
  @apply w-56 h-full bg-white rounded-sm shadow-md;
}

ul {
  @apply m-0 p-0;
}

li {
  @apply m-0 p-0 list-none flex gap-2;
}
</style>