<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div
      v-if="sentMessagesCars !== undefined && sentMessagesParts !== undefined">
      <div class="flex flex-col">
        <h1 class="text-2xl mb-2">Sent Messages For Cars</h1>
        <div class="rounded shadow-sm shadow-white mb-5">
          <CarMyMessagesCard
            @deleteClick="deleteMessage"
            v-if="sentMessagesCars.length > 0"
            v-for="(message, index) in paginatedCarMessages"
            :key="index"
            :message="message" />
          <h1 v-else class="m-3 text-lg">No sent messages.</h1>
        </div>
        <Pagination
          v-if="sentMessagesCars && sentMessagesCars.length > messagesPerPage"
          :currentPage="currentPageCars"
          :totalPages="totalPagesCarMessages"
          @changePage="changePageCars" />
      </div>
      <div class="flex flex-col mt-5">
        <h1 class="text-2xl mb-2">Sent Messages For Parts</h1>
        <div class="rounded shadow-sm shadow-white mb-5">
          <PartMyMessagesCard
            @deleteClick="deleteMessage"
            v-if="sentMessagesParts.length > 0"
            v-for="(message, index) in paginatedPartMassages"
            :key="index"
            :message="message" />
          <h1 v-else class="m-3 text-lg">No sent messages.</h1>
        </div>
        <Pagination
          v-if="sentMessagesParts && sentMessagesParts.length > messagesPerPage"
          :currentPage="currentPageParts"
          :totalPages="totalPagesPartMessages"
          @changePage="changePageParts" />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>
<script setup>
  useHead({
    titleTemplate: "%s | 4ip's Auto",
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
  sentMessagesCars.value = undefined;
  const { data: sentMessagesParts } = await useAsyncData(
    "sentMessagesParts",
    async () =>
      await $fetch(
        `/api/part/listings/user/${useSupabaseUser().value.id}/messages`
      )
  );
  sentMessagesParts.value = undefined;
  const refresh = () =>
    refreshNuxtData(["sentMessagesCars", "sentMessagesParts"]);

  async function deleteMessage(messageId) {
    await $fetch(`/api/user/message/${messageId}`, {
      method: "DELETE",
    });
  }
  const currentPageCars = ref(1);
  const currentPageParts = ref(1);
  const messagesPerPage = 5;
  const totalPagesCarMessages = computed(() =>
    Math.ceil(sentMessagesCars.value.length / messagesPerPage)
  );
  const totalPagesPartMessages = computed(() =>
    Math.ceil(sentMessagesParts.value.length / messagesPerPage)
  );
  const paginatedCarMessages = computed(() => {
    const start = (currentPageCars.value - 1) * messagesPerPage;
    const end = start + messagesPerPage;
    return sentMessagesCars.value.slice(start, end);
  });
  const paginatedPartMassages = computed(() => {
    const start = (currentPageParts.value - 1) * messagesPerPage;
    const end = start + messagesPerPage;
    return sentMessagesParts.value.slice(start, end);
  });
  function changePageCars(page) {
    currentPageCars.value = page;
  }
  function changePageParts(page) {
    currentPageParts.value = page;
  }
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    sentMessagesCars.value = undefined;
    sentMessagesParts.value = undefined;
  });
</script>
<style lang=""></style>
