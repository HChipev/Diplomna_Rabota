export const useUser = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null;
      if (payload) {
        localStorage.setItem("user", JSON.stringify(payload.user));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});
