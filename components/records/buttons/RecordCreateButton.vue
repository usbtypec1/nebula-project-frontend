<template>
  <NuxtLink :to="{ name: 'record-create' }">
    <div class="fixed left-1/2 bottom-5 transform -translate-x-1/2">
      <Button rounded label="Запись" icon="pi pi-plus" severity="help" raised />
    </div>
  </NuxtLink>
</template>
