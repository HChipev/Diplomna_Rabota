<template>
  <div class="flex flex-col w-full px-2 sm:px-4 sm:mx-1 my-0.5">
    <label class="label sm:text-xl text-base" for="option">{{ title }}</label>
    <div
      contenteditable
      role="textarea"
      class="block p-2.5 w-full text-lg min-h-[100px] bg-white text-black rounded-lg shadow-sm border border-border-color focus:ring-accent-color focus:border-accent-color mt-2 mb-5"
      :placeholder="placeholder"
      :name="name"
      @input="onInput($event)"></div>
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
  function onInput(event) {
    state.value = event.target.innerText;
    emits("inputChange", state.value, props.name);
  }
</script>
<style lang="scss">
  [contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: rgb(122, 122, 122);
    background-color: transparent;
  }
  [contenteditable] {
    outline: 0;
  }
</style>
