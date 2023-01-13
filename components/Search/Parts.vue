<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col sm:flex-row">
      <div
        class="flex flex-col flex-1 mb-2 justify-center border-t border-border-color">
        <label class="mt-1" for="make">Part Type</label>
        <select
          v-model="partType"
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
        <label class="mt-1" for="model">Part</label>
        <select
          v-model="part"
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
          @click="searchForParts()"
          class="accent-button mt-3 sm:mt-8 mr-3"
          >Search</ReuseableButton
        >
      </div>
    </div>
  </div>
</template>
<script setup>
const partParams = usePartParams();
const { partType, part, make, model, maxPrice, year, region, city } =
  storeToRefs(partParams);
function searchForParts() {
  partParams.printPart();
  useRouter().push("/search/results/parts");
}
</script>
<style lang="scss" scoped>
.form-select {
  border-color: $primery-darker-color;
  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(128 0 0 / 25%);
  }
}
</style>
