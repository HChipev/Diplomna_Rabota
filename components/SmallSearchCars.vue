<template>
  <div
    class="filter-col col-sm-3 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="make">Make</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div
    class="filter-col col-sm-3 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="model">Model</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div
    class="filter-col col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="region">Region</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>

  <div
    class="filter-col col-sm-3 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="max-price">Max Price</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div
    class="filter-col col-sm-3 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="year">Year</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div
    class="filter-col col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="city-village">City/Village</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>

  <div
    class="filter-col col-sm-3 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="engine">Engine type</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div
    class="filter-col col-sm-3 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
  >
    <label class="label mt-1" for="gearbox">Gearbox type</label>
    <select class="form-select mt-1" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div class="filter-col col-sm-6 mb-2 d-flex align-items-center border-top">
    <ReuseableButton class="accent-button flex-fill mt-4">Search</ReuseableButton>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.filter-col {
  border-top-color: $border-color !important;
}
@media (max-width: 575px) {
  .label {
    font-size: 16px !important;
  }
}
</style>
