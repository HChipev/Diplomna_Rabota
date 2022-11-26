export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      console.log(useSupabaseUser());
      if (useSupabaseUser() && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useSupabaseUser() && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
