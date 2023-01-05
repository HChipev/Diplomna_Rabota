export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      useUser().requestUser();
      console.log(useUser().getUser);
      if (useSupabaseUser() && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useSupabaseUser() && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
