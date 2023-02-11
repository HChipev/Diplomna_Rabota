<template>
  <div>
    <ClientOnly>
      <NuxtLayout>
        <div
          v-if="error"
          class="flex flex-col max-w-full m-auto justify-center items-center px-5 overflow-hidden">
          <h1 class="text-9xl">{{ error.statusCode }}</h1>
          <p class="text-base sm:text-3xl my-5 text-center break-words">
            {{ error.message }}
          </p>
          <img
            class="m-auto p-5 sm:p-0"
            src="~assets/broken-car-error.svg"
            alt="broken-car-error" />
        </div>
        <Loader v-else />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>
<script setup>
  useHead({
    titleTemplate: "%s | 4ip's Auto ",
    title:
      useError().value.statusCode === "404"
        ? useError().value.message.substring(0, 14)
        : useError().value.message,
  });

  const error = useError();
</script>
<style lang="">
  /*  */
</style>
