<template>
  <div class="container pb-2 pt-2">
    <form>
      <div class="row flex-nowrap">
        <div
          class="col-5 d-flex flex-column align-items-start justify-content-center">
          <label class="label fs-4" for="category">Category</label>
          <select
            @change="selectionChanged($event)"
            id="category-dropbox"
            class="form-select mt-1 mb-5"
            aria-label="Default select example">
            <option value="Cars">Cars</option>
            <option value="Parts">Parts</option>
          </select>
        </div>
        <div
          class="col-1 d-flex pb-1 align-items-center justify-content-center">
          <img
            v-if="carSearch"
            class="cat-icon"
            src="../assets/car-icon.svg"
            alt="category-icon" />
          <img
            v-else
            class="cat-icon"
            src="../assets/parts-icon.svg"
            alt="category-icon" />
        </div>
        <div class="col-6 d-flex justify-content-end pe-1">
          <img
            id="logo"
            class="mb-3 w-44"
            src="../assets/logo.svg"
            alt="logo" />
        </div>
      </div>
      <div class="row">
        <SearchCars v-if="carSearch" />
        <SearchParts v-else />
      </div>
    </form>
  </div>
</template>

<script setup>
const carSearch = ref(true);
const selectionChanged = (event) => {
  if (event.target.value == "Cars") {
    carSearch.value = true;
  } else {
    carSearch.value = false;
  }
};

provide("extras", {});
provide("onParts", false);
</script>

<style lang="scss" scoped>
form {
  background-color: $primery-lighter-color;
  border: 1px solid $border-color;
  border-radius: 6px;
  padding: 1rem;
  .col-6:has(#logo) {
    padding-right: 0;
  }
  .cat-icon {
    min-width: 45px;
    height: 45px;
  }
  #category-dropbox {
    border-color: $primery-darker-color;
    &:focus {
      box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
    }
  }
}

@media (max-width: 767px) {
  #logo {
    max-width: 124px;
  }
  .cat-icon {
    margin-top: 1.55rem;
    margin-left: 1em;
  }
  #category-dropbox {
    margin-bottom: 1rem !important;
  }
}
@media (max-width: 575px) {
  .label {
    font-size: 16px !important;
  }
  #category-dropbox {
    margin-bottom: 1rem !important;
  }
  .cat-icon {
    margin-top: 1.25rem;
    min-width: 35px !important;
    height: 45px !important;
  }
}

@media (max-width: 375px) {
  #logo {
    max-width: 100px;
    margin-top: 0.5em;
    margin-bottom: 0.1em;
  }
  .cat-icon {
    margin-top: 1.25rem;
    height: 35px !important;
  }
}
</style>
