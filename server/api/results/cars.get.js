import carsImport from "~/data/cars.json";
export default defineEventHandler((event) => {
  const {
    make,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    engine,
    gearbox,
    region,
    city,
  } = getQuery(event);
  let cars = carsImport;
  if (make) {
    cars = cars.filter((car) => {
      return car.make.toLowerCase() === make.toLowerCase();
    });
  }
  if (model) {
    cars = cars.filter((car) => {
      return car.model.toLowerCase() === model.toLowerCase();
    });
  }
  if (minPrice) {
    cars = cars.filter((car) => {
      return car.price >= parseInt(minPrice);
    });
  }
  if (maxPrice) {
    cars = cars.filter((car) => {
      return car.price <= parseInt(maxPrice);
    });
  }
  if (minYear) {
    cars = cars.filter((car) => {
      return car.year >= parseInt(minYear);
    });
  }
  if (maxYear) {
    cars = cars.filter((car) => {
      return car.year <= parseInt(maxYear);
    });
  }
  if (engine) {
    cars = cars.filter((car) => {
      return car.engine.toLowerCase() === engine.toLowerCase();
    });
  }
  if (gearbox) {
    cars = cars.filter((car) => {
      return car.gearbox.toLowerCase() === gearbox.toLowerCase();
    });
  }
  if (region) {
    cars = cars.filter((car) => {
      return car.region.toLowerCase() === region.toLowerCase();
    });
  }
  if (city) {
    cars = cars.filter((car) => {
      return car.city.toLowerCase() === city.toLowerCase();
    });
  }

  return cars;
});
