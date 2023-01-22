<template>
  <NuxtLink
    class="cursor-default"
    :to="`/account/my-listings/view/${listing.id}`">
    <div
      class="shadow bg-primery-lighter-color shadow-gray-300 flex rounded overflow-hidden justify-between mb-4">
      <div class="flex">
        <img
          :src="listing.url"
          alt="car-image"
          class="w-40 min-[390px]:w-48 min-[435px]:w-56 sm:w-80 mr-3 h-36 sm:h-44" />
        <div>
          <div class="flex flex-col md:flex-row">
            <h1 class="text-base sm:text-2xl whitespace-nowrap">
              {{ listing.Make.make }}
            </h1>
            <h1 class="text-sm sm:text-2xl whitespace-nowrap md:ml-2">
              {{ listing.Model.model }}
            </h1>
          </div>
          <p class="text-accent-color text-base sm:text-lg font-bold">
            ${{ listing.price }}
          </p>
        </div>
      </div>
      <div class="p-1 pr-2 flex flex-col sm:flex-row">
        <font-awesome-icon
          class="text-white hover:text-accent-color font-bold cursor-pointer"
          icon="fa-solid fa-trash" />
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  const props = defineProps({ listing: Object });
</script>
<style lang=""></style>
