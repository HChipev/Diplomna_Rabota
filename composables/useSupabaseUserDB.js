export async function updateUser(_id, _role, _phone) {
  const { data, error } = await useSupabaseClient()
    .from("user")
    .insert([{ user_id: _id, role: _role, phone: _phone }]);
  console.log(useUser().getUser.id);
  console.log(error);
}
//*for getting data from supabase
export async function getPhone() {
  let { data: user, error } = await useSupabaseClient()
    .from("user")
    .select("phone");
  if (user.length > 0) {
    console.log(user[0].phone);
    return user[0].phone;
  }
  console.log(error);
  return "";
}
