<template>
  <div>
    {{ account }}
    <SettingsButton />
    <MainButton text="Добавить запись" :has-shine-effect="true" />
    <BackButton @click="navigateTo({ name: 'index' })" />
  </div>
</template>

<script setup lang="ts">
import { SettingsButton, BackButton, MainButton } from "vue-tg"

const route = useRoute()

const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)
</script>
