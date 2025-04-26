<template>
  <div class="my-2">
    <RecordCreateForm :categories="categories!" />
  </div>
</template>

<script setup lang="ts">
const { data: categories } = await useCategoryList()
</script>
