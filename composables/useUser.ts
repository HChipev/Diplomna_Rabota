export const useUser = defineStore("user", {
  state: async () => ({
    user: await useSupabaseClient().auth.getUser(),
  }),
  getters: {
    async getUser(state) {
      return (await state).user;
    },
  },
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null;
    },
  },
});
