<template>
  <div>Аутентификация...</div>
</template>

<script setup lang="ts">
import { useWebApp } from "vue-tg"

const { initData } = useWebApp()

const { login } = useAuth()

// onMounted(async () => {
//   await login(initData)
//   console.log(status.value)
//   if (status.value === "success") {
//     await navigateTo({ name: "index" })
//   } else if (status.value === "error") {
//     await navigateTo({ name: "auth-failed" })
//   }
// })


onMounted(async () => {
  await login(896678539)
  await navigateTo({ name: "index" })
})
</script>
