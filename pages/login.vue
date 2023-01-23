<template>
  <div
    v-if="inBrowser"
    class="container mx-auto my-auto flex justify-center items-center">
    <div
      class="flex flex-col px-4 py-2 border border-border-color rounded form">
      <form class="m-2" @submit.prevent="isLogInActive ? logIn() : register()">
        <div class="flex flex-col mb-4">
          <div class="flex justify-between w-full">
            <div class="flex justify-center items-center">
              <ReuseableButton
                :class="isLogInActive ? '' : 'not-active'"
                class="primery-button-nav py-1 px-9 sm:px-14 mr-2 whitespace-nowrap"
                @click="!isLogInActive ? (isLogInActive = !isLogInActive) : ''"
                >Log In</ReuseableButton
              >
            </div>

            <div class="flex justify-center items-center">
              <ReuseableButton
                :class="!isLogInActive ? '' : 'not-active'"
                class="primery-button-nav py-1 px-7 sm:px-12 ms-2 text-nowrap"
                @click="isLogInActive ? (isLogInActive = !isLogInActive) : ''"
                >Register</ReuseableButton
              >
            </div>
          </div>
          <div>
            <hr :class="isLogInActive ? '' : 'register'" />
          </div>
        </div>

        <div class="flex flex-col my-3 justify-center items-center">
          <div class="flex flex-1 mb-2 text-xl justify-center items-center">
            Sign in with:
          </div>
          <div class="flex flex-col sm:flex-row justify-between w-full">
            <div class="flex justify-center items-center">
              <div
                @click="facebookLogIn()"
                class="border border-border-color rounded sm:mr-3 pl-1 w-full sm:pr-16 py-1 flex flex-nowrap items-center o-auth-wrapper">
                <font-awesome-icon
                  class="text-xl flex"
                  icon="fa-brands fa-square-facebook" />
                <label class="ml-2">Facebook</label>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <div
                @click="googleLogIn()"
                class="border border-border-color rounded mt-2 sm:mt-0 sm:ml-3 pl-1 w-full sm:pr-20 py-1 flex flex-nowrap items-center o-auth-wrapper">
                <font-awesome-icon class="text-xl" icon="fa-brands fa-google" />
                <label class="ml-2">Google</label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <label class="mt-2" for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            placeholder="Email" />
        </div>

        <div v-if="!isLogInActive" class="flex flex-col">
          <label class="mt-2" for="phone">Phone</label>
          <input
            v-model="phone"
            type="tel"
            id="phone"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            placeholder="Phone" />
        </div>

        <div class="flex flex-col">
          <label class="mt-2" for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            placeholder="Password" />
        </div>

        <div v-if="!isLogInActive" class="flex flex-col">
          <label class="mt-2" for="confirmPassword">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            placeholder="Confirm Password" />
        </div>

        <div class="flex flex-col mt-3 justify-center items-center">
          <ReuseableButton
            type="submit"
            class="accent-button w-full text-nowrap mt-4"
            >{{ isLogInActive ? "Sign In" : "Sign Up" }}</ReuseableButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
  useHead({
    title: "Login",
    meta: [
      {
        name: "description",
        content: "Login page.",
      },
    ],
  });
  definePageMeta({
    middleware: ["auth-middleware"],
  });
  const inBrowser = inject("inBrowser");
  const isLogInActive = ref(true);

  const email = ref("");
  const phone = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  function register() {
    if (password.value === confirmPassword.value) {
      useSupabaseAuthClient().auth.signUp({
        email: email.value,
        password: password.value,
      });
      navigateTo("/");
    }
  }
  function logIn() {
    useSupabaseAuthClient().auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    navigateTo("/");
  }
  function googleLogIn() {
    useSupabaseAuthClient()
      .auth.signInWithOAuth({
        provider: "google",
      })
      .then(() => {
        console.log("google");
        navigateTo("/");
      });
  }
  function facebookLogIn() {
    useSupabaseAuthClient().auth.signInWithOAuth({
      provider: "facebook",
    });
  }
</script>
<style lang="scss" scoped>
  .form {
    background: $primery-lighter-color;
    .accent-button {
      min-height: 2.5em;
      font-size: 18px;
    }
    hr {
      border-radius: $border-radius;
      border: none;
      background: $accent-color;
      opacity: 0.75;
      min-height: 3px;
      width: 10rem;
      margin-block: 0.5em;
      transition: all 0.5s ease;
      &.register {
        transform: translateX(122%);
      }
    }
    .o-auth-wrapper {
      transition: all 0.5s ease;
      &:hover {
        cursor: pointer;
        animation: wiggle 0.5s ease-in-out;
        border-color: $accent-color !important;
        background: $accent-color;

        @keyframes wiggle {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(3.5deg);
          }
          35% {
            transform: rotate(1.5deg);
          }
          45% {
            transform: rotate(0deg);
          }
          55% {
            transform: rotate(-1.5deg);
          }
          75% {
            transform: rotate(-3.5deg);
          }
          85% {
            transform: rotate(-1.5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
  @media (max-width: 640px) {
    .form {
      hr {
        width: 7.5rem;
        &.register {
          transform: translateX(103%);
        }
      }
    }
  }
</style>
