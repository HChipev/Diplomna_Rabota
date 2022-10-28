// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  plugins: ["~/plugins/fontawesome.js"],
  css: [
    "~/static/css/bootstrap.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  scrips: [
    {
      src: "~/static/js/bootstrap.bundle.min.js",
      type: "text/javascript",
    },
  ],

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
