<template>
  <div>
    <Loader v-if="!car" />

    <div v-else class="container mx-auto px-5 sm:px-20 xl:px-28">
      <CarDetailsHero :car="car" />
      <CarDetailsFeatures v-if="car.features.length" :features="car.features" />
      <CarDetailsDescription
        v-if="car.description"
        :description="car.description" />
      <CarDetailsContactForm
        v-if="!isMyCar"
        :disabled="disableContactForm"
        :carOwner="car.userId" />
    </div>
  </div>
</template>
<script setup>
  const { data: car } = await useAsyncData("car", () =>
    $fetch(`/api/car/${useRoute().params.id}`)
  );
  car.value = undefined;
  const refresh = () => refreshNuxtData("car");
  const disableContactForm = computed(() => {
    if (useSupabaseUser().value) {
      return false;
    }
    return true;
  });
  const isMyCar = computed(() => {
    if (useSupabaseUser().value) {
      if (car.value.userId === useSupabaseUser().value.id) {
        return true;
      }
    }
    return false;
  });

  onMounted(async () => {
    await refresh();
    if (!car.value) {
      throwError({
        statusCode: 404,
        message: "Car does not exist",
      });
    }
    useHead({
      titleTemplate: "%s | 4ip's Auto",
      title: `${car.value.Make.name} ${car.value.Model.name}`,
    });
  });
  onBeforeUnmount(() => {
    car.value = undefined;
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
</script>
<style scoped lang="scss">
  img {
    max-height: 25rem;
  }
  p {
    margin: 0;
  }
</style>
