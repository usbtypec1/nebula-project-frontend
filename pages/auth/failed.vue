<template>
    <div>
      <h1>Аутентификация не пройдена</h1>
      <MainButton @click="close">Закрыть</MainButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useMiniApp, MainButton } from "vue-tg";
  
  const { close } = useMiniApp();
  </script>
  