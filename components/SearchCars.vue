<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="make">Make</label>
        <select
          v-model="make"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="model">Model</label>
        <select
          v-model="model"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="max-price">Max Price</label>
        <select
          v-model="maxPrice"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="year">Year</label>
        <select
          v-model="year"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="engine">Engine Type</label>
        <select
          v-model="engineType"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="gearbox">Gearbox Type</label>
        <select
          v-model="gearboxType"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
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
          v-model="region"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
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
          v-model="city"
          class="bg-white border border-accent-color text-black rounded-lg focus:ring-accent-color focus:border-accent-color mt-2 mb-2 mr-3"
          aria-label="Default select example">
          <option selected>All</option>
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
const carParams = useCarParams();
const { make, model, maxPrice, year, engineType, gearboxType, region, city } =
  storeToRefs(carParams);
const extras = inject("extras");
const onParts = inject("onParts");
carParams.setExtras(extras);
carParams.setOnParts(onParts);
function searchForCars() {
  if (onParts.value) {
    carParams.setExtras({});
  } else {
    carParams.setExtras(extras);
  }
  console.log(carParams.getCar);
  useRouter().push("/search/results/cars");
}
</script>
<style lang="scss" scoped>
//
</style>
