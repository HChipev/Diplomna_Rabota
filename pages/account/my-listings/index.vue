<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div class="p-4 border border-border-color rounded-md">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl md:text-6xl">My Listings</h1>
        <NuxtLink
          to="/account/my-listings/create"
          class="w-9 h-9 flex justify-center items-center rounded-full bg-accent-color text-white hover:bg-white hover:text-accent-color transition-all font-bold cursor-pointer"
          ><font-awesome-icon icon="fa-solid fa-plus"
        /></NuxtLink>
      </div>
      <div class="border border-border-color rounded-lg p-3 mt-5">
        <CarListingCard
          v-for="listing in listings"
          :key="listing.id"
          :listing="listing" />
      </div>
    </div>
  </div>
</template>
<script setup>
  const { listings } = useCars();
  useHead({
    title: "My Listings",
    meta: [
      {
        name: "description",
        content: "All your listed cars and pars are stored here!",
      },
    ],
  });
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
</script>
<style lang="scss"></style>
