export interface RateValues {
  kzt_buy_rate: number | null
  kzt_sell_rate: number | null
  kzt_buy_rate_diff: number | null
  kzt_buy_rate_diff_percentage: number | null
  kzt_sell_rate_diff: number | null
  kzt_sell_rate_diff_percentage: number | null
  rub_buy_rate: number | null
  rub_sell_rate: number | null
  rub_buy_rate_diff: number | null
  rub_buy_rate_diff_percentage: number | null
  rub_sell_rate_diff: number | null
  rub_sell_rate_diff_percentage: number | null
  eur_buy_rate: number | null
  eur_sell_rate: number | null
  eur_buy_rate_diff: number | null
  eur_buy_rate_diff_percentage: number | null
  eur_sell_rate_diff: number | null
  eur_sell_rate_diff_percentage: number | null
  usd_buy_rate: number | null
  usd_sell_rate: number | null
  usd_buy_rate_diff: number | null
  usd_buy_rate_diff_percentage: number | null
  usd_sell_rate_diff: number | null
  usd_sell_rate_diff_percentage: number | null
}

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
  rate_values: RateValues
}

export interface BankExchangeRatesResponse {
  rate_from: string
  bank: Bank | null
  currency_exchange_rates: CurrencyExchangeRates[]
}
