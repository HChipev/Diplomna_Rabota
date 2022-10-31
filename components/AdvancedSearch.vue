<template>
  <div class="col-12 d-flex items-align-center justify-content-center">
    <p class="d-flex items-align-center justify-content-center">Extras</p>
  </div>
  <div class="col-6 col-sm-3">
    <p class="d-flex items-align-center justify-content-center">Safety</p>
    <AdvancedSearchCheckbox v-for="n in 10" :extraName="n + 's'" />
  </div>
  <div class="col-6 col-sm-3">
    <p class="d-flex items-align-center justify-content-center">Comfort</p>
    <AdvancedSearchCheckbox v-for="n in 15" :extraName="n + 'c'" />
  </div>
  <div class="col-6 col-sm-3">
    <p class="d-flex items-align-center justify-content-center">Exterior</p>
    <AdvancedSearchCheckbox v-for="n in 8" :extraName="n + 'e'" />
  </div>
  <div class="col-6 col-sm-3">
    <p class="d-flex items-align-center justify-content-center">Other</p>
    <AdvancedSearchCheckbox v-for="n in 12" :extraName="n + 'o'" />
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
