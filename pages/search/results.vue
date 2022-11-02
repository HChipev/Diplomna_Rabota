<template>
  <div>
    <div v-if="useRoute().path === '/search/results/cars'" class="container">
      <div>{{ carParams.getCar }}</div>
    </div>
    <div v-else-if="useRoute().path === '/search/results/parts'" class="container">
      <div>{{ partParams.getPart }}</div>
    </div>
    <NuxtPage v-else />
  </div>
</template>
<script setup>
const carParams = useCarParams();
const partParams = usePartParams();
</script>
<style scoped></style>
