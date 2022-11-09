export const useRegister = async (email, phone, password) => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
    phone: phone,
  });
  console.log("user", data);
  console.log("error", error);
};
export const useLogIn = async (email, password) => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log("user", data);
  console.log("error", error);
};
export const useLogOut = async () => {
  const client = useSupabaseClient();
  const { error } = await client.auth.signOut();
  console.log("error", error);
};
export const useFacebookSignIn = async () => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "facebook",
  });
  console.log("user", data);
  console.log("error", error);
};
export const useGoogleSignIn = async () => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
  });
  console.log("user", data);
  console.log("error", error);
};
export const useSignOut = async () => {
  const client = useSupabaseClient();
  const { error } = await client.auth.signOut();
};
