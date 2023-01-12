<template>
  <nav>
    <div class="flex items-center justify-center">
      <a href="/"><img src="../assets/text-logo.svg" alt="text-logo" /></a>
    </div>
    <div v-if="inBrowser" class="navbar-container">
      <ul
        :class="menuShow ? 'active' : 'not-active'"
        @click="(menuShow = false), (clicked = false)">
        <li>
          <NuxtLink to="/" class="nav-button" @click="scrollToTop">
            <font-awesome-icon
              class="mr-1"
              icon="fa-solid fa-house" />Home</NuxtLink
          >
        </li>

        <li>
          <NuxtLink to="/search" class="nav-button" @click="scrollToTop"
            ><font-awesome-icon
              class="mr-1"
              icon="fa-magnifying-glass" />Search</NuxtLink
          >
        </li>

        <li>
          <NuxtLink to="/add-listing" class="nav-button" @click="scrollToTop"
            ><font-awesome-icon icon="fa-solid fa-plus" /> Add Listing</NuxtLink
          >
        </li>

        <li>
          <!--//todo proveka dali profila e kopuvach -->
          <NuxtLink to="/my-listings" class="nav-button" @click="scrollToTop"
            ><font-awesome-icon icon="fa-solid fa-warehouse" /> My
            Listings</NuxtLink
          >
        </li>
      </ul>

      <NuxtLink
        to="/cart"
        v-if="useUser().getUser !== null"
        id="cart-button"
        @click="scrollToTop">
        <font-awesome-icon icon="fa-solid fa-cart-shopping"
      /></NuxtLink>

      <NuxtLink
        to="/login"
        :class="useUser().getUser !== null ? 'loggedIn' : ''"
        class="nav-button"
        @click="scrollToTop"
        ><img
          v-if="useUser().getUser !== null"
          class="h-7 items-center justify-center"
          src="../assets/profile-pic-icon.png"
          alt="profile-pic" /><font-awesome-icon
          v-else
          class="mx-1"
          icon="fa-solid fa-user" />{{
          useUser().getUser !== null ? "" : "Log In"
        }}</NuxtLink
      >

      <ReuseableButton
        v-if="windowWidth <= 900 && inBrowser"
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
  </nav>
</template>
<script setup>
  const clicked = ref(false);
  const menuShow = ref(null);
  const windowWidth = ref(0);
  const inBrowser = inject("inBrowser");

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
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));
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
    z-index: 1;
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
    #cart-button {
      color: $primery-color;
      padding: 0.3em 0.5em;
      margin-left: 0.15em;
      margin-right: 0.35em;
      transition: all 0.3s ease;
      > * {
        font-size: 20px;
      }
      &:hover {
        animation: jumpUp 0.35s ease-in;
        color: $accent-color;
      }

      &.router-link-active {
        box-shadow: 0.075em 0.08em 1px $primery-color,
          -0.075em -0.08em 1px $accent-color;
        border-radius: $card-border-radius;
        &:hover {
          color: $primery-color;
          background: $accent-color;
          box-shadow: 0.075em 0.08em 1px $accent-color,
            -0.075em -0.08em 1px $primery-color;
        }
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

              &:hover {
                border: 1px solid $black;
                border-radius: 0;
                border-start-start-radius: 5em;
                border-end-start-radius: 5em;
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
          display: none;
        }
      }
      #cart-button {
        padding-top: 0.15em;
        padding-bottom: 0.05em;
        padding-inline: 0.25em;
        margin-right: 0.65em;
      }
      .loggedIn {
        margin-right: 0.65em !important;
      }
    }
  }
</style>
