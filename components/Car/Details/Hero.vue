<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <img class="w-full" :src="car.url" alt="car-image" />
    <div class="flex justify-between mt-4 xl:mt-6">
      <div class="flex flex-col">
        <h1 class="text-xl xl:text-4xl whitespace-nowrap">
          {{ car.Make.name }}
        </h1>
        <h1 class="text-lg xl:text-2xl content-start -mt-0.5 sm:mt-0.5">
          {{ car.Model.name }}
        </h1>
      </div>
      <div class="flex flex-col">
        <p class="text-xs sm:text-sm text-text-muted-color">
          Posted on
          {{
            car.createdAt.split("T")[0] +
            " " +
            car.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
        <div class="flex items-end justify-end">
          <h1 class="text-sm sm:text-lg text-right">
            {{ car.Region.name + ", " + car.City.name }}
          </h1>
        </div>
      </div>
    </div>
    <div
      class="flex text-xs md:text-base xl:text-lg mt-2 border-b border-accent-color pb-2 justify-between">
      <div class="flex flex-col sm:flex-row text-text-muted-color">
        <div class="flex flex-wrap">
          <p class="mr-0.5 sm:mr-2">{{ car.year }}</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">{{ car.Engine.name }}</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">{{ car.Gearbox.name }}</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">{{ car.horsepower }}hp</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">{{ car.mileage }}km</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">{{ car.Drivetrain.name }}</p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p v-if="car.Color" class="mr-0.5 sm:mr-2">{{ car.Color.name }}</p>
        </div>
      </div>
      <div class="flex items-end sm:items-center">
        <p class="font-bold xl:text-3xl">${{ car.price }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({ car: Object });
</script>
