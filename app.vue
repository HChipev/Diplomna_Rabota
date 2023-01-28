<template>
  <NuxtLayout>
    <NuxtPage v-if="inBrowser" />
  </NuxtLayout>
</template>
<script setup>
  const inBrowser = ref(false);
  onMounted(() => {
    if (process.client) {
      inBrowser.value = true;
    } else {
      inBrowser.value = false;
    }
  });
  provide("inBrowser", inBrowser);
</script>
<style lang="scss" global>
  body {
    margin: 0;
    min-width: 320px;
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    font-size: $font-size;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $body-background-color;
    padding-top: 4.5rem;
    color: $text-color;
    overflow-x: hidden;
    a {
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-decoration: none;
    }
    img {
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .checkbox-label {
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .noSelect {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .noSelect:focus {
    outline: none !important;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
