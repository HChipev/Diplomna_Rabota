export const useRegister = async (email, phone, password) => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
    phone: phone,
  });
};
export const useLogIn = async (email, password) => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
};
export const useLogOut = async () => {
  const client = useSupabaseClient();
  const { error } = await client.auth.signOut();
};
export const useFacebookSignIn = async () => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "facebook",
  });
};
export const useGoogleSignIn = async () => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
  });
};
export const useSignOut = async () => {
  const client = useSupabaseClient();
  const { error } = await client.auth.signOut();
};
