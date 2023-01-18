<template>
  <div class="flex flex-col w-full px-2 sm:px-4 sm:mx-1 mb-6">
    <label class="label sm:text-xl text-base" for="option">Image *</label>
    <form class="mt-2">
      <div class="form-group">
        <div
          class="relative flex max-w-min hover:text-accent-color transition-all">
          <input
            type="file"
            class="opacity-0 absolute cursor-pointer w-[27px] h-[27px]]"
            accept="image/*"
            @change="onImageUpload" />
          <span class="cursor-pointer text-2xl">
            <font-awesome-icon icon="fa-regular fa-images" />
          </span>
        </div>
        <div
          v-if="image.preview"
          class="border border-border-color rounded p-2 mt-3 w-56">
          <img :src="image.preview" alt="car-image" class="img-fluid" />
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
  const image = useState("carImage", () => {
    return {
      preview: null,
      image: null,
    };
  });
  const emits = defineEmits(["imageChange"]);
  function onImageUpload(e) {
    const file = e.target;
    if (file.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        image.value.preview = e.target.result;
      };

      image.value.image = file.files[0];
      reader.readAsDataURL(file.files[0]);
      emits("imageChange", file.files[0], "image");
    }
  }
</script>
