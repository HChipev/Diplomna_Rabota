export const useUser = defineStore("user", {
  state: () => ({
    user: useSupabaseClient()
      .auth.getUser()
      .then((user) => (Object.keys(user).length !== 0 ? user : null)),
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null;
    },
  },
});
