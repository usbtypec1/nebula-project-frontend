<template>
  <div class="flex flex-col gap-y-4">
    <PageHeader text="История" />
    <div class="flex flex-col gap-y-2">
      <p class="text-lg font-semibold">Период</p>
      <div class="flex gap-x-2">
        <Tag
          v-for="option in periodOptions"
          :value="option.label"
          rounded
          :severity="periodOption === option.value ? 'primary' : 'secondary'"
          @click="onPeriodOptionChange(option.value)"
          class="cursor-pointer"
        />
      </div>
      <DatePicker
        v-show="periodOption === 'period'"
        v-model="period"
        selection-mode="range"
        fluid
        date-format="dd.mm.yy"
      />
    </div>
    <div class="flex flex-col justify-center items-center">
      <p class="text-sm font-semibold">Всего</p>
      <p class="text-2xl font-semibold">
        {{ currencyFormatter.format(totalIncomesAmount - totalExpensesAmount) }}
      </p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <Card>
        <template #content>
          <p class="text-sm font-semibold">Доход</p>
          <p class="text-emerald-600 font-semibold text-lg">
            {{ currencyFormatter.format(totalIncomesAmount) }}
          </p>
        </template>
      </Card>
      <Card>
        <template #content>
          <p class="text-sm font-semibold">Расход</p>
          <p class="text-red-600 font-semibold text-lg">
            {{ currencyFormatter.format(totalExpensesAmount) }}
          </p>
        </template>
      </Card>
    </div>

    <TransactionListDataView
      :transactions="transactionListResponse!.transactions"
    />
  </div>
</template>

<script setup lang="ts">
import { CategoryType } from "~/types/categories"
import { endOfMonth, formatISO, startOfMonth, subMonths } from "date-fns"
import type { TransactionListResponse } from "~/types/transactions"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KGS",
})

const period = ref<Date[]>([startOfMonth(new Date()), new Date()])

const periodOptions = [
  { label: "Текущий месяц", value: "currentMonth" },
  { label: "3 месяца", value: "threeMonths" },
  { label: "Период", value: "period" },
]
const periodOption = ref<string>("currentMonth")
const onPeriodOptionChange = (option: string) => {
  periodOption.value = option
  if (option === "currentMonth") {
    period.value = [startOfMonth(new Date()), new Date()]
  } else if (option === "threeMonths") {
    period.value = [subMonths(new Date(), 3), new Date()]
  } else if (option === "period") {
    period.value = [startOfMonth(new Date()), endOfMonth(new Date())]
  }
}

const query = computed(() => {
  return {
    from_date: formatISO(period.value[0]),
    to_date: formatISO(period.value[1]),
  }
})
const { data: transactionListResponse } = await useAuthorizedFetch<TransactionListResponse>(
  "/v1/accounting/transactions/",
  {
    query,
    watch: [period],
  }
)

const totalExpensesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactionListResponse.value!
    .transactions) {
    if (category_type === CategoryType.Expense) {
      result += Number(amount)
    }
  }
  return result
})

const totalIncomesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactionListResponse.value!
    .transactions) {
    if (category_type === CategoryType.Income) {
      result += Number(amount)
    }
  }
  return result
})
</script>
