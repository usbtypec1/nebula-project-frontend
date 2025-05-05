<template>
  <div class="card">
    <DataView
      :value="accounts"
      paginator
      :rows="100"
      :always-show-paginator="false"
      data-key="id"
    >
      <template #empty>
        <Message icon="pi pi-exclamation-triangle" severity="info" class="mb-4">
          У вас нет аккаунтов
        </Message>
      </template>
      <template #list="{ items: accounts }: { items: Account[] }">
        <p class="text-sm font-normal">Все категории</p>
        <div class="flex flex-col divide-solid divide-y-2">
          <div v-for="account in accounts" :key="account.id">
            <div class="flex items-center justify-between py-3">
              <div>
                <p class="text-lg font-semibold flex items-center gap-x-1">
                  {{ account.name }}
                </p>
              </div>
              <div class="flex gap-x-2">
                <Button icon="pi pi-file-edit" text />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="emit('delete', account.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import type { Account } from "~/types/accounts"

const emit = defineEmits<{
  delete: [id: number]
}>()

const props = defineProps<{
  accounts: Account[]
}>()
</script>
