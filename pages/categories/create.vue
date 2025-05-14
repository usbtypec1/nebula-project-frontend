<template>
  <div>
    <CategoryCreateForm @submit="onSubmit" />
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
