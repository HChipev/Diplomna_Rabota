<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div v-if="messages.length > 0" class="rounded shadow-sm shadow-white mb-5">
      <MessageCard
        v-for="(message, index) in paginatedMessages"
        :key="index"
        :message="message" />
    </div>
    <h1
      v-else-if="!loading"
      class="text-xl sm:text-3xl text-text-muted-color text-center">
      No messages received yet.
    </h1>
    <Loader v-else />
    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @switchPage="switchPage" />
  </div>
</template>
<script setup>
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
  const loading = ref(true);
  const { data: messages } = await useAsyncData("messages", () =>
    $fetch(`/api/car/listings/${useRoute().params.id}/message`)
  );
  messages.value = [];
  const refresh = () => refreshNuxtData("messages");
  onMounted(async () => {
    await refresh();
    loading.value = false;
  });
  onBeforeUnmount(() => {
    messages.value = [];
    loading.value = true;
  });
  const currentPage = ref(1);
  const perPage = 10;
  const totalPages = computed(() => Math.ceil(messages.value.length / perPage));
  const paginatedMessages = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return messages.value.slice(start, end);
  });

  function switchPage(page) {
    currentPage.value = page;
  }
</script>
<style lang=""></style>
