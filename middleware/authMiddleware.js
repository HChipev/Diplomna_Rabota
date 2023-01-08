export default defineNuxtRouteMiddleware(async (to, from) => {
  const {
    data: { session },
    error,
  } = await useSupabaseClient().auth.getSession();
  const user = session?.user;
  useUser().setUser(session);

  if (user && to.path === "/login") {
    return navigateTo("/account");
  } else if (!user && to.path === "/account") {
    return navigateTo("/login");
  }
});
