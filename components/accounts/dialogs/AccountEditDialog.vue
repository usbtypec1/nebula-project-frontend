<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="`Аккаунт ${account.name}`"
    :style="{ width: '20rem' }"
  >
    <AccountCreateForm
      @submit="onSubmit"
      :initial-values="{
        name: account.name,
        isPublic: account.is_public,
        initialBalance: Number(account.initial_balance),
      }"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { usePopup } from "vue-tg"
import type { Account, AccountCreateEvent } from "~/types/accounts"

const { showAlert } = usePopup()
const { $authorizedFetch } = useNuxtApp()

const emit = defineEmits<{
  edit: []
}>()

const props = defineProps<{
  account: Account
}>()

const visible = defineModel<boolean>("visible", {
  default: false,
})

const onSubmit = async (event: AccountCreateEvent) => {
  $authorizedFetch(`/v1/accounting/accounts/${props.account.id}/`, {
    method: "PUT",
    body: {
      name: event.name,
      initial_balance: event.initialBalance,
      is_public: event.isPublic,
    },
    async onResponse({ response }) {
      if (response.ok) {
        visible.value = false
        emit("edit")
      } else {
        if (response.status === 409) {
          showAlert?.("Аккаунт с таким именем уже существует")
        } else if (response.status === 400) {
          showAlert?.("Некорректные данные")
        } else if (response.status === 403) {
          showAlert?.("Недостаточно прав для создания аккаунта")
        } else if (response.status === 500) {
          showAlert?.("Ошибка сервера")
        }
      }
    },
  })
}
</script>
