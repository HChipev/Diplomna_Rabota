<template>
  <div>
    <SearchBigParameters v-if="useRoute().path === '/search'" />
    <NuxtPage v-else />
  </div>
</template>
<script setup>
  useHead({
    title: "Search",
    meta: [
      {
        name: "description",
        content: "Search for your wanted car here!",
      },
    ],
  });
</script>
<style lang="scss"></style>
