<template>
  <div class="flex mx-auto justify-center items-center">
    <button
      v-if="currentPage > 1"
      class="bg-primery-lighter-color border border-accent-color font-bold rounded-lg w-8 sm:w-12 h-8 sm:h-12 opacity-50 hover:opacity-100 transition-all duration-300"
      @click="$emit('changePage', currentPage - 1)">
      <font-awesome-icon class="text-white" icon="chevron-left" />
    </button>
    <button
      v-for="page in shownPages"
      :key="page"
      :class="{
        'opacity-100 bg-accent-color ': page === currentPage,
      }"
      class="bg-primery-lighter-color border border-accent-color font-bold rounded-lg w-8 sm:w-12 h-8 ml-2 sm:h-12 opacity-50 hover:opacity-100 transition-all duration-300"
      @click="$emit('changePage', page)">
      {{ page }}
    </button>
    <span
      v-if="currentPage + 2 < totalPages && totalPages > 5"
      class="ml-2 text-lg sm:text-2xl"
      >...</span
    >
    <button
      v-if="currentPage + 2 < totalPages && totalPages > 5"
      @click="$emit('changePage', totalPages)"
      class="bg-primery-lighter-color border border-accent-color font-bold rounded-lg w-8 sm:w-12 h-8 ml-2 sm:h-12 opacity-50 hover:opacity-100 transition-all duration-300">
      {{ totalPages }}
    </button>
    <button
      v-if="currentPage < totalPages"
      @click="$emit('changePage', currentPage + 1)"
      class="bg-primery-lighter-color border border-accent-color font-bold rounded-lg w-8 sm:w-12 h-8 ml-2 sm:h-12 opacity-50 hover:opacity-100 transition-all duration-300">
      <font-awesome-icon class="text-white" icon="chevron-right" />
    </button>
  </div>
</template>
<script setup>
  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
  });
  const shownPages = computed(() => {
    if (props.currentPage > 3 && !(props.currentPage + 2 > props.totalPages)) {
      return [
        props.currentPage - 2,
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        props.currentPage + 2,
      ];
    } else if (props.currentPage > 4) {
      return [
        props.totalPages - 4,
        props.totalPages - 3,
        props.totalPages - 2,
        props.totalPages - 1,
        props.totalPages,
      ];
    } else {
      return props.totalPages > 5
        ? [1, 2, 3, 4, 5]
        : Array.from({ length: props.totalPages }, (_, i) => i + 1);
    }
  });
</script>
<style lang=""></style>
