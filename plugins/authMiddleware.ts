export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    (to) => {
      console.log(useUser().getUser);
      useUser().requestUser();
      if (useUser().getUser && to.path === "/login") {
        return navigateTo("/account");
      } else if (!useUser().getUser && to.path === "/account") {
        return navigateTo("/login");
      }
    },
    { global: true }
  );
});
