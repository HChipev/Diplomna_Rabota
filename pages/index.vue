<template>
  <main>
    <SearchSmallParameters />
    <TwoColGrid :cars="cars" />
  </main>
</template>

<script setup>
  const cars = await useFetchCars();
  watchEffect(() => useRoute().query, await refreshNuxtData());
  onMounted(() => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss"></style>
