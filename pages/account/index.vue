<template>
  <div v-if="inBrowser">
    <div class="flex gap-12 justify-center items-center mx-28 w-screen">
      <!-- //*future side bar start -->
      <div class="flex flex-col gap-3 justify-start items-center">
        <NuxtLink
          to="/account/my-listings"
          class="accent-button text-center w-full"
          >My Listings</NuxtLink
        >
        <ReuseableButton
          class="accent-button w-full px-2"
          @click="updateUser(useUser().getUser.id, 'user', '1234567890')"
          >Update Phone</ReuseableButton
        >
        <ReuseableButton class="accent-button w-full" @click="logout()"
          >Log Out</ReuseableButton
        >
      </div>
      <!-- //*future side bar end -->
      <!-- <p v-if="useUser().getUser"></p> -->
      <p>
        id: {{ useUserPData().getPData.id }} <br />
        role: {{ useUserPData().getPData.role }} <br />
        phone: {{ useUserPData().getPData.phone }} <br />
        uid: {{ useUserPData().getPData.uid }} <br />
        email: {{ useUser().getUser ? useUser().getUser.email : null }} <br />
      </p>
    </div>
  </div>
</template>
<script setup>
  useHead({
    title: "My Account",
    meta: [
      {
        name: "description",
        content: "Account page",
      },
    ],
  });
  definePageMeta({
    middleware: ["auth-middleware"],
  });
  function logout() {
    useLogOut();
    console.log(useUser().getUser.email);
    navigateTo("/");
  }
  useUserPData().setPData(await getUserData());

  const inBrowser = inject("inBrowser");
</script>
<style lang="scss" scoped>
  .accent-button {
    min-height: 0;
    font-size: 22px;
  }
</style>
