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
    onParts: false,
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
        state.onParts +
        " " +
        JSON.stringify(state.extras)
      );
    },
  },
  actions: {
    setExtras(extras: {}) {
      this.extras = extras;
    },
    setOnParts(onParts: boolean) {
      this.onParts = onParts;
    },
    printCar() {
      console.log(
        this.make +
          " " +
          this.model +
          " " +
          this.maxPrice +
          " " +
          this.year +
          " " +
          this.engineType +
          " " +
          this.gearboxType +
          " " +
          this.region +
          " " +
          this.city +
          " " +
          this.onParts +
          " " +
          JSON.stringify(this.extras)
      );
    },
  },
});
