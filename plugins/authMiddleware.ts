export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      if (useUser().getUser && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useUser().getUser && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
