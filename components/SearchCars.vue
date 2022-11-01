<template>
  <div class="col-sm-6">
    <div class="row">
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="make">Make</label>
        <select
          v-model="searchCriteria.make"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="model">Model</label>
        <select
          v-model="searchCriteria.model"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="max-price">Max Price</label>
        <select
          v-model="searchCriteria.maxPrice"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="year">Year</label>
        <select
          v-model="searchCriteria.year"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="engine">Engine Type</label>
        <select
          v-model="searchCriteria.engineType"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="gearbox">Gearbox Type</label>
        <select
          v-model="searchCriteria.gearboxType"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="row">
      <div
        class="col-sm-12 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="region">Region</label>
        <select
          v-model="searchCriteria.region"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div
        class="col-sm-12 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="city-village">City/Village</label>
        <select
          v-model="searchCriteria.city"
          class="form-select mt-1"
          aria-label="Default select example"
        >
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 mb-2 d-flex align-items-center border-top">
        <ReuseableButton
          @click="useSearchCars(searchCriteria)"
          class="accent-button flex-fill mt-4"
          >Search</ReuseableButton
        >
      </div>
    </div>
  </div>
</template>
<script setup>
const searchCriteria = ref({
  make: "All",
  model: "All",
  maxPrice: "All",
  year: "All",
  engineType: "All",
  gearboxType: "All",
  region: "All",
  city: "All",
  extras: inject("extras"),
});
</script>
<style lang="scss" scoped>
.form-select {
  border-color: $primery-darker-color;
  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
  }
}
</style>
