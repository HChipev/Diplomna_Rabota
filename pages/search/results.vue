<template>
  <div>
    <div v-if="useRoute().path === '/search/results'" class="container">
      <div>{{ carParams.getCar }}</div>
    </div>
    <NuxtPage v-else />
  </div>
</template>
<script setup>
import { useCarParams } from "~~/store/useCarParams";

const carParams = useCarParams();
</script>
<style scoped></style>
