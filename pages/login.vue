<template>
  <div class="container mt-auto d-flex justify-content-center align-items-center">
    <div class="col-fluid-4 px-4 py-4 border rounded form">
      <form @submit.prevent="isLogInActive ? logIn() : register()">
        <div class="row mb-4">
          <div class="col d-flex justify-content-evenly">
            <ReuseableButton
              :class="isLogInActive ? 'active' : 'not-active'"
              class="primery-button-nav py-1 p-5 me-2 text-nowrap"
              @click="!isLogInActive ? (isLogInActive = !isLogInActive) : ''"
              >Log In</ReuseableButton
            >

            <ReuseableButton
              :class="!isLogInActive ? 'active' : 'not-active'"
              class="primery-button-nav py-1 p-5 ms-2 text-nowrap"
              @click="isLogInActive ? (isLogInActive = !isLogInActive) : ''"
              >Register</ReuseableButton
            >
          </div>
        </div>

        <div v-if="inBrowser" class="row mt-3 justify-content-center align-items-center">
          <div class="col-12 d-flex justify-content-center align-items-center">
            Sign in with:
          </div>
          <div class="col-1 fs-5 d-flex justify-content-center align-items-center">
            <font-awesome-icon
              @click="facebookSignIn"
              icon="fa-brands fa-square-facebook"
            />
          </div>
          <div class="col-1 fs-5 d-flex justify-content-center align-items-center">
            <font-awesome-icon icon="fa-brands fa-square-twitter" />
          </div>
          <div class="col-1 fs-5 d-flex justify-content-center align-items-center">
            <font-awesome-icon icon="fa-brands fa-linkedin" />
          </div>
          <div class="col-1 fs-5 d-flex justify-content-center align-items-center">
            <font-awesome-icon icon="fa-brands fa-google" />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
        </div>
        <div v-if="!isLogInActive" class="row mt-3">
          <div class="col">
            <label for="phone">Phone</label>
            <input
              v-model="phone"
              type="text"
              id="phone"
              class="form-control"
              placeholder="Phone"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
        </div>
        <div v-if="!isLogInActive" class="row mt-3">
          <div class="col">
            <label for="confirmPassword">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="form-control"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col mt-3 d-flex justify-content-center align-items-center">
            <ReuseableButton type="submit" class="accent-button flex-fill text-nowrap">{{
              isLogInActive ? "Sign In" : "Sign Up"
            }}</ReuseableButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
const inBrowser = inject("inBrowser");
const isLogInActive = ref(true);
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");
const client = useSupabaseClient();
const register = async () => {
  if (password.value === confirmPassword.value) {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      phone: phone.value,
      password: password.value,
    });
    console.log("user", user);
    console.log("error", error);
  }
};
const facebookSignIn = async () => {
  const { user, session, error } = await client.auth.signInWithOAuth({
    provider: "facebook",
  });
  console.log("user", user);
  console.log("session", session);
  console.log("error", error);
};
</script>
<style lang="scss" scoped>
.form {
  background: $primery-lighter-color;
  .accent-button {
    min-height: 2.5em;
    font-size: 18px;
  }
}
</style>
