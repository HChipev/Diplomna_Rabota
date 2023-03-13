export default defineNuxtRouteMiddleware(async (to, from) => {
  const { role } = await $fetch(`/api/admin/${useSupabaseUser().value.id}`);
  console.log(from.path);
  if (role === "admin") {
    return;
  } else {
    return navigateTo("/account");
  }
});
