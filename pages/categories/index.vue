<template>
  <div>
    <CategoryListDataView
      :categories="rootCategories"
      @delete="onDeleteCategory"
    />
    <section>
      <NuxtLink :to="{ name: 'categories-create' }">
        <Button label="Создать категорию" fluid />
      </NuxtLink>
    </section>
    <BackButton @click="navigateTo({ name: 'index' })" />
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types/categories"
import { useWebAppPopup, BackButton } from "vue-tg";

const { showAlert } = useWebAppPopup()

const runtimeConfig = useRuntimeConfig()
const { data: categories, refresh: refreshCategories } = await useFetch(
  "/v1/accounting/categories/",
  {
    baseURL: runtimeConfig.public.apiBaseUrl,
    transform(data: { categories: Category[] }): Category[] {
      return data.categories
    },
    credentials: "include",
  }
)

const rootCategories = computed((): Category[] => {
  if (!categories.value) return []
  return categories.value.filter((category) => category.parent_id === null)
})

const onDeleteCategory = async (categoryId: number) => {
  await $fetch(`/v1/accounting/categories/${categoryId}/`, {
    baseURL: runtimeConfig.public.apiBaseUrl,
    method: "DELETE",
    credentials: "include",
    async onResponse({ response }) {
      if (!response.ok) {
        showAlert("Не удалось удалить категорию")
      } else {
        await refreshCategories()
      }
    },
  })
}
</script>
