export const useCarParams = defineStore("carParams", {
  state: () => ({
    make: "All",
    model: "All",
    maxPrice: "All",
    year: "All",
    engineType: "All",
    gearboxType: "All",
    region: "All",
    city: "All",
    extras: {},
  }),
  getters: {
    getCar: (state) => {
      return (
        state.make +
        " " +
        state.model +
        " " +
        state.maxPrice +
        " " +
        state.year +
        " " +
        state.engineType +
        " " +
        state.gearboxType +
        " " +
        state.region +
        " " +
        state.city +
        " " +
        JSON.stringify(state.extras)
      );
    },
  },
  actions: {
    setExtras(extras: {}) {
      this.extras = extras;
    },
  },
});
