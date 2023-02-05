<template>
  <div class="flex min-h-screen flex-col justify-start">
    <header>
      <TheHeader />
    </header>
    <slot />
    <footer class="mt-auto z-20">
      <TheFooter />
    </footer>
  </div>
</template>
<style lang="scss" scoped>
  //
</style>
