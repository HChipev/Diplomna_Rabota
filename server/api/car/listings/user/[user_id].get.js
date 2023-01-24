import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { user_id } = event.context.params;
  console.log(user_id, "api uid");

  const { data, error } = await prisma.car.findMany({
    where: {
      userId: user_id,
    },
    select: {
      Make: {
        select: {
          make: true,
        },
      },
      Model: {
        select: {
          model: true,
        },
      },
      id: true,
      price: true,
    },
  });
  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: "Error fetching listings",
    });
  }

  return data;
});
