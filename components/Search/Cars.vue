<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="make">Make</label>
        <select
          @change="
            $event.target.value !== 'Any'
              ? (makeId = $event.target.value)
              : (makeId = 0),
              queryMake($event.target.value)
          "
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="m in makes" :value="m.id" :key="m.id">
            {{ m.name }}
          </option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="model">Model</label>
        <select
          @change="queryModel($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="m in models" :key="m.id" :value="m.id">
            {{ m.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color relative">
        <label class="mt-1" for="max-price">Min-Max Price</label>
        <input
          readonly
          @click="updateDropdowns('price')"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color py-1.5 mt-2 mb-2.5 mr-3 pl-2 focus-visible:outline-0"
          v-model="priceRangeText" />
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
        <input
          readonly
          @click="updateDropdowns('year')"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color py-1.5 mt-2 mb-2.5 mr-3 pl-2 focus-visible:outline-0"
          v-model="yearRangeText" />
        <div
          v-if="dropdowns.year"
          class="absolute flex flex-col bg-white shadow rounded-lg focus:ring-accent-color focus:border-accent-color border border-accent-color top-20 left-0 right-0 px-3 py-3 mr-2.5 text-black z-10">
          <input
            v-model="yearRange.min"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mb-2"
            placeholder="Min" />
          <input
            v-model="yearRange.max"
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
          @change="queryEngine($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="e in engines" :key="e.id" :value="e.id">
            {{ e.name }}
          </option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="gearbox">Gearbox Type</label>
        <select
          @change="queryGearbox($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="g in gearboxes" :key="g.id" :value="g.id">
            {{ g.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="engine">Color</label>
        <select
          @change="queryColor($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="c in colors" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div
        class="relative flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="mileage">Min-Max Mileage</label>
        <input
          readonly
          @click="updateDropdowns('mileage')"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color py-1.5 mt-2 mb-2.5 mr-3 pl-2 focus-visible:outline-0"
          v-model="mileageRangeText" />

        <div
          v-if="dropdowns.mileage"
          class="absolute flex flex-col bg-white shadow rounded-lg focus:ring-accent-color focus:border-accent-color border border-accent-color top-20 left-0 right-0 px-3 py-3 mr-2.5 text-black z-10">
          <input
            v-model="mileageRange.min"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mb-2"
            placeholder="Min" />
          <input
            v-model="mileageRange.max"
            type="number"
            class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2"
            placeholder="Max" />
          <button
            @click.prevent="onMileageChange"
            class="bg-white border border-accent-color text-accent-color rounded-md focus:ring-accent-color focus:border-accent-color py-0.5 px-3 text-xl transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 hover:bg-accent-color hover:text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="region">Region</label>
        <select
          @change="
            $event.target.value !== 'Any'
              ? (regionId = $event.target.value)
              : (regionId = 0),
              queryRegion($event.target.value)
          "
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="r in regions" :key="r.id" :value="r.id">
            {{ r.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="city-village">City/Village</label>
        <select
          @change="queryCity($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="c in cities" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="gearbox">Drivetrain Type</label>
        <select
          @change="queryDrivetrain($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="d in drivetrains" :key="d.id" :value="d.id">
            {{ d.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 justify-center border-t border-border-color">
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
  function queryMake(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        make: id,
        model: "",
      },
    });
  }
  function queryModel(id) {
    id == 0 ? (id = "") : (id = id);
    console.log(id);
    useRouter().push({
      query: {
        ...useRoute().query,
        model: id,
      },
    });
  }
  function queryRegion(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        region: id,
        city: "",
      },
    });
  }
  function queryCity(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        city: id,
      },
    });
  }
  function queryEngine(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        engine: id,
      },
    });
  }
  function queryGearbox(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        gearbox: id,
      },
    });
  }
  function queryDrivetrain(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        drivetrain: id,
      },
    });
  }
  function queryColor(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        color: id,
      },
    });
  }
  // const props = defineProps({
  //   features: Array,
  // });
  const dropdowns = ref({
    price: false,
    year: false,
    mileage: false,
  });
  const makeId = ref(0);
  const regionId = ref(0);
  const yearRange = ref({
    min: "",
    max: "",
  });
  const priceRange = ref({
    min: "",
    max: "",
  });
  const mileageRange = ref({
    min: "",
    max: "",
  });

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
    } else if (minPrice === maxPrice) {
      return `$${minPrice}`;
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
    } else if (minYear === maxYear) {
      return `${minYear}`;
    } else {
      return `${minYear} - ${maxYear}`;
    }
  });
  const mileageRangeText = computed(() => {
    const minMileage = useRoute().query.minMileage;
    const maxMileage = useRoute().query.maxMileage;
    if (!minMileage && !maxMileage) {
      return "Any";
    } else if (minMileage && !maxMileage) {
      return `From ${minMileage} km`;
    } else if (!minMileage && maxMileage) {
      return `To ${maxMileage} km`;
    } else if (minMileage === maxMileage) {
      return `${minMileage} km`;
    } else {
      return `${minMileage}km - ${maxMileage} km`;
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
      (yearRange.value.min < 1930 && yearRange.value.min !== "") ||
      yearRange.value.min > new Date().getFullYear() ||
      yearRange.value.max > new Date().getFullYear() ||
      (yearRange.value.max < 1930 && yearRange.value.max !== "")
    ) {
      return;
    }

    if (yearRange.value.min && yearRange.value.max) {
      if (yearRange.value.max < yearRange.value.min) return;
    }
    updateDropdowns("year");
    useRouter().push({
      query: {
        ...useRoute().query,
        minYear: yearRange.value.min,
        maxYear: yearRange.value.max,
      },
    });
  }
  function onMileageChange() {
    if (mileageRange.value.min < 0 || mileageRange.value.max < 0) {
      return;
    }
    if (mileageRange.value.min && mileageRange.value.max) {
      if (mileageRange.value.max < mileageRange.value.min) return;
    }
    updateDropdowns("mileage");
    useRouter().push({
      query: {
        ...useRoute().query,
        minMileage: mileageRange.value.min,
        maxMileage: mileageRange.value.max,
      },
    });
  }

  const { data: makes } = await useFetch("/api/input/makes");
  const { data: models } = await useFetch(`/api/input/models/${makeId.value}`);
  const { data: engines } = await useFetch("/api/input/engines");
  const { data: gearboxes } = await useFetch("/api/input/gearboxes");
  const { data: drivetrains } = await useFetch("/api/input/drivetrains");
  const { data: regions } = await useFetch("/api/input/regions");
  const { data: cities } = await useFetch(
    `/api/input/cities/${regionId.value}`
  );
  const { data: colors } = await useFetch("/api/input/colors");

  watchEffect(async () => {
    models.value = await $fetch(`/api/input/models/${makeId.value}`).then(
      (cities.value = await $fetch(`/api/input/cities/${regionId.value}`))
    );
    console.log(cities.value);
  });

  function searchForCars() {
    navigateTo({ path: "/search/results", query: useRoute().query });
  }
</script>
<style lang="scss" scoped>
  //
</style>
