<template>
  <div>
    <OneColumnGrid v-if="cars.length" :cars="cars" />
    <div v-else class="flex mt-20">
      <h1 class="text-xl sm:text-3xl text-text-muted-color mx-auto">
        No cars found with this filters
      </h1>
    </div>
  </div>
</template>
<script setup>
  const filter = {
    // make: useRoute().query.make,
    // model: useRoute().query.model,
    minPrice: 100000,
    // maxPrice: useRoute().query.maxPrice,
    // minYear: useRoute().query.minYear,
    // maxYear: useRoute().query.maxYear,
    // engine: useRoute().query.engine,
    // gearbox: useRoute().query.gearbox,
    // region: useRoute().query.region,
    // city: useRoute().query.city,
  };
  const { data: cars } = await useFetch(`/api/results/cars`, {
    params: filter,
  });

  console.log(useRoute().query);
  console.log(cars.value);
</script>
<style lang=""></style>
