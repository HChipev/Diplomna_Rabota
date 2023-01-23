import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler((event) => {
  const { user_id } = event.context.params;
  console.log(user_id, "api uid");

  return prisma.Car.findMany({
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
});
