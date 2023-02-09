<template>
  <div class="container mx-auto px-3 sm:px-24 lg:px-48 xl:px-40">
    <CarLinkCard
      v-if="cars"
      v-for="(car, index) in cars"
      :key="index"
      :car="car" />
    <PartLinkCard
      v-if="parts"
      v-for="(part, index) in parts"
      :key="index"
      :part="part" />
  </div>
</template>
<script setup>
  const props = defineProps({ cars: Array, parts: Array });
</script>
<style lang=""></style>
