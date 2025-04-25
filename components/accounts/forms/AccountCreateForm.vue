<template>
  <Form
    :resolver="resolver"
    :validate-on-blur="false"
    :validate-on-value-update="false"
    :validate-on-submit="true"
    :validate-on-mount="false"
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-y-3 my-3">
      <FormField name="name" v-slot="$field" class="flex flex-col gap-y-1">
        <FloatLabel variant="on">
          <InputText input-id="name" fluid />
          <label for="name">Название</label>
        </FloatLabel>
        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>

      <FormField
        name="initialBalance"
        v-slot="$field"
        class="flex flex-col gap-y-1"
        :initial-value="0"
      >
        <FloatLabel variant="on">
          <InputNumber input-id="initialBalance" fluid />
          <label for="initialBalance">Первоначальный баланс</label>
        </FloatLabel>
        <Message v-if="$field.invalid" variant="simple" severity="error">{{
          $field.error?.message
        }}</Message>
      </FormField>

      <FormField
        name="isPublic"
        v-slot="$field"
        class="flex flex-col gap-y-1"
        :initial-value="false"
      >
        <div class="flex items-center gap-x-2">
          <ToggleSwitch input-id="isPublic" />
          <label for="isPublic">Публичный аккаунт</label>
        </div>
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
import type { AccountCreateEvent } from "~/types/accounts"

const emit = defineEmits<{
  submit: [event: AccountCreateEvent]
}>()

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string({ message: "Введите название аккаунта" }).max(64),
      initialBalance: z.number({ message: "Введите первоначальный баланс " }),
      isPublic: z.boolean({ message: "Выберите тип аккаунта" }),
    })
  )
)

const onSubmit = ({ values, valid }: FormSubmitEvent) => {
  if (valid) {
    emit("submit", values as AccountCreateEvent)
  }
}
</script>
