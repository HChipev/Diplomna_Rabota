export const useUser = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
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
