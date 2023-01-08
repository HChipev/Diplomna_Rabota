// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
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
    "~/public/css/bootstrap.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  scrips: [
    {
      src: "~/public/js/bootstrap.bundle.min.js",
      type: "text/javascript",
    },
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
