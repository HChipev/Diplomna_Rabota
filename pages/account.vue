<template>
  <div>
    <p v-if="useUser().getUser">{{ useUser().getUser.email }}</p>
    <ReuseableButton class="accent-button px-3" @click="logout">Log Out</ReuseableButton>
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
</script>
<style lang="scss" scoped>
.accent-button {
  min-height: 0;
  font-size: 22px;
}
</style>
