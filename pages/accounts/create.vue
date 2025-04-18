<template>
  <div>
    <AccountCreateForm @submit="onSubmit" />
    <BackButton @click="navigateTo({ name: 'categories' })" />
  </div>
</template>

<script setup lang="ts">
import { BackButton } from "vue-tg"
import type { AccountCreateEvent } from "~/types/accounts"
import { useWebAppPopup } from "vue-tg"

const { showAlert } = useWebAppPopup()

const runtimeConfig = useRuntimeConfig()

const onSubmit = async (event: AccountCreateEvent) => {
  await $fetch("/v1/accounting/accounts/", {
    baseURL: runtimeConfig.public.apiBaseUrl,
    method: "POST",
    credentials: "include",
    body: {
      name: event.name,
      initial_balance: event.initialBalance,
    },
    async onResponse({ response }) {
      if (response.ok) {
        await navigateTo({ name: "accounts" })
      } else {
        showAlert("Не удалось создать аккаунт")
      }
    },
  })
}
</script>
