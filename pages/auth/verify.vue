<template>
  <div class="flex justify-center mt-12">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { useMiniApp } from "vue-tg"

const { initData, initDataUnsafe } = useMiniApp()

const { login, refresh, refreshToken, isAuthenticated } = useAuth()

onMounted(async () => {
  if (refreshToken.value) {
    await refresh()
  } else if (initData && initData.length > 0) {
    await login(initData)
  }
  if (isAuthenticated.value) {
    if (initDataUnsafe.start_param?.startsWith("account")) {
      const accountId = Number(initDataUnsafe.start_param.split('-')[1])
      await navigateTo({ name: "accounts-id-readonly", params: { id: accountId } })
    } else {
      await navigateTo({ name: "index" })
    }
  } else {
    await navigateTo({ name: "auth-failed" })
  }
})
</script>
