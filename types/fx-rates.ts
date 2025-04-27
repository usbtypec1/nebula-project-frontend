export type CurrencyCode = "kzt" | "rub" | "eur" | "usd"

export interface CurrencyExchangeRates {
  currency_code: CurrencyCode
  buy_rate: number
  sell_rate: number
}

export interface BankLogo {
  url: string
  image_source_name: string | null
  description: string
}

export interface Bank {
  name: string
  slug: string
  legal_name: string
  logo: BankLogo
}

export interface BankExchangeRates {
  rate_from: string
  bank: Bank | null
  exchange_rates: CurrencyExchangeRates[]
}
