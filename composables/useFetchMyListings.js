export default function useFetchMyListings(user_id) {
  const { data, error } = useFetch(`/api/car/listings/user/${user_id}`);
  console.log("data", data);
  console.log("error", error);
  if (error.value) {
    throwError({ ...error.value, message: "Error fetching cars" });
  }
  return data;
}
