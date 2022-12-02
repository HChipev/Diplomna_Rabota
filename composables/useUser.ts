export const useUser = defineStore("user", {
  state: () => ({
    user: useSupabaseClient()
      .auth.getUser()
      .then((user) => user),
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
