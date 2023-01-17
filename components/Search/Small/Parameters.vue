<template>
  <div class="container pb-2 pt-2 mx-auto px-3 sm:px-28">
    <form class="sm:p-3 p-2">
      <div class="flex flex-nowrap">
        <div class="flex-auto flex flex-col justify-center noSelect">
          <label class="label sm:text-2xl text-lg" for="category"
            >Category</label
          >
          <select
            @change="selectionChanged($event)"
            id="category-dropbox"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-11"
            aria-label="Default select example">
            <option value="Cars">Cars</option>
            <option value="Parts">Parts</option>
          </select>
        </div>
        <div
          class="flex-auto flex pb-1 pl-0.5 sm:pl-5 items-center justify-start noSelect">
          <img
            v-if="carSearch"
            class="cat-icon"
            src="~assets/car-icon.svg"
            alt="category-icon" />
          <img
            v-else
            class="cat-icon"
            src="~assets/parts-icon.svg"
            alt="category-icon" />
        </div>
        <div class="flex flex-auto justify-end pr-1">
          <img id="logo" class="mb-3 w-44" src="~assets/logo.svg" alt="logo" />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row noSelect">
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
    useRouter().replace({ query: null });
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
      margin-left: 0.25em;
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
  }
  @media (max-width: 767px) {
    .cat-icon {
      height: 35px !important;
      min-width: 35px !important;
      margin-left: 0.5em;
      margin-bottom: 0.1rem;
    }
  }
  @media (max-width: 575px) {
    #logo {
      max-width: 134px !important;
      margin-left: 1em;
      margin-bottom: 0.1em;
    }
    .cat-icon {
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 400px) {
    .cat-icon {
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
