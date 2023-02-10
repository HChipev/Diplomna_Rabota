<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div
      v-if="sentMessagesCars !== undefined && sentMessagesParts !== undefined">
      <div class="flex flex-col">
        <h1 class="text-2xl mb-2">Sent Messages For Cars</h1>
        <div class="rounded shadow-sm shadow-white">
          <CarMyMessagesCard
            @deleteClick="deleteMessage"
            v-if="sentMessagesCars.length > 0"
            v-for="(message, index) in paginatedMessagesCars"
            :key="index"
            :message="message" />
          <h1 v-else class="m-3 text-lg">No sent messages.</h1>
          <Pagination
            v-if="messagesCarsTotalPages > 1"
            :currentPage="carsCurrentPage"
            :totalPages="messagesCarsTotalPages"
            @switchPage="switchCarsPage" />
        </div>
      </div>
      <div class="flex flex-col mt-5">
        <h1 class="text-2xl mb-2">Sent Messages For Parts</h1>
        <div class="rounded shadow-sm shadow-white">
          <PartMyMessagesCard
            @deleteClick="deleteMessage"
            v-if="sentMessagesParts.length > 0"
            v-for="(message, index) in paginatedMessagesParts"
            :key="index"
            :message="message" />
          <h1 v-else class="m-3 text-lg">No sent messages.</h1>
          <Pagination
            v-if="messagesPartsTotalPages > 1"
            :currentPage="partsCurrentPage"
            :totalPages="messagesPartsTotalPages"
            @switchPage="switchPartsPage" />
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>
<script setup>
  useHead({
    title: "Sent Messages",
    meta: [
      {
        name: "description",
        content: "All your sent messages are stored here!",
      },
    ],
  });
  const { data: sentMessagesCars } = await useAsyncData(
    "sentMessagesCars",
    async () =>
      await $fetch(
        `/api/car/listings/user/${useSupabaseUser().value.id}/messages`
      )
  );
  const { data: sentMessagesParts } = await useAsyncData(
    "sentMessagesParts",
    async () =>
      await $fetch(
        `/api/part/listings/user/${useSupabaseUser().value.id}/messages`
      )
  );
  const refresh = () =>
    refreshNuxtData(["sentMessagesCars", "sentMessagesParts"]);

  async function deleteMessage(messageId) {
    await $fetch(`/api/user/message/${messageId}`, {
      method: "DELETE",
    });
  }
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    sentMessagesCars.value = undefined;
    sentMessagesParts.value = undefined;
  });
  const perPage = 10;
  const carsCurrentPage = ref(1);
  const messagesCarsTotalPages = computed(() =>
    Math.ceil(sentMessagesCars.value.length / perPage)
  );
  const paginatedMessagesCars = computed(() => {
    const start = (carsCurrentPage.value - 1) * perPage;
    const end = start + perPage;
    return sentMessagesCars.value.slice(start, end);
  });

  function switchCarsPage(page) {
    carsCurrentPage.value = page;
  }
  const partsCurrentPage = ref(1);
  const messagesPartsTotalPages = computed(() =>
    Math.ceil(sentMessagesParts.value.length / perPage)
  );
  const paginatedMessagesParts = computed(() => {
    const start = (partsCurrentPage.value - 1) * perPage;
    const end = start + perPage;
    return sentMessagesParts.value.slice(start, end);
  });
  function switchPartsPage(page) {
    partsCurrentPage.value = page;
  }
</script>
<style lang=""></style>
