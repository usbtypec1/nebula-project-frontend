<template>
    <div class="my-2">
      <RecordCreateForm :categories="categories!" />
      <DevOnly>
        <NuxtLink :to="{ name: 'index' }">
          <Button label="Назад" severity="secondary" icon="pi pi-arrow-left" />
        </NuxtLink>
      </DevOnly>
    </div>
  </template>
  
  <script setup lang="ts">
  import { BackButton } from "vue-tg"
  import type { Category } from "~/types/categories"
  
  const runtimeConfig = useRuntimeConfig()
  const { data: categories } = await useFetch("/v1/accounting/categories/", {
    baseURL: runtimeConfig.public.apiBaseUrl,
    transform(data: { categories: Category[] }): Category[] {
      return data.categories
    },
  })
  </script>
  