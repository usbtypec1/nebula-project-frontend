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
        visible.value = false
      } else {
        if (response.status === 409) {
          showAlert("Аккаунт с таким именем уже существует")
        } else if (response.status === 400) {
          showAlert("Некорректные данные")
        } else if (response.status === 403) {
          showAlert("Недостаточно прав для создания аккаунта")
        } else if (response.status === 500) {
          showAlert("Ошибка сервера")
        }
      }
    },
  })
}
</script>
