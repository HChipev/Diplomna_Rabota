<template>
  <!-- Work in progress -->
  <div class="even:bg-primery-lighter-color p-4">
    <h1 class="font-bold text-2xl">{{ message.name }}</h1>
    <p class="text-gray-400">
      {{ message.message }}
    </p>
    <div class="flex items-center mt-4">
      <p class="text-accent-color font-medium mr-10">{{ message.email }}</p>
      <p class="text-blue-500">{{ message.phone }}</p>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    message: Object,
  });
</script>
<style lang=""></style>
