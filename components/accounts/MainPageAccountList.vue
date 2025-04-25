<template>
  <div class="overflow-x-auto scrollbar-hide">
    <div class="flex w-max gap-x-2 scrollbar-hide">
      <Card
        v-for="account in accountsResponse.accounts"
        :header="account.name"
        :key="account.id"
        class="min-w-40 max-w-64"
      >
        <template #title
          ><span class="pi pi-money-bill"></span> {{ account.name }}</template
        >
        <template #content> {{ account.balance }} сом </template>
      </Card>
      <Button
        icon="pi pi-plus"
        outlined
        severity="success"
        @click="visible = true"
      />
    </div>
  </div>
  <AccountCreateDialog v-model:visible="visible" @created="emit('created')" />
</template>

<script setup lang="ts">
import { type AccountsResponse } from "~/types/accounts"

defineProps<{
  accountsResponse: AccountsResponse
}>()

const emit = defineEmits<{
  created: []
}>()

const visible = ref<boolean>(false)
</script>
