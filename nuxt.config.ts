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
        {
          property: "og:url",
          content: "https://4ips-auto.netlify.app",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: "4ip's Auto",
        },
        {
          property: "og:description",
          content:
            "The best place for buying and selling used cars and car parts.",
        },
        {
          property: "og:image",
          content: "",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:domain",
          content: "4ips-auto.netlify.app",
        },
        {
          property: "twitter:url",
          content: "https://4ips-auto.netlify.app",
        },
        {
          name: "twitter:title",
          content: "4ip's Auto",
        },
        {
          name: "twitter:description",
          content:
            "The best place for buying and selling used cars and car parts.",
        },
        {
          name: "twitter:image",
          content: "",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  plugins: ["~/plugins/fontawesome.js"],
  css: [
    "~/assets/css/tailwind.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore",
          "storeToRefs",
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
    ["@nuxtjs/supabase"],
    ["@nuxtjs/tailwindcss"],
  ],
  buildModules: ["@nuxtjs/style-resources"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
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
