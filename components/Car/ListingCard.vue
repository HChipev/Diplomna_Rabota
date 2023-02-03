<template>
  <NuxtLink
    class="cursor-default"
    :to="`/account/my-listings/view/car/${listing.id}`">
    <div
      class="shadow bg-primery-lighter-color shadow-gray-300 flex rounded overflow-hidden justify-between mb-4">
      <div class="flex">
        <img
          :src="`${entry}/storage/v1/object/public/images/${listing.images[0]}`"
          alt="car-image"
          class="w-32 min-[390px]:w-46 min-[435px]:w-52 sm:w-80 mr-3 h-36 sm:h-44" />
        <div>
          <div class="flex flex-col md:flex-row">
            <h1 class="text-base sm:text-2xl whitespace-nowrap">
              {{ listing.Make.name }}
            </h1>
            <h1 class="text-sm sm:text-2xl whitespace-nowrap md:ml-2">
              {{ listing.Model.name }}
            </h1>
          </div>
          <p class="text-accent-color text-base sm:text-lg font-bold">
            ${{ listing.price }}
          </p>
        </div>
      </div>
      <div class="p-1 pr-2 flex flex-col sm:flex-row">
        <img
          class="w-6 h-6 mr-2"
          :src="listing.isOnParts ? onPartsIcon : carIcon" />
        <font-awesome-icon
          @click.prevent="emits('deleteClick', listing.id)"
          class="text-white hover:text-accent-color font-bold cursor-pointer mt-1"
          icon="fa-solid fa-trash" />
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
  import onPartsIcon from "~/assets/car-on-parts-icon.svg";
  import carIcon from "~/assets/car-icon.svg";
  const entry = useRuntimeConfig().public.supabase.url;
  const props = defineProps({ listing: Object });
  const emits = defineEmits(["deleteClick"]);
</script>
<style lang=""></style>
