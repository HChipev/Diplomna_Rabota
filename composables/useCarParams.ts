export const useCarParams = defineStore("carParams", {
  state: () => ({
    make: "Any",
    model: "Any",
    priceRange: {
      min: "",
      max: "",
    },
    year: {
      min: "",
      max: "",
    },
    engineType: "Any",
    gearboxType: "Any",
    region: "Any",
    city: "Any",
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
        state.priceRange +
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
          this.priceRange +
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
