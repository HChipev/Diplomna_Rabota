<template>
  <main>
    <div v-if="cars">
      <SearchSmallParameters />
      <TwoColGrid :cars="cars" />
    </div>
    <Loader v-else />
  </main>
</template>

<script setup>
  const userLocation = await inject("userLocation");

  const { data: cars } = await useAsyncData("cars", async () => {
    if (userLocation.value) {
      return await $fetch(`/api/user/location/cars/${userLocation.value}`);
    } else {
      return (await $fetch(`/api/results/cars`)).length > 6
        ? (await $fetch(`/api/results/cars`)).splice(0, 6)
        : await $fetch(`/api/results/cars`);
    }
  });
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
  watch(userLocation, () => {
    refresh();
  });
  useRouter().replace({ query: null });
</script>

<style lang="scss"></style>
