<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="make">Make</label>
        <select
          @change="
            //! If the user selects a make, get the models for that make
            $event.target.options.selectedIndex > 0
              ? getModels($event)
              : (models = [])
          "
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>Any</option>
          <option v-for="m in makes" :value="m.make" :key="m.id">
            {{ m.make }}
          </option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="model">Model</label>
        <select
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>Any</option>
          <option v-for="m in models">
            {{ m.model }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color relative">
        <label class="mt-1" for="max-price">Min-Max Price</label>
        <h3
          @click="updateDropdowns('price')"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color py-1.5 mt-2 mb-2 mr-3 pl-2">
          {{ priceRangeText }}
        </h3>
        <div
          v-if="dropdowns.price"
          class="absolute flex flex-col bg-white shadow rounded-lg focus:ring-accent-color focus:border-accent-color border border-accent-color top-20 left-0 right-0 px-3 py-3 mr-2.5 text-black z-10">
          <input
            v-model="priceRange.min"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mb-2"
            placeholder="Min" />
          <input
            v-model="priceRange.max"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2"
            placeholder="Max" />
          <button
            @click.prevent="onPriceChange"
            class="bg-white border border-accent-color text-accent-color rounded-md focus:ring-accent-color focus:border-accent-color py-0.5 px-3 text-xl transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 hover:bg-accent-color hover:text-white">
            Apply
          </button>
        </div>
      </div>
      <div
        class="relative flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="year">Min-Max Year</label>
        <h3
          @click="updateDropdowns('year')"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color py-1.5 mt-2 mb-2.5 mr-3 pl-2">
          {{ yearRangeText }}
        </h3>
        <div
          v-if="dropdowns.year"
          class="absolute flex flex-col bg-white shadow rounded-lg focus:ring-accent-color focus:border-accent-color border border-accent-color top-20 left-0 right-0 px-3 py-3 mr-2.5 text-black z-10">
          <input
            v-model="year.min"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mb-2"
            placeholder="Min" />
          <input
            v-model="year.max"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2"
            placeholder="Max" />
          <button
            @click.prevent="onYearChange"
            class="bg-white border border-accent-color text-accent-color rounded-md focus:ring-accent-color focus:border-accent-color py-0.5 px-3 text-xl transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 hover:bg-accent-color hover:text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="engine">Engine Type</label>
        <select
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>Any</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="gearbox">Gearbox Type</label>
        <select
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>Any</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
  </div>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="region">Region</label>
        <select
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>Any</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="city-village">City/Village</label>
        <select
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>Any</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <ReuseableButton
          @click="searchForCars()"
          class="accent-button mt-3 sm:mt-8 mr-3"
          >Search</ReuseableButton
        >
      </div>
    </div>
  </div>
</template>
<script setup>
  const dropdowns = ref({
    price: false,
    year: false,
  });
  const makes = ref(await getMakesData());
  const models = ref([]);
  const year = ref({
    min: "",
    max: "",
  });
  const priceRange = ref({
    min: "",
    max: "",
  });

  async function getModels(e) {
    const index = e.target.selectedIndex;
    models.value = await getModelsData(makes.value[index - 1].make_id);
  }

  const updateDropdowns = (key) => {
    dropdowns.value[key] = !dropdowns.value[key];
  };
  const priceRangeText = computed(() => {
    const minPrice = useRoute().query.minPrice;
    const maxPrice = useRoute().query.maxPrice;
    if (!minPrice && !maxPrice) {
      return "Any";
    } else if (minPrice && !maxPrice) {
      return `From $${minPrice}`;
    } else if (!minPrice && maxPrice) {
      return `To $${maxPrice}`;
    } else {
      return `$${minPrice} - $${maxPrice}`;
    }
  });
  const yearRangeText = computed(() => {
    const minYear = useRoute().query.minYear;
    const maxYear = useRoute().query.maxYear;
    if (!minYear && !maxYear) {
      return "Any";
    } else if (minYear && !maxYear) {
      return `From ${minYear}`;
    } else if (!minYear && maxYear) {
      return `To ${maxYear}`;
    } else {
      return `${minYear} - ${maxYear}`;
    }
  });
  function onPriceChange() {
    if (priceRange.value.min < 0 || priceRange.value.max < 0) {
      return;
    }
    if (priceRange.value.min && priceRange.value.max) {
      if (priceRange.value.max < priceRange.value.min) return;
    }
    updateDropdowns("price");
    useRouter().push({
      query: {
        ...useRoute().query,
        minPrice: priceRange.value.min,
        maxPrice: priceRange.value.max,
      },
    });
  }
  function onYearChange() {
    if (
      (year.value.min < 1930 && year.value.min !== "") ||
      year.value.min > new Date().getFullYear() ||
      year.value.max > new Date().getFullYear() ||
      (year.value.max < 1930 && year.value.max !== "")
    ) {
      return;
    }

    if (year.value.min && year.value.max) {
      if (year.value.max < year.value.min) return;
    }
    updateDropdowns("year");
    useRouter().push({
      query: {
        ...useRoute().query,
        minYear: year.value.min,
        maxYear: year.value.max,
      },
    });
  }
  function searchForCars() {
    navigateTo({ path: "/search/results", query: useRoute().query });
  }
</script>
<style lang="scss" scoped>
  //
</style>
