<template>
  <div class="mx-auto flex justify-center p-2 min-w-[320px]">
    <button
      v-if="currentPage > 1"
      class="w-8 sm:w-12 h-8 sm:h-12 rounded-lg border border-accent-color mx-1 sm:mx-2 sm:p-3 transition-all duration-500 opacity-60 hover:opacity-100"
      @click="switchPage(currentPage - 1)">
      <font-awesome-icon icon="fa-solid fa-chevron-left" />
    </button>
    <button
      @click="switchPage(page)"
      v-for="page in pages"
      :class="
        page === currentPage
          ? 'bg-accent-color '
          : ' opacity-60 hover:opacity-100'
      "
      class="w-8 sm:w-12 h-8 sm:h-12 border border-accent-color rounded-lg transition-opacity duration-500 mx-1 sm:mx-2 sm:p-3">
      {{ page }}
    </button>
    <div v-if="currentPage < totalPages" class="flex items-end">
      <h1 class="text-2xl">...</h1>
      <button
        @click="switchPage(totalPages)"
        :class="
          currentPage === totalPages ? '' : ' opacity-60 hover:opacity-100'
        "
        class="w-8 sm:w-12 h-8 sm:h-12 rounded-lg border border-accent-color transition-all duration-500 mx-1 sm:mx-2 sm:p-3">
        {{ totalPages }}
      </button>
      <button
        class="w-8 sm:w-12 h-8 sm:h-12 rounded-lg border border-accent-color mx-1 sm:mx-2 sm:p-3 transition-all duration-500 opacity-60 hover:opacity-100"
        @click="switchPage(currentPage + 1)">
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </button>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
  });
  console.log(props.currentPage, props.totalPages);
  const pages = computed(() => {
    if (props.currentPage <= props.totalPages && props.totalPages < 5) {
      const pages = [];
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    } else if (props.currentPage > props.totalPages - 4) {
      const pages = [];
      for (let i = props.totalPages - 4; i <= props.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    } else {
      const pages = [];
      for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
        pages.push(i);
      }
      return pages;
    }
  });
  const emits = defineEmits(["switchPage"]);
  function switchPage(page) {
    if (page !== props.currentPage && page > 0 && page <= props.totalPages) {
      emits("switchPage", page);
    }
  }
</script>
<style lang=""></style>
