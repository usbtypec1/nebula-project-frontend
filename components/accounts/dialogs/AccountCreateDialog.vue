<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Создать аккаунт"
    :style="{ width: '25rem' }"
  >
    <AccountCreateForm @submit="onSubmit" />
  </Dialog>
</template>

<script setup lang="ts">
import type { AccountCreateEvent } from "~/types/accounts"
import { useWebAppPopup } from "vue-tg"

const emit = defineEmits<{
  created: []
}>()
const visible = defineModel<boolean>("visible", { default: false })

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
        emit("created")
      } else {
        showAlert("Не удалось создать аккаунт")
      }
    },
  })
}
</script>
