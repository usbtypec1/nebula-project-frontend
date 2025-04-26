<template>
  <main class="h-dvh px-3 py-4">
    <slot />
    <BackButton
      :visible="route.name !== 'index'"
      @click="navigateTo({ name: 'index' })"
    />
  </main>
</template>

<script setup lang="ts">
import { BackButton } from "vue-tg"

const route = useRoute()
</script>
