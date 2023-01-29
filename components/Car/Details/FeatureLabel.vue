<template>
  <div class="flex items-center mb-4">
    <font-awesome-icon
      class="text-lg text-accent-color"
      icon="fa-solid fa-check" />
    <p class="ml-2 font-medium text-text-muted-color">
      {{ extraName.feature }}
    </p>
  </div>
</template>
<script setup>
  const props = defineProps({
    extraName: Object,
  });
</script>
<style lang="scss" scoped>
  //
</style>
