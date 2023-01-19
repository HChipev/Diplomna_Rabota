<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <div class="flex flex-col border-t border-accent-color">
      <h1 class="mt-4 text-base sm:text-2xl">Description</h1>
      <p class="text-sm sm:text-base text-text-muted-color">
        {{ car.description }}
      </p>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({ car: Object, route: Object });
</script>
<style lang=""></style>
