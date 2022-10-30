// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "4ip's Auto",
      meta: [
        {
          name: "description",
          content:
            "The best place for buying and selling used cars and car parts.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "./favicon.ico" }],
    },
  },
  plugins: ["~/plugins/fontawesome.js"],
  css: [
    "~/public/css/bootstrap.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  scrips: [
    {
      src: "~/public/js/bootstrap.bundle.min.js",
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
