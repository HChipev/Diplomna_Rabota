<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div v-if="messages.length > 0" class="rounded shadow shadow-gray-500">
      <MessageCard
        v-for="message in messages"
        :key="message.id"
        :message="message" />
    </div>
    <h1
      v-else-if="!loading"
      class="text-xl sm:text-3xl text-text-muted-color text-center">
      No messages received yet.
    </h1>
    <Loader v-else />
  </div>
</template>
<script setup>
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
  const loading = ref(true);
  const { data: messages } = await useAsyncData("messages", () =>
    $fetch(`/api/part/listings/${useRoute().params.id}/message`)
  );
  messages.value = [];
  console.log(messages.value);
  const refresh = () => refreshNuxtData("messages");
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
