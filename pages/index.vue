<template>
  <main>
    <div v-if="cars">
      <SearchSmallParameters />
      <TwoColGrid :cars="cars.length > 6 ? cars.splice(0, 6) : cars" />
    </div>
    <Loader v-else />
  </main>
</template>

<script setup>
  const userLocation = await inject("userLocation");
  watch(userLocation, () => {
    refresh();
  });

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
  onMounted(() => {
    setTimeout(() => {
      refresh();
    }, 1000);
  });
  onBeforeUnmount(() => {
    cars.value = undefined;
  });

  useRouter().replace({ query: null });
</script>

<style lang="scss"></style>
