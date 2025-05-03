<template>
  <div class="flex flex-col gap-4 mb-8">
    <header class="flex justify-between">
      <PageHeader :text="account!.name" />
      <Button label="Изменить" text size="small" icon="pi pi-pen-to-square" />
    </header>
    <Card>
      <template #title>
        <p class="text-sm text-gray-400">Последние 30 дней</p>
        <p class="text-2xl font-semibold">
          {{ currencyFormatter.format(Number(account!.balance)) }}
        </p>
      </template>
      <template #content>
        <Chart type="line" :data="data" :options="chartOptions" class="h-64" />
      </template>
    </Card>
    <TransactionListDataView
      :transactions="transactionListResponse!.transactions"
    />
    <RecordCreateButton />
  </div>
</template>

<script setup lang="ts">
import { useMainButton } from "vue-tg"
import { parseISO, format } from "date-fns"
import { CategoryType } from "~/types/categories"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KGS",
})

const route = useRoute()

const documentStyle = getComputedStyle(document.documentElement)
const textColor = documentStyle.getPropertyValue("--p-text-color")
const textColorSecondary = documentStyle.getPropertyValue(
  "--p-text-muted-color"
)
const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color")

const chartOptions = ref({
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
    legend: {
      labels: {
        color: textColor,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
    y: {
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
  },
})

const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)
const { data: transactionListResponse } = await useTransactionList({
  accountIds: [accountId],
})

const dates = computed(() => {
  if (!transactionListResponse.value) {
    return []
  }

  const dates = new Set<string>()
  for (const transaction of transactionListResponse.value.transactions) {
    dates.add(format(parseISO(transaction.date), "dd.MM.yy"))
  }
  return Array.from(dates).sort()
})

const expenses = computed(() => {
  if (!transactionListResponse.value) {
    return []
  }

  const expenses = new Map<string, number>()
  for (const transaction of transactionListResponse.value.transactions) {
    const date = format(parseISO(transaction.date), "dd.MM.yy")
    if (transaction.category_type === CategoryType.Expense) {
      expenses.set(date, (expenses.get(date) || 0) + Number(transaction.amount))
    }
  }
  return dates.value.map((date) => expenses.get(date) || 0)
})

const income = computed(() => {
  if (!transactionListResponse.value) {
    return []
  }

  const income = new Map<string, number>()
  for (const transaction of transactionListResponse.value.transactions) {
    const date = format(parseISO(transaction.date), "dd.MM.yy")
    if (transaction.category_type === CategoryType.Income) {
      income.set(date, (income.get(date) || 0) + Number(transaction.amount))
    }
  }
  return dates.value.map((date) => income.get(date) || 0)
})

const data = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: "Расходы",
      data: expenses.value,
      fill: false,
      borderColor: documentStyle.getPropertyValue("--p-red-500"),
      tension: 0.4,
    },
    {
      label: "Доходы",
      data: income.value,
      fill: false,
      borderColor: documentStyle.getPropertyValue("--p-emerald-500"),
      tension: 0.4,
    },
  ],
}))
const { show } = useMainButton()

onMounted(show)
</script>
