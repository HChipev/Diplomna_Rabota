export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      useSupabaseClient().auth.setSession(useSupabaseToken());
      console.log(useSupabaseUser().value);
      if (useSupabaseUser().value && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useSupabaseUser().value && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
