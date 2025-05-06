<template>
  <div class="flex flex-col gap-y-4">
    <Message
      v-if="transactions.length === 0"
      severity="warn"
      icon="pi pi-exclamation-triangle"
      >Нет транзакций</Message
    >
    <Card
      v-for="{ transactions, date } in transactionsGroupedByDate"
      :key="date"
    >
      <template #title>
        <span class="text-md">{{ format(parseISO(date), "dd.MM.yy") }}</span>
      </template>
      <template #content>
        <div class="flex flex-col gap-y-4">
          <NuxtLink
            v-for="transaction in transactions"
            :key="transaction.id"
            :to="{ name: 'transactions-id', params: { id: transaction.id } }"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="font-semibold">{{ transaction.account_name }}</p>
                <p>{{ transaction.category_name }}</p>
              </div>
              <div>
                <p
                  class="font-semibold"
                  :class="[
                    transaction.category_type === CategoryType.Expense
                      ? 'text-red-500'
                      : 'text-emerald-500',
                  ]"
                >
                  <span
                    v-if="transaction.category_type === CategoryType.Expense"
                    >-</span
                  >
                  <span v-else>+</span>
                  <span>
                    {{
                      currencyFormatter.format(Number(transaction.amount))
                    }}</span
                  >
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { format, parseISO } from "date-fns"
import { CategoryType } from "~/types/categories"
import type {
  Transaction,
  TransactionsGroupedByDate,
} from "~/types/transactions"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KGS",
})

const emit = defineEmits<{
  delete: [id: number]
}>()

const props = defineProps<{
  transactions: Transaction[]
}>()

const transactionsGroupedByDate = computed((): TransactionsGroupedByDate[] => {
  const dateToTransactions: Record<string, Transaction[]> = {}
  for (const transaction of props.transactions) {
    const date = transaction.date.split("T")[0]
    if (!dateToTransactions[date]) {
      dateToTransactions[date] = []
    }
    dateToTransactions[date].push(transaction)
  }
  return Object.entries(dateToTransactions).map(([date, transactions]) => ({
    date,
    transactions,
  }))
})
</script>
