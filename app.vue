<template>
  <header>
    <TheHeader />
  </header>
  <NuxtPage />
  <footer>
    <TheFooter />
  </footer>
</template>
<script setup>
useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "./public/favicon.ico" }],
});
</script>
<style lang="scss" global>
body {
  margin: 0;
  min-width: 260px;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: $font-size;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $body-background-color;
  padding-top: 60px;
  color: $text-color;
  isolation: isolate;
  a {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-decoration: none;
    transition: 0.4s;
  }
  img {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
