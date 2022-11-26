export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      useSupabaseClient().auth.setSession(useSupabaseToken());
      console.log(useSupabaseClient().auth.getSession());
      if (useSupabaseClient().auth.getSession() && to.path === "/login") {
        return navigateTo("/account");
      } else if (
        !useSupabaseClient().auth.getSession() &&
        to.path === "/account"
      ) {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
