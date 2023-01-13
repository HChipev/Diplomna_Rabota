<template>
  <div>
    <div
      class="container w-full mx-28"
      v-if="
        useRoute().path === '/search/results/cars' ||
        useRoute().path === '/search/results/parts'
      ">
      <hr />

      <div v-if="useRoute().params.name === 'cars'">
        <div>{{ carParams.getCar }}</div>
      </div>
      <div v-else-if="useRoute().params.name === 'parts'">
        <div>{{ partParams.getPart }}</div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
<script setup>
  const carParams = useCarParams();
  const partParams = usePartParams();
  onMounted(() => {
    if (
      useRoute().params.name !== "cars" &&
      useRoute().params.name !== "parts"
    ) {
      console.log("error");
      createError({ statusCode: 404, statusMessage: "Page Not Found" });
    }
  });
</script>
<style lang="scss">
  //
</style>
