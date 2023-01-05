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
    },
    async requestUser() {
      this.user = useSupabaseClient().auth.getUser;
      console.log(this.user);
    },
  },
});
