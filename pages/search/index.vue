<template>
  <div>
    <SearchBigParameters />
  </div>
</template>
<script setup>
  useHead({
    titleTemplate: "%s | 4ip's Auto",
    title: "Search",
    meta: [
      {
        name: "description",
        content: "Search for your wanted car here!",
      },
    ],
  });
  useRouter().replace({ query: null });
</script>
<style lang="scss"></style>
