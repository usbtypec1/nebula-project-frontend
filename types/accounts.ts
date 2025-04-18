export interface Account {
  id: number
  name: string
  is_public: boolean
  initial_balance: string
  balance: string
  created_at: string
}

export interface AccountsResponse {
  accounts: Account[]
  total_balance: string
}

export interface AccountCreateEvent {
  name: string
  initialBalance: number
}
