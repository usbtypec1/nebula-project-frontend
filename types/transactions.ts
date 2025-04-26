import type { CategoryType } from "./categories"
import type { Pagination } from "./pagination"

export interface Transaction {
  id: number
  account_id: number
  account_name: string
  category_id: number
  category_type: CategoryType
  category_name: string
  amount: string
  description: string | null
  date: string
  created_at: string
  updated_at: string
}

export interface TransactionListResponse {
  transactions: Transaction[]
  pagination: Pagination
}

export interface TransactionsGroupedByDate {
  date: string
  transactions: Transaction[]
}

export interface TransactionCreateEvent {
  accountId: number
  categoryId: number
  amount: number
  date: Date
  description: string | null
}
