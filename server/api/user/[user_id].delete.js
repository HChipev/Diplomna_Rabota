import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { user_id } = event.context.params;
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    select: {
      image: true,
      bgImage: true,
    },
  });
  const userCars = await prisma.car.findMany({
    where: {
      userId: user_id,
    },
    select: {
      id: true,
      images: true,
    },
  });
  const userParts = await prisma.part.findMany({
    where: {
      userId: user_id,
    },
    select: {
      id: true,
      images: true,
    },
  });
  for (let i = 0; i < userCars.length; i++) {
    await supabase.storage.from("images").remove(userCars[i].images);
    await $fetch(`/api/car/listings/${userCars[i].id}`, {
      method: "DELETE",
    });
  }
  for (let i = 0; i < userParts.length; i++) {
    await supabase.storage.from("images").remove(userParts[i].images);
    await $fetch(`/api/part/listings/${userParts[i].id}`, {
      method: "DELETE",
    });
  }
  await supabase.storage.from("images").remove([user.image, user.bgImage]);
  await supabase.auth.admin.deleteUser(user_id);
  return { userCars, userParts };
});
