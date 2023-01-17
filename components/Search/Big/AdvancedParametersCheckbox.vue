<template>
  <div class="flex items-center mb-4">
    <input
      class="w-5 h-5 ml-2 text-accent-color rounded-md bg-white border-accent-color focus:ring-accent-color focus:outline-none checked:bg-accent-color checked:text-white"
      @change="check(extraName)"
      :checked="checked"
      type="checkbox" />
    <label
      class="ml-2 font-medium text-white"
      @click="check(extraName)"
      for="checkbox"
      >{{ extraName }}</label
    >
  </div>
</template>
<script setup>
  const checked = ref(false);
  const extras = reactive({});
  defineProps({
    extraName: String,
  });

  function check(extraName) {
    checked.value = !checked.value;
    if (checked.value) {
      extras[extraName] = checked.value;
    } else {
      delete extras[extraName];
    }
    console.log(extraName);
  }
</script>
<style lang="scss" scoped>
  //
</style>
