<template>
  <h1 class="text-xl font-semibold">{{ text }}</h1>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
