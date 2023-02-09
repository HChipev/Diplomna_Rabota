<template>
  <div>
    <div v-if="cars">
      <div v-if="cars.length">
        <OneColumnGrid :cars="paginatedCars" />
        <Pagination
          v-if="totalPages > 1"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @switchPage="switchPage" />
      </div>
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
  const currentPage = ref(1);
  const perPage = 10;
  const totalPages = computed(() => Math.ceil(cars.value.length / perPage));
  const paginatedCars = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return cars.value.slice(start, end);
  });

  function switchPage(page) {
    currentPage.value = page;
  }

  onMounted(() => {
    setTimeout(() => {
      refresh();
    }, 1000);
  });
  onBeforeUnmount(() => {
    cars.value = undefined;
  });
</script>
<style lang=""></style>
