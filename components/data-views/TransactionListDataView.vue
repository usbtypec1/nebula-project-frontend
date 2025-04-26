<template>
  <div class="flex flex-col gap-y-4">
    <Card
      v-for="{ transactions, date } in transactionsGroupedByDate"
      :key="date"
    >
      <template #title>
        <span class="text-md">{{ format(parseISO(date), "dd.MM.yy") }}</span>
      </template>
      <template #content>
        <div class="flex flex-col gap-y-4">
          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="flex justify-between items-start"
          >
            <div>
              <p class="font-semibold">{{ transaction.account_name }}</p>
              <p>{{ transaction.category_name }}</p>
            </div>
            <div>
              <p class="font-semibold">KGS {{ transaction.amount }}</p>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { format, parse, parseISO } from "date-fns"
import type {
  Transaction,
  TransactionsGroupedByDate,
} from "~/types/transactions"

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
