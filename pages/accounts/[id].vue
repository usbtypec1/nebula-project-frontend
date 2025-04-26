<template>
  <div>
    {{ account }}
    <SecondaryButton text="Изменить" :has-shine-effect="true" />
    <MainButton text="Добавить запись" :has-shine-effect="true" />
  </div>
</template>

<script setup lang="ts">
import { SecondaryButton, MainButton } from "vue-tg"

const route = useRoute()

const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)
</script>
