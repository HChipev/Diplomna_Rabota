export default async function useFetchCar(params) {
  const { data, error } = await useFetch(
    `/api/car/${params.make}/${params.model}/${params.id}`
  );
  if (error.value) {
    throwError({
      statusCode: error.value.statusCode,
      message: error.value.statusMessage,
    });
  }
  return data;
}
