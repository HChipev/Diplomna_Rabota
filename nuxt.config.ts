// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: ["@nuxtjs/color-mode"],
  buildModules: ["@nuxtjs/style-resources"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./scss/variables";',
        },
      },
    },
  },
});
