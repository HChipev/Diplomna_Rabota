<template>
  <div class="col-sm-6">
    <div class="row">
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="make">Make</label>
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="model">Model</label>
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
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
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="year">Year</label>
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
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
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="col-sm-6 mb-2 d-flex flex-column align-items-start justify-content-center border-top"
      >
        <label class="mt-1" for="gearbox">Gearbox Type</label>
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
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
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
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
        <select class="form-select mt-1" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 mb-2 d-flex align-items-center border-top">
        <ReuseableButton class="accent-button flex-fill mt-4">Search</ReuseableButton>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.form-select {
  border-color: $primery-darker-color;
  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
  }
}
</style>
