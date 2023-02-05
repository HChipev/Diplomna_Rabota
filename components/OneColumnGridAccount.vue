<template>
  <div class="container mx-auto sm:px-5">
    <CarLinkCard v-if="cars" v-for="car in cars" :key="car.id" :car="car" />
    <PartLinkCard
      v-if="parts"
      v-for="part in parts"
      :key="part.id"
      :part="part" />
  </div>
</template>
<script setup>
  const props = defineProps({ cars: Array, parts: Array });
</script>
<style lang=""></style>
