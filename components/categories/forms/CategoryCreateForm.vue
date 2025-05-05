<template>
  <Form
    :resolver="resolver"
    :validate-on-blur="false"
    :validate-on-value-update="false"
    :validate-on-submit="true"
    :validate-on-mount="false"
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-y-3">
      <p class="text-lg font-semibold">Создать категорию</p>
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
      <FormField name="name" v-slot="$field" class="flex flex-col gap-y-1">
        <FloatLabel variant="on">
          <InputText inputId="on_label" fluid />
          <label for="on_label">Название</label>
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
import { CategoryType, type CategoryCreateEvent } from "~/types/categories"

const emit = defineEmits<{
  submit: [event: CategoryCreateEvent]
}>()

const options = [
  {
    label: "Доход",
    value: CategoryType.Income,
  },
  {
    label: "Расход",
    value: CategoryType.Expense,
  },
]

const resolver = ref(
  zodResolver(
    z.object({
      type: z.nativeEnum(CategoryType),
      name: z.string({ message: "Введите название категории " }).max(64),
    })
  )
)

const onSubmit = ({ values, valid }: FormSubmitEvent) => {
  if (valid) {
    emit("submit", values as CategoryCreateEvent)
  }
}
</script>
