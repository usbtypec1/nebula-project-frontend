<template>
  <div class="flex flex-col gap-y-4">
    <Card v-for="category in categories" :key="category.id">
      <template #content>
        <div class="flex justify-between items-center gap-x-2">
          <span class="text-md font-semibold">{{ category.name }}</span>
          <CategoryTypeTag :type="category.type" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between items-center"></div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types/categories"

const props = defineProps<{
  categories: Category[]
}>()
</script>
