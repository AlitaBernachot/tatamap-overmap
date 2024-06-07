import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'

import { type MapContext, type MapContextView } from '@geospatial-sdk/core'

import type { Layer } from '@/models/layer'


export const useMapStore = defineStore('map', () => {
  const mapIsInitialized = ref(false)
  const layersContext: Ref<Layer[]> = ref([])
  const baseLayerContext: Ref<Layer | undefined> = ref(undefined)
  const viewContext: Ref<MapContextView> = ref({
    zoom: 5,
    center: [6, 48.5]
  })
  const mapContext: ComputedRef<MapContext> = computed(() => {
    const layersContextValue = layersContext.value.map(layer => layer.layerDefinition).reverse()

    if (baseLayerContext.value) {
      layersContextValue.unshift(baseLayerContext.value.layerDefinition)
    }

    return {
      layers: layersContextValue,
      view: viewContext.value
    }
  })

  function setBaseLayer(layer: Layer) {
    baseLayerContext.value = layer
  }

  function setLayersContext(newLayersContext: Layer[]): void {
    layersContext.value = newLayersContext
  }

  function setView(newViewContext: MapContextView): void {
    viewContext.value = newViewContext
  }

  function hasLayer(layerId: string) {
    return !!getLayer(layerId)
  }

  function hasBaseLayer(layerId: string) {
    return !!(baseLayerContext.value?.id === layerId ? baseLayerContext.value : undefined)
  }

  function getLayer(layerId: string): Layer | undefined {
    return layersContext.value.find(layer => layer.id === layerId)
  }

  function addLayer(layerId: string, layer: Layer): void {
    toggleLayer(layerId, layer)
  }

  function removeLayer(layerId: string): void {
    toggleLayer(layerId)
  }

  function toggleLayer(layerId: string, layer?: Layer): void {
    let layersContextValue = [...layersContext.value]

    if (getLayer(layerId)) {
      layersContextValue = layersContext.value.filter(layer => layer.id !== layerId)
    } else if (layer) {
      layersContextValue = [...layersContext.value]
      layersContextValue.unshift(layer)
    }

    layersContext.value = layersContextValue
  }

  return {
    mapIsInitialized,
    mapContext,
    layersContext,
    baseLayerContext,
    viewContext,
    hasLayer,
    hasBaseLayer,
    setBaseLayer,
    setLayersContext,
    setView,
    addLayer,
    removeLayer,
    toggleLayer
  }
})
