<template>
  <div class="card flex justify-center">
    <Chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[30rem]"
    />
  </div>
</template>

<script setup lang="ts">
import { CategoryType } from "~/types/categories"
import type { Transaction } from "~/types/transactions"

const { transactions = [] } = defineProps<{
  transactions: Transaction[]
}>()

const totalExpensesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactions) {
    if (category_type === CategoryType.Expense) {
      result += Number(amount)
    }
  }
  return result
})

const totalIncomesAmount = computed((): number => {
  let result = 0
  for (const { amount, category_type } of transactions) {
    if (category_type === CategoryType.Income) {
      result += Number(amount)
    }
  }
  return result
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ["Расходы", "Доходы"],
    datasets: [
      {
        data: [totalExpensesAmount.value, totalIncomesAmount.value],
        backgroundColor: [
          documentStyle.getPropertyValue("--p-red-500"),
          documentStyle.getPropertyValue("--p-emerald-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-red-400"),
          documentStyle.getPropertyValue("--p-emerald-400"),
        ],
      },
    ],
  }
}
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue("--p-text-color")

  return {
    plugins: {
      legend: {
        labels: {
          cutout: "60%",
          color: textColor,
        },
      },
    },
  }
}

const chartData = ref(setChartData())
const chartOptions = ref(setChartOptions())
</script>
