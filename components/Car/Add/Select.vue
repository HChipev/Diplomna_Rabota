<template>
  <div class="flex flex-col w-full px-2 sm:px-4 sm:mx-1 my-0.5">
    <label class="label sm:text-xl text-base" for="option">{{ title }}</label>
    <select
      v-model="state"
      @change="onChange"
      class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-11">
      <option v-for="option in options" :key="option.id" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
<script setup>
  const props = defineProps({
    title: String,
    options: Array,
    name: String,
  });
  const state = ref("");
  const emits = defineEmits(["selectChange"]);
  function onChange() {
    emits("selectChange", state.value, props.name);
  }
</script>
<style lang=""></style>
