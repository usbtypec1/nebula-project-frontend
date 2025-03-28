<template>
  <div class="card">
    <DataView
      :value="categories"
      paginator
      :rows="100"
      :always-show-paginator="false"
      data-key="id"
    >
      <template #empty>
        <Message icon="pi pi-exclamation-triangle" severity="info" class="mb-4">
          У вас нет категорий
        </Message>
      </template>
      <template #list="{ items }: { items: Category[] }">
        <p class="text-sm font-normal">Все категории</p>
        <div class="flex flex-col divide-solid divide-y-2">
          <div v-for="category in items" :key="category.id">
            <div class="flex items-center justify-between py-3">
              <p class="text-lg font-semibold flex items-center gap-x-1">
                {{ category.name }}
              </p>
              <div class="flex gap-x-2">
                <Button icon="pi pi-file-edit" text />
                <Button icon="pi pi-trash" severity="danger" text />
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types/categories"

const props = defineProps<{
  categories: Category[]
}>()
</script>
