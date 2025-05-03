<template>
  <div class="flex flex-col gap-y-4">
    <SelectButton
      option-label="label"
      option-value="value"
      :options="recordTypeOptions"
      v-model="recordType"
    >
      <template #option="{ option }">
        <i :class="option.icon"></i>
        <span>{{ option.label }}</span>
      </template>
    </SelectButton>
    <TransactionCreateForm
      v-if="
        recordType === RecordTypeValue.Expense ||
        recordType === RecordTypeValue.Income
      "
      :accounts="accountListResponse!.accounts"
      :categories="categories!"
      :record-type="recordType"
      @submit="onCreateTransaction"
    />
    <TransferCreateForm
      v-else-if="recordType === RecordTypeValue.Transfer"
      :accounts="accountListResponse!.accounts"
      @submit="onCreateTransfer"
    />
    <Message v-else icon="pi pi-info-circle" severity="info">
      Выберите тип записи
    </Message>
  </div>
</template>

<script setup lang="ts">
import { formatISO } from "date-fns"
import { RecordTypeValue } from "~/types/record-types"
import type { TransactionCreateEvent } from "~/types/transactions"
import type { TransferCreateEvent } from "~/types/transfers"
import { usePopup } from "vue-tg"

const { showAlert } = usePopup()

const { data: categories } = await useCategoryList()
const { data: accountListResponse } = await useAccountList()

interface RecordType {
  label: string
  icon: string
  value: RecordTypeValue
}

const recordTypeOptions: RecordType[] = [
  {
    label: "Расход",
    icon: "pi pi-arrow-up-right",
    value: RecordTypeValue.Expense,
  },
  {
    label: "Доход",
    icon: "pi pi-arrow-down-left",
    value: RecordTypeValue.Income,
  },
  {
    label: "Перевод",
    icon: "pi pi-arrow-right-arrow-left",
    value: RecordTypeValue.Transfer,
  },
]
const recordType = ref(recordTypeOptions[0].value)

const { $authorizedFetch } = useNuxtApp()

const onCreateTransaction = async (event: TransactionCreateEvent) => {
  try {
    await $authorizedFetch("/v1/accounting/transactions/", {
      method: "POST",
      body: {
        account_id: event.accountId,
        category_id: event.categoryId,
        amount: event.amount,
        date: formatISO(event.date),
        description: event.description,
      },
    })
    showAlert?.("Запись успешно добавлена")
  } catch (error) {
    showAlert?.("Ошибка при добавлении записи")
  }
}

const onCreateTransfer = async (event: TransferCreateEvent) => {
  try {
    await $authorizedFetch("/v1/accounting/transfers/", {
      method: "POST",
      body: {
        from_account_id: event.fromAccountId,
        to_account_id: event.toAccountId,
        amount: event.amount,
        date: formatISO(event.date),
        description: event.description,
      },
    })
    showAlert?.("Запись успешно добавлена")
  } catch (error) {
    showAlert?.("Ошибка при добавлении записи")
  }
}
</script>
