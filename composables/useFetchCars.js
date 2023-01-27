export default async function useFetchCars(filters) {
  const { data, error } = await useFetch("/api/results/cars", {
    params: {
      ...filters,
    },
  });
  console.log(filters);
  if (error.value) {
    throwError({ ...error.value, message: "Error fetching cars" });
  }
  console.log(data);
  return data;
}
