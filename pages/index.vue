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
        <template v-if="transactionsPage!.transactions.length > 0">
          <h4 class="font-semibold">Статистика</h4>
          <IncomeExpenseChart :transactions="transactionsPage!.transactions" />
          <ExpensesByCategoryChart
            :transactions="transactionsPage!.transactions"
          />
        </template>
        <Message v-else icon="pi pi-exclaimation-triangle">Добавьте вашу первую запись</Message>
      </div>
    </section>
    <section>
      <RecordCreateButton />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { AccountsResponse } from "~/types/accounts"

const { data: transactionsPage } = await useTransactionList({ take: 1000 })

const { data: accountsResponse, refresh } =
  await useAuthorizedFetch<AccountsResponse>("/v1/accounting/accounts/")
</script>
