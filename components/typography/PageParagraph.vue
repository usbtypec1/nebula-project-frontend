<template>
  <p class="text-sm font-semibold">{{ text }}</p>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
