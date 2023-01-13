<template>
  <div v-if="inBrowser">
    <p v-if="useUser().getUser">{{ useUser().getUser.email }}</p>
    <p>
      id: {{ useUserPData().getPData.id }} <br />
      role: {{ useUserPData().getPData.role }} <br />
      phone: {{ useUserPData().getPData.phone }} <br />
      uid: {{ useUserPData().getPData.uid }}
    </p>
    <ReuseableButton
      class="accent-button px-3"
      @click="updateUser(useUser().getUser.id, 'user', '1234567890')"
      >Update Phone</ReuseableButton
    >
    <ReuseableButton class="accent-button px-3" @click="logout()"
      >Log Out</ReuseableButton
    >
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
  console.log(useUser().getUser.email);
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
