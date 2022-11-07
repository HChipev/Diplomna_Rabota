<template>
  <input type="text" v-model="email" />
  <input type="password" v-model="password" />
  <button @click="signUp">signUp</button>
</template>
<script setup>
const email = ref("");
const password = ref("");
const client = useSupabaseClient();
const signUp = async () => {
  const { user, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  console.log("user", user);
  console.log("error", error);
};
</script>
<style lang="scss"></style>
