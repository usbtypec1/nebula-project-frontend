<template>
  <div class="flex flex-col gap-y-4">
    <div>
      <p class="text-lg font-semibold">Период</p>
      <DatePicker
        v-model="period"
        selection-mode="range"
        fluid
        date-format="dd.mm.yy"
      />
    </div>
    <div class="flex flex-col justify-center items-center">
      <p class="text-sm font-semibold">Всего</p>
      <p class="text-2xl font-semibold">
        KGS {{ totalIncomesAmount - totalExpensesAmount }}
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <Card>
        <template #content>
          <p class="text-sm font-semibold">Доход</p>
          <p class="text-emerald-600 font-semibold text-lg">
            KGS {{ totalIncomesAmount }}
          </p>
        </template>
      </Card>
      <Card>
        <template #content>
          <p class="text-sm font-semibold">Расход</p>
          <p class="text-red-600 font-semibold text-lg">
            KGS {{ totalExpensesAmount }}
          </p>
        </template>
      </Card>
    </div>

    <TransactionListDataView :transactions="transactionListResponse!.transactions" />
  </div>
</template>

<script setup lang="ts">
import { useTransactionList } from "~/composables/transactions";
import { CategoryType } from "~/types/categories"
import type { Transaction } from "~/types/transactions"

const period = ref<Date>()

const { data: transactionListResponse } = await useTransactionList({})

const totalExpensesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactionListResponse.value!.transactions) {
    if (category_type === CategoryType.Expense) {
      result += Number(amount)
    }
  }
  return result
})

const totalIncomesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactionListResponse.value!.transactions) {
    if (category_type === CategoryType.Income) {
      result += Number(amount)
    }
  }
  return result
})
</script>
