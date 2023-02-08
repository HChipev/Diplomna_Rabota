<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="maroon" />
    <NuxtPage v-if="inBrowser" />
  </NuxtLayout>
</template>
<script setup>
  const inBrowser = ref(false);
  function findUserLocation() {
    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      let location;
      await $fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          useRuntimeConfig().public.googleMaps
        }`
      )
        .then((res) => {
          location = res.results[0].address_components[3].short_name;
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(location);
    }
    function error(error) {}
    navigator.geolocation.getCurrentPosition(success, error);
  }
  onMounted(() => {
    if (process.client) {
      inBrowser.value = true;
      findUserLocation();
    } else {
      inBrowser.value = false;
    }
  });
  provide("inBrowser", inBrowser);
  //! realtime data updates
  const refreshCars = () => refreshNuxtData(["cars", "carsListings"]);
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
