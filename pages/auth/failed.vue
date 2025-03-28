<template>
    <div>
      <h1>Аутентификация не пройдена</h1>
      <MainButton @click="close">Закрыть</MainButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useWebApp, MainButton } from "vue-tg";
  
  const { close } = useWebApp();
  </script>
  