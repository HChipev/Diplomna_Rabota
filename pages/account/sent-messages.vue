<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div
      v-if="sentMessagesCars.length > 0"
      class="rounded shadow-sm shadow-white">
      <MyMessagesCard
        v-for="message in sentMessagesCars"
        :key="message.id"
        :message="message" />
    </div>
    <div
      v-if="sentMessagesParts.length > 0"
      class="rounded shadow-sm shadow-white">
      <MyMessagesCard
        v-for="message in sentMessagesParts"
        :key="message.id"
        :message="message" />
    </div>
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
    () =>
      $fetch(`/api/car/listings/user/${useSupabaseUser().value.id}/messages`)
  );
  const { data: sentMessagesParts } = await useAsyncData(
    "sentMessagesParts",
    () =>
      $fetch(`/api/part/listings/user/${useSupabaseUser().value.id}/messages`)
  );
</script>
<style lang=""></style>
