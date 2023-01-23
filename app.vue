<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage v-if="inBrowser" />
      <div v-else id="loader">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>
<script setup>
  const inBrowser = ref(false);
  onMounted(() => {
    if (process.client) {
      inBrowser.value = true;
    } else {
      inBrowser.value = false;
    }
  });
  provide("inBrowser", inBrowser);
</script>
<style lang="scss" global>
  body {
    margin: 0;
    min-width: 320px;
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    font-size: $font-size;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $body-background-color;
    padding-top: 4.5rem;
    color: $text-color;
    overflow-x: hidden;
    a {
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-decoration: none;
    }
    img {
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .checkbox-label {
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    //* loading animation */
    #loader {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .lds-roller {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-roller div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 40px 40px;
    }
    .lds-roller div:after {
      content: " ";
      display: block;
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $primery-color;
      margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
      animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
      top: 63px;
      left: 63px;
    }
    .lds-roller div:nth-child(2) {
      animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
      top: 68px;
      left: 56px;
    }
    .lds-roller div:nth-child(3) {
      animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
      top: 71px;
      left: 48px;
    }
    .lds-roller div:nth-child(4) {
      animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
      top: 72px;
      left: 40px;
    }
    .lds-roller div:nth-child(5) {
      animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
      top: 71px;
      left: 32px;
    }
    .lds-roller div:nth-child(6) {
      animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
      top: 68px;
      left: 24px;
    }
    .lds-roller div:nth-child(7) {
      animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
      top: 63px;
      left: 17px;
    }
    .lds-roller div:nth-child(8) {
      animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
      top: 56px;
      left: 12px;
    }
    @keyframes lds-roller {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .noSelect {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .noSelect:focus {
    outline: none !important;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
