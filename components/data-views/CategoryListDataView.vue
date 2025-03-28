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
      <template #list="{ items }: { items: Category[]}">
        
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
