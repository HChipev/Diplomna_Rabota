<template>
  <div class="container mx-auto px-5 sm:px-28">
    <!-- car hero -->
    <div
      class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:8 xl:px-10 pb-16 w-full lg:w-3/5">
      <img
        class="w-full"
        src="https://picsum.photos/1900/1080"
        alt="car-image" />
      <div class="mt-5 xl:mt-10">
        <h1 class="text-xl xl:text-4xl whitespace-nowrap">
          {{ useRoute().params.make }}
        </h1>
        <h1 class="text-lg xl:text-2xl content-start mt-0.5">
          {{ useRoute().params.model }}
        </h1>
      </div>
      <div
        class="flex text-xs md:text-base xl:text-lg mt-2 border-b border-accent-color pb-2 justify-between">
        <div class="flex text-text-muted-color">
          <p class="mr-0.5 sm:mr-2">2013</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">Diesel</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">235hp</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">230000km</p>
        </div>
        <div>
          <p class="font-bold xl:text-3xl">$100,000</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  useHead({
    title: useRoute().params.make + " " + useRoute().params.model,
  });
</script>
<style scoped lang="scss">
  img {
    max-height: 25rem;
  }
  p {
    margin: 0;
  }
</style>
