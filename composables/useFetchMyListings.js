export default async function useFetchMyListings(user_id) {
  const { data, error } = await useFetch(`/api/car/listings/user/${user_id}`);
  console.log("data", data);
  console.log("error", error);
  if (error.value) {
    throwError({ ...error.value, message: error.value.statusMessage });
  }
  return data;
}
