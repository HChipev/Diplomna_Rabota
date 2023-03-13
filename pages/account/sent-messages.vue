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
            v-for="message in sentMessagesCars"
            :key="message.id"
            :message="message" />
          <h1 v-else class="m-3 text-lg">No sent messages.</h1>
        </div>
      </div>
      <div class="flex flex-col mt-5">
        <h1 class="text-2xl mb-2">Sent Messages For Parts</h1>
        <div class="rounded shadow-sm shadow-white">
          <PartMyMessagesCard
            @deleteClick="deleteMessage"
            v-if="sentMessagesParts.length > 0"
            v-for="message in sentMessagesParts"
            :key="message.id"
            :message="message" />
          <h1 v-else class="m-3 text-lg">No sent messages.</h1>
        </div>
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
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
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
</script>
<style lang=""></style>
