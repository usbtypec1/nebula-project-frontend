<template>
  <div class="overflow-x-auto scrollbar-hide">
    <div class="flex gap-x-2 w-max scrollbar-hide">
      <Button
        v-for="item in items"
        :key="item.label"
        outlined
        icon-pos="top"
        :label="item.label"
        :icon="item.icon"
        :severity="item.severity"
        @click="item.action"
      />
    </div>
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
    severity: "success",
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
    action: async () => await navigateTo({ name: "transactions" }),
  },
  {
    label: "Импорт/экспорт",
    icon: "pi pi-save",
    severity: "contrast",
    action: async () => await navigateTo({ name: "import-export" }),
  },
]
</script>

<style scoped>
</style>
