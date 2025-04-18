<template>
  <div>
    <!-- <CategoryListDataView
      :categories="rootCategories"
      @delete="onDeleteCategory"
    />
    <section>
      <NuxtLink :to="{ name: 'categories-create' }">
        <Button label="Создать категорию" fluid />
      </NuxtLink>
    </section> -->
      <div class="overflow-x-auto whitespace-nowrap px-4 py-2">
    <draggable
      v-model="menuItems"
      tag="div"
      class="inline-flex space-x-4"
      item-key="name"
      :animation="200"
    >
      <template #item="{ element }">
        <div
          class="flex flex-col items-center justify-center w-20 h-20 rounded-full text-center shadow-md"
          :class="element.color"
        >
          <component :is="element.icon" class="text-white text-2xl mb-1" />
          <span class="text-white text-xs">{{ element.name }}</span>
          <span class="text-white text-sm font-bold">{{ element.amount }}</span>
        </div>
      </template>
    </draggable>
  </div>

  </div>
</template>

<script setup lang="ts">
import { ShoppingCart, Car, Candy, Smartphone, Home, Heart, Shirt, Gift, PiggyBank } from 'lucide-vue-next'

const menuItems = ref([
  { name: 'Groceries', icon: ShoppingCart, color: 'bg-teal-600', amount: 'сом 2 373' },
  { name: 'Transport', icon: Car, color: 'bg-blue-700', amount: 'сом 3 780' },
  { name: 'Joy & Things', icon: Candy, color: 'bg-yellow-400', amount: 'сом 3 500' },
  { name: 'Communication', icon: Smartphone, color: 'bg-blue-600', amount: 'сом 1 100' },
  { name: 'Home', icon: Home, color: 'bg-orange-500', amount: 'сом 7 384' },
  { name: 'Lend', icon: PiggyBank, color: 'bg-pink-500', amount: 'сом 21 000' },
  { name: 'Health', icon: Heart, color: 'bg-green-500', amount: 'сом 408' },
  { name: 'Clothes', icon: Shirt, color: 'bg-pink-300', amount: 'сом 2 300' },
  { name: 'Gift', icon: Gift, color: 'bg-green-400', amount: 'сом 0' }
])

// import type { Category } from "~/types/categories"

// const runtimeConfig = useRuntimeConfig()
// const { data: categories, refresh: refreshCategories } = await useFetch(
//   "/v1/accounting/categories/",
//   {
//     baseURL: runtimeConfig.public.apiBaseUrl,
//     transform(data: { categories: Category[] }): Category[] {
//       return data.categories
//     },
//     credentials: "include",
//   }
// )

// const rootCategories = computed((): Category[] => {
//   if (!categories.value) return []
//   return categories.value.filter((category) => category.parent_id === null)
// })

// const onDeleteCategory = async (categoryId: number) => {
//   await $fetch(`/v1/accounting/categories/${categoryId}/`, {
//     baseURL: runtimeConfig.public.apiBaseUrl,
//     method: "DELETE",
//     credentials: "include",
//     async onResponse({ response }) {
//       await refreshCategories()
//     },
//   })
// }
</script>
