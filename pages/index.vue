<template>
  <main>
    <SearchSmallParameters />
    <TwoColGrid :cars="cars" />
  </main>
</template>

<script setup>
  const cars = await useFetchCars();
  useRouter().replace({ query: null });
</script>

<style lang="scss"></style>
