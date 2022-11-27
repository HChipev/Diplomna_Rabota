export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      console.log(useSupabaseToken(), "useSupabaseUser().value");
      if (useSupabaseToken().value && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useSupabaseToken().value && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
