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

const { $authorizedFetch } = useNuxtApp()

const onSubmit = async (event: AccountCreateEvent) => {
  await $authorizedFetch("/v1/accounting/accounts/", {
    method: "POST",
    body: {
      name: event.name,
      initial_balance: event.initialBalance,
      is_public: event.isPublic,
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
