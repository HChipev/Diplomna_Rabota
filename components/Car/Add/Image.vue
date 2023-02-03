<template>
  <div class="flex flex-col w-full px-2 sm:px-4 sm:mx-1 mb-6">
    <label class="label sm:text-xl text-base" for="option">Image *</label>
    <form class="mt-2">
      <div class="form-group">
        <div
          class="relative flex max-w-min hover:text-accent-color transition-all">
          <input
            type="file"
            multiple
            class="opacity-0 absolute cursor-pointer w-[27px] h-[27px]]"
            accept="image/*"
            @change="onImageUpload" />
          <span class="cursor-pointer text-2xl">
            <font-awesome-icon icon="fa-regular fa-images" />
          </span>
        </div>
        <div
          @mousewheel="scrollImages($event)"
          id="imagesPreview"
          v-if="image.preview.length > 0"
          class="flex overflow-x-auto border border-border-color rounded p-2 mt-3 scrollbar-hide">
          <div
            class="aspect-video relative mr-2"
            v-for="(preview, index) in image.preview"
            :key="index">
            <font-awesome-icon
              @click="removeImage(index)"
              class="absolute top-2 right-3 text-2xl opacity-50 hover:opacity-100 hover:text-red-600 transition-all duration-300 cursor-pointer"
              icon="far-regular fa-xmark" />
            <img
              :src="preview"
              alt="image"
              class="min-w-[240px] min-h-[128px] w-60 h-32 rounded-lg" />
          </div>
        </div>
        <h1 v-if="errorMessage" class="text-red-600">{{ errorMessage }}</h1>
      </div>
    </form>
  </div>
</template>
<script setup>
  const image = reactive({
    image: [],
    preview: [],
  });
  const errorMessage = ref("");
  const emits = defineEmits(["imageChange"]);
  function onImageUpload(e) {
    const file = e.target;
    errorMessage.value = "";
    for (let i = 0; i < file.files.length; i++) {
      if (image.image.length >= 20) {
        errorMessage.value = "You can only upload up to 20 images!";
        break;
      }
      if (file.files[i].type.indexOf("image") === -1) {
        errorMessage.value = `Only image files are allowed!\n${file.files[i].name} is not an image file!`;
        break;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        image.preview.push(e.target.result);
      };
      image.image.push(file.files[i]);
      reader.readAsDataURL(file.files[i]);
      emits("imageChange", file.files[i], "image");
    }
  }
  function removeImage(index) {
    image.image.splice(index, 1);
    image.preview.splice(index, 1);
    emits("imageChange", index, "image", "remove");
  }
  function scrollImages(e) {
    if (image.image.length <= 4) {
      return;
    }
    e.preventDefault();
    if (e.deltaY > 0) {
      document.getElementById("imagesPreview").scrollLeft += 100;
    } else {
      document.getElementById("imagesPreview").scrollLeft -= 100;
    }
  }
</script>
