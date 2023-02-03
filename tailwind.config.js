/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{vue,js,css}",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "border-color": "#7A7A7A",
        "body-background-color": "rgb(19, 19, 19)",
        "primery-lighter-color": "rgb(26, 26, 26)",
        "primery-gray-color": "rgb(51, 51, 51)",
        "primery-darker-color": "rgb(10, 10, 10)",
        "accent-color": "rgb(128, 0, 0)",
        "text-muted-color": "rgb(138, 138, 138)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
  important: true,
  ssr: true,
};
