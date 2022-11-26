export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      if (
        useSupabaseClient().auth.getUser(useSupabaseToken()) &&
        to.path === "/login"
      ) {
        return navigateTo("/account");
      } else if (
        !useSupabaseClient().auth.getUser(useSupabaseToken()) &&
        to.path === "/account"
      ) {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
