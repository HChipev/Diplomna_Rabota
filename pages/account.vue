<template>
  <div v-if="inBrowser">
    <p v-if="useUser().getUser">{{ useUser().getUser.email }}</p>
    <p v-if="phone">{{ phone }}</p>
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
definePageMeta({
  middleware: ["auth-middleware"],
});
console.log(useUser().getUser.email);
function logout() {
  useLogOut();
  console.log(useUser().getUser.email);
  navigateTo("/");
}
const phone = ref("");
onMounted(async () => {
  if (inBrowser) phone.value = await getPhone();
});
const inBrowser = inject("inBrowser");
</script>
<style lang="scss" scoped>
.accent-button {
  min-height: 0;
  font-size: 22px;
}
</style>
