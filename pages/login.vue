<template>
  <div class="container mt-auto d-flex justify-content-center align-items-center">
    <div class="col-fluid-4 px-4 py-4 border rounded form">
      <form @submit.prevent="isLogInActive ? logIn() : register()">
        <div class="row mb-4">
          <div class="col d-flex justify-content-center align-items-center">
            <ReuseableButton
              :class="isLogInActive ? '' : 'not-active'"
              class="primery-button-nav py-1 me-2 text-nowrap flex-fill"
              @click="!isLogInActive ? (isLogInActive = !isLogInActive) : ''"
              >Log In</ReuseableButton
            >
          </div>

          <div class="col d-flex justify-content-center align-items-center">
            <ReuseableButton
              :class="!isLogInActive ? '' : 'not-active'"
              class="primery-button-nav py-1 ms-2 text-nowrap flex-fill"
              @click="isLogInActive ? (isLogInActive = !isLogInActive) : ''"
              >Register</ReuseableButton
            >
          </div>
          <div class="col-12">
            <hr :class="isLogInActive ? '' : 'register'" />
          </div>
        </div>

        <div v-if="inBrowser" class="row mt-3 justify-content-center align-items-center">
          <div class="col-12 mb-2 fs-5 d-flex justify-content-center align-items-center">
            Sign in with:
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <div
              @click="useFacebookSignIn()"
              class="border rounded px-2 py-1 d-flex flex-nowrap flex-fill align-items-center o-auth-wrapper"
            >
              <font-awesome-icon
                class="fs-5 d-flex"
                icon="fa-brands fa-square-facebook"
              />
              <label class="ms-2">Facebook</label>
            </div>
          </div>

          <div class="col d-flex justify-content-center align-items-center">
            <div
              @click="useGoogleSignIn()"
              class="border rounded px-2 py-1 d-flex flex-nowrap flex-fill align-items-center o-auth-wrapper"
            >
              <font-awesome-icon class="fs-5" icon="fa-brands fa-google" />
              <label class="ms-2">Google</label>
            </div>
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
              type="tel"
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
onBeforeMount(() => {
  if (useSupabaseUser()) {
    navigateTo("/account");
  }
});
function register() {
  if (password.value === confirmPassword.value) {
    useRegister(email.value, phone.value, password.value);
    navigateTo("/");
  }
}
function logIn() {
  useLogIn(email.value, password.value);
  navigateTo("/");
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
    background: $accent-color;
    opacity: 0.75;
    min-height: 3px;
    width: 9.5rem;
    margin-inline: 0.3em;
    margin-block: 0.5em;
    transition: all 0.5s ease;
    &.register {
      transform: translateX(133%);
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
</style>
