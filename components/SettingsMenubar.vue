<template>
  <div class="grid grid-cols-2 gap-2">
    <Button
      v-for="item in items"
      :key="item.label"
      outlined
      :label="item.label"
      :icon="item.icon"
      :severity="item.severity"
      @click="item.action"
    />
  </div>
</template>

<script setup lang="ts">
interface Item {
  label: string
  icon: string
  severity: string
  action: () => void
}
const items: Item[] = [
  {
    label: "Категории",
    icon: "pi pi-bars",
    severity: "info",
    action: async () => await navigateTo({ name: "categories" }),
  },
  {
    label: "Аккаунты",
    icon: "pi pi-money-bill",
    severity: "help",
    action: async () => await navigateTo({ name: "accounts" }),
  },
  {
    label: "История",
    icon: "pi pi-clock",
    severity: "secondary",
    action: async () => await navigateTo({ name: "accounts" }),
  },
  {
    label: "Импорт/экспорт",
    icon: "pi pi-save",
    severity: "success",
    action: async () => await navigateTo({ name: "accounts" }),
  },
]
</script>
