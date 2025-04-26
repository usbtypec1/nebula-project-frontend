<template>
  <div>
    {{ account }}
    <SecondaryButton text="Изменить" />
    <MainButton text="Добавить запись" />
  </div>
</template>

<script setup lang="ts">
import { SecondaryButton, MainButton } from "vue-tg"

const route = useRoute()

const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)
</script>
