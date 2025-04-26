<template>
  <div>
    {{ account }}
    <SettingsButton />
    <MainButton text="Добавить запись" :has-shine-effect="true" />
  </div>
</template>

<script setup lang="ts">
import { SettingsButton, MainButton } from "vue-tg"

const route = useRoute()

const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)
</script>
