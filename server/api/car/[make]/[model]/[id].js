import cars from "~/data/cars.json";
export default defineEventHandler((event) => {
  console.log(event.context.params);
  const { make, model, id } = event.context.params;
  const car = cars.find((c) => {
    return (
      c.id === parseInt(id) &&
      c.make.toLowerCase() === make.toLowerCase().replaceAll("_", " ") &&
      c.model.toLowerCase() === model.toLowerCase()
    );
  });
  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: "Car does not exist",
    });
  }
  return car;
});
