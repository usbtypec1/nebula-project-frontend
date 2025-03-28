<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Добавить запись"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-y-2 py-2">
      <SelectButton
        v-model="type"
        :options="typeOptions"
        option-value="value"
        option-label="label"
      />
      <FloatLabel variant="on">
        <InputNumber
          v-model="amount"
          inputId="on_label"
          mode="currency"
          currency="USD"
          locale="en-US"
          fluid
        />
        <label for="on_label">Amount</label>
      </FloatLabel>
      <Select
        v-model="categoryId"
        :options="categories"
        option-value="id"
        option-label="name"
        placeholder="Выберите категорию"
      />

      <div class="flex justify-end gap-x-2">
        <Button label="Отмена" @click="visible = false" severity="secondary" />
        <Button label="Сохранить" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>("visible", { default: false })
const amount = ref<number>()
const type = ref<string>()
const typeOptions = [
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
const categoryId = ref<number>()
const categories = ref<{ id: number; name: string }[]>([
  {
    id: 1,
    name: "Категория 1",
  },
  {
    id: 2,
    name: "Категория 2",
  },
  {
    id: 3,
    name: "Категория 3",
  },
])
</script>
