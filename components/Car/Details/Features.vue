<template>
  <div
    class="mx-auto mt-4 max-w-7xl lg:space-y-4 px-4 lg:px-8 xl:px-10 w-full 2xl:w-3/5">
    <div class="flex justify-center items-center">
      <h1 class="sm:text-2xl mb-3 sm:mb-0">Features</h1>
    </div>
    <div class="flex flex-col flex-wrap">
      <div v-if="showSection.safety">
        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-accent-color">
          Safety
        </p>
        <div v-for="feature in features">
          <CarDetailsFeatureLabel
            v-if="feature.category === 'safety'"
            :extraName="feature" />
        </div>
      </div>

      <div v-if="showSection.exterior">
        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-accent-color">
          Exterior
        </p>
        <div v-for="feature in features">
          <CarDetailsFeatureLabel
            v-if="feature.category === 'exterior'"
            :extraName="feature" />
        </div>
      </div>

      <div v-if="showSection.comfort">
        <p
          class="flex items-center justify-center pt-1 mb-3 border-t border-accent-color">
          Comfort
        </p>
        <div v-for="feature in features">
          <CarDetailsFeatureLabel
            v-if="feature.category === 'comfort'"
            :extraName="feature" />
        </div>
      </div>

      <div v-if="showSection.other">
        <p
          class="flex items-center justify-center text-base pt-1 mb-3 border-t border-accent-color">
          Other
        </p>
        <div v-for="feature in features">
          <CarDetailsFeatureLabel
            v-if="feature.category === 'other'"
            :extraName="feature" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    features: Array,
  });
  const showSection = reactive({
    safety: false,
    exterior: false,
    comfort: false,
    other: false,
  });

  for (let i = 0; i < props.features.length; i++) {
    if (props.features[i].category === "safety") {
      showSection.safety = true;
    } else if (props.features[i].category === "exterior") {
      showSection.exterior = true;
    } else if (props.features[i].category === "comfort") {
      showSection.comfort = true;
    } else {
      showSection.other = true;
    }
  }
</script>
<style lang=""></style>
