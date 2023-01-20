<template>
  <div class="container mx-auto px-3 sm:px-24 lg:px-48 xl:px-28">
    <div class="grid grid-col-1 xl:grid-cols-2 mt-2">
      <CarLinkCard v-for="car in cars" :key="car.id" :car="car" />
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({ cars: Array });
</script>
<style lang="scss" scoped>
  //
</style>
