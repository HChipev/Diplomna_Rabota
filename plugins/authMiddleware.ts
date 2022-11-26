export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      useSupabaseClient().auth.setSession(useSupabaseToken());
      console.log(useSupabaseToken().value);
      if (useSupabaseToken().value && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useSupabaseToken().value && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
