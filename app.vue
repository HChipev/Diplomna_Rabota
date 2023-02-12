<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="maroon" />
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>
<script setup>
  const userLocation = ref(null);
  useSupabaseAuthClient().auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      if (useRoute().path === "/login") {
        navigateTo("/");
      }
    }
  });

  onMounted(async () => {
    userLocation.value = await useUserLocation();
    console.log(userLocation.value);
    if (useSupabaseAuthClient().auth.getSession() && !useSupabaseUser().value) {
      try {
        await useSupabaseAuthClient().auth.refreshSession();
      } catch (err) {
        console.log(err);
        clearError();
      }
    }
  });
  provide("userLocation", userLocation);

  //! realtime data updates
  const refreshCars = () =>
    refreshNuxtData(["carsHome", "cars", "carsListings"]);
  const refreshParts = () => refreshNuxtData(["parts", "partsListings"]);
  const refreshMessages = () =>
    refreshNuxtData(["messages", "sentMessagesCars", "sentMessagesParts"]);
  const refreshUser = () =>
    refreshNuxtData([
      "user",
      "userImage",
      "userFromCarCard",
      "userFromPartCard",
      "savedCars",
      "savedParts",
      "allUser",
    ]);
  useSupabaseClient()
    .channel("public:Car")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Car" },
      () => {
        refreshCars();
      }
    )
    .subscribe();
  useSupabaseClient()
    .channel("public:Part")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Part" },
      () => {
        refreshParts();
      }
    )
    .subscribe();
  useSupabaseClient()
    .channel("public:Message")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Message" },
      () => {
        refreshMessages();
      }
    )
    .subscribe();
  useSupabaseClient()
    .channel("public:User")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "User" },
      () => {
        refreshUser();
      }
    )
    .subscribe();
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
