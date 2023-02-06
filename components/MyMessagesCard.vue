<template>
  <!-- Work in progress -->
  <div class="even:bg-primery-lighter-color p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <h1 class="font-bold text-2xl">
          {{ message.car.Make.name + " " + message.car.Model.name }}
        </h1>
        <p class="text-text-muted-color text-lg ml-2">
          {{ message.car.year }}
        </p>
      </div>
      <p class="text-xl text-accent-color">{{ "$" + message.car.price }}</p>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <p class="text-gray-400">
          {{ message.message }}
        </p>
        <p class="text-accent-color font-medium">{{ message.email }}</p>
        <p class="text-blue-500">{{ message.phone }}</p>
      </div>
      <div class="flex items-end">
        <p class="text-text-muted-color text-right">
          {{
            message.createdAt.split("T")[0] +
            " " +
            message.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    message: Object,
  });
</script>
<style lang=""></style>
