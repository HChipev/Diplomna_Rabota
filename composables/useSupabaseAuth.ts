export const useRegister = async (email, password) => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  });
  if (!error) {
    useUser().setUser(data.session);
  }
};
export const useLogIn = async (email, password) => {
  const client = useSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (!error) {
    useUser().setUser(data.session);
  }
};
export const useLogOut = async () => {
  const client = useSupabaseClient();
  const { error } = await client.auth.signOut();
  if (!error) {
    useUser().setUser(null);
    localStorage.removeItem("user");
  }
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
