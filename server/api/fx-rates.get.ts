import {
  CurrencyCode,
  CurrencyExchangeRates,
  BankExchangeRates,
  RateValues,
} from "../types/fx-rates"

const parseRateValues = (rateValues: RateValues): CurrencyExchangeRates[] => {
  const currencyExchangeRates: CurrencyExchangeRates[] = []
  const currencyCodes: CurrencyCode[] = ["usd", "rub", "eur", "kzt"]
  for (const currencyCode of currencyCodes) {
    const buyRateKey = `${currencyCode}_buy_rate` as keyof RateValues
    const sellRateKey = `${currencyCode}_sell_rate` as keyof RateValues
    const buyRate = rateValues[buyRateKey]
    const sellRate = rateValues[sellRateKey]

    if (buyRate || sellRate) {
      const defaultValue = buyRate || sellRate!
      currencyExchangeRates.push({
        currency_code: currencyCode,
        buy_rate: buyRate || defaultValue,
        sell_rate: sellRate || defaultValue,
      })
    }
  }
  return currencyExchangeRates
}

export default defineCachedEventHandler(
  async () => {
    const responseData = await $fetch<BankExchangeRates[]>(
      "https://www.akchabar.kg/api/v2/rates/"
    )
    return {
      exchange_rates: responseData.map(({ bank, rate_from, rate_values }) => ({
        bank,
        rate_from,
        exchange_rates: parseRateValues(rate_values),
      })),
    }
  },
  { maxAge: 60 * 15 }
)
