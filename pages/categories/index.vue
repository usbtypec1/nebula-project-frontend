<template>
  <div>
    <section v-if="rootCategories.length">
      <h1 class="text-lg font-semibold">Категории</h1>
      <ul>
        <li v-for="category in rootCategories" :key="category.id">
          
        </li>
      </ul>
    </section>
    <Message v-else icon="pi pi-exclamation-triangle" severity="info" class="mb-4"
      >У вас нет категорий</Message
    >
    <section>
      <DevOnly>
        <NuxtLink :to="{ name: 'categories-create' }">
          <Button label="Создать категорию" fluid />
        </NuxtLink>
      </DevOnly>
      <MainButton
        text="Создать категорию"
        @click="navigateTo({ name: 'categories-create' })"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types/categories"

const runtimeConfig = useRuntimeConfig()
const { data: categories } = await useFetch("/v1/accounting/categories/", {
  baseURL: runtimeConfig.public.apiBaseUrl,
  transform(data: { categories: Category[] }): Category[] {
    return data.categories
  },
  credentials: "include",
})

const rootCategories = computed((): Category[] => {
  if (!categories.value) return []
  return categories.value.filter((category) => category.parent_id === null)
})
</script>
