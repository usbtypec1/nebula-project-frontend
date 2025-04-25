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
import { useWebAppPopup, BackButton } from "vue-tg"

const { $authorizedFetch } = useNuxtApp()

const { showAlert } = useWebAppPopup()

const { data: categories, refresh: refreshCategories } =
  await useAuthorizedFetch<Category[]>("/v1/accounting/categories/", {
    transform(data: { categories: Category[] }): Category[] {
      return data.categories
    },
  })

const rootCategories = computed((): Category[] => {
  if (!categories.value) return []
  return categories.value.filter((category) => category.parent_id === null)
})

const onDeleteCategory = async (categoryId: number) => {
  await $authorizedFetch(`/v1/accounting/categories/${categoryId}/`, {
    method: "DELETE",
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
