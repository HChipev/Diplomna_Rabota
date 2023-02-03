<template>
  <div class="flex flex-col w-full px-2 sm:px-4 sm:mx-1 mb-6">
    <label class="label sm:text-xl text-base" for="option">Image *</label>
    <form class="mt-2">
      <div class="form-group">
        <div
          class="relative flex max-w-min hover:text-accent-color transition-all">
          <input
            type="file"
            multiple="multiple"
            class="opacity-0 absolute cursor-pointer w-[27px] h-[27px]]"
            accept="image/*"
            @change="onImageUpload" />
          <span class="cursor-pointer text-2xl">
            <font-awesome-icon icon="fa-regular fa-images" />
          </span>
        </div>
        <div
          v-if="image.preview.length > 0"
          class="flex flex-wrap border border-border-color rounded p-2 mt-3">
          <img
            v-for="preview in image.preview"
            :src="preview"
            alt="image"
            class="w-60 h-32" />
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
    for (let i = 0; i < file.files.length; i++) {
      if (image.image.length >= 20) {
        errorMessage.value = "You can only upload up to 20 images!";
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
</script>
