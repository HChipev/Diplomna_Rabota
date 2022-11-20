export const useUser = defineStore("user", {
  state: () => ({
    user: useSupabaseUser(),
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
