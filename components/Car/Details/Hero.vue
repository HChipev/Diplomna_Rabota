<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <div @mousewheel.prevent="scrollPreviews" class="relative">
      <div class="relative border border-border-color rounded-lg">
        <p
          class="absolute top-2 left-2 text-lg transition-all duration-500 opacity-50 hover:opacity-100 cursor-default">
          <font-awesome-icon icon="far-regular fa-camera" />
          {{ currentImage + 1 + "/" + car.images.length }}
        </p>
        <div class="flex justify-center items-center aspect-video rounded-lg">
          <img
            :src="`${entry}/storage/v1/object/public/images/${car.images[currentImage]}`"
            class="rounded-lg h-full"
            alt="car-image" />
        </div>
        <div v-if="car.images.length > 1">
          <div
            @click="prevImage"
            class="absolute top-[calc(50%-23px)] sm:top-[50%] bg-none transition-all duration-300 hover:bg-black w-8 h-14 flex justify-center items-center rounded-r-lg">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </div>
          <div
            @click="nextImage"
            class="absolute top-[calc(50%-23px)] sm:top-[50%] right-0 bg-none transition-all duration-500 hover:bg-black w-8 h-14 flex justify-center items-center rounded-l-lg">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </div>
        </div>
      </div>
      <div
        v-if="car.images.length > 1"
        id="imagesPreview"
        class="flex py-2 overflow-x-auto scrollbar-hide">
        <img
          v-for="(image, index) in car.images"
          @click="currentImage = index"
          :key="index"
          :src="`${entry}/storage/v1/object/public/images/${car.images[index]}`"
          class="h-20 aspect-video object-cover rounded-lg mx-2 transition-all duration-500"
          :class="index === currentImage ? 'scale-110 mx-4' : 'opacity-30'"
          :alt="`image-${index}`" />
      </div>
    </div>
    <div class="flex justify-between mt-4 xl:mt-6">
      <div class="flex flex-col">
        <h1 class="text-xl xl:text-4xl whitespace-nowrap">
          {{ car.Make.name }}
        </h1>
        <h1 class="text-lg xl:text-2xl content-start -mt-0.5 sm:mt-0.5">
          {{ car.Model.name }}
        </h1>
      </div>
      <div class="flex flex-col">
        <p class="text-xs sm:text-sm text-text-muted-color">
          Posted on
          {{
            car.createdAt.split("T")[0] +
            " " +
            car.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
        <div class="flex items-end justify-end">
          <h1 class="text-sm sm:text-lg text-right">
            {{ car.Region.name + ", " + car.City.name }}
          </h1>
        </div>
      </div>
    </div>
    <div
      class="flex text-xs md:text-base xl:text-lg mt-2 border-b border-accent-color pb-2 justify-between">
      <div class="flex flex-wrap items-end text-text-muted-color mr-6">
        <p class="mr-0.5 sm:mr-2">{{ car.year }}</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.Engine.name }}</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.Gearbox.name }}</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.horsepower }}hp</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.mileage }}km</p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ car.Drivetrain.name }}</p>
        <p v-if="car.Color" class="mr-0.5 sm:mr-2">|</p>
        <p v-if="car.Color" class="mr-0.5 sm:mr-2">{{ car.Color.name }}</p>
      </div>
      <div class="flex items-end sm:items-center">
        <div class="flex flex-col items-end">
          <img
            :src="car.isOnParts ? onPartsIcon : carIcon"
            class="w-6 h-6 md:w-8 md:h-8"
            alt="type-of-listing" />
          <p class="font-bold xl:text-3xl">${{ car.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import onPartsIcon from "~/assets/car-on-parts-icon.svg";
  import carIcon from "~/assets/car-icon.svg";
  const entry = useRuntimeConfig().public.supabase.url;
  const props = defineProps({ car: Object });
  const currentImage = ref(0);
  function prevImage() {
    if (currentImage.value === 0) {
      currentImage.value = props.car.images.length - 1;
      document.getElementById("imagesPreview").scrollLeft =
        document.getElementById("imagesPreview").scrollWidth;
    } else {
      currentImage.value--;
    }
  }
  function nextImage() {
    if (currentImage.value === props.car.images.length - 1) {
      document.getElementById("imagesPreview").scrollLeft = 0;
      currentImage.value = 0;
    } else {
      currentImage.value++;
    }
  }
  function scrollPreviews(e) {
    if (props.car.images.length <= 1) {
      return;
    }
    if (e.deltaY > 0) {
      document.getElementById("imagesPreview").scrollLeft += 100;
      nextImage();
    } else {
      document.getElementById("imagesPreview").scrollLeft -= 100;
      prevImage();
    }
  }
</script>
