<template>
  <div
    v-if="carsListings || partsListings"
    class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div class="p-4 border border-border-color rounded-md">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl md:text-6xl">My Listings</h1>
        <NuxtLink
          to="/account/my-listings/create"
          class="w-9 h-9 flex justify-center items-center rounded-full bg-accent-color text-white hover:bg-white hover:text-accent-color transition-all font-bold cursor-pointer"
          ><font-awesome-icon icon="fa-solid fa-plus"
        /></NuxtLink>
      </div>
      <div v-if="carsListings" class="mt-5">
        <h1 class="text-xl sm:text-3xl m-2 ml-3">Cars</h1>
        <div class="border border-border-color rounded-lg p-3">
          <h1
            v-if="carsListings.length <= 0"
            class="text-text-muted-color text-center text-sm sm:text-xl">
            No cars listed yet.
          </h1>
          <CarListingCard
            v-for="listing in carsListings"
            :key="listing.id"
            :listing="listing"
            @deleteClick="handleDeleteCar" />
        </div>
      </div>
      <div v-if="partsListings" class="mt-5">
        <h1 class="text-xl sm:text-3xl m-2 ml-3">Parts</h1>
        <div class="border border-border-color rounded-lg p-3">
          <h1
            v-if="partsListings.length <= 0"
            class="text-text-muted-color text-center text-sm sm:text-xl">
            No parts listed yet.
          </h1>
          <PartListingCard
            v-for="listing in partsListings"
            :key="listing.id"
            :listing="listing"
            @deleteClick="handleDeletePart" />
        </div>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>
<script setup>
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

  const user_id = useSupabaseUser().value.id;
  const { data: carsListings } = await useAsyncData("carsListings", () =>
    $fetch(`/api/car/listings/user/${user_id}`)
  );
  const { data: partsListings } = await useAsyncData("partsListings", () =>
    $fetch(`/api/part/listings/user/${user_id}`)
  );
  console.log(partsListings.value);
  carsListings.value = undefined;
  partsListings.value = undefined;
  const refresh = () => refreshNuxtData(["carsListings", "partsListings"]);
  onMounted(async () => {
    await refresh();
    console.log(partsListings.value);
  });
  onBeforeUnmount(() => {
    carsListings.value = undefined;
    partsListings.value = undefined;
  });
  async function handleDeleteCar(id) {
    await $fetch(`/api/car/listings/${id}`, {
      method: "DELETE",
    });
    carsListings.value = carsListings.value.filter(
      (listing) => listing.id !== id
    );
  }
  async function handleDeletePart(id) {
    await $fetch(`/api/part/listings/${id}`, {
      method: "DELETE",
    });
    partsListings.value = partsListings.value.filter(
      (listing) => listing.id !== id
    );
  }
</script>
<style lang="scss"></style>
