import { CategoryType } from "~/types/categories"
import type { Transaction } from "~/types/transactions"

export const useTransactions = (transactions: Ref<Transaction[]>) => {
  const incomeTransactions = computed((): Transaction[] =>
    transactions.value.filter(
      (transaction) => transaction.category_type === CategoryType.Income
    )
  )
  const expenseTransactions = computed((): Transaction[] =>
    transactions.value.filter(
      (transaction) => transaction.category_type === CategoryType.Expense
    )
  )

  return { incomeTransactions, expenseTransactions }
}
