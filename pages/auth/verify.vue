<template>
  <div>Аутентификация...</div>
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
