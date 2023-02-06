<template>
  <div class="flex min-h-screen flex-col justify-start">
    <header>
      <TheHeader />
      <div
        v-if="isAdmin"
        class="rounded-lg bg-black bg-opacity-75 text-2xl sm:text-4xl ml-5 p-3 fixed z-20">
        <h1>
          role and privileges: <span class="text-red-600">{{ user.role }}</span>
        </h1>
      </div>
    </header>
    <slot />
    <footer class="mt-auto z-20">
      <TheFooter />
    </footer>
  </div>
</template>
<script setup>
  const { data: user } = await useAsyncData(
    "admin",
    async () => await $fetch(`/api/admin/${useSupabaseUser().value.id}`)
  );
  const refresh = () => refreshNuxtData("admin");
  const isAdmin = computed(() => user.value?.role === "admin");
  watch(useSupabaseUser(), () => refresh());
</script>
<style lang="scss" scoped>
  //
</style>
