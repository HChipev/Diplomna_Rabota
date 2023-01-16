<template>
  <div>
    <div v-if="car" class="container mx-auto px-5 sm:px-28">
      <CarDetailsHero :car="car" :route="useRoute()" />
    </div>
  </div>
</template>
<script setup>
  const { cars } = useCars();
  useHead({
    title:
      useRoute().params.make.replaceAll("_", " ") +
      " " +
      useRoute().params.model,
  });
  const car = computed(() => {
    return cars.find((car) => {
      return (
        car.id === parseInt(useRoute().params.id) &&
        car.make === useRoute().params.make.replaceAll("_", " ") &&
        car.model === useRoute().params.model
      );
    });
  });

  if (!car.value) {
    throwError({
      statusCode: 404,
      message: "Car not found",
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
