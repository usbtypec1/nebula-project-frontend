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

const transactions: Transaction[] = [
  {
    id: 1,
    account_id: 101,
    account_name: "Main Account",
    category_id: 1,
    category_type: CategoryType.Income,
    category_name: "Salary",
    amount: "3000.00",
    description: "March salary",
    date: "2025-03-31",
    created_at: "2025-03-31T10:00:00Z",
    updated_at: "2025-03-31T10:00:00Z",
  },
  {
    id: 2,
    account_id: 101,
    account_name: "Main Account",
    category_id: 2,
    category_type: CategoryType.Expense,
    category_name: "Groceries",
    amount: "150.45",
    description: "Weekly grocery shopping",
    date: "2025-04-01",
    created_at: "2025-04-01T15:30:00Z",
    updated_at: "2025-04-01T15:30:00Z",
  },
  {
    id: 3,
    account_id: 102,
    account_name: "Savings",
    category_id: 3,
    category_type: CategoryType.Expense,
    category_name: "Transfer to Savings",
    amount: "500.00",
    description: null,
    date: "2025-04-02",
    created_at: "2025-04-02T09:00:00Z",
    updated_at: "2025-04-02T09:00:00Z",
  },
  {
    id: 4,
    account_id: 101,
    account_name: "Main Account",
    category_id: 1,
    category_type: CategoryType.Income,
    category_name: "Salary",
    amount: "3000.00",
    description: "April salary",
    date: "2025-04-30",
    created_at: "2025-04-30T10:00:00Z",
    updated_at: "2025-04-30T10:00:00Z",
  },
  {
    id: 5,
    account_id: 101,
    account_name: "Main Account",
    category_id: 4,
    category_type: CategoryType.Expense,
    category_name: "Utilities",
    amount: "80.25",
    description: "Electricity bill",
    date: "2025-04-05",
    created_at: "2025-04-05T12:00:00Z",
    updated_at: "2025-04-05T12:00:00Z",
  },
  {
    id: 6,
    account_id: 101,
    account_name: "Main Account",
    category_id: 5,
    category_type: CategoryType.Expense,
    category_name: "Internet",
    amount: "60.00",
    description: "Monthly internet bill",
    date: "2025-04-06",
    created_at: "2025-04-06T08:45:00Z",
    updated_at: "2025-04-06T08:45:00Z",
  },
  {
    id: 7,
    account_id: 101,
    account_name: "Main Account",
    category_id: 6,
    category_type: CategoryType.Expense,
    category_name: "Dining",
    amount: "45.90",
    description: "Dinner with friends",
    date: "2025-04-07",
    created_at: "2025-04-07T20:00:00Z",
    updated_at: "2025-04-07T20:00:00Z",
  },
  {
    id: 8,
    account_id: 103,
    account_name: "Investment",
    category_id: 7,
    category_type: CategoryType.Income,
    category_name: "Dividends",
    amount: "200.00",
    description: "Quarterly dividends",
    date: "2025-04-10",
    created_at: "2025-04-10T14:00:00Z",
    updated_at: "2025-04-10T14:00:00Z",
  },
  {
    id: 9,
    account_id: 101,
    account_name: "Main Account",
    category_id: 8,
    category_type: CategoryType.Expense,
    category_name: "Transportation",
    amount: "30.00",
    description: "Gas refill",
    date: "2025-04-12",
    created_at: "2025-04-12T11:30:00Z",
    updated_at: "2025-04-12T11:30:00Z",
  },
  {
    id: 10,
    account_id: 101,
    account_name: "Main Account",
    category_id: 9,
    category_type: CategoryType.Expense,
    category_name: "Entertainment",
    amount: "25.00",
    description: "Movie night",
    date: "2025-04-13",
    created_at: "2025-04-13T21:00:00Z",
    updated_at: "2025-04-13T21:00:00Z",
  },
  {
    id: 11,
    account_id: 101,
    account_name: "Main Account",
    category_id: 2,
    category_type: CategoryType.Expense,
    category_name: "Groceries",
    amount: "160.75",
    description: "Weekly groceries",
    date: "2025-04-14",
    created_at: "2025-04-14T17:00:00Z",
    updated_at: "2025-04-14T17:00:00Z",
  },
  {
    id: 12,
    account_id: 101,
    account_name: "Main Account",
    category_id: 10,
    category_type: CategoryType.Expense,
    category_name: "Healthcare",
    amount: "100.00",
    description: "Dental checkup",
    date: "2025-04-15",
    created_at: "2025-04-15T13:30:00Z",
    updated_at: "2025-04-15T13:30:00Z",
  },
  {
    id: 13,
    account_id: 101,
    account_name: "Main Account",
    category_id: 11,
    category_type: CategoryType.Expense,
    category_name: "Emergency Fund",
    amount: "300.00",
    description: null,
    date: "2025-04-16",
    created_at: "2025-04-16T10:00:00Z",
    updated_at: "2025-04-16T10:00:00Z",
  },
  {
    id: 14,
    account_id: 104,
    account_name: "Crypto Wallet",
    category_id: 12,
    category_type: CategoryType.Income,
    category_name: "Crypto Gains",
    amount: "150.00",
    description: "Sold ETH",
    date: "2025-04-17",
    created_at: "2025-04-17T19:00:00Z",
    updated_at: "2025-04-17T19:00:00Z",
  },
  {
    id: 15,
    account_id: 101,
    account_name: "Main Account",
    category_id: 13,
    category_type: CategoryType.Expense,
    category_name: "Gifts",
    amount: "75.00",
    description: "Birthday present",
    date: "2025-04-18",
    created_at: "2025-04-18T09:45:00Z",
    updated_at: "2025-04-18T09:45:00Z",
  },
  {
    id: 16,
    account_id: 101,
    account_name: "Main Account",
    category_id: 4,
    category_type: CategoryType.Expense,
    category_name: "Utilities",
    amount: "78.50",
    description: "Gas bill",
    date: "2025-04-19",
    created_at: "2025-04-19T07:30:00Z",
    updated_at: "2025-04-19T07:30:00Z",
  },
  {
    id: 17,
    account_id: 103,
    account_name: "Investment",
    category_id: 14,
    category_type: CategoryType.Income,
    category_name: "Interest",
    amount: "50.00",
    description: "Bond interest",
    date: "2025-04-20",
    created_at: "2025-04-20T15:00:00Z",
    updated_at: "2025-04-20T15:00:00Z",
  },
  {
    id: 18,
    account_id: 101,
    account_name: "Main Account",
    category_id: 5,
    category_type: CategoryType.Expense,
    category_name: "Internet",
    amount: "60.00",
    description: "Internet bill",
    date: "2025-04-21",
    created_at: "2025-04-21T08:45:00Z",
    updated_at: "2025-04-21T08:45:00Z",
  },
  {
    id: 19,
    account_id: 102,
    account_name: "Savings",
    category_id: 3,
    category_type: CategoryType.Expense,
    category_name: "Transfer to Savings",
    amount: "600.00",
    description: null,
    date: "2025-04-22",
    created_at: "2025-04-22T10:00:00Z",
    updated_at: "2025-04-22T10:00:00Z",
  },
  {
    id: 20,
    account_id: 101,
    account_name: "Main Account",
    category_id: 2,
    category_type: CategoryType.Expense,
    category_name: "Groceries",
    amount: "170.30",
    description: "Big grocery run",
    date: "2025-04-23",
    created_at: "2025-04-23T17:00:00Z",
    updated_at: "2025-04-23T17:00:00Z",
  },
  {
    id: 21,
    account_id: 101,
    account_name: "Main Account",
    category_id: 15,
    category_type: CategoryType.Expense,
    category_name: "Subscriptions",
    amount: "15.00",
    description: "Music streaming",
    date: "2025-04-24",
    created_at: "2025-04-24T12:00:00Z",
    updated_at: "2025-04-24T12:00:00Z",
  }
]


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
