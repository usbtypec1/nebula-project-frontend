<template>
  <div class="flex justify-center mt-12">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { useMiniApp } from "vue-tg"

const { initData } = useMiniApp()

const { login, refresh, refreshToken, isAuthenticated } = useAuth()

onMounted(async () => {
  if (refreshToken.value) {
    await refresh()
  } else if (initData && initData.length > 0) {
    await login(initData)
  }
  if (isAuthenticated.value) {
    await navigateTo({ name: "index" })
  } else {
    await navigateTo({ name: "auth-failed" })
  }
})
</script>
