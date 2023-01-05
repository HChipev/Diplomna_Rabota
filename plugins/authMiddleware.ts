export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      useUser().requestUser();
      console.log(useUser().getUser);
      console.log(useSupabaseUser().value + "hjagd");
      if (useSupabaseUser().value && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useSupabaseUser().value && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
