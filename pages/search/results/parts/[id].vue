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
    // useHead({
    //   title: car.value.Make.name + " " + car.value.Model.name,
    // });
  });
  onBeforeUnmount(() => {
    console.log("un");
    part.value = undefined;
    console.log(part.value, "asdasdasd");
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
