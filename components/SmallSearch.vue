<template>
  <div class="container pb-2 pt-2">
    <form>
      <div class="row">
        <div class="row flex-nowrap">
          <div class="col-5 d-flex flex-column align-items-start justify-content-center">
            <label class="label fs-4" for="category">Category</label>
            <select
              @change="selectionChanged($event)"
              id="category-dropbox"
              class="form-select mt-1 mb-5"
              aria-label="Default select example"
            >
              <option value="Cars">Cars</option>
              <option value="Parts">Parts</option>
            </select>
          </div>
          <div class="col-1 d-flex pb-1 align-items-center justify-content-center">
            <img id="cat-icon" :src="iconUrl" alt="category-icon" />
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
        <SmallSearchCars v-if="carSearch" />
        <SmallSearchParts v-else />
      </div>
    </form>
  </div>
</template>

<script setup>
//* cat icon logic
let iconUrl = ref("../assets/car-icon.svg");
let carSearch = ref(true);
function selectionChanged(e) {
  if (e.target.value === "Parts") {
    iconUrl.value = "../assets/parts-icon.svg";
    carSearch.value = false;
  } else {
    iconUrl.value = "../assets/car-icon.svg";
    carSearch.value = true;
  }
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
  #cat-icon {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 767px) {
  #logo {
    max-width: 124px;
  }
  #cat-icon {
    margin-top: 1.55rem;
    margin-left: 1em;
  }
  #category-dropbox {
    margin-bottom: 1rem !important;
  }
}
@media (max-width: 575px) {
  #logo {
    max-width: 94px;
    margin-top: 0.5rem;
    margin-bottom: 0 !important;
  }
  .label {
    font-size: 16px !important;
  }
  #category-dropbox {
    margin-bottom: 1rem !important;
  }
  #cat-icon {
    margin-top: 1.25rem;
    height: 45px !important;
  }
}

@media (max-width: 375px) {
  #cat-icon {
    margin-top: 1.25rem;
    height: 35px !important;
  }
}
</style>
