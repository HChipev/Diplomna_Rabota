<template>
  <div>
    <div v-if="parts">
      <OneColumnGrid v-if="parts.length" :parts="parts" />
      <div v-else class="flex mt-20">
        <h1 class="text-xl sm:text-3xl text-text-muted-color mx-auto">
          No parts found with this filters.
        </h1>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script setup>
  useHead({
    titleTemplate: "%s | 4ip's Auto",
    title: "Search results",
  });
  const filter = {
    partType: useRoute().query.partType,
    partName: useRoute().query.part,
    make: useRoute().query.make,
    model: useRoute().query.model,
    minPrice: useRoute().query.minPrice,
    maxPrice: useRoute().query.maxPrice,
    minYear: useRoute().query.minYear,
    maxYear: useRoute().query.maxYear,
    region: useRoute().query.region,
    city: useRoute().query.city,
  };

  console.log(filter);
  console.log(useRoute().query.features);
  const { data: parts } = await useAsyncData("parts", () =>
    $fetch(`/api/results/parts`, {
      params: filter,
    })
  );
  parts.value = undefined;
  const refresh = () => refreshNuxtData("parts");
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    parts.value = undefined;
    clearNuxtData([
      "carsHome",
      "cars",
      "car",
      "carsListings",
      "partsListings",
      "parts",
      "part",
      "userFromCarCard",
      "userFromPartCard",
      "savedCars",
      "savedParts",
    ]);
  });
</script>

<style lang=""></style>
