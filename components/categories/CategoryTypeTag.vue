<template>
  <Tag v-if="type === CategoryType.Expense" value="Расход" severity="danger" />
  <Tag
    v-else-if="type === CategoryType.Income"
    value="Доход"
    severity="success"
  />
</template>

<script setup lang="ts">
import { CategoryType } from "~/types/categories"

defineProps<{
  type: CategoryType
}>()
</script>
