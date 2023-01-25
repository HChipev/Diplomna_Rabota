export async function updateUser(_id, _role, _phone) {
  const { data, error } = await useSupabaseClient()
    .from("users")
    .insert([{ user_id: _id, role: _role, phone: _phone }]);
  console.log(useUser().getUser.id);
  console.log(error);
}
//*for getting data from supabase
export async function getUserData() {
  console.log(useUser().getUser.id);
  let { data, error } = await useSupabaseClient()
    .from("users")
    .select()
    .eq("user_id", useUser().getUser.id);

  if (data.length > 0) {
    console.log(data[0].phone);
    return data[0];
  }
  console.log(error);
  return "";
}
//*for getting makes data from supabase
export async function getMakesData() {
  let { data, error } = await useSupabaseClient()
    .from("Make")
    .select()
    .order("name", { ascending: true });
  if (error) {
    console.log(error);
    return;
  } else {
    return data;
  }
}
//*for getting models data from supabase
export async function getModelsData(make_id) {
  let { data, error } = await useSupabaseClient()
    .from("Model")
    .select("name")
    .eq("makeId", make_id)
    .order("name", { ascending: true });
  if (error) {
    console.log(error);
    return;
  } else {
    return data;
  }
}
