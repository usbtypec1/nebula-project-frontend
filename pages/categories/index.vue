<template>
  <div>
    <CategoryCardList :categories="categories!" />
    <PageSection>
      <NuxtLink :to="{ name: 'categories-create' }">
        <Button label="Создать категорию" fluid />
      </NuxtLink>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types/categories"
import { usePopup } from "vue-tg"

const { $authorizedFetch } = useNuxtApp()

const { showAlert } = usePopup()

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
        showAlert?.("Не удалось удалить категорию")
      } else {
        await refreshCategories()
      }
    },
  })
}
</script>
