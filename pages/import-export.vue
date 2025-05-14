<template>
  <div class="flex flex-col gap-y-2">
    <PageHeader text="Экспорт данных" />
    <FloatLabel variant="on">
      <DatePicker
        v-model="period"
        selection-mode="range"
        :manual-input="false"
        fluid
        :select-other-months="true"
        :show-other-months="true"
        date-format="dd.mm.yy"
      />
      <label for="on_label">Период выгрузки</label>
    </FloatLabel>

    <PageSection>
      <PageParagraph text="Выберите, что хотите выгрузить" />
      <Listbox
        v-model="selectedExportOptions"
        :options="exportOptions"
        option-value="value"
        option-label="label"
        multiple
        checkmark
      />
    </PageSection>
    <Button label="Выгрузить в csv" fluid />
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns"

type PeriodItem = Date | null
const period = ref<PeriodItem[]>([])

const selectedExportOptions = ref<string[]>([])

const exportOptions = [
  { label: "ID транзакции", value: "transaction_id" },
  { label: "Описание транзакции", value: "transaction_description" },
  { label: "ID аккаунта", value: "account_id" },
  { label: "Название аккаунта", value: "account_name" },
  { label: "ID категории", value: "category_id" },
  { label: "Название категории", value: "category_name" },
  { label: "Тип категории", value: "category_type" },
]

const query = computed(() => {
  const [start, end] = period.value
  return {
    start: start ? format(start, "yyyy-MM-dd") : null,
    end: end ? format(end, "yyyy-MM-dd") : null,
    exportOptions: selectedExportOptions.value,
  }
})
</script>
