export default async function useFetchMyListings(user_id) {
  const { data, error } = await useFetch(`/api/car/listings/user/${user_id}`);
  if (error.value) {
    throwError({ ...error.value, message: "Error fetching my listings" });
  }
  return data;
}
