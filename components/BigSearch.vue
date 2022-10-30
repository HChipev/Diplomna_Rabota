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
            :class="!carSearch ? 'mb-5' : ''"
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
            <label
              @click="checkboxSelected()"
              class="checkbox-label ms-1 text-nowrap"
              for="checkbox"
              >On Parts</label
            >
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
            src="../assets/car-on-parts-icon.svg"
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
      <div class="row flex-nowrap">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <ReuseableButton
            @click="showAdvanced()"
            :class="isAdvancedShown ? 'active' : ''"
            class="dropdown-button px-2 mt-2 d-flex align-items-center justify-content-center flex-nowrap"
            v-if="inBrowser"
            >Advanced
            <font-awesome-icon
              v-if="!isAdvancedShown"
              class="px-1"
              icon="fa-solid fa-chevron-down" />
            <font-awesome-icon v-else class="px-1" icon="fa-solid fa-chevron-up"
          /></ReuseableButton>
        </div>
      </div>
      <div v-if="isAdvancedShown" class="row mt-3 border-top">
        <AdvancedSearch />
      </div>
    </form>
  </div>
</template>

<script setup>
const carSearch = ref(true);
const carsOnParts = ref(false);
const inBrowser = ref(false);
const isAdvancedShown = ref(false);

onMounted(() => {
  if (process.client) {
    inBrowser.value = true;
  }
});
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
function showAdvanced() {
  isAdvancedShown.value = !isAdvancedShown.value;
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
    width: 50px;
    height: 50px;
  }
  .form-check-input {
    border-color: $accent-color;
    &:checked {
      background-color: $accent-color;
    }
    &:focus {
      box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
    }
  }
  #category-dropbox {
    border-color: $primery-darker-color;
    &:focus {
      box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
    }
  }
  .row {
    border-top-color: $border-color !important;
  }
}
@media (max-width: 767px) {
  .cat-icon {
    margin-left: 1em;
    margin-bottom: 0.1rem;
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
  .cat-icon {
    margin-bottom: 0.5rem;
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
