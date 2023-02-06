<template>
  <NuxtLink :to="`/search/results/parts/${message.part.id}`">
    <div class="even:bg-primery-lighter-color p-4">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="flex items-center">
            <h1 class="font-bold text-2xl">
              {{
                message.part.PartType.name + " " + message.part.PartName.name
              }}
            </h1>
            <p class="text-text-muted-color text-lg ml-2">
              {{ message.part.year }}
            </p>
          </div>
          <p class="text-lg text-text-muted-color">
            {{ message.part.Make.name + " " + message.part.Model.name }}
          </p>
          <p class="text-xl font-bold text-accent-color">
            {{ "$" + message.part.price }}
          </p>
        </div>

        <font-awesome-icon
          @click.prevent="emits('deleteClick', message.id)"
          class="text-white text-xl hover:text-accent-color font-bold cursor-pointer mx-2 transition-all duration-300 ease-in-out"
          icon="fa-solid fa-trash" />
      </div>
      <div class="flex mt-4">
        <p class="text-gray-400">
          {{ message.message }}
        </p>
      </div>
      <div class="flex justify-end items-end mt-4">
        <p class="text-text-muted-color text-right">
          {{
            message.createdAt.split("T")[0] +
            " " +
            message.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
  const props = defineProps({
    message: Object,
  });
  const emits = defineEmits(["deleteClick"]);
</script>
<style lang=""></style>
