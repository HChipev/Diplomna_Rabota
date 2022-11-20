export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      if (useUser().getUser && to.path === "/login") {
        console.log("user", useUser().getUser);
        return navigateTo({ path: "/account" });
      } else if (!useUser().getUser && to.path === "/account") {
        console.log("no user", useUser().getUser);
        return navigateTo({ path: "/login" });
      }
    },
    { global: true }
  );
});
