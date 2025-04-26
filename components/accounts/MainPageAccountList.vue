<template>
  <div class="overflow-x-auto flex gap-x-4 snap-x snap-mandatory pb-2">
    <div
      v-for="(group, groupIndex) in groupedAccounts"
      :key="groupIndex"
      class="grid grid-cols-2 grid-rows-2 gap-4 min-w-screen snap-start"
    >
      <NuxtLink
        v-for="account in group"
        :key="account.id"
        :to="{ name: 'accounts-id', params: { id: account.id } }"
      >
        <Card :header="account.name">
          <template #title>
            <span class="pi pi-money-bill"></span> {{ account.name }}
          </template>
          <template #content> {{ account.balance }} сом </template>
        </Card>
      </NuxtLink>
      <Button
        v-if="shouldInsertButton(groupIndex, group.length)"
        icon="pi pi-plus"
        text
        icon-pos="top"
        label="Создать аккаунт"
        severity="success"
        @click="visible = true"
      />
    </div>

    <div
      v-if="shouldAddSeparateButton"
      class="flex items-center justify-center min-w-screen snap-center"
    >
      <Button
        icon="pi pi-plus"
        text
        icon-pos="top"
        label="Создать аккаунт"
        severity="success"
        @click="visible = true"
      />
    </div>
  </div>

  <AccountCreateDialog v-model:visible="visible" @created="emit('created')" />
</template>

<script setup lang="ts">
import { type Account, type AccountsResponse } from "~/types/accounts"

const props = defineProps<{
  accountsResponse: AccountsResponse
}>()

const emit = defineEmits<{
  created: []
}>()

const visible = ref<boolean>(false)

const GROUP_MAX_SIZE = 4

const { groupedAccounts, shouldAddSeparateButton, shouldInsertButton } =
  useGroupedAccounts(
    toRef(() => props.accountsResponse.accounts),
    GROUP_MAX_SIZE
  )
</script>
