<template>
  <div>
    <Loader v-if="!car" />

    <div v-else class="container mx-auto px-5 sm:px-20 xl:px-28">
      <CarDetailsHero :car="car" />
      <CarDetailsFeatures :car="car" />
      <CarDetailsDescription
        v-if="car.description"
        :description="car.description" />
      <CarDetailsContactForm />
    </div>
  </div>
</template>
<script setup>
  const { data: car } = await useAsyncData("car", () =>
    $fetch(`/api/car/${useRoute().params.id}`)
  );
  car.value = undefined;
  const refresh = () => refreshNuxtData("car");
  onMounted(async () => {
    await refresh();
    if (!car.value) {
      throwError({
        statusCode: 404,
        message: "Car does not exist",
      });
    }
    // useHead({
    //   title: car.value.Make.name + " " + car.value.Model.name,
    // });
  });
  onBeforeUnmount(() => {
    console.log("un");
    car.value = undefined;
    console.log(car.value, "asdasdasd");
  });

  onMounted(() => {
    window.scrollTo(0, 0);
  });
</script>
<style scoped lang="scss">
  img {
    max-height: 25rem;
  }
  p {
    margin: 0;
  }
</style>
