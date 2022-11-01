<template>
  <div>
    <NuxtPage v-if="$route.params.name" />
    <BigSearch v-else />
  </div>
</template>
<script setup></script>
<style lang="scss"></style>
