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
      if (this.user) {
        localStorage.setItem("user", JSON.stringify(payload.user));
        this.user = JSON.parse(localStorage.getItem("user"));
      }
      // } else {
      //   localStorage.removeItem("user");
      // }
    },
  },
});
