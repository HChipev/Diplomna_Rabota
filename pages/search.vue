<template>
  <div>
    <SearchBigParameters v-if="useRoute().path === '/search'" />
    <NuxtPage v-else />
  </div>
</template>
<script setup></script>
<style lang="scss"></style>
