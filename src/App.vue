<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

import router from './router'

onMounted(() => router.replace({ path: '/' })) // Force for Electron.
</script>

<template>
  <header>
    <div>
      <nav>
        <img src="/favicon.svg" width="50" height="50" />
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  @apply absolute z-50 w-full h-14 bg-black;
}
</style>