export interface TransferCreateEvent {
  fromAccountId: number
  toAccountId: number
  amount: number
  date: Date
  description: string | null
}
