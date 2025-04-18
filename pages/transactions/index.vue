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

    <TransactionListDataView :transactions="transactions" />

    <BackButton @click="navigateTo({ name: 'index' })" />
  </div>
</template>

<script setup lang="ts">
import { CategoryType } from "~/types/categories"
import type { Transaction } from "~/types/transactions"
import { BackButton } from "vue-tg";

const period = ref<Date>()

const transactions: Transaction[] = [
  {
    id: 1,
    account_id: 101,
    account_name: "Main Account",
    category_id: 1,
    category_type: 1,
    category_name: "Salary",
    amount: "3000.00",
    description: "March salary",
    date: "2025-03-31",
    created_at: "2025-03-31T10:00:00Z",
    updated_at: "2025-03-31T10:00:00Z",
  },
  {
    id: 4,
    account_id: 101,
    account_name: "Main Account",
    category_id: 1,
    category_type: 1,
    category_name: "Salary",
    amount: "3000.00",
    description: "March salary",
    date: "2025-03-31",
    created_at: "2025-03-31T10:00:00Z",
    updated_at: "2025-03-31T10:00:00Z",
  },
  {
    id: 2,
    account_id: 101,
    account_name: "Main Account",
    category_id: 2,
    category_type: 2,
    category_name: "Groceries",
    amount: "150.45",
    description: "Weekly grocery shopping",
    date: "2025-04-01",
    created_at: "2025-04-01T15:30:00Z",
    updated_at: "2025-04-01T15:30:00Z",
  },
  {
    id: 3,
    account_id: 102,
    account_name: "Savings",
    category_id: 3,
    category_type: 2,
    category_name: "Transfer to Savings",
    amount: "500.00",
    description: null,
    date: "2025-04-02",
    created_at: "2025-04-02T09:00:00Z",
    updated_at: "2025-04-02T09:00:00Z",
  },
]

const totalExpensesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactions) {
    if (category_type === CategoryType.Expense) {
      result += Number(amount)
    }
  }
  return result
})

const totalIncomesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactions) {
    if (category_type === CategoryType.Income) {
      result += Number(amount)
    }
  }
  return result
})
</script>
