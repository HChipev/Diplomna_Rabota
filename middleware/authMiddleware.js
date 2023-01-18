export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value && to.path === "/login") {
    return navigateTo("/account");
  } else if (!user.value && to.path === "/account") {
    return navigateTo("/login");
  }
});
