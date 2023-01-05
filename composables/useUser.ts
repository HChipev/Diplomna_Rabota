export const useUser = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
  }),
  getters: {
    getUser(state) {
      console.log(state.user);
      return state.user;
    },
  },
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null;
    },
    async requestUser() {
      this.loading = true;
      const {
        data: { session },
        error,
      } = await useSupabaseClient().auth.getSession();
      this.user = session ? session.user : null;
      console.log(this.user);
      this.loading = false;
    },
  },
});
