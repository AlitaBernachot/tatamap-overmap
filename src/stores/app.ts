import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Layer } from '@/models/layer'

export const useAppStore = defineStore('app', () => {
  const layersDictionary: Ref<Layer[]> = ref([])
  const layers = computed(() => {
    return layersDictionary.value.filter(layer => !layer.isBaseLayer)
  })
  const baseLayers = computed(() => {
    return layersDictionary.value.filter(layer => layer.isBaseLayer)
  })

  function setLayersDictionary(newLayersDictionary: Layer[]) {
    layersDictionary.value = newLayersDictionary
  }

  return { layersDictionary, layers, baseLayers, setLayersDictionary }
})
