export default async function useFetchCars(filters) {
  const { data, error } = await useFetch("/api/results/cars", {
    params: {
      ...filters,
    },
  });
  if (error.value) {
    throwError({ ...error.value, message: "Error fetching cars" });
  }
  return data;
}
