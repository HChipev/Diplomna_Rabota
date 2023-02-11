<template>
  <nav class="noSelect">
    <div class="flex items-center justify-center">
      <a href="/"><img src="../assets/text-logo.svg" alt="text-logo" /></a>
    </div>
    <ClientOnly>
      <div class="navbar-container">
        <ul
          :class="menuShow ? 'active' : 'not-active'"
          @click="(menuShow = false), (clicked = false)">
          <li>
            <NuxtLink to="/" class="nav-button">
              <font-awesome-icon
                class="mr-1"
                icon="fa-solid fa-house" />Home</NuxtLink
            >
          </li>

          <li>
            <NuxtLink to="/search" class="nav-button"
              ><font-awesome-icon
                class="mr-1"
                icon="fa-magnifying-glass" />Search</NuxtLink
            >
          </li>

          <li v-if="useSupabaseUser().value">
            <NuxtLink to="/account/my-listings/create" class="nav-button"
              ><font-awesome-icon icon="fa-solid fa-plus" /> Add
              Listing</NuxtLink
            >
          </li>
          <li v-if="useSupabaseUser().value">
            <NuxtLink to="/account/my-listings" class="nav-button"
              ><font-awesome-icon icon="fa-solid fa-list" /> My
              Listings</NuxtLink
            >
          </li>
        </ul>

        <NuxtLink
          :to="useSupabaseUser().value ? '/account' : '/login'"
          :class="useSupabaseUser().value ? 'loggedIn' : ''"
          class="nav-button"
          ><img
            v-if="useSupabaseUser().value && profilePic"
            class="h-8 w-8 items-center justify-center rounded-full"
            :src="profilePic"
            alt="profile-pic" />
          <font-awesome-icon v-else class="mx-1" icon="fa-solid fa-user" />
          {{ useSupabaseUser().value ? "" : "Log In" }}
        </NuxtLink>

        <ReuseableButton
          v-if="windowWidth <= 900"
          @click="
            (clicked = !clicked),
              //! menuShow value is changed
              (menuShow = isMenuShown())
          "
          class="menu-button ml-1">
          <font-awesome-icon
            v-if="!clicked"
            class="bars"
            icon="fa-solid fa-bars" />
          <font-awesome-icon v-else class="x" icon="fa-solid fa-xmark" />
        </ReuseableButton>
      </div>
    </ClientOnly>
  </nav>
</template>
<script setup>
  import defaultProfilePic from "../assets/profile-pic-icon.png";
  const entry = useRuntimeConfig().public.supabase.url;
  const clicked = ref(false);
  const menuShow = ref(null);
  const windowWidth = ref(0);

  const { data: profilePic } = useAsyncData(
    "userImage",
    async () => {
      const { data, error } = await useSupabaseClient()
        .from("User")
        .select("image")
        .eq("id", useSupabaseUser().value.id)
        .single();
      if (!error) {
        console.log(data.image);
        return data.image
          ? `${entry}/storage/v1/object/public/images/${data.image}`
          : defaultProfilePic;
      } else {
        return defaultProfilePic;
      }
    },
    { watch: [useSupabaseUser()] }
  );

  if (process.client) {
    windowWidth.value = window.innerWidth;
  }

  const onWidthChange = () => (
    (windowWidth.value = window.innerWidth),
    //! menuShow value is changed
    (menuShow.value = isMenuShown())
  );

  onMounted(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onWidthChange);
    }
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", onWidthChange);
  });
  //* checking if menu should be active
  function isMenuShown() {
    if (clicked.value === true && windowWidth.value <= 900) {
      return true;
    } else {
      clicked.value = false;
      return false;
    }
  }
</script>
<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    position: fixed;
    min-height: 60px;
    top: 0;
    left: 0;
    right: 0;
    background: $primery-darker-color;
    border-bottom: 1px solid $accent-color;
    padding: 10px;
    z-index: 20;
    .navbar-container {
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        margin: 0;
        list-style-type: none;
        li {
          display: inline;
        }
      }
    }

    .nav-button {
      color: $primery-color;
      padding: 0.3em 1.5em;
      margin-inline: 0.4em;
      transition: all 0.3s ease;
      border: 1px solid $primery-darker-color;
      border-radius: $border-radius;
      &:hover {
        color: $primery-color;
        border: 1px solid $accent-color;
        border-radius: $border-radius;
        background: $accent-color;
      }
      &.loggedIn {
        padding: 0;
        border-radius: 50%;
        margin-left: 0;
        margin-right: 0.35em;
        &:hover {
          background: none;
        }
        &.router-link-exact-active {
          box-shadow: none;
          &:hover {
            box-shadow: none;
          }
        }
      }
      &.router-link-active {
        box-shadow: 0.075em 0.08em 1px $primery-color,
          -0.075em -0.08em 1px $accent-color;
        &:hover {
          box-shadow: 0.075em 0.08em 1px $accent-color,
            -0.075em -0.08em 1px $primery-color;
        }
      }
    }
    .menu-button {
      .bars {
        height: 25px;
        width: 25px;
      }
      .x {
        height: 27px;
        width: 25px;
      }
    }
    @keyframes jumpUp {
      0% {
        transform: translateY(0em);
      }
      50% {
        transform: translateY(-0.3em);
      }

      100% {
        transform: translateY(0);
      }
    }
  }
  @media (max-width: 900px) {
    nav {
      .navbar-container {
        ul.active {
          position: absolute;
          top: 3.75em;
          right: 0px;
          background-color: $black;
          padding: 0;
          border-end-start-radius: $border-radius;
          transition: right 0.8s ease;
          li {
            display: block;
            padding-block: 0.5em;
            padding-inline: 1em 0.25em;
            .nav-button {
              display: block;
              background: none;
              text-align: end;
              padding-inline: 2em 0.5em;
              margin: 0;
              border-start-end-radius: 0px;
              border-end-end-radius: 0px;
              border-start-start-radius: 5em;
              border-end-start-radius: 5em;
              &:hover {
                border: 1px solid $black;
                background: $accent-color;
                background: linear-gradient(
                  90deg,
                  $accent-color 0%,
                  $primery-darker-color 75%
                );
              }
              &.router-link-exact-active {
                &:hover {
                  background: $accent-color;
                  border: 1px solid $accent-color;
                }
              }
            }
          }
        }
        ul.not-active {
          position: absolute;
          overflow: hidden;
          top: 3.75em;
          right: -100%;
          background-color: $black;
          padding: 0;
          border-end-start-radius: $border-radius;
          transition: right 1.6s ease;
          li {
            display: block;
            white-space: nowrap;
            padding-block: 0.5em;
            padding-inline: 1em 0.25em;
            .nav-button {
              display: block;
              background: none;
              text-align: end;
              padding-inline: 2em 0.5em;
              margin: 0;
              border-start-end-radius: 0px;
              border-end-end-radius: 0px;
              border-start-start-radius: 5em;
              border-end-start-radius: 5em;
            }
          }
        }
      }
      .loggedIn {
        margin-right: 0.65em !important;
      }
    }
  }
</style>
