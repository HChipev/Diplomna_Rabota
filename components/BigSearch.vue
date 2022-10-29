<template>
  <div class="container pb-2 pt-2">
    <form>
      <div class="row flex-nowrap">
        <div class="col-5 d-flex flex-column align-items-start justify-content-center">
          <label class="label fs-4" for="category">Category</label>
          <select
            @change="selectionChanged($event)"
            id="category-dropbox"
            class="form-select mt-1 mb-1"
            aria-label="Default select example"
          >
            <option value="Cars">Cars</option>
            <option value="Parts">Parts</option>
          </select>
          <div v-if="carSearch" class="d-flex flex-nowrap">
            <input
              @change="checkboxSelected()"
              :checked="carsOnParts"
              class="form-check-input mt-1 mb-4"
              type="checkbox"
              aria-label="cars-on-parts"
            />
            <label class="ms-1 text-nowrap" for="checkbox">On Parts</label>
          </div>
        </div>
        <div class="col-1 d-flex pb-1 align-items-center justify-content-center">
          <img
            v-if="carSearch && !carsOnParts"
            class="cat-icon"
            src="../assets/car-icon.svg"
            alt="category-icon"
          />
          <img
            v-if="carSearch && carsOnParts"
            class="cat-icon"
            src="../assets/cars-on-parts-icon.svg"
            alt="category-icon"
          />
          <img
            v-else-if="!carSearch"
            class="cat-icon"
            src="../assets/parts-icon.svg"
            alt="category-icon"
          />
        </div>
        <div class="col-6" align="end">
          <img
            id="logo"
            class="mb-3"
            src="../assets/logo.svg"
            alt="logo"
            style="width: 174px"
          />
        </div>
      </div>
      <div class="row">
        <SmallSearchCars v-if="carSearch" />
        <SmallSearchParts v-else />
      </div>
    </form>
  </div>
</template>

<script setup>
const carSearch = ref(true);
const carsOnParts = ref(false);

function selectionChanged(e) {
  if (e.target.value === "Parts") {
    carSearch.value = false;
  } else {
    carSearch.value = true;
  }
}
function checkboxSelected() {
  carsOnParts.value = !carsOnParts.value;
  console.log(carsOnParts.value);
}
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
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 767px) {
  .cat-icon {
    margin-left: 1em;
    margin-bottom: 0.75rem;
  }
  #category-dropbox {
    margin-bottom: 1rem !important;
  }
}
@media (max-width: 575px) {
  #logo {
    max-width: 154px;
    margin-bottom: 0 !important;
  }
  .label {
    font-size: 16px !important;
  }
  #category-dropbox {
    margin-bottom: 1rem !important;
  }
  .cat-icon {
    margin-bottom: 1.25rem;
  }
}

@media (max-width: 400px) {
  #logo {
    max-width: 144px;
  }
  .cat-icon {
    height: 40px !important;
    margin-right: 0.5em;
  }
}
@media (max-width: 350px) {
  #logo {
    margin-top: 0.5em;
    max-width: 104px;
  }
}
</style>
