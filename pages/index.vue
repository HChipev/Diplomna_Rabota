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
  const { data: cars } = await useAsyncData("cars", () =>
    $fetch(`/api/results/cars`)
  );
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
