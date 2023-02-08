<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <form class="sm:p-3 p-2" :class="isAdvancedShown ? 'pb-1' : ''">
      <div class="flex flex-nowrap">
        <div class="flex-auto flex flex-col justify-center noSelect">
          <label class="label sm:text-2xl text-lg" for="category"
            >Category</label
          >
          <select
            @change="selectionChanged($event)"
            id="category-dropbox"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2"
            :class="!carSearch ? 'mb-11' : ''"
            aria-label="Default select example">
            <option value="Cars">Cars</option>
            <option value="Parts">Parts</option>
          </select>
          <div v-if="carSearch" class="flex flex-nowrap">
            <input
              @change="checkboxSelected()"
              :checked="carsOnParts"
              class="w-5 h-5 text-accent-color rounded-md bg-white border-accent-color checked:bg-accent-color focus:ring-accent-color focus:outline-none mt-1 mb-4"
              type="checkbox"
              aria-label="cars-on-parts" />
            <label
              @click="checkboxSelected()"
              class="ml-2 text-nowrap"
              for="checkbox"
              >On Parts</label
            >
          </div>
        </div>
        <div
          class="flex-auto flex pb-1 pl-0.5 sm:pl-5 items-center justify-start noSelect">
          <img
            v-if="carSearch && !carsOnParts"
            class="cat-icon"
            src="~assets/car-icon.svg"
            alt="category-icon" />
          <img
            v-if="carSearch && carsOnParts"
            class="cat-icon"
            src="~assets/car-on-parts-icon.svg"
            alt="category-icon" />
          <img
            v-else-if="!carSearch"
            class="cat-icon"
            src="~assets/parts-icon.svg"
            alt="category-icon" />
        </div>
        <div class="flex flex-auto justify-end pr-1">
          <img id="logo" class="mb-3 w-44" src="~assets/logo.svg" alt="logo" />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row noSelect">
        <SearchCars @loaded="loading = false" v-if="carSearch" />
        <SearchParts @loaded="loading = false" v-else />
        <div v-if="loading">Loading</div>
      </div>
      <div class="flex-nowrap noSelect">
        <div class="flex items-center justify-center">
          <ReuseableButton
            @click="showAdvanced()"
            :class="isAdvancedShown ? 'active' : ''"
            class="dropdown-button px-2 mt-2 flex items-center justify-center flex-nowrap"
            v-if="inBrowser && carSearch && !carsOnParts"
            >Advanced
            <font-awesome-icon
              v-if="!isAdvancedShown"
              class="px-1"
              icon="fa-solid fa-chevron-down" />
            <font-awesome-icon
              v-else
              class="px-1"
              icon="fa-solid fa-chevron-up"
          /></ReuseableButton>
        </div>
      </div>
      <div v-if="isAdvancedShown && carSearch && !carsOnParts" class="mt-3">
        <SearchBigAdvancedParameters @onCheckboxChange="onCheckboxChange" />
      </div>
    </form>
  </div>
</template>

<script setup>
  const carSearch = ref(true);
  const loading = ref(true);
  const features = ref([]);
  const carsOnParts = ref(false);
  const isAdvancedShown = ref(false);
  const selectionChanged = (event) => {
    if (event.target.value === "Cars") {
      carSearch.value = true;
    } else {
      carSearch.value = false;
    }
    loading.value = true;
    useRouter().replace({ query: null });
  };

  function checkboxSelected() {
    carsOnParts.value = !carsOnParts.value;
    if (carsOnParts.value) {
      useRouter().push({
        query: {
          ...useRoute().query,
          carsOnParts: true,
        },
      });
    } else {
      useRouter().push({
        query: {
          ...useRoute().query,
          carsOnParts: false,
        },
      });
    }
  }

  const inBrowser = inject("inBrowser");

  function showAdvanced() {
    isAdvancedShown.value = !isAdvancedShown.value;
  }

  function onCheckboxChange(checked, extraName) {
    if (checked) {
      // console.log("extraName: ", extraName);
      features.value = [...features.value, extraName];
    } else {
      // console.log("unchecked");
      const index = features.value
        .map((f) => f.feature)
        .indexOf(extraName.feature);
      features.value.splice(index, 1);
    }
    useRouter().push({
      query: {
        ...useRoute().query,
        features: JSON.stringify(features.value),
      },
    });
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
