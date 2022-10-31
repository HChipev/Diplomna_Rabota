<template>
  <div
    class="col-12 border border-bottom-0 rounded-top d-flex items-align-center justify-content-center py-2 mt-1"
  >
    <p class="d-flex items-align-center justify-content-center h2">Extras</p>
  </div>
  <div class="col-6 border border-top-0 rounded-bottom">
    <div class="row">
      <div class="col-12">
        <p
          class="d-flex items-align-center justify-content-center h5 pt-1 mb-3 border-top"
        >
          Safety
        </p>
        <AdvancedSearchCheckbox v-for="n in 12" :extraName="n + 's'" />

        <p
          class="d-flex items-align-center justify-content-center h5 pt-1 mb-3 border-top"
        >
          Exterior
        </p>
        <AdvancedSearchCheckbox v-for="n in 11" :extraName="n + 'e'" />

        <p
          class="d-flex items-align-center justify-content-center h5 pt-1 mb-3 border-top"
        >
          Other
        </p>
        <AdvancedSearchCheckbox v-for="n in 7" :extraName="n + 'o'" />
      </div>
    </div>
  </div>
  <div class="col-6 border border border-top-0 rounded-bottom">
    <div class="row">
      <div class="col-12">
        <p
          class="d-flex items-align-center justify-content-center h5 pt-1 mb-3 border-top"
        >
          Comfort
        </p>
        <AdvancedSearchCheckbox v-for="n in 26" :extraName="n + 'c'" />
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
