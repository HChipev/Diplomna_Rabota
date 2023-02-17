<template>
  <div
    class="flex gap-12 justify-center items-center mx-2 sm:mx-12 lg:mx-28 max-w-full">
    <div class="flex flex-col w-full">
      <h1 class="text-2xl">All Users</h1>
      <div
        v-if="users"
        class="flex flex-col rounded-lg shadow-sm shadow-white p-3">
        <UserCard
          v-for="(user, index) in paginatedUsers"
          :key="index"
          :user="user" />
      </div>
      <Pagination
        v-if="users && users.length > usersPerPage"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="changePage" />
    </div>
  </div>
</template>
<script setup>
  const { data: users } = await useAsyncData(
    "allUser",
    async () => await $fetch("/api/admin/all/users")
  );
  users.value = undefined;
  const refresh = () => refreshNuxtData("allUser");

  const currentPage = ref(1);
  const usersPerPage = 10;
  const totalPages = computed(() =>
    Math.ceil(users.value.length / usersPerPage)
  );
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * usersPerPage;
    const end = start + usersPerPage;
    return users.value.slice(start, end);
  });
  function changePage(page) {
    window.scrollTo(0, 0);
    currentPage.value = page;
  }

  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    users.value = undefined;
  });
</script>
<style lang=""></style>
