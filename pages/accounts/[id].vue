<template>
  <div>
    {{ account }}
    <SettingsButton />
    <BackButton @click="navigateTo({ name: 'index' })" />
  </div>
</template>

<script setup lang="ts">
import { SettingsButton, BackButton, useMainButton } from "vue-tg"

const route = useRoute()


const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)

const { show } = useMainButton()

onMounted(show)
</script>
