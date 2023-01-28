export default defineNuxtRouteMiddleware((to, from) => {
  useNuxtApp().hook("page:start", () => {
    window.scrollTo(0, 0);
  });
});
