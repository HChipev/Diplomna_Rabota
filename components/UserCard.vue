<template>
  <div class="flex w-full rounded-md border border-border-color p-3 my-3">
    <img
      class="w-20 h-20 rounded-full object-cover"
      :src="
        user.image
          ? `${entry}/storage/v1/object/public/images/${user.image}`
          : defaultProfilePic
      "
      alt="user-image" />
    <div class="flex w-full justify-between">
      <div class="flex flex-col ml-3">
        <h1 class="text-2xl">{{ user.firstName + " " + user.lastName }}</h1>
        <p class="text-lg text-text-muted-color">{{ user.email }}</p>
        <p class="text-lg font-bold text-accent-color">{{ user.phone }}</p>
      </div>
      <div class="flex p-3">
        <font-awesome-icon
          @click="deleteUser(user.id)"
          class="text-xl text-white hover:text-accent-color transition-all duration-500"
          icon="fa-solid fa-trash" />
      </div>
    </div>
  </div>
</template>
<script setup>
  import defaultProfilePic from "~/assets/profile-pic-icon.png";
  const entry = useRuntimeConfig().public.supabase.url;
  const props = defineProps({
    user: Object,
  });
  async function deleteUser(id) {
    await $fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
  }
</script>
<style lang=""></style>
