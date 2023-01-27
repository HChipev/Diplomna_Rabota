<template>
  <div
    class="border border-border-color border-b-0 rounded-t flex items-center justify-center py-2 mt-1">
    <p class="flex items-center justify-center text-xl">Extras</p>
  </div>
  <div class="flex flex-col-reverse sm:flex-row">
    <div
      class="flex-1 border border-border-color border-t-0 border-r-0 rounded-b sm:rounded-br-none">
      <div
        class="flex flex-col border-border-color border-r sm:border-r-0 rounded">
        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
          Safety
        </p>
        <SearchBigAdvancedParametersCheckbox
          @onCheckboxChange="onCheckboxChange"
          v-for="feature in useSafetyFeatures().safetyFeatures"
          :extraName="feature" />

        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
          Exterior
        </p>
        <SearchBigAdvancedParametersCheckbox
          @onCheckboxChange="onCheckboxChange"
          v-for="feature in useExteriorFeatures().exteriorFeatures"
          :extraName="feature" />

        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
          Other
        </p>
        <SearchBigAdvancedParametersCheckbox
          @onCheckboxChange="onCheckboxChange"
          v-for="feature in useOtherFeatures().otherFeatures"
          :extraName="feature" />
      </div>
    </div>

    <div
      class="flex-1 border border-border-color border-t-0 rounded-b sm:rounded-bl-none">
      <div class="flex flex-col">
        <p
          class="flex items-center justify-center pt-1 mb-3 border-t border-border-color">
          Comfort
        </p>
        <SearchBigAdvancedParametersCheckbox
          @onCheckboxChange="onCheckboxChange"
          v-for="feature in useComfortFeatures().comfortFeatures"
          :extraName="feature" />
      </div>
    </div>
  </div>
</template>
<script setup>
  const emits = defineEmits(["onCheckboxChange"]);
  function onCheckboxChange(checked, extraName, type) {
    emits("onCheckboxChange", checked, extraName, type);
  }
</script>
<style lang="scss" scoped></style>
