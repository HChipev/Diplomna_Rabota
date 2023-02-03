<template>
  <div
    class="flex md:px-2 mx-1 m-4 w-auto transition ease-linear duration-300 hover:scale-105"
    @mouseup="openListing()">
    <div
      class="card flex p-1 rounded border border-border-color w-full max-h-36 sm:max-h-44 2xl:max-h-52">
      <div class="flex w-full">
        <div class="flex pr-1">
          <img
            :src="`${entry}/storage/v1/object/public/images/${part.images[currentImage]}`"
            class="aspect-video"
            alt="part-image" />
        </div>
        <div class="flex flex-grow pl-1 min-w-[160px]">
          <div class="card-body min-w-full p-2">
            <div class="flex flex-col max-h-16">
              <div class="flex justify-between border-b border-border-color">
                <div class="flex flex-col">
                  <h1 class="text-lg sm:text-xl md:text-2xl whitespace-nowrap">
                    {{ part.PartType.name }}
                  </h1>
                  <h1 class="text-base whitespace-nowrap -mt-2 sm:mt-0">
                    {{ part.PartName.name }}
                  </h1>
                </div>
                <font-awesome-icon
                  v-if="stared"
                  @click="addToWishlist()"
                  class="text-2xl text-accent-color ml-2 mr-0.5 mt-1"
                  icon="fa-solid fa-heart" />
                <font-awesome-icon
                  v-else
                  @click="addToWishlist()"
                  class="text-2xl ml-2 mr-0.5 mt-1"
                  icon="fa-regular fa-heart" />
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-1 flex-col justify-end">
                <p class="text-sm sm:text-base md:text-lg text-white">
                  {{ part.Make.name + " " + part.Model.name }}
                </p>
                <p
                  class="text-xs sm:text-sm md:text-base text-text-muted-color">
                  {{ part.year }}
                </p>
              </div>
              <div class="flex flex-1 flex-col items-end justify-between">
                <img
                  class="w-6 h-6 sm:w-8 sm:h-8 mt-2"
                  src="~/assets/parts-icon.svg"
                  alt="type-of-listing" />
                <h1
                  class="text-sm sm:text-base md:text-2xl font-semibold text-accent-color">
                  ${{ part.price }}
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
  const entry = useRuntimeConfig().public.supabase.url;
  const props = defineProps({ part: Object });
  const currentImage = ref(0);
  const stared = ref(false);
  let addingToWishlist = false;
  async function openListing() {
    if (addingToWishlist) return;
    navigateTo("/search/results/parts/" + props.part.id);
  }
  function addToWishlist() {
    addingToWishlist = true;
    setTimeout(() => {
      addingToWishlist = false;
    }, 100);
    stared.value = !stared.value;
  }
  function slideShow() {
    if (currentImage.value < props.part.images.length - 1) {
      currentImage.value++;
    } else {
      currentImage.value = 0;
    }
    if (props.part.images.length > 1) {
      setTimeout(slideShow, 5000);
    }
  }
  onMounted(() => {
    if (props.part.images.length > 1) {
      setTimeout(slideShow, 5000);
    }
  });
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
      max-width: 450px;
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
