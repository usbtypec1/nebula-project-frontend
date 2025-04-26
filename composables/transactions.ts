import { CategoryType } from "~/types/categories"
import type { Transaction, TransactionListResponse } from "~/types/transactions"

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

interface TransactionListParams {
  take?: number
  skip?: number
  categoryType?: CategoryType
  fromDate?: string
  toDate?: string
}

export const useTransactionList = ({
  take,
  skip,
  categoryType,
  fromDate,
  toDate,
}: TransactionListParams) => {
  return useAuthorizedFetch<TransactionListResponse>("/v1/accounting/transactions/", {
    query: {
      take,
      skip,
      category_type: categoryType,
      from_date: fromDate,
      to_date: toDate,
    },
  })
}
