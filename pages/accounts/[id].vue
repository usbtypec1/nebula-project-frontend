<template>
  <div>
    {{ account }}
    <SettingsButton />
  </div>
</template>

<script setup lang="ts">
import { SettingsButton, useMainButton } from "vue-tg"

const route = useRoute()


const accountId = Number(route.params.id as string)

const { data: account } = await useAccountById(accountId)

const { show } = useMainButton()

onMounted(show)
</script>
