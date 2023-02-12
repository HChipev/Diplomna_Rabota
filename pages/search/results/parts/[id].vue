<template>
  <div>
    <Loader v-if="!part" />

    <div v-else class="container mx-auto px-5 sm:px-20 xl:px-28">
      <PartDetailsHero :part="part" />

      <PartDetailsDescription
        v-if="part.description"
        :description="part.description" />
      <PartDetailsContactForm
        v-if="!isMyPart"
        :disabled="disableContactForm"
        :partOwner="part.userId" />
    </div>
  </div>
</template>
<script setup>
  const { data: part } = await useAsyncData("part", () =>
    $fetch(`/api/part/${useRoute().params.id}`)
  );
  part.value = undefined;
  const refresh = () => refreshNuxtData("part");
  const disableContactForm = computed(() => {
    if (useSupabaseUser().value) {
      return false;
    }
    return true;
  });
  const isMyPart = computed(() => {
    if (useSupabaseUser().value) {
      if (part.value.userId === useSupabaseUser().value.id) {
        return true;
      }
    }
    return false;
  });

  onMounted(async () => {
    await refresh();
    if (!part.value) {
      throwError({
        statusCode: 404,
        message: "Part does not exist",
      });
    }
    useHead({
      titleTemplate: "%s | 4ip's Auto",
      title: `${part.value.PartType.name} ${part.value.PartName.name}/${part.value.Make.name} ${part.value.Model.name}`,
    });
  });
  onBeforeUnmount(() => {
    part.value = undefined;
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
