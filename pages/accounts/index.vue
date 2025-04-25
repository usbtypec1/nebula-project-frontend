<template>
  <div>
    <AccountListDataView
      :accounts="accountsResponse!.accounts"
      @delete="onDeleteAccount"
    />
    <section>
      <NuxtLink :to="{ name: 'accounts-create' }">
        <Button label="Создать аккаунт" fluid />
      </NuxtLink>
    </section>
    <BackButton @click="navigateTo({ name: 'index' })" />
  </div>
</template>

<script setup lang="ts">
import { useWebAppPopup, BackButton } from "vue-tg"

const { showAlert } = useWebAppPopup()

const { $authorizedFetch } = useNuxtApp()

const { data: accountsResponse, refresh } = await useAccountList()

const onDeleteAccount = async (accountId: number) => {
  await $authorizedFetch(`/v1/accounting/accounts/${accountId}/`, {
    method: "DELETE",
    async onResponse({ response }) {
      if (!response.ok) {
        showAlert("Не удалось удалить аккаунт")
      } else {
        await refresh()
      }
    },
  })
}
</script>
