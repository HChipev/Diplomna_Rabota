<template>
  <div class="container mx-auto sm:px-5">
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
