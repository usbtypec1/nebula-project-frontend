<template>
  <div>
    <CategoryCreateForm @submit="onSubmit" />
    <DevOnly>
      <NuxtLink :to="{ name: 'categories' }">
        <Button
          label="Назад"
          icon="pi pi-arrow-left"
          severity="secondary"
          fluid
          class="my-2"
        />
      </NuxtLink>
    </DevOnly>
    <BackButton @click="navigateTo({ name: 'categories' })" />
  </div>
</template>

<script setup lang="ts">
import { BackButton } from "vue-tg"
import type { CategoryCreateEvent } from "~/types/categories"

const { $authorizedFetch } = useNuxtApp()

const onSubmit = async (event: CategoryCreateEvent) => {
  await $authorizedFetch("/v1/accounting/categories/", {
    method: "POST",
    body: {
      name: event.name,
      type: event.type,
    },
    async onResponse({ response }) {
      if (response.ok) {
        await navigateTo({ name: "categories" })
      }
    },
  })
}
</script>
