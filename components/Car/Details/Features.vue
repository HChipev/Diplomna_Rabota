<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <div class="flex justify-center items-center">
      <h1 class="sm:text-2xl mb-3 sm:mb-0">Features</h1>
    </div>
    <div class="flex flex-col flex-wrap">
      <p
        class="flex items-center justify-center text-base pt-1 mb-3 border-t border-accent-color">
        Safety
      </p>
      <CarDetailsFeatureLabel v-for="n in 12" :extraName="n + 's'" />

      <p
        class="flex items-center justify-center text-base pt-1 mb-3 border-t border-accent-color">
        Exterior
      </p>
      <CarDetailsFeatureLabel v-for="n in 11" :extraName="n + 'e'" />

      <p
        class="flex items-center justify-center pt-1 mb-3 border-t border-accent-color">
        Comfort
      </p>
      <CarDetailsFeatureLabel v-for="n in 26" :extraName="n + 'c'" />

      <p
        class="flex items-center justify-center text-base pt-1 mb-3 border-t border-accent-color">
        Other
      </p>
      <CarDetailsFeatureLabel v-for="n in 7" :extraName="n + 'o'" />
    </div>
  </div>
</template>
<script setup></script>
<style lang=""></style>
