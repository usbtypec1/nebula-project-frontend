<template>
  <Form
    :validate-on-blur="false"
    :validate-on-mount="false"
    :validate-on-submit="true"
    :validate-on-value-update="false"
    :resolver
    class="flex flex-col gap-3"
    @submit="onSubmit"
  >
    <FormField name="fromAccountId" v-slot="$field">
      <FloatLabel variant="on">
        <Select
          :options="accounts"
          option-label="name"
          option-value="id"
          fluid
          :input-id="fromAccountIdInputId"
        />
        <label :for="fromAccountIdInputId">Из аккаунта</label>
      </FloatLabel>
      <Message v-if="$field.error" variant="simple" :severity="'error'">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <FormField name="toAccountId" v-slot="$field">
      <FloatLabel variant="on">
        <Select
          :options="accounts"
          option-label="name"
          option-value="id"
          fluid
          :input-id="toAccountIdInputId"
        />
        <label :for="toAccountIdInputId">В аккаунт</label>
      </FloatLabel>
      <Message v-if="$field.error" variant="simple" :severity="'error'">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <FormField name="amount" v-slot="$field">
      <FloatLabel variant="on">
        <InputNumber
          fluid
          :input-id="amountInputId"
          mode="currency"
          currency="KGS"
        />
        <label :for="amountInputId">Сумма</label>
      </FloatLabel>
      <Message v-if="$field.error" variant="simple" :severity="'error'">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <FormField name="date" v-slot="$field" :initial-value="new Date()">
      <FloatLabel variant="on">
        <DatePicker fluid date-format="dd.mm.yy" :show-time="true" />
        <label :for="dateInputId">Дата</label>
      </FloatLabel>
      <Message v-if="$field.error" variant="simple" :severity="'error'">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <FormField name="description" v-slot="$field">
      <FloatLabel variant="on">
        <Textarea fluid />
        <label :for="descriptionInputId">Описание</label>
      </FloatLabel>
      <Message v-if="$field.error" variant="simple" :severity="'error'">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <Button type="submit" label="Добавить" icon="pi pi-plus" />
  </Form>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from "zod"
import type { Account } from "~/types/accounts"
import type { TransferCreateEvent } from "~/types/transfers"

const props = defineProps<{
  accounts: Account[]
}>()

const emit = defineEmits<{
  submit: [event: TransferCreateEvent]
}>()

const fromAccountIdInputId = useId()
const toAccountIdInputId = useId()
const amountInputId = useId()
const dateInputId = useId()
const descriptionInputId = useId()

const resolver = zodResolver(
  z.object({
    fromAccountId: z.number({ message: "Выберите аккаунт" }),
    toAccountId: z.number({ message: "Выберите аккаунт" }),
    amount: z
      .number({ message: "Введите сумму" })
      .positive("Сумма должна быть больше 0")
      .max(1_000_000, "Сумма не может превышать 1 000 000"),
    date: z.date({ message: "Введите дату" }),
    description: z.string().max(1024).nullable(),
  })
)

const onSubmit = ({ values, valid }: FormSubmitEvent) => {
  if (!valid) return
  emit("submit", values as TransferCreateEvent)
}
</script>
