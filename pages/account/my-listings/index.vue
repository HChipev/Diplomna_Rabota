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
            v-for="(listing, index) in paginatedCars"
            :key="index"
            :listing="listing"
            @deleteClick="handleDeleteCar" />
          <Pagination
            v-if="carsTotalPages > 1"
            :currentPage="carsCurrentPage"
            :totalPages="carsTotalPages"
            @switchPage="switchCarPage" />
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
            v-for="(listing, index) in paginatedParts"
            :key="index"
            :listing="listing"
            @deleteClick="handleDeletePart" />
          <Pagination
            v-if="partsTotalPages > 1"
            :currentPage="partsCurrentPage"
            :totalPages="partsTotalPages"
            @switchPage="switchPartPage" />
        </div>
      </div>
      <p
        v-if="errorMessage"
        class="text-red-600 text-center text-sm sm:text-xl mt-2">
        {{ errorMessage }}
      </p>
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
  const errorMessage = ref("");
  const user_id = useSupabaseUser().value.id;
  const { data: carsListings } = await useAsyncData("carsListings", () =>
    $fetch(`/api/car/listings/user/${user_id}`)
  );
  const { data: partsListings } = await useAsyncData("partsListings", () =>
    $fetch(`/api/part/listings/user/${user_id}`)
  );
  carsListings.value = undefined;
  partsListings.value = undefined;
  const refresh = () => refreshNuxtData(["carsListings", "partsListings"]);
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    carsListings.value = undefined;
    partsListings.value = undefined;
  });
  async function handleDeleteCar(id) {
    const imagesForDeletion = carsListings.value.find(
      (listing) => listing.id === id
    ).images;
    await $fetch(`/api/car/listings/${id}`, {
      method: "DELETE",
    })
      .then(async () => {
        carsListings.value = carsListings.value.filter(
          (listing) => listing.id !== id
        );
        for (let i = 0; i < imagesForDeletion.length; i++) {
          await useSupabaseClient()
            .storage.from("images")
            .remove(imagesForDeletion[i]);
        }
        errorMessage.value = "";
      })
      .catch((err) => {
        errorMessage.value = err.message;
        window.scrollTo(0, window.innerHeight);
      });
  }
  async function handleDeletePart(id) {
    const imagesForDeletion = partsListings.value.find(
      (listing) => listing.id === id
    ).images;
    await $fetch(`/api/part/listings/${id}`, {
      method: "DELETE",
    })
      .then(async () => {
        partsListings.value = partsListings.value.filter(
          (listing) => listing.id !== id
        );
        for (let i = 0; i < imagesForDeletion.length; i++) {
          await useSupabaseClient()
            .storage.from("images")
            .remove(imagesForDeletion[i]);
        }
        errorMessage.value = "";
      })
      .catch((err) => {
        errorMessage.value = err.message;
        window.scrollTo(0, window.innerHeight);
      });
  }

  const perPage = 10;
  const carsCurrentPage = ref(1);
  const carsTotalPages = computed(() =>
    Math.ceil(carsListings.value.length / perPage)
  );
  const paginatedCars = computed(() => {
    const start = (carsCurrentPage.value - 1) * perPage;
    const end = start + perPage;
    return carsListings.value.slice(start, end);
  });

  function switchCarPage(page) {
    carsCurrentPage.value = page;
  }
  const partsCurrentPage = ref(1);
  const partsTotalPages = computed(() =>
    Math.ceil(partsListings.value.length / perPage)
  );
  const paginatedParts = computed(() => {
    const start = (partsCurrentPage.value - 1) * perPage;
    const end = start + perPage;
    return partsListings.value.slice(start, end);
  });
  function switchPartPage(page) {
    partsCurrentPage.value = page;
  }
</script>
<style lang="scss"></style>
