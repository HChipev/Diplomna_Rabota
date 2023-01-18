import cars from "~/data/cars.json";
import listings from "~/data/listings.json";
import makes from "~/data/makes.json";
export const useCars = () => {
  return {
    cars,
    listings,
    makes,
  };
};
