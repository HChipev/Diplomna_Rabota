<template>
  <div>Text my listings</div>
</template>
<script setup>
  useHead({
    title: "My Listings",
    meta: [
      {
        name: "description",
        content: "All your listed cars and pars are stored here!",
      },
    ],
  });
  definePageMeta({
    middleware: ["my-listings-middleware"],
  });
</script>
<style lang="scss"></style>
