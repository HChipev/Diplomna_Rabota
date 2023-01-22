<template>
  <div v-if="inBrowser">
    <div class="flex gap-12 justify-center items-center mx-28 max-w-full">
      <!-- //*future side bar start -->
      <div class="flex flex-col gap-3 justify-start items-center">
        <ReuseableButton
          class="accent-button w-full px-2"
          @click="updateUser(useSupabaseUser().value.id, 'user', '1234567890')"
          >Update Phone</ReuseableButton
        >
        <ReuseableButton class="accent-button w-full" @click="logout()"
          >Log Out</ReuseableButton
        >
      </div>
      <!-- //*future side bar end -->
      <p>
        <!-- id: {{ useUserPData().getPData.id }} <br />
        role: {{ useUserPData().getPData.role }} <br />
        phone: {{ useUserPData().getPData.phone }} <br />
        uid: {{ useUserPData().getPData.uid }} <br /> -->
        email:
        {{ useSupabaseUser().value ? useSupabaseUser().value.email : null }}
        <br />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
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
    useSupabaseAuthClient().auth.signOut();
    console.log(useSupabaseUser().value.email);
    navigateTo("/");
  }
  //useUserPData().setPData(await getUserData());

  const inBrowser = inject("inBrowser");
</script>
<style lang="scss" scoped>
  .accent-button {
    min-height: 0;
    font-size: 22px;
  }
</style>
