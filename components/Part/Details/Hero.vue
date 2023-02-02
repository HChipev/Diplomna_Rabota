<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <img class="w-full" :src="part.url" alt="part-image" />
    <div class="flex justify-between mt-4 xl:mt-6">
      <div class="flex flex-col">
        <h1 class="text-xl xl:text-4xl whitespace-nowrap">
          {{ part.PartType.name }}
        </h1>
        <h1 class="text-lg xl:text-2xl content-start -mt-0.5 sm:mt-0.5">
          {{ part.PartName.name }}
        </h1>
      </div>
      <div class="flex flex-col">
        <p class="text-xs sm:text-sm text-text-muted-color">
          Posted on
          {{
            part.createdAt.split("T")[0] +
            " " +
            part.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
        <div class="flex items-end justify-end">
          <h1 class="text-sm sm:text-lg text-right">
            {{ part.Region.name + ", " + part.City.name }}
          </h1>
        </div>
      </div>
    </div>
    <div
      class="flex text-xs md:text-base xl:text-lg mt-2 border-b border-accent-color pb-2 justify-between">
      <div class="flex flex-col sm:flex-row text-text-muted-color">
        <div class="flex flex-wrap">
          <p class="mr-0.5 sm:mr-2 text-white">
            {{ part.Make.name + " " + part.Model.name }}
          </p>
          <p class="mr-0.5 sm:mr-2">|</p>
          <p class="mr-0.5 sm:mr-2">{{ part.year }}</p>
        </div>
      </div>
      <div class="flex items-end sm:items-center">
        <p class="font-bold xl:text-3xl">${{ part.price }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({ part: Object });
</script>
