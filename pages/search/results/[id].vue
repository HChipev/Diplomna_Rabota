<template>
  <div>
    <div v-if="car" class="container mx-auto px-5 sm:px-20 xl:px-28">
      <CarDetailsHero :car="car" />
      <CarDetailsFeatures :car="car" />
      <CarDetailsDescription
        v-if="car.description"
        :description="car.description" />
      <CarDetailsContactForm />
    </div>
    <div v-else id="loader">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const car = await useFetchCar(useRoute().params);

  watchEffect(() => useRoute().params, refreshNuxtData());

  useHead({
    title: car.value.Make.name + " " + car.value.Model.name,
  });
  if (!car.value) {
    throwError({
      statusCode: 404,
      message: "Car does not exist",
    });
  }
</script>
<style scoped lang="scss">
  img {
    max-height: 25rem;
  }
  p {
    margin: 0;
  }
</style>
