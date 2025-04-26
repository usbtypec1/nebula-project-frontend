<template>
  <div class="flex flex-col gap-y-4">
    <SelectButton
      option-label="label"
      option-value="value"
      :options="recordTypeOptions"
      v-model="recordType"
    >
      <template #option="{ option }" >
        <i :class="option.icon"></i>
        <span>{{ option.label }}</span>
      </template>
    </SelectButton>
    <TransactionCreateForm
      v-if="
        recordType === RecordTypeValue.Expense ||
        recordType === RecordTypeValue.Income
      "
    />
    <TransferCreateForm
      v-else-if="recordType === RecordTypeValue.Transfer"
      :accounts="accountListResponse!.accounts"
    />
  </div>
</template>

<script setup lang="ts">
import { RecordTypeValue } from "~/types/record-types"

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
const recordType = ref()
</script>
