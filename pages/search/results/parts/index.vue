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
  onMounted(() => {
    setTimeout(() => {
      refresh();
    }, 1000);
  });
  onBeforeUnmount(() => {
    parts.value = undefined;
  });
</script>

<style lang=""></style>
