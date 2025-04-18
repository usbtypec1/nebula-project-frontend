<template>
  <div class="flex justify-center mt-12">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { useWebApp } from "vue-tg"

const { initData } = useWebApp()

const { login } = useAuth()

onMounted(async () => {
  await login(initData)
  await navigateTo({ name: "index" })
})
</script>
