<template>
  <div>
    <p>{{ user !== "undefined" ? user.email : "" }}</p>
    <ReuseableButton class="accent-button px-3" @click="logout">Log Out</ReuseableButton>
  </div>
</template>
<script setup>
const user = useSupabaseUser();
function logout() {
  useLogOut();
  console.log(user.value);
  navigateTo("/");
}
</script>
<style lang="scss" scoped>
.accent-button {
  min-height: 0;
  font-size: 22px;
}
</style>
