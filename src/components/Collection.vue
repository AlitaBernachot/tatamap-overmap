<script setup lang="ts">
import CollectionItem from '../components/CollectionItem.vue'
</script>

<template>
  <CollectionItem>
    <template #icon>
      ii
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </CollectionItem>
</template>