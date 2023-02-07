<template>
  <div class="container mx-auto flex justify-center items-center">
    <div
      class="flex flex-col justify-between rounded-md shadow-sm w-[75%] shadow-white p-3">
      <h1 class="text-2xl">Cart items</h1>
      <div
        class="flex flex-col m-2 p-2 rounded-lg border border-border-color"></div>
    </div>
  </div>
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
