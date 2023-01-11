<template>
  <div
    class="border border-border-color border-b-0 rounded-t flex items-center justify-center py-2 mt-1">
    <p class="flex items-center justify-center text-xl">Extras</p>
  </div>
  <div class="flex">
    <div
      class="flex-1 border border-border-color border-t-0 border-r-0 rounded-b">
      <div class="flex flex-col">
        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
          Safety
        </p>
        <AdvancedSearchCheckbox v-for="n in 12" :extraName="n + 's'" />

        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
          Exterior
        </p>
        <AdvancedSearchCheckbox v-for="n in 11" :extraName="n + 'e'" />

        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
          Other
        </p>
        <AdvancedSearchCheckbox v-for="n in 7" :extraName="n + 'o'" />
      </div>
    </div>

    <div class="flex-1 border border-border-color border-t-0 rounded-b">
      <div class="flex flex-col">
        <p
          class="flex items-center justify-center pt-1 mb-3 border-t border-border-color">
          Comfort
        </p>
        <AdvancedSearchCheckbox v-for="n in 26" :extraName="n + 'c'" />
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
