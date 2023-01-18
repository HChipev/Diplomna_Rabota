<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div class="rounded shadow shadow-gray-500">
      <CarMessageCard />
      <CarMessageCard />
      <CarMessageCard />
      <CarMessageCard />
      <CarMessageCard />
    </div>
  </div>
</template>
<script setup>
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
</script>
<style lang=""></style>
