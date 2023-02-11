<template>
  <div>
    <div v-if="cars">
      <OneColumnGrid v-if="cars.length" :cars="cars" />
      <div v-else class="flex mt-20">
        <h1 class="text-xl sm:text-3xl text-text-muted-color mx-auto">
          No cars found with this filters.
        </h1>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>
<script setup>
  const filter = {
    make: useRoute().query.make,
    model: useRoute().query.model,
    minPrice: useRoute().query.minPrice,
    maxPrice: useRoute().query.maxPrice,
    minYear: useRoute().query.minYear,
    maxYear: useRoute().query.maxYear,
    minMileage: useRoute().query.minMileage,
    maxMileage: useRoute().query.maxMileage,
    engine: useRoute().query.engine,
    gearbox: useRoute().query.gearbox,
    drivetrain: useRoute().query.drivetrain,
    color: useRoute().query.color,
    region: useRoute().query.region,
    city: useRoute().query.city,
    features: useRoute().query.features,
    carsOnParts: useRoute().query.carsOnParts,
  };

  console.log(filter);
  console.log(useRoute().query.features);
  const { data: cars } = await useAsyncData("cars", () =>
    $fetch(`/api/results/cars`, {
      params: filter,
    })
  );
  cars.value = undefined;
  const refresh = () => refreshNuxtData("cars");
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    cars.value = undefined;
    clearNuxtData([
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
