<template>
  <nav>
    <div class="logo-container">
      <a href="/"><img src="../assets/text-logo.svg" alt="text-logo" /></a>
    </div>
    <div class="navbar-container">
      <ul
        :class="menuShow ? 'active' : 'not-active'"
        @click="(menuShow = false), (clicked = false)"
      >
        <li>
          <RouterLink to="/" class="nav-button">
            <font-awesome-icon class="me-1" icon="fa-solid fa-house" />Home</RouterLink
          >
        </li>

        <li>
          <RouterLink to="/search" class="nav-button"
            ><font-awesome-icon
              class="me-1"
              icon="fa-magnifying-glass"
            />Search</RouterLink
          >
        </li>

        <li>
          <RouterLink to="/add-listing" class="nav-button"
            ><font-awesome-icon icon="fa-solid fa-plus" /> Add Listing</RouterLink
          >
        </li>

        <li>
          <!--//todo proveka dali profila e kopuvach -->
          <RouterLink to="/my-listings" class="nav-button"
            ><font-awesome-icon icon="fa-solid fa-warehouse" /> My Listings</RouterLink
          >
        </li>

        <li>
          <RouterLink to="/about" class="nav-button"
            ><font-awesome-icon icon="fa-solid fa-circle-info" />About</RouterLink
          >
        </li>
      </ul>
      <ReuseableButton
        v-if="windowWidth <= 900"
        @click="
          (clicked = !clicked),
            //! menuShow value is changed
            (menuShow = isMenuShown())
        "
        class="menu-button"
      >
        <font-awesome-icon v-if="!clicked" icon="fa-solid fa-bars" />
        <font-awesome-icon v-else icon="fa-solid fa-xmark" />
      </ReuseableButton>
    </div>
  </nav>
</template>
<script setup>
let clicked = ref(false);
let menuShow = ref(null);
let windowWidth = ref(null);
console.log(windowWidth.value);

const onWidthChange = () => (
  (windowWidth.value = window.innerWidth),
  //! menuShow value is changed
  (menuShow.value = isMenuShown())
);

onMounted(() => {
  if (process.client) {
    window.addEventListener("resize", onWidthChange);
  }
});
// onMounted(() => {
//   window.addEventListener("resize", onWidthChange);
// });
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
      display: inline-block;
      margin: 0;
      list-style-type: none;
      li {
        display: inline;

        .nav-button {
          color: $primery-color;
          padding: 0.3em 1.5em;
          margin-inline: 0.5em;
          transition: all 0.3s ease;
          border: 1px solid $primery-darker-color;
          border-radius: 1em;
          &:hover {
            border: 1px solid $accent-color;
            border-radius: 1em;
            background: $accent-color;
          }
        }
        .router-link-active {
          box-shadow: 0.15em 0.12em $primery-color, -0.15em -0.12em $accent-color;
          &:hover {
            box-shadow: 0.15em 0.12em $accent-color, -0.15em -0.12em $primery-color;
          }
        }
      }
    }
  }
}
@media (max-width: 900px) {
  nav {
    .navbar-container {
      ul.active {
        position: absolute;
        top: 49px;
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
          }
          .router-link-exact-active {
            &:hover {
              background: $accent-color;
              border: 1px solid $accent-color;
            }
          }
        }
      }
      ul.not-active {
        display: none;
      }
    }
  }
}
</style>
