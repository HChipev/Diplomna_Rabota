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
      v-if="messages && messages.length > messagesPerPage"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage" />
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

  const currentPage = ref(1);
  const messagesPerPage = 10;
  const totalPages = computed(() =>
    Math.ceil(messages.value.length / messagesPerPage)
  );
  const paginatedMessages = computed(() => {
    const start = (currentPage.value - 1) * messagesPerPage;
    const end = start + messagesPerPage;
    return messages.value.slice(start, end);
  });
  function changePage(page) {
    currentPage.value = page;
  }

  onMounted(async () => {
    await refresh();
    loading.value = false;
  });
  onBeforeUnmount(() => {
    messages.value = [];
    loading.value = true;
  });
</script>
<style lang=""></style>
