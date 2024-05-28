<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

import router from './router'

onMounted(() => router.replace({ path: '/' })) // Force for Electron.
</script>

<template>
  <RouterView />
</template>