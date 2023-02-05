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
                @click="
                  !isLogInActive
                    ? ((isLogInActive = !isLogInActive), (err = ''))
                    : ''
                "
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
          <label class="mt-2" for="phone">First Name</label>
          <input
            v-model="firstName"
            type="text"
            id="firstName"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            placeholder="First Name" />
        </div>

        <div v-if="!isLogInActive" class="flex flex-col">
          <label class="mt-2" for="phone">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            id="lastName"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color"
            placeholder="Last Name" />
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
          <h3
            v-if="err"
            class="text-red-600 text-center max-w-[245px] sm:max-w-[325px]">
            {{ err }}
          </h3>
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
<script setup>
  import Joi from "joi";
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
  const firstName = ref("");
  const lastName = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const err = ref("");

  async function register() {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "bg"] },
        })
        .required(),
      password: Joi.string().min(8).required(),
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      phone: Joi.string().min(10).max(10).required(),
    });
    const { error } = schema.validate({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
    });

    if (!error) {
      if (password.value === confirmPassword.value) {
        const { data, error } = await useSupabaseAuthClient().auth.signUp({
          email: email.value,
          password: password.value,
        });

        if (error) {
          err.value = error.message;
        } else {
          const { error } = await useSupabaseClient()
            .from("User")
            .insert([
              {
                id: data.user.id,
                email: email.value,
                firstName: firstName.value,
                lastName: lastName.value,
                phone: phone.value,
              },
            ]);
          console.log(error);
          navigateTo("/");
        }
      } else {
        err.value = "Passwords don't match";
      }
    } else {
      err.value = error.message;
    }
  }
  async function logIn() {
    const { error } = await useSupabaseAuthClient().auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      err.value = error.message;
    } else {
      navigateTo("/");
    }
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
        transform: translateX(103%);
      }
    }
  }
  @media (max-width: 640px) {
    .form {
      hr {
        width: 7.5rem;
      }
    }
  }
</style>
