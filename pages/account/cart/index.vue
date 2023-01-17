<template>
  <div>Text Cart</div>
</template>
<script setup>
  useHead({
    title: "Cart",
  });
  definePageMeta({
    middleware: ["cart-middleware"],
  });
</script>
<style lang="scss"></style>
