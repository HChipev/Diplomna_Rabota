<template>
  <div class="container mx-auto sm:px-5">
    <CarLinkCard
      v-if="cars"
      v-for="(car, index) in paginatedCars"
      :key="index"
      :car="car" />
    <Pagination
      v-if="cars && cars.length > listingsPerPage"
      :currentPage="currentPage"
      :totalPages="totalPagesCars"
      @changePage="changePage" />
    <PartLinkCard
      v-if="parts"
      v-for="(part, index) in paginatedParts"
      :key="index"
      :part="part" />
    <Pagination
      v-if="parts && parts.length > listingsPerPage"
      :currentPage="currentPage"
      :totalPages="totalPagesParts"
      @changePage="changePage" />
  </div>
</template>
<script setup>
  const props = defineProps({ cars: Array, parts: Array });
  const currentPage = ref(1);
  const listingsPerPage = 5;
  const totalPagesCars = computed(() =>
    Math.ceil(props.cars.length / listingsPerPage)
  );
  const totalPagesParts = computed(() =>
    Math.ceil(props.parts.length / listingsPerPage)
  );
  const paginatedCars = computed(() => {
    const start = (currentPage.value - 1) * listingsPerPage;
    const end = start + listingsPerPage;
    return props.cars.slice(start, end);
  });
  const paginatedParts = computed(() => {
    const start = (currentPage.value - 1) * listingsPerPage;
    const end = start + listingsPerPage;
    return props.parts.slice(start, end);
  });
  function changePage(page) {
    currentPage.value = page;
  }
</script>
<style lang=""></style>
