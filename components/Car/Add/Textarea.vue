<template>
  <div class="flex flex-col w-full px-2 sm:px-4 sm:mx-1 my-0.5">
    <label class="label sm:text-xl text-base" for="option">{{ title }}</label>
    <textarea
      v-model="state"
      type="text"
      class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-11"
      :placeholder="placeholder"
      :name="name"
      @input="onInput"></textarea>
  </div>
</template>
<script setup>
  const props = defineProps({
    title: String,
    name: String,
    placeholder: String,
  });
  const state = ref("");
  const emits = defineEmits(["inputChange"]);
  function onInput() {
    emits("inputChange", state.value, props.name);
  }
</script>
<style lang=""></style>
