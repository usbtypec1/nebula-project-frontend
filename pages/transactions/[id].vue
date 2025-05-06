<template>
  <div class="flex flex-col gap-y-4">
    <section class="grid grid-cols-3 items-center font-semibold h-12">
      <div class="justify-self-start">
        <Button text severity="secondary" rounded />
      </div>
      <p class="text-center">{{ categoryTypeName }}</p>
      <div class="justify-self-end">
        <Button
          @click="onDeleteTransaction"
          text
          severity="danger"
          icon="pi pi-trash"
          rounded
        />
      </div>
    </section>

    <section class="flex flex-col gap-y-2 justify-center items-center">
      <p class="text-sm font-semibold text-gray-400">Сумма</p>
      <p class="font-semibold text-2xl">
        {{ currencyFormatter.format(Number(transaction!.amount)) }}
      </p>
    </section>
    <section class="flex flex-col">
      <p class="text-sm font-semibold text-gray-400">Категория</p>
      <p class="font-semibold text-lg">{{ transaction!.category_name }}</p>
    </section>

    <section class="flex flex-col">
      <p class="text-sm font-semibold text-gray-400">Аккаунт</p>
      <p class="font-semibold text-lg">{{ transaction!.account_name }}</p>
    </section>

    <section class="flex flex-col">
      <p class="text-sm font-semibold text-gray-400">Дата</p>
      <p class="font-semibold text-lg">
        {{ format(parseISO(transaction!.date), "dd.MM.yyyy") }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { type Transaction } from "~/types/transactions"
import { CategoryType } from "~/types/categories"
import { format, parseISO } from "date-fns"

const { $authorizedFetch } = useNuxtApp()

const route = useRoute()
const transactionId = Number(route.params.id as string)
const url = `/v1/accounting/transactions/${transactionId}/`
const { data: transaction } = await useAuthorizedFetch<Transaction>(url)

const categoryTypeName = computed(() => {
  if (transaction.value) {
    return transaction.value.category_type === CategoryType.Expense
      ? "Расход"
      : "Доход"
  }
  return ""
})

const onDeleteTransaction = async () => {
  await $authorizedFetch(url, {
    method: "DELETE",
  })
  await navigateTo({ name: "history" })
}
</script>
