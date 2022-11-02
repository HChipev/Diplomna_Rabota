export const usePartParams = defineStore("partParams", {
  state: () => ({
    partType: "All",
    part: "All",
    make: "All",
    model: "All",
    maxPrice: "All",
    year: "All",
    region: "All",
    city: "All",
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
        state.maxPrice +
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
          this.maxPrice +
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
