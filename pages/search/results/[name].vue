<template>
  <div>
    <div
      class="flex flex-col justify-center mx-12 sm:mx-28"
      v-if="
        useRoute().path === '/search/results/cars' ||
        useRoute().path === '/search/results/parts'
      ">
      <hr />

      <div class="flex justify-center items-center px-12">
        <div v-if="useRoute().params.name === 'cars'">car params</div>
        <div v-if="useRoute().params.name === 'parts'">part params</div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
<script setup>
  onMounted(() => {
    if (
      useRoute().params.name !== "cars" &&
      useRoute().params.name !== "parts"
    ) {
      throwError({
        statusCode: 404,
        message: "Page not found: " + useRoute().path,
      });
    }
  });
</script>
<style lang="scss">
  //
</style>
