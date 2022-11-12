<template>
  <div id="flex-wrapper">
    <header>
      <TheHeader />
    </header>
    <NuxtPage />
    <footer>
      <TheFooter />
    </footer>
  </div>
</template>
<script setup>
const inBrowser = ref(false);
useSupabaseClient().auth.onAuthStateChange((event, session) => {
  console.log("session changed");
  useUser().setUser(session);
});

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
  min-width: 260px;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: $font-size;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $body-background-color;
  padding-top: 4.5rem;
  color: $text-color;
  #flex-wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
  }

  footer {
    margin-top: auto;
  }
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

  .form-control {
    &:focus {
      border-color: $accent-color !important;
      box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
    }
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
