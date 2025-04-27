<template>
  <div class="flex flex-col gap-4 pb-8">
    <PageHeader text="Курсы валют в Кыргызстане" />
    <SelectButton
      v-model="selectedCurrencyCode"
      :options="currencyCodes"
      :option-label="(value) => value.toUpperCase()"
    />
    <DataTable :value="values">
      <Column header="Название">
        <template #body="{ data }">
          <img v-if="data.logoUrl" :src="data.logoUrl" :width="50" />
          <span class="text-sm">{{ data.name }}</span>
        </template>
      </Column>
      <Column
        :field="`${selectedCurrencyCode}_buy_rate`"
        :header="`${selectedCurrencyCode.toUpperCase()} покупка`"
        sortable
      />
      <Column
        :field="`${selectedCurrencyCode}_sell_rate`"
        :header="`${selectedCurrencyCode.toUpperCase()} продажа`"
        sortable
      />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { BankExchangeRates } from "~/types/fx-rates"

const { data: banksExchangeRates } = await useFetch("/api/fx-rates", {
  transform(data: { exchange_rates: BankExchangeRates[] }) {
    return data.exchange_rates
  },
})

const currencyCodes = ["usd", "eur", "rub", "kzt"]
const selectedCurrencyCode = ref(currencyCodes[0])

const localizedNames: Record<string, string> = {
  Kyrgyzkommertsbank: "Кыргызкоммерцбанк",
  mossovet: "Моссовет",
}

const values = computed(() => {
  if (!banksExchangeRates.value) {
    return []
  }

  const result = []

  for (const { rate_from, bank, exchange_rates } of banksExchangeRates.value) {
    const exchangeRates: Record<string, number> = {}
    for (const { currency_code, buy_rate, sell_rate } of exchange_rates) {
      exchangeRates[`${currency_code}_buy_rate`] = buy_rate
      exchangeRates[`${currency_code}_sell_rate`] = sell_rate
    }
    const name = bank?.name ?? rate_from
    const localizedName = localizedNames[name] ?? name
    result.push({
      name: localizedName,
      logoUrl: bank?.logo.url,
      ...exchangeRates,
    })
  }
  return result
})
</script>
