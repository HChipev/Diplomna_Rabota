<template>
  <div class="container mx-auto sm:px-5">
    <CarLinkCard
      v-if="cars"
      v-for="(car, index) in paginatedCars"
      :key="index"
      :car="car" />

    {{ carsTotalPages }}
    <Pagination
      v-if="carsTotalPages > 1"
      :currentPage="carsCurrentPage"
      :totalPages="carsTotalPages"
      @switchPage="switchCarsPage" />

    <PartLinkCard
      v-if="parts"
      v-for="(part, index) in paginatedParts"
      :key="index"
      :part="part" />
    <Pagination
      v-if="partsTotalPages > 1"
      :currentPage="partsCurrentPage"
      :totalPages="partsTotalPages"
      @switchPage="switchPartsPage" />
  </div>
</template>
<script setup>
  const props = defineProps({ cars: Array, parts: Array });
  const perPage = 2;
  const carsCurrentPage = ref(1);
  const carsTotalPages = computed(() =>
    Math.ceil(props.cars?.length / perPage)
  );
  const paginatedCars = computed(() => {
    const start = (carsCurrentPage.value - 1) * perPage;
    const end = start + perPage;
    return props.cars.slice(start, end);
  });

  function switchCarsPage(page) {
    carsCurrentPage.value = page;
  }
  const partsCurrentPage = ref(1);
  const partsTotalPages = computed(() =>
    Math.ceil(props.parts?.length / perPage)
  );
  const paginatedParts = computed(() => {
    const start = (partsCurrentPage.value - 1) * perPage;
    const end = start + perPage;
    return props.parts.slice(start, end);
  });
  function switchPartsPage(page) {
    partsCurrentPage.value = page;
  }
</script>
<style lang=""></style>
