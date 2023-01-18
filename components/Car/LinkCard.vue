<template>
  <div
    class="flex md:px-2 mx-1 m-4 w-auto transition ease-linear duration-300 hover:scale-105"
    @click="openListing()">
    <div
      class="card flex p-1 rounded border border-border-color w-full max-h-36 sm:max-h-44 2xl:max-h-52">
      <div class="flex w-full">
        <div class="flex flex-1 pr-1">
          <img :src="car.url" alt="car-image" />
        </div>
        <div class="flex flex-1 pl-1">
          <div class="card-body min-w-full p-2">
            <div class="flex flex-col max-h-16">
              <div class="flex justify-between border-b border-border-color">
                <div class="flex flex-col">
                  <h1 class="text-lg sm:text-xl md:text-2xl whitespace-nowrap">
                    {{ car.make }}
                  </h1>
                  <h1 class="text-base whitespace-nowrap -mt-2 sm:mt-0">
                    {{ car.model }}
                  </h1>
                </div>
                <font-awesome-icon
                  v-if="stared"
                  @click="addToWishlist()"
                  class="text-2xl mr-0.5 mt-1"
                  icon="fa-solid fa-star" />
                <font-awesome-icon
                  v-else
                  @click="addToWishlist()"
                  class="text-2xl mr-0.5 mt-1"
                  icon="fa-regular fa-star" />
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-1 flex-col justify-end">
                <p
                  class="text-xs sm:text-sm md:text-base text-text-muted-color">
                  {{ car.hp }}hp
                </p>
                <p
                  class="text-xs sm:text-sm md:text-base text-text-muted-color">
                  {{ car.year }}
                </p>
                <p
                  class="text-xs sm:text-sm md:text-base text-text-muted-color">
                  Engine
                </p>
                <p
                  class="text-xs sm:text-sm mb-0.5 md:mb-0 md:text-base text-text-muted-color">
                  {{ car.milage }}km
                </p>
              </div>
              <div class="flex flex-1 flex-col items-end justify-end">
                <h1
                  class="text-sm sm:text-base md:text-2xl font-semibold text-accent-color">
                  ${{ car.price }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({ car: Object });
  const stared = ref(false);
  let addingToWishlist = false;
  async function openListing() {
    if (addingToWishlist) return;
    scrollToTop();
    navigateTo(
      "/search/results/cars/" +
        props.car.make.replaceAll(" ", "_") +
        "-" +
        props.car.model +
        "/" +
        props.car.id
    );
  }
  function addToWishlist() {
    addingToWishlist = true;
    setTimeout(() => {
      addingToWishlist = false;
    }, 100);
    stared.value = !stared.value;
  }
</script>
<style lang="scss" scoped>
  .card {
    background-color: $primery-lighter-color;
    border-color: $border-color;
    color: white;
    height: 220px;
    min-width: 300px;
    p {
      margin: 0;
    }
    div {
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: $card-border-radius;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      border: 1px solid $border-color;
      border-radius: $card-border-radius;
    }
  }
</style>
