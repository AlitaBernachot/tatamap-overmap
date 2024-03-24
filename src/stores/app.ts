import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Layer } from '@/models/layer'

export const useAppStore = defineStore('app', () => {
  const layersDictionary: Ref<Layer[]> = ref([])

  function setLayersDictionary(newLayersDictionary: Layer[]) {
    layersDictionary.value = newLayersDictionary
  }

  return { layersDictionary, setLayersDictionary }
})
