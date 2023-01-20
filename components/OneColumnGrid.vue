<template>
  <div class="container mx-auto px-3 sm:px-24 lg:px-48 xl:px-40">
    <CarLinkCard v-for="car in cars" :key="car.id" :car="car" />
  </div>
</template>
<script setup>
  const props = defineProps({ cars: Array });
</script>
<style lang=""></style>
