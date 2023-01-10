<template>
  <div class="container">
    <!-- car hero -->
    <div
      class="mt-1 mx-auto max-w-7xl object-cover space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-4/5">
      <img
        class="w-full"
        src="https://picsum.photos/1080/1900"
        alt="car-image" />
      <h1 class="mt-10 text-4xl">{{ useRoute().params.name }}</h1>
      <div class="flex mt-1 border-bottom pb-2 justify-between">
        <div class="flex text-muted">
          <p class="mr-2">2013</p>
          <p class="mr-2">|</p>
          <p class="mr-2">Diesel</p>
          <p class="mr-2">|</p>
          <p class="mr-2">235hp</p>
          <p class="mr-2">|</p>
          <p class="mr-2">230000km</p>
        </div>
        <div>
          <p class="font-bold text-3xl price">Price</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
img {
  max-height: 30rem;
}
.price {
  color: $accent-color;
}
p {
  margin: 0;
}
.text-muted {
  color: $text-muted-color !important;
}
</style>
