<template>
  <div class="flex flex-col gap-y-4 justify-between h-full">
    <section class="flex flex-col gap-y-4">
      <section class="grid grid-cols-2 gap-x-3">
        <Card
          v-for="account in accountsResponse!.accounts"
          :header="account.name"
          :key="account.id"
        >
          <template #title
            ><span class="pi pi-money-bill"></span> {{ account.name }}</template
          >
          <template #content> {{ account.balance }} сом </template>
        </Card>
      </section>
      <SettingsMenubar />
      
      <IncomeExpenseChart/>

    </section>
    <section>
      <DevOnly>
        <NuxtLink :to="{ name: 'add-record' }">
          <Button label="Добавить запись" fluid />
        </NuxtLink>
      </DevOnly>
      <MainButton
        text="Добавить запись"
        @click="navigateTo({ name: 'add-record' })"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { MainButton } from "vue-tg";
import type { AccountsResponse } from "~/types/accounts"

const runtimeConfig = useRuntimeConfig()
const { data: accountsResponse } = await useFetch<AccountsResponse>(
  "/v1/accounting/accounts/",
  {
    baseURL: runtimeConfig.public.apiBaseUrl,
    credentials: "include",
  }
)

</script>
