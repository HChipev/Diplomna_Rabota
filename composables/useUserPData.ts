export const useUserPData = defineStore("userPData", {
  state: () => ({
    id: null,
    role: null,
    phone: null,
    uid: null,
  }),
  getters: {
    getPData(state) {
      return {
        id: state.id,
        role: state.role,
        phone: state.phone,
        uid: state.uid,
      };
    },
  },
  actions: {
    setPData(payload) {
      console.log("payload: ", payload);
      this.id = payload ? payload.id : null;
      this.role = payload ? payload.role : null;
      this.phone = payload ? payload.phone : null;
      this.uid = payload ? payload.user_id : null;
    },
  },
});
