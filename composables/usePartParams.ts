export const usePartParams = defineStore("partParams", {
  state: () => ({
    partType: "Any",
    part: "Any",
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
    region: "Any",
    city: "Any",
  }),
  getters: {
    getPart: (state) => {
      return (
        state.partType +
        " " +
        state.part +
        " " +
        state.make +
        " " +
        state.model +
        " " +
        state.priceRange +
        " " +
        state.year +
        " " +
        state.region +
        " " +
        state.city
      );
    },
  },
  actions: {
    printPart() {
      console.log(
        this.partType +
          " " +
          this.part +
          " " +
          this.make +
          " " +
          this.model +
          " " +
          this.priceRange +
          " " +
          this.year +
          " " +
          this.region +
          " " +
          this.city
      );
    },
  },
});
