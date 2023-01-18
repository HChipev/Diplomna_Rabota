<template>
  <div>Text Cart</div>
</template>
<script setup>
  useHead({
    title: "Cart",
  });
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
</script>
<style lang="scss"></style>
