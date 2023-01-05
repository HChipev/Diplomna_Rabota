export default defineNuxtRouteMiddleware((to, from) => {
  useUser().requestUser();
  console.log(useUser().getUser);
  console.log(useSupabaseClient());
  if (useUser().getUser && to.path === "/login") {
    return navigateTo("/account");
  } else if (!useUser().getUser && to.path === "/account") {
    return navigateTo("/login");
  }
});
