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
      //console.log("setUser", payload.user);
      this.user = payload ? payload.user : null;
    },
  },
});
