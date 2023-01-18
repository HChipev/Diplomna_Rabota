<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:8 xl:px-10 pb-16 w-full lg:w-3/5">
    <img class="w-full" :src="car.url" alt="car-image" />
    <div class="mt-5 xl:mt-10">
      <h1 class="text-xl xl:text-4xl whitespace-nowrap">
        {{ car.make }}
      </h1>
      <h1 class="text-lg xl:text-2xl content-start mt-0.5">
        {{ car.model }}
      </h1>
    </div>
    <div
      class="flex text-xs md:text-base xl:text-lg mt-2 border-b border-accent-color pb-2 justify-between">
      <div class="flex text-text-muted-color">
        <p class="mr-0.5 sm:mr-2">{{ car.year }}</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">Diesel</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.hp }}</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.milage }}km</p>
      </div>
      <div>
        <p class="font-bold xl:text-3xl">${{ car.price }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({ car: Object, route: Object });
</script>
