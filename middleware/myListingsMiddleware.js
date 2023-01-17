export default defineNuxtRouteMiddleware(async (to, from) => {
  const {
    data: { session },
    error,
  } = await useSupabaseClient().auth.getSession();
  const user = session?.user;
  useUser().setUser(session);
  if (user && to.path === "/account/my-listings") {
    return;
  } else if (!user && to.path === "/account/my-listings") {
    return navigateTo("/login");
  }
});
