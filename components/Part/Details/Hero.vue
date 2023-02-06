<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <div @mousewheel="scrollPreviews">
      <div class="relative border border-border-color rounded-lg">
        <p
          class="absolute top-2 left-2 text-lg transition-all duration-500 opacity-50 hover:opacity-100 cursor-default">
          <font-awesome-icon icon="far-regular fa-camera" />
          {{ currentImage + 1 + "/" + part.images.length }}
        </p>
        <font-awesome-icon
          v-if="user"
          :icon="saved ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
          class="absolute top-2 right-2 text-2xl sm:text-3xl opacity-50 hover:opacity-100 cursor-pointer"
          :class="saved ? 'text-accent-color' : 'text-white'"
          @click="addToWishlist()" />
        <div class="flex justify-center items-center aspect-video rounded-lg">
          <img
            :src="`${entry}/storage/v1/object/public/images/${part.images[currentImage]}`"
            class="rounded-lg h-full"
            alt="part-image" />
        </div>
        <div v-if="part.images.length > 1">
          <div
            @click="prevImage"
            class="absolute top-[calc(50%-23px)] sm:top-[45%] bg-none transition-all duration-300 hover:bg-accent-color w-8 h-14 flex justify-center items-center rounded-r-lg">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
          </div>
          <div
            @click="nextImage"
            class="absolute top-[calc(50%-23px)] sm:top-[45%] right-0 bg-none transition-all duration-300 hover:bg-accent-color w-8 h-14 flex justify-center items-center rounded-l-lg">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
          </div>
        </div>
      </div>
      <div
        v-if="part.images.length > 1"
        id="imagesPreview"
        class="flex py-2 overflow-x-auto scrollbar-hide">
        <img
          v-for="(image, index) in part.images"
          @click="currentImage = index"
          :key="index"
          :src="`${entry}/storage/v1/object/public/images/${part.images[index]}`"
          class="h-20 aspect-video object-cover rounded-lg mx-2 transition-all duration-500"
          :class="index === currentImage ? 'scale-110 mx-4' : 'opacity-30 '"
          :alt="`image-${index}`" />
      </div>
    </div>
    <div class="flex justify-between mt-4 xl:mt-6">
      <div class="flex flex-col">
        <h1 class="text-xl xl:text-4xl whitespace-nowrap">
          {{ part.PartType.name }}
        </h1>
        <h1 class="text-lg xl:text-2xl content-start -mt-0.5 sm:mt-0.5">
          {{ part.PartName.name }}
        </h1>
      </div>
      <div class="flex flex-col">
        <p class="text-xs sm:text-sm text-text-muted-color">
          Posted on
          {{
            part.createdAt.split("T")[0] +
            " " +
            part.createdAt.split("T")[1].split(".")[0]
          }}
        </p>
        <div class="flex items-end justify-end">
          <h1 class="text-sm sm:text-lg text-right">
            {{ part.Region.name + ", " + part.City.name }}
          </h1>
        </div>
      </div>
    </div>
    <div
      class="flex text-xs md:text-base xl:text-lg mt-2 border-b border-accent-color pb-2 justify-between">
      <div class="flex flex-wrap items-end text-text-muted-color mr-6">
        <p class="mr-0.5 sm:mr-2 text-white">
          {{ part.Make.name + " " + part.Model.name }}
        </p>
        <p class="mr-0.5 sm:mr-2">|</p>
        <p class="mr-0.5 sm:mr-2">{{ part.year }}</p>
      </div>
      <div class="flex items-end sm:items-center">
        <div class="flex flex-col items-end">
          <img
            src="~assets/parts-icon.svg"
            class="w-6 h-6 md:w-8 md:h-8"
            alt="type-of-listing" />
          <p class="font-bold xl:text-3xl">${{ part.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const entry = useRuntimeConfig().public.supabase.url;
  const props = defineProps({ part: Object });
  const currentImage = ref(0);
  function prevImage() {
    if (currentImage.value === 0) {
      currentImage.value = props.part.images.length - 1;
      document.getElementById("imagesPreview").scrollLeft =
        document.getElementById("imagesPreview").scrollWidth;
    } else {
      currentImage.value--;
    }
  }
  function nextImage() {
    if (currentImage.value === props.part.images.length - 1) {
      currentImage.value = 0;
      document.getElementById("imagesPreview").scrollLeft = 0;
    } else {
      currentImage.value++;
    }
  }
  function scrollPreviews(e) {
    if (props.part.images.length <= 1) {
      return;
    } else {
      e.preventDefault();
    }
    if (e.deltaY > 0) {
      document.getElementById("imagesPreview").scrollLeft += 100;
      nextImage();
    } else {
      document.getElementById("imagesPreview").scrollLeft -= 100;
      prevImage();
    }
  }
  const { data: user } = await useAsyncData("userFromPartCard", async () => {
    const { data, error } = await useSupabaseClient()
      .from("User")
      .select("savedPartsId")
      .eq("id", useSupabaseUser().value.id)
      .single();
    if (!error) {
      return data;
    }
  });
  const refresh = () => refreshNuxtData("userFromPartCard");
  const saved = computed(() => {
    return user.value ? user.value.savedPartsId.includes(props.part.id) : false;
  });
  async function addToWishlist() {
    await $fetch(
      `/api/part/listings/user/saved/${useSupabaseUser().value.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ partId: props.part.id }),
      }
    );
  }
  onMounted(async () => {
    await refresh();
  });
  onBeforeUnmount(() => {
    user.value = undefined;
  });
</script>
