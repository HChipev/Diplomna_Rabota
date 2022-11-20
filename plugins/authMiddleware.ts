export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      if (useUser().getUser && to.path === "/login") {
        return navigateTo({ path: "/account" });
      } else if (!useUser().getUser && to.path === "/account") {
        return navigateTo({ path: "/login" });
      }
    },
    { global: true }
  );
});
