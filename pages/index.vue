<template>
  <div class="flex flex-col gap-y-4 justify-between h-full">
    <section class="flex flex-col gap-y-4">
      <PageSection>
        <MainPageAccountList
          :accounts-response="accountsResponse!"
          @created="refresh"
        />
      </PageSection>
      <SettingsMenubar />

      <div class="flex flex-col gap-y-4">
        <h4 class="font-semibold">Статистика</h4>
        <IncomeExpenseChart />
        <ExpensesByCategoryChart />
      </div>
    </section>
    <section>
      <DevOnly>
        <NuxtLink :to="{ name: 'record-create' }">
          <Button label="Добавить запись" fluid />
        </NuxtLink>
      </DevOnly>
      <MainButton
        text="Добавить запись"
        @click="navigateTo({ name: 'record-create' })"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { MainButton } from "vue-tg"
import type { AccountsResponse } from "~/types/accounts"

const { data: accountsResponse, refresh } =
  await useAuthorizedFetch<AccountsResponse>("/v1/accounting/accounts/")
</script>
