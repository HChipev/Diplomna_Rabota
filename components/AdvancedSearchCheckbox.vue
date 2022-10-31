<template>
  <div class="d-flex flex-nowrap">
    <input
      class="form-check-input mt-1 mb-4"
      @change="check(extraName)"
      type="checkbox"
      aria-label="cars-on-parts"
    />
    <label
      class="checkbox-label ms-1 text-nowrap"
      @click="check(extraName)"
      for="checkbox"
    >
      {{ extraName }}</label
    >
  </div>
</template>
<script setup>
const checked = ref(false);

defineProps({
  extraName: String,
});
function check(extraName) {
  checked.value = !checked.value;
  console.log(extraName);
}
</script>
<style lang="scss">
.form-check-input {
  border-color: $accent-color !important;
  &:checked {
    background-color: $accent-color;
  }
  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
  }
}
</style>
