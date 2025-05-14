<template>
  <div class="card flex justify-center">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="h-[30rem]"
    />
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from "~/types/transactions"

const { transactions = [] } = defineProps<{
  transactions: Transaction[]
}>()

const chartData = ref()
const chartOptions = ref()

const { expenseTransactions } = useTransactions(toRef(() => transactions))

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  const categorySums: Record<string, number> = {}
  expenseTransactions.value.forEach((t) => {
    const amount = parseFloat(t.amount)
    if (!categorySums[t.category_name]) {
      categorySums[t.category_name] = 0
    }
    categorySums[t.category_name] += amount
  })

  const labels = Object.keys(categorySums)
  const data = Object.values(categorySums)

  return {
    labels,
    datasets: [
      {
        label: "Траты по категориям",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data,
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue("--p-text-color")
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  )
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  )

  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 0.8,
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
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  }
}
</script>
