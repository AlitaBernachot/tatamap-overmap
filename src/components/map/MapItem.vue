<script setup lang="ts">
import OlMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { onMounted } from 'vue'

onMounted(() => {
  new OlMap({
    target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })
})
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
}
</style>