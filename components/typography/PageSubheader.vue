<template>
  <h1 class="text-sm font-semibold text-gray-500">{{ text }}</h1>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
