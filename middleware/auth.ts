export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  if (user.value && to.path === "/login") {
    navigateTo("/account");
  } else if (!user.value && to.path === "/account") {
    navigateTo("/login");
  }
});
