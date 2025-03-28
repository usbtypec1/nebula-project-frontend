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
        name="type"
        v-slot="$field"
        :initial-value="options[0].value"
        class="flex flex-col gap-y-1"
      >
        <SelectButton
          :options="options"
          option-value="value"
          option-label="label"
        />
        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>
      <FormField name="amount" v-slot="$field" class="flex flex-col gap-y-1">
        <FloatLabel variant="on">
          <InputNumber
            inputId="on_label"
            mode="currency"
            currency="KGS"
            fluid
          />
          <label for="on_label">Сумма</label>
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
import { Form, FormField } from "@primevue/forms"
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from "zod"

const props = defineProps<{
  categories: any[]
}>()

const options = [
  {
    label: "Доход",
    value: "income",
  },
  {
    label: "Расход",
    value: "expense",
  },
  {
    label: "Перевод",
    value: "transfer",
  },
]

const resolver = ref(
  zodResolver(
    z.object({
      type: z.enum(["income", "expense", "transfer"]),
      amount: z
        .number({ message: "Введите сумму" })
        .positive({ message: "Сумма должна быть положительной" }),
    })
  )
)

const onSubmit = () => {}
</script>
