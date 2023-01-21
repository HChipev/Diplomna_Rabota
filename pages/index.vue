<template>
  <main>
    <SearchSmallParameters />
    <TwoColGrid :cars="cars" />
  </main>
</template>

<script setup>
  const cars = await useFetchCars();
  watchEffect(() => useRoute().query, await refreshNuxtData());
</script>

<style lang="scss"></style>
