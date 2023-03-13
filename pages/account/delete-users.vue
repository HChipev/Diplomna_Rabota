<template>
  <div
    class="flex gap-12 justify-center items-center mx-2 sm:mx-12 lg:mx-28 max-w-full">
    <div class="flex flex-col w-full">
      <h1 class="text-2xl">All Users</h1>
      <div
        v-if="users"
        class="flex flex-col rounded-lg shadow-sm shadow-white p-3">
        <UserCard v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>
<script setup>
  useHead({
    titleTemplate: "%s | 4ip's Auto",
    title: "Delete Users",
  });
  definePageMeta({
    middleware: ["admin-protected-pages-middleware"],
  });
  const { data: users } = await useAsyncData(
    "allUser",
    async () => await $fetch("/api/admin/all/users")
  );
  console.log(users.value);
  users.value = undefined;
  const refresh = () => refreshNuxtData("allUser");
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    users.value = undefined;
  });
</script>
<style lang=""></style>
