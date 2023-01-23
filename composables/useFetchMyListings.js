export default async function useFetchMyListings(user_id) {
  const { data, error } = await useFetch(`/api/car/listings/user/${user_id}`);
  if (error.value) {
    throwError({
      statusCode: error.value.statusCode,
      message: error.value.statusMessage,
    });
    return null;
  }
  return data;
}
