<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div class="p-4 border border-border-color rounded-md">
      <div class="flex items-center mb-8">
        <h1 class="text-2xl md:text-6xl ml-5">Create a New Listing</h1>
        <div class="flex ml-2 min-[400px]:ml-5 mr-5">
          <img
            @click="addCar = true"
            :src="carOnParts ? onPartsIcon : carIcon"
            :class="addCar ? 'rounded-full border-2 border-accent-color' : ''"
            class="mr-2 w-9 h-9 md:w-16 md:h-16 p-0.5"
            alt="Car" />
          <img
            @click="(addCar = false), (carOnParts = false)"
            :src="partIcon"
            :class="addCar ? '' : 'rounded-full border-2 border-accent-color'"
            class="ml-2 w-9 h-9 md:w-16 md:h-16 p-0.5"
            alt="Part" />
        </div>
      </div>
      <CarCreateListing v-if="addCar" @isOnPartsChange="isOnPartsChange" />
      <PartCreateListing v-else />
    </div>
  </div>
</template>
<script setup>
  import onPartsIcon from "~/assets/car-on-parts-icon.svg";
  import carIcon from "~/assets/car-icon.svg";
  import partIcon from "~/assets/parts-icon.svg";
  const carOnParts = ref(false);
  const addCar = ref(true);
  function isOnPartsChange(isOnParts) {
    carOnParts.value = isOnParts;
  }
</script>
<style lang=""></style>
