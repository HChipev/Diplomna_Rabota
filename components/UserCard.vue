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
      <div class="flex flex-col justify-between items-end">
        <font-awesome-icon
          @click="deleteUser(user.id, user.firstName + ' ' + user.lastName)"
          class="text-xl text-white hover:text-accent-color transition-all duration-500"
          icon="fa-solid fa-trash" />
        <p class="text-lg text-text-muted-color">
          {{
            user.createdAt.split("T")[0] +
            " " +
            user.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import Swal from "sweetalert2";
  import defaultProfilePic from "~/assets/profile-pic-icon.png";
  const entry = useRuntimeConfig().public.supabase.url;
  const props = defineProps({
    user: Object,
  });
  async function deleteUser(id, name) {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#1a1a1a",
      color: "#fff",
      iconColor: "#d33",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await $fetch(`/api/user/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `User ${name} has been deleted.`,
              background: "#1a1a1a",
              color: "#fff",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              background: "#1a1a1a",
              color: "#fff",
              confirmButtonColor: "#3085d6",
            });
          });
      }
    });
  }
</script>
<style lang=""></style>
