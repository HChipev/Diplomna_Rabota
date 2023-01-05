export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("beforeAwait");
  await useUser().requestUser();
  console.log("afterAwait");
  console.log(useUser().getUser + "authMiddleware");
  if (useUser().getUser && to.path === "/login") {
    return navigateTo("/account");
  } else if (!useUser().getUser && to.path === "/account") {
    return navigateTo("/login");
  }
});
