<template>
  <Form
    :resolver
    :validate-on-value-update="false"
    :validate-on-submit="true"
    :validate-on-mount="false"
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-y-3">
      <p class="text-lg font-semibold">Добавить запись</p>
      <FormField
        name="categoryId"
        v-slot="$field"
        class="flex flex-col gap-y-1"
      >
        <FloatLabel variant="on">
          <Select
            option-label="name"
            option-value="id"
            :options="recordTypeCategories"
            v-model="$field.value"
            fluid
            :input-id="categoryIdInputId"
          />
          <label :for="categoryIdInputId">Категория</label>
        </FloatLabel>

        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>
      <FormField name="amount" v-slot="$field" class="flex flex-col gap-y-1">
        <FloatLabel variant="on">
          <InputNumber
            :input-id="amountInputId"
            mode="currency"
            currency="KGS"
            fluid
          />
          <label :for="amountInputId">Сумма</label>
        </FloatLabel>

        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>

      <FormField name="date" v-slot="$field" :initial-value="new Date()">
        <FloatLabel variant="on">
          <DatePicker
            date-format="dd.mm.yy"
            :show-time="true"
            fluid
            :input-id="dateInputId"
          />
          <label :for="dateInputId">Дата</label>
        </FloatLabel>

        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>

      <FormField
        name="description"
        v-slot="$field"
        class="flex flex-col gap-y-1"
      >
        <FloatLabel variant="on">
          <Textarea fluid :id="descriptionInputId" />
          <label :for="descriptionInputId">Описание</label>
        </FloatLabel>
        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>
      <Button type="submit" label="Сохранить" fluid />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, FormField, type FormSubmitEvent } from "@primevue/forms"
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from "zod"
import { CategoryType, type Category } from "~/types/categories"
import { RecordTypeValue } from "~/types/record-types"
import type { TransactionCreateEvent } from "~/types/transactions"

const props = defineProps<{
  categories: Category[]
  recordType: RecordTypeValue
}>()

const emit = defineEmits<{
  submit: [event: TransactionCreateEvent]
}>()

const categoryIdInputId = useId()
const amountInputId = useId()
const descriptionInputId = useId()
const dateInputId = useId()

const recordTypeToCategoryType: Record<RecordTypeValue, CategoryType | null> = {
  [RecordTypeValue.Expense]: CategoryType.Expense,
  [RecordTypeValue.Income]: CategoryType.Income,
  [RecordTypeValue.Transfer]: null,
}

const recordTypeCategories = computed(() => {
  return props.categories.filter(
    (category) => category.type === recordTypeToCategoryType[props.recordType]
  )
})

const resolver = zodResolver(
  z.object({
    categoryId: z.number({ message: "Выберите категорию" }),
    amount: z
      .number({ message: "Введите сумму" })
      .positive({ message: "Сумма должна быть положительной" }),
    date: z.date({ message: "Введите дату" }),
    description: z.string({ message: "Введите описание" }).max(1024).nullable(),
  })
)

const onSubmit = ({ values, valid }: FormSubmitEvent) => {
  if (!valid) return
  emit("submit", values as TransactionCreateEvent)
}
</script>
