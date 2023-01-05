export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("beforeAwait");
  const {
    data: { session },
    error,
  } = await useSupabaseClient().auth.getSession();
  const user = session?.user;
  useUser().setUser(session);
  console.log("afterAwait");
  console.log(useUser().getUser + "authMiddleware");
  if (user && to.path === "/login") {
    return navigateTo("/account");
  } else if (!user && to.path === "/account") {
    return navigateTo("/login");
  }
});
