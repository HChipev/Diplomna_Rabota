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
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="partTypes">Part Type</label>
        <select
          @change="
            $event.target.value !== 'Any'
              ? (partTypeId = $event.target.value)
              : (partTypeId = 0),
              queryPartType($event.target.value)
          "
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="p in partTypes" :key="p.id" :value="p.id">
            {{ p.name }}
          </option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="partNames">Part Name</label>
        <select
          @change="queryPartName($event.target.value)"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected value="0">Any</option>
          <option v-for="pn in partNames" :key="pn.id" :value="pn.id">
            {{ pn.name }}
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
        class="flex flex-col flex-1 justify-center border-t border-border-color">
        <ReuseableButton
          @click="searchForParts()"
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
  function queryPartType(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        partType: id,
        partName: "",
      },
    });
  }
  function queryPartName(id) {
    id == 0 ? (id = "") : (id = id);
    useRouter().push({
      query: {
        ...useRoute().query,
        partName: id,
      },
    });
  }
  const emits = defineEmits(["loaded"]);
  const dropdowns = ref({
    price: false,
    year: false,
  });
  const makeId = ref(0);
  const regionId = ref(0);
  const partTypeId = ref(0);
  const yearRange = ref({
    min: "",
    max: "",
  });
  const priceRange = ref({
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

  const { data: makes } = await useFetch("/api/input/makes");
  const { data: models } = await useFetch(`/api/input/models/${makeId.value}`);
  const { data: partTypes } = await useFetch("/api/input/partType");
  const { data: partNames } = await useFetch(
    `/api/input/partName/${partTypeId.value}`
  );

  const { data: regions } = await useFetch("/api/input/regions");
  const { data: cities } = await useFetch(
    `/api/input/cities/${regionId.value}`
  );
  emits("loaded");

  watch(
    () => makeId.value,
    async (id) => {
      models.value = id !== 0 ? await $fetch(`/api/input/models/${id}`) : [];
    }
  );
  watch(
    () => regionId.value,
    async (id) => {
      cities.value = id !== 0 ? await $fetch(`/api/input/cities/${id}`) : [];
    }
  );
  watch(
    () => partTypeId.value,
    async (id) => {
      partNames.value =
        id !== 0 ? await $fetch(`/api/input/partName/${id}`) : [];
    }
  );

  function searchForParts() {
    navigateTo({ path: "/search/results/parts", query: useRoute().query });
  }
</script>
<style lang="scss" scoped>
  //
</style>
